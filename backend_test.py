import requests
import sys
import json
from datetime import datetime
import uuid

class TanbihAPITester:
    def __init__(self, base_url="https://tanbih-app.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_user_id = None
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=30)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if not success:
                try:
                    error_data = response.json()
                    details += f", Response: {error_data}"
                except:
                    details += f", Response: {response.text[:200]}"
            
            self.log_test(name, success, details)
            
            if success:
                try:
                    return response.json()
                except:
                    return {"status": "success"}
            return None

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return None

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_create_user(self):
        """Test user creation"""
        user_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "occupation": "student",
            "mental_wellness": "peaceful",
            "daily_habits": ["prayer", "quran"],
            "location": {"city": "New York", "country": "USA"},
            "language_preference": "english",
            "prayer_notifications": True
        }
        
        result = self.run_test("Create User", "POST", "users", 200, user_data)
        if result and 'id' in result:
            self.test_user_id = result['id']
            return result
        return None

    def test_get_user(self):
        """Test get user by ID"""
        if not self.test_user_id:
            self.log_test("Get User", False, "No user ID available")
            return None
        
        return self.run_test("Get User", "GET", f"users/{self.test_user_id}", 200)

    def test_prayer_times(self):
        """Test prayer times API"""
        params = {"city": "New York", "country": "USA"}
        result = self.run_test("Prayer Times", "GET", "prayer-times", 200, params=params)
        
        if result:
            # Verify prayer times structure
            required_fields = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha', 'city', 'country']
            missing_fields = [field for field in required_fields if field not in result]
            
            if missing_fields:
                self.log_test("Prayer Times Structure", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Prayer Times Structure", True, "All required fields present")
        
        return result

    def test_quran_surahs(self):
        """Test Quran Surahs API"""
        return self.run_test("Quran Surahs", "GET", "quran/surahs", 200)

    def test_quran_surah_detail(self):
        """Test specific Surah API"""
        return self.run_test("Quran Surah Detail", "GET", "quran/surah/1", 200)

    def test_hadith_collections(self):
        """Test Hadith collections API"""
        return self.run_test("Hadith Collections", "GET", "hadith/collections", 200)

    def test_hadith_from_collection(self):
        """Test Hadith from specific collection"""
        return self.run_test("Hadith from Collection", "GET", "hadith/sahih-bukhari", 200)

    def test_duas(self):
        """Test Duas API"""
        result = self.run_test("Duas", "GET", "duas", 200)
        
        if result and 'duas' in result:
            if len(result['duas']) > 0:
                self.log_test("Duas Content", True, f"Found {len(result['duas'])} duas")
            else:
                self.log_test("Duas Content", False, "No duas found")
        
        return result

    def test_ai_assistant(self):
        """Test AI Assistant API"""
        question_data = {
            "question": "What is the importance of prayer in Islam?",
            "user_id": self.test_user_id
        }
        
        result = self.run_test("AI Assistant", "POST", "ai-assistant", 200, question_data)
        
        if result and 'answer' in result:
            if len(result['answer']) > 10:
                self.log_test("AI Assistant Response", True, f"Response length: {len(result['answer'])} chars")
            else:
                self.log_test("AI Assistant Response", False, "Response too short")
        
        return result

    def test_create_task(self):
        """Test task creation"""
        if not self.test_user_id:
            self.log_test("Create Task", False, "No user ID available")
            return None
            
        task_data = {
            "user_id": self.test_user_id,
            "title": "Test Prayer Task",
            "description": "Test task for prayer",
            "category": "prayer",
            "frequency": "daily"
        }
        
        return self.run_test("Create Task", "POST", "tasks", 200, task_data)

    def test_get_user_tasks(self):
        """Test get user tasks"""
        if not self.test_user_id:
            self.log_test("Get User Tasks", False, "No user ID available")
            return None
        
        result = self.run_test("Get User Tasks", "GET", f"tasks/{self.test_user_id}", 200)
        
        if result and isinstance(result, list):
            self.log_test("User Tasks Structure", True, f"Found {len(result)} tasks")
        
        return result

    def test_user_progress(self):
        """Test user progress API"""
        if not self.test_user_id:
            self.log_test("User Progress", False, "No user ID available")
            return None
        
        result = self.run_test("User Progress", "GET", f"progress/{self.test_user_id}", 200)
        
        if result:
            required_fields = ['total_tasks', 'completed_tasks', 'completion_rate']
            missing_fields = [field for field in required_fields if field not in result]
            
            if missing_fields:
                self.log_test("Progress Structure", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Progress Structure", True, "All required fields present")
        
        return result

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Tanbih API Tests...")
        print(f"Testing against: {self.base_url}")
        print("=" * 50)

        # Test API root
        self.test_root_endpoint()
        
        # Test user management
        self.test_create_user()
        self.test_get_user()
        
        # Test Islamic content APIs
        self.test_prayer_times()
        self.test_quran_surahs()
        self.test_quran_surah_detail()
        self.test_hadith_collections()
        self.test_hadith_from_collection()
        self.test_duas()
        
        # Test AI assistant
        self.test_ai_assistant()
        
        # Test task management
        self.test_create_task()
        self.test_get_user_tasks()
        self.test_user_progress()

        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary:")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        # Print failed tests
        failed_tests = [test for test in self.test_results if not test['success']]
        if failed_tests:
            print(f"\n❌ Failed Tests ({len(failed_tests)}):")
            for test in failed_tests:
                print(f"  - {test['test']}: {test['details']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = TanbihAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())