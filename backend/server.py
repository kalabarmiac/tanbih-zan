from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: Optional[str] = None
    occupation: Optional[str] = None
    mental_wellness: Optional[str] = None
    daily_habits: Optional[List[str]] = []
    location: Optional[Dict[str, str]] = None
    language_preference: str = "english"
    prayer_notifications: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    name: str
    occupation: str
    mental_wellness: str
    daily_habits: List[str]
    location: Dict[str, str]
    language_preference: str = "english"
    prayer_notifications: bool = True

class IslamicTask(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    description: str
    category: str  # prayer, quran, dhikr, charity, etc.
    frequency: str  # daily, weekly, monthly
    completed: bool = False
    completed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TaskComplete(BaseModel):
    task_id: str
    completed: bool

class PrayerTimes(BaseModel):
    fajr: str
    sunrise: str
    dhuhr: str
    asr: str
    maghrib: str
    isha: str
    date: str
    city: str
    country: str

class AIQuestion(BaseModel):
    question: str
    user_id: Optional[str] = None

class AIResponse(BaseModel):
    answer: str
    sources: Optional[List[str]] = []

# Helper functions
def prepare_for_mongo(data):
    """Convert datetime objects to ISO strings for MongoDB storage"""
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, datetime):
                data[key] = value.isoformat()
    return data

def parse_from_mongo(item):
    """Parse datetime strings back from MongoDB"""
    if isinstance(item, dict):
        for key, value in item.items():
            if key in ['created_at', 'completed_at'] and isinstance(value, str):
                try:
                    item[key] = datetime.fromisoformat(value)
                except ValueError:
                    pass
    return item


# Real AI response function using OpenRouter
async def get_ai_response(question: str, user_context: str = "") -> str:
    """Get AI response from OpenRouter API"""
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        logging.error("OPENROUTER_API_KEY not found in environment variables.")
        return "AI assistant is not configured. Please contact support."

    system_prompt = (
        "You are Tanbih, a compassionate and knowledgeable Islamic AI assistant. "
        "Your purpose is to provide guidance based on authentic Islamic sources like the Quran and Sunnah. "
        "Always be respectful, empathetic, and aim to inspire. If you cite sources, mention them clearly. "
        "Avoid giving personal fatwas or making definitive rulings; instead, explain different scholarly viewpoints if applicable and encourage users to consult local scholars for personal matters. "
    )

    full_prompt = f"{question}"
    if user_context:
        system_prompt += f"Here is some context about the user you are speaking to, use it to tailor your response: {user_context}"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "openai/gpt-4-turbo",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": full_prompt}
                    ]
                },
                timeout=30.0
            )
            response.raise_for_status()
            data = response.json()

            if data.get("choices") and len(data["choices"]) > 0:
                answer = data["choices"][0].get("message", {}).get("content")
                if answer:
                    return answer.strip()

            logging.error(f"Unexpected API response structure: {data}")
            return "I received an unexpected response from the AI service. Please try again."

    except httpx.HTTPStatusError as e:
        logging.error(f"AI API HTTP error: {e.response.status_code} - {e.response.text}")
        return "I am having trouble connecting to the AI service right now. Please try again later."
    except Exception as e:
        logging.error(f"An unexpected error occurred while fetching AI response: {str(e)}")
        return "An unexpected error occurred. Please try again later."

# Routes
@api_router.get("/")
async def root():
    return {"message": "Tanbih - Islamic Lifestyle Companion API"}

@api_router.post("/users", response_model=User)
async def create_user(user_data: UserCreate):
    """Create new user with onboarding data"""
    user = User(**user_data.dict())
    user_dict = prepare_for_mongo(user.dict())
    await db.users.insert_one(user_dict)
    
    # Generate personalized tasks based on user profile
    await generate_initial_tasks(user.id, user_data.dict())
    
    return user

@api_router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    """Get user by ID"""
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**parse_from_mongo(user))

@api_router.put("/users/{user_id}", response_model=User)
async def update_user(user_id: str, user_data: UserCreate):
    """Update user profile"""
    user_dict = prepare_for_mongo(user_data.dict())
    result = await db.users.update_one(
        {"id": user_id}, 
        {"$set": user_dict}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = await db.users.find_one({"id": user_id})
    return User(**parse_from_mongo(updated_user))

@api_router.get("/prayer-times")
async def get_prayer_times(city: str, country: str, date: Optional[str] = None):
    """Get prayer times for specified location"""
    try:
        # Use the timingsByCity endpoint for city-based requests
        url = f"https://api.aladhan.com/v1/timingsByCity"
        params = {
            "city": city,
            "country": country,
            "method": 2,  # Islamic Society of North America method
            "school": 0   # Shafi school
        }
        if date:
            params["date"] = date
            
        async with httpx.AsyncClient(follow_redirects=True) as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            if data.get("code") != 200:
                raise HTTPException(status_code=500, detail="Prayer times API error")
            
            timings = data["data"]["timings"]
            prayer_times = PrayerTimes(
                fajr=timings["Fajr"],
                sunrise=timings["Sunrise"],
                dhuhr=timings["Dhuhr"],
                asr=timings["Asr"],
                maghrib=timings["Maghrib"],
                isha=timings["Isha"],
                date=data["data"]["date"]["readable"],
                city=city,
                country=country
            )
            return prayer_times
    except Exception as e:
        logging.error(f"Prayer times API error: {str(e)}")
        raise HTTPException(status_code=500, detail="Unable to fetch prayer times")

@api_router.get("/quran/surahs")
async def get_surahs():
    """Get list of all Surahs"""
    try:
        url = "https://api.alquran.cloud/v1/surah"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            return response.json()
    except Exception as e:
        logging.error(f"Quran API error: {str(e)}")
        raise HTTPException(status_code=500, detail="Unable to fetch Surahs")

@api_router.get("/quran/surah/{surah_number}")
async def get_surah(surah_number: int):
    """Get specific Surah with Arabic and English"""
    try:
        # Get Arabic text
        arabic_url = f"https://api.alquran.cloud/v1/surah/{surah_number}/quran-uthmani"
        # Get English translation
        english_url = f"https://api.alquran.cloud/v1/surah/{surah_number}/en.asad"
        
        async with httpx.AsyncClient() as client:
            arabic_response = await client.get(arabic_url)
            english_response = await client.get(english_url)
            
            arabic_response.raise_for_status()
            english_response.raise_for_status()
            
            arabic_data = arabic_response.json()
            english_data = english_response.json()
            
            # Combine Arabic and English
            combined_ayahs = []
            for i, ayah in enumerate(arabic_data["data"]["ayahs"]):
                combined_ayahs.append({
                    "number": ayah["number"],
                    "arabic": ayah["text"],
                    "english": english_data["data"]["ayahs"][i]["text"],
                    "numberInSurah": ayah["numberInSurah"]
                })
            
            return {
                "data": {
                    "number": arabic_data["data"]["number"],
                    "name": arabic_data["data"]["name"],
                    "englishName": arabic_data["data"]["englishName"],
                    "englishNameTranslation": arabic_data["data"]["englishNameTranslation"],
                    "revelationType": arabic_data["data"]["revelationType"],
                    "numberOfAyahs": arabic_data["data"]["numberOfAyahs"],
                    "ayahs": combined_ayahs
                }
            }
    except Exception as e:
        logging.error(f"Surah API error: {str(e)}")
        raise HTTPException(status_code=500, detail="Unable to fetch Surah")

@api_router.get("/hadith/collections")
async def get_hadith_collections():
    """Get available Hadith collections"""
    collections = [
        {"name": "sahih-bukhari", "title": "Sahih al-Bukhari"},
        {"name": "sahih-muslim", "title": "Sahih Muslim"},
        {"name": "sunan-an-nasai", "title": "Sunan an-Nasa'i"},
        {"name": "sunan-abi-dawood", "title": "Sunan Abi Dawood"},
        {"name": "jami-at-tirmidhi", "title": "Jami` at-Tirmidhi"},
        {"name": "sunan-ibn-majah", "title": "Sunan Ibn Majah"}
    ]
    return {"collections": collections}

@api_router.get("/hadith/{collection}")
async def get_hadith_from_collection(collection: str, page: int = 1, limit: int = 10):
    """Get Hadith from specific collection"""
    try:
        # Updated endpoint structure for HadithAPI.com
        url = f"https://hadithapi.com/api/hadiths"
        params = {
            "apiKey": os.environ.get('HADITH_API_KEY'), 
            "book": collection, 
            "page": page, 
            "language": "en"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()
    except Exception as e:
        logging.error(f"Hadith API error: {str(e)}")
        raise HTTPException(status_code=500, detail="Unable to fetch Hadith")

@api_router.get("/duas")
async def get_duas():
    """Get collection of Duas from a centralized source"""
    # Centralized duas list
    duas_list = [
        {
            "id": "1", "title": "Upon Waking Up", "category": "daily",
            "arabic": "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
            "english": "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
            "transliteration": "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur."
        },
        {
            "id": "2", "title": "For Knowledge", "category": "worship",
            "arabic": "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي، وَعَلِّمْنِي مَا يَنْفَعُنِي، وَزِدْنِي عِلْمًا",
            "english": "O Allah, benefit me with what You have taught me, teach me what will benefit me, and increase me in knowledge.",
            "transliteration": "Allahumman-fa'ni bima 'allamtani, wa 'allimni ma yanfa'uni, wa zidni 'ilma."
        },
        {
            "id": "3", "title": "For Anxiety and Sorrow", "category": "emotional",
            "arabic": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
            "english": "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
            "transliteration": "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal."
        },
        {
            "id": "4", "title": "Before Eating", "category": "daily",
            "arabic": "بِسْمِ اللَّهِ",
            "english": "In the name of Allah.",
            "transliteration": "Bismillah."
        },
        {
            "id": "5", "title": "After Eating", "category": "daily",
            "arabic": "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
            "english": "All praise is for Allah who fed me this and provided it for me without any might nor power from myself.",
            "transliteration": "Alhamdu lillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah."
        },
        {
            "id": "6", "title": "When Leaving Home", "category": "daily",
            "arabic": "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
            "english": "In the name of Allah, I have placed my trust in Allah, there is no might and no power except with Allah.",
            "transliteration": "Bismillahi, tawakkaltu 'alallahi, wa la hawla wa la quwwata illa billah."
        },
        {
            "id": "7", "title": "For Patience", "category": "emotional",
            "arabic": "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَamَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
            "english": "Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.",
            "transliteration": "Rabbana afrigh 'alayna sabran wa thabbit aqdaamana wansurna 'alal-qawmil-kafirin."
        }
    ]
    return {"duas": duas_list}

@api_router.post("/ai-assistant", response_model=AIResponse)
async def ask_ai_assistant(question_data: AIQuestion):
    """Ask the AI assistant about Islamic topics"""
    user_context = ""
    if question_data.user_id:
        user = await db.users.find_one({"id": question_data.user_id})
        if user:
            user_context = f"Occupation: {user.get('occupation', 'Not specified')}, Mental wellness: {user.get('mental_wellness', 'Not specified')}"
    
    answer = await get_ai_response(question_data.question, user_context)
    return AIResponse(answer=answer)

@api_router.post("/tasks", response_model=IslamicTask)
async def create_task(task_data: dict):
    """Create a new Islamic task"""
    task = IslamicTask(**task_data)
    task_dict = prepare_for_mongo(task.dict())
    await db.tasks.insert_one(task_dict)
    return task

@api_router.get("/tasks/{user_id}")
async def get_user_tasks(user_id: str):
    """Get all tasks for a user"""
    tasks = await db.tasks.find({"user_id": user_id}).to_list(100)
    return [IslamicTask(**parse_from_mongo(task)) for task in tasks]

@api_router.put("/tasks/complete")
async def complete_task(task_completion: TaskComplete):
    """Mark task as completed/uncompleted"""
    update_data = {"completed": task_completion.completed}
    if task_completion.completed:
        update_data["completed_at"] = datetime.now(timezone.utc).isoformat()
    else:
        update_data["completed_at"] = None
        
    result = await db.tasks.update_one(
        {"id": task_completion.task_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"message": "Task updated successfully"}

@api_router.get("/progress/{user_id}")
async def get_user_progress(user_id: str):
    """Get user progress statistics, including daily streak"""
    tasks = await db.tasks.find({"user_id": user_id}).to_list(1000)
    
    total_tasks = len(tasks)
    completed_tasks = len([task for task in tasks if task.get("completed", False)])
    completion_rate = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    
    daily_tasks_total = len([task for task in tasks if task.get("frequency") == "daily"])
    weekly_tasks_total = len([task for task in tasks if task.get("frequency") == "weekly"])

    # --- Streak Calculation Logic ---
    streak_days = 0
    # Filter for completed, daily tasks
    completed_daily_tasks = [
        task for task in tasks
        if task.get("completed") and task.get("frequency") == "daily" and task.get("completed_at")
    ]
    
    if completed_daily_tasks:
        # Get unique completion dates (ignoring time)
        completion_dates = sorted(
            list(set(
                datetime.fromisoformat(task["completed_at"]).date() for task in completed_daily_tasks
            )),
            reverse=True
        )

        today = datetime.now(timezone.utc).date()

        # Check if the most recent completion was today or yesterday
        if completion_dates[0] == today or completion_dates[0] == today - timedelta(days=1):
            streak_days = 1
            # Iterate backwards from the most recent completion date
            for i in range(len(completion_dates) - 1):
                # Check if the next date is consecutive
                if completion_dates[i] - timedelta(days=1) == completion_dates[i+1]:
                    streak_days += 1
                else:
                    # Break the loop if the streak is broken
                    break

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "completion_rate": round(completion_rate, 2),
        "daily_tasks": daily_tasks_total,
        "weekly_tasks": weekly_tasks_total,
        "streak_days": streak_days
    }

async def generate_initial_tasks(user_id: str, user_data: dict):
    """Generate personalized Islamic tasks for new user"""
    base_tasks = [
        {
            "user_id": user_id,
            "title": "Perform Fajr Prayer",
            "description": "Wake up early and perform the Fajr prayer",
            "category": "prayer",
            "frequency": "daily"
        },
        {
            "user_id": user_id,
            "title": "Read Quran (10 minutes)",
            "description": "Spend 10 minutes reading and reflecting on the Quran",
            "category": "quran",
            "frequency": "daily"
        },
        {
            "user_id": user_id,
            "title": "Morning Dhikr",
            "description": "Recite morning supplications and remembrance of Allah",
            "category": "dhikr",
            "frequency": "daily"
        },
        {
            "user_id": user_id,
            "title": "Give Charity",
            "description": "Give charity or help someone in need",
            "category": "charity",
            "frequency": "weekly"
        }
    ]
    
    # Add occupation-specific tasks
    occupation = user_data.get("occupation", "").lower()
    if "student" in occupation:
        base_tasks.append({
            "user_id": user_id,
            "title": "Study Dua",
            "description": "Learn a new dua for seeking knowledge and success in studies",
            "category": "dua",
            "frequency": "weekly"
        })
    
    # Add mental wellness tasks
    mental_wellness = user_data.get("mental_wellness", "").lower()
    if "stressed" in mental_wellness or "anxious" in mental_wellness:
        base_tasks.append({
            "user_id": user_id,
            "title": "Stress Relief Dua",
            "description": "Recite duas for peace and stress relief",
            "category": "dua",
            "frequency": "daily"
        })
    
    # Insert tasks into database
    for task_data in base_tasks:
        task = IslamicTask(**task_data)
        task_dict = prepare_for_mongo(task.dict())
        await db.tasks.insert_one(task_dict)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()