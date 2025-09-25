# Here are your Instructions
Tanbih Application Overview
Application Name: Tanbih (meaning "Reminder")

Core Purpose: Tanbih is a modern, personalized Islamic lifestyle companion designed to help Muslims integrate spiritual practices into their daily lives. It aims to provide authentic Islamic knowledge, timely reminders, and personalized guidance through an intuitive and engaging user experience. The app emphasizes building consistent habits, fostering spiritual growth, and making Islamic learning accessible and convenient.

Key Features:
Personalized Spiritual Guidance & Onboarding:

User Profile Setup: A comprehensive onboarding process gathers information about the user's occupation, mental wellness, daily habits, preferred language, and location.
Profile Editor: Existing users can easily edit their profile details to adjust personalization settings.
Dynamic Content: The app tailors daily inspiration, tasks, and notifications based on the user's profile, aiming to provide relevant support and motivation.
Accurate Prayer Times & Reminders:

Location-Based Timings: Provides accurate prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) based on the user's specified city and country.
Next Prayer Highlight: Clearly displays the upcoming prayer time and a countdown.
Qibla Direction: Offers a placeholder for Qibla direction (integration for precise calculation can be added).
Notifications: Supports opt-in notifications for each prayer time.
Comprehensive Qur'an Library:

Surah & Juz Browsing: Allows users to explore the Qur'an by Surahs (chapters) and Ajza (Juz/parts).
Arabic Text & English Translation: Displays each Ayah (verse) in both original Arabic script and English translation (Asad translation used by default).
Surah & Juz Details: Provides metadata for Surahs (revelation type, number of Ayahs) and Juz (number of verses).
Verse-Level Actions: Includes options to copy verses.
Authentic Hadith Library:

Collection Browsing: Features major Hadith collections such as Sahih al-Bukhari, Sahih Muslim, Sunan an-Nasa'i, Sunan Abi Dawood, Jami` at-Tirmidhi, and Sunan Ibn Majah.
Hadith Details: Displays Hadith number, Arabic text, English translation, and narrator information.
Search Functionality: Allows users to search through Hadith texts.
Copy Functionality: Enables easy copying of Hadith text.
Duas & Dhikr Collection:

Categorized Supplications: Presents a collection of Duas organized by common occasions (e.g., waking up, anxiety).
Multi-Lingual Display: For each Dua, it includes the Arabic text, English translation, and English transliteration.
Copy Functionality: Allows users to copy Dua texts.
Intelligent AI Assistant:

Islamic Q&A: Answers user questions on various Islamic topics based on authentic sources.
Context-Aware Responses: Personalizes answers based on user's profile (occupation, mental status).
Source Citation: Strives to cite sources (Quran verses, Hadith references) for authenticity.
Fallbacks: Includes a knowledge base for instant answers to common questions and robust error handling for AI service unavailability.
My Schedule:

Weekly Calendar View: Provides a visual, calendar-style overview of daily and weekly activities.
Task Integration: Planned integration to display assigned tasks and reminders within the schedule.
Personalized Task Management:

System-Generated Tasks: Automatically creates personalized Islamic tasks (daily, weekly, monthly) based on the user's profile and preferences.
Custom Tasks (Planned): User-created tasks can be added to the system.
Task Tracking: Allows users to mark tasks as completed, with a record of completion date.
Categorization: Tasks are categorized (e.g., prayer, Qur'an, dhikr, charity).
Spiritual Progress Tracking:

Overall Completion Rate: Monitors the percentage of completed tasks.
Daily/Weekly/Monthly Progress: Shows task completion statistics over different periods.
Streak Tracking: Encourages consistency by tracking consecutive days of activity.
Wellness Monitoring: Reflects mental wellness trends.
Achievements: Rewards users with virtual achievements for reaching milestones.
Key Technical Factors:
Frontend Development:
Framework: React
Styling: Tailwind CSS for utility-first styling.
UI Library: Shadcn/ui components for a modern and accessible interface.
Icons: Lucide React for a consistent icon set.
Animations: Framer Motion for smooth and engaging UI transitions.
Date Handling: date-fns for robust date and time manipulation.
Routing: react-router-dom for client-side navigation.
Form Management: react-hook-form (used in onboarding components).
Backend & Data (Base44 Platform):
Entity Management: Utilizes Base44's entity system for structured data storage.
User Entity: Stores user profile information (occupation, mental status, habits, location, preferences).
IslamicTask Entity: Stores personalized or user-created Islamic tasks.
IslamicContent Entity: Designed for storing and categorizing various Islamic content types.
User Authentication: Handled automatically by the Base44 platform (Google Login).
Core Integrations:
InvokeLLM: This is a powerful integration used to interact with Language Models for:
Generating personalized daily inspiration.
Creating personalized Islamic tasks during onboarding.
Powering the AI Assistant's responses.
APIs and External Services:
AI Assistant (OpenRouter API):

Platform: OpenRouter.ai
Model: openai/gpt-4-turbo (the app is configured to use this; the user mentioned gpt 120b which is a powerful model potentially available via OpenRouter, indicating a preference for advanced capabilities).
API Key: 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
Purpose: Provides dynamic, context-aware answers to Islamic questions.
Prayer Times (AlAdhan API):

Endpoint: https://api.aladhan.com/v1/timingsByCity
Purpose: Fetches accurate, location-based prayer times.
Qur'an Data (AlQuran.cloud API):

Endpoint: https://api.alquran.cloud/v1/
Purpose: Retrieves Surah lists, Juz lists, and individual Ayahs with Arabic text and English translations. Editions are specified (e.g., quran-uthmani, en.asad).
Hadith Data (HadithAPI.com):

Endpoint: https://hadithapi.com/api/
API Key: $2y$10$WKHdmx5QUwQEpeYnSYvB8eTFNJhVENP0CTQvqeY2TUcceLXYNnflm
Purpose: Fetches Hadith collections and individual Hadith texts for the Hadith Library.
Duas (AI-generated via InvokeLLM & hardcoded fallback):

Source: Currently generated by InvokeLLM (which uses a large language model). For reliability, a hardcoded fallback is in place, often sourcing from collections like Hisnul Muslim.
Purpose: Provides a collection of daily supplications.
User Experience (UX) and User Interface (UI) Principles:
Modern & Clean Design: Utilizes a custom "Islamic" theme with gradients, subtle patterns, and a focus on readability and visual appeal.
Responsive Layout: Designed to work seamlessly across various devices, from mobile phones to desktop computers.
Intuitive Navigation: Clear sidebar and mobile navigation menus for easy access to all features.
Engaging Interactions: Employs animations and interactive elements to make the user experience more dynamic.
Accessibility: Use of standard UI components and clear typography enhances accessibility.
Personalization at Core: The entire app is structured around delivering a personalized experience based on user input.
Error Handling & Fallbacks: Robust error handling with user-friendly messages and data fallbacks ensures the app remains functional even if external APIs encounter issues or rate limits.