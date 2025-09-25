import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import AppLayout from './pages/AppLayout';
import DashboardPage from './pages/DashboardPage';
import PrayerTimesPage from './pages/PrayerTimesPage';
import QuranPage from './pages/QuranPage';
import HadithPage from './pages/HadithPage';
import DuasPage from './pages/DuasPage';
import AIAssistantPage from './pages/AIAssistantPage';
import SchedulePage from './pages/SchedulePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
          <Route path="/prayer-times" element={<AppLayout><PrayerTimesPage /></AppLayout>} />
          <Route path="/quran" element={<AppLayout><QuranPage /></AppLayout>} />
          <Route path="/hadith" element={<AppLayout><HadithPage /></AppLayout>} />
          <Route path="/duas" element={<AppLayout><DuasPage /></AppLayout>} />
          <Route path="/ai-assistant" element={<AppLayout><AIAssistantPage /></AppLayout>} />
          <Route path="/schedule" element={<AppLayout><SchedulePage /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;