import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, Book, MessageCircle, User, Menu, X, Church, BookOpen, Heart, BarChart3, CheckCircle, Plus, Settings } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { ScrollArea } from './components/ui/scroll-area';
import { Separator } from './components/ui/separator';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Landing Page Component
const LandingPage = () => {
  const navigate = useNavigate();
  
  const heroImages = [
    "https://images.unsplash.com/photo-1590273089302-ebbc53986b6e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxtb3NxdWV8ZW58MHx8fHwxNzU4Nzc5NDAyfDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1519817650390-64a93db51149?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxtb3NxdWV8ZW58MHx8fHwxNzU4Nzc5NDAyfDA&ixlib=rb-4.1.0&q=85"
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-emerald-600" />,
      title: "Prayer Times",
      description: "Accurate prayer times based on your location with customizable reminders",
      image: "https://images.unsplash.com/photo-1512970648279-ff3398568f77?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxtb3NxdWV8ZW58MHx8fHwxNzU4Nzc5NDAyfDA&ixlib=rb-4.1.0&q=85"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-emerald-600" />,
      title: "Quran & Hadith",
      description: "Complete Quran with translations and authentic Hadith collections",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxRdXJhbnxlbnwwfHx8fDE3NTg3Nzk0MTh8MA&ixlib=rb-4.1.0&q=85"
    },
    {
      icon: <Heart className="w-8 h-8 text-emerald-600" />,
      title: "Personalized Guidance",
      description: "AI-powered Islamic guidance tailored to your lifestyle and needs",
      image: "https://images.unsplash.com/photo-1576764402988-7143f9cca90a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxRdXJhbnxlbnwwfHx8fDE3NTg3Nzk0MTh8MA&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Church className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Tanbih
              </span>
            </div>
            <Button 
              onClick={() => navigate('/dashboard')}
              data-testid="get-started-btn"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Your Personal
                  <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Islamic Companion
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Stay connected to your faith with personalized guidance, accurate prayer times, 
                  and authentic Islamic knowledge - all in one beautiful app.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/onboarding')}
                  size="lg"
                  data-testid="start-journey-btn"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Start Your Journey
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-full font-semibold text-lg"
                >
                  Explore Features
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Free Forever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Authentic Sources</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Personal AI Guide</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImages[0]} 
                  alt="Beautiful mosque" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating prayer time card */}
              <Card className="absolute -bottom-6 -left-6 w-64 bg-white/95 backdrop-blur-md shadow-xl border border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-gray-800">Next Prayer</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">Maghrib</div>
                  <div className="text-sm text-gray-600">6:42 PM - in 2 hours</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Your Islamic Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and resources to help you maintain your spiritual connection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border border-emerald-100 hover:border-emerald-200 bg-white/80 backdrop-blur-sm">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    {feature.icon}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Strengthen Your Faith?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of Muslims who have made Tanbih part of their daily spiritual routine
          </p>
          <Button 
            onClick={() => navigate('/onboarding')}
            size="lg"
            data-testid="join-now-btn"
            className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Begin Your Journey Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Church className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold">Tanbih</span>
            </div>
            <p className="text-gray-400">
              Your trusted companion for Islamic lifestyle and spiritual growth
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Onboarding Component
const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    mental_wellness: '',
    daily_habits: [],
    location: { city: '', country: '' },
    language_preference: 'english',
    prayer_notifications: true
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API}/users`, formData);
      localStorage.setItem('tanbih_user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="shadow-2xl border border-emerald-100">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Church className="w-8 h-8 text-emerald-600" />
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Welcome to Tanbih
              </CardTitle>
            </div>
            <p className="text-gray-600">Let's personalize your Islamic journey</p>
            <div className="mt-6">
              <Progress value={(step / 4) * 100} className="h-3" />
              <p className="text-sm text-gray-500 mt-2">Step {step} of 4</p>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            {step === 1 && (
              <div className="space-y-6" data-testid="onboarding-step-1">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">What's your name?</Label>
                  <Input
                    id="name"
                    data-testid="name-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="mt-2 h-12"
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold">What's your occupation?</Label>
                  <Select
                    value={formData.occupation}
                    onValueChange={(value) => setFormData({...formData, occupation: value})}
                  >
                    <SelectTrigger data-testid="occupation-select" className="mt-2 h-12">
                      <SelectValue placeholder="Select your occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="business_owner">Business Owner</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="homemaker">Homemaker</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6" data-testid="onboarding-step-2">
                <div>
                  <Label className="text-base font-semibold">How would you describe your current mental wellness?</Label>
                  <Select
                    value={formData.mental_wellness}
                    onValueChange={(value) => setFormData({...formData, mental_wellness: value})}
                  >
                    <SelectTrigger data-testid="wellness-select" className="mt-2 h-12">
                      <SelectValue placeholder="Select your current state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="peaceful">Peaceful & Content</SelectItem>
                      <SelectItem value="stressed">Stressed</SelectItem>
                      <SelectItem value="anxious">Anxious</SelectItem>
                      <SelectItem value="motivated">Motivated</SelectItem>
                      <SelectItem value="seeking_guidance">Seeking Guidance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6" data-testid="onboarding-step-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-base font-semibold">City</Label>
                    <Input
                      id="city"
                      data-testid="city-input"
                      value={formData.location.city}
                      onChange={(e) => setFormData({
                        ...formData, 
                        location: {...formData.location, city: e.target.value}
                      })}
                      placeholder="Enter your city"
                      className="mt-2 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-base font-semibold">Country</Label>
                    <Input
                      id="country"
                      data-testid="country-input"
                      value={formData.location.country}
                      onChange={(e) => setFormData({
                        ...formData, 
                        location: {...formData.location, country: e.target.value}
                      })}
                      placeholder="Enter your country"
                      className="mt-2 h-12"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center" data-testid="onboarding-step-4">
                <div className="space-y-4">
                  <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-gray-900">You're All Set!</h3>
                  <p className="text-gray-600">
                    We've created a personalized experience just for you. Ready to begin your spiritual journey?
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  data-testid="back-btn"
                  className="px-6"
                >
                  Back
                </Button>
              )}
              
              <div className="ml-auto">
                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    data-testid="next-btn"
                    disabled={
                      (step === 1 && (!formData.name || !formData.occupation)) ||
                      (step === 2 && !formData.mental_wellness) ||
                      (step === 3 && (!formData.location.city || !formData.location.country))
                    }
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    data-testid="complete-onboarding-btn"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8"
                  >
                    Complete Setup
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('tanbih_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      loadPrayerTimes(userData.location.city, userData.location.country);
      loadUserTasks(userData.id);
      loadProgress(userData.id);
    }
  }, []);

  const loadPrayerTimes = async (city, country) => {
    try {
      const response = await axios.get(`${API}/prayer-times`, {
        params: { city, country }
      });
      setPrayerTimes(response.data);
    } catch (error) {
      console.error('Error loading prayer times:', error);
    }
  };

  const loadUserTasks = async (userId) => {
    try {
      const response = await axios.get(`${API}/tasks/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const loadProgress = async (userId) => {
    try {
      const response = await axios.get(`${API}/progress/${userId}`);
      setProgress(response.data);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const completeTask = async (taskId, completed) => {
    try {
      await axios.put(`${API}/tasks/complete`, {
        task_id: taskId,
        completed: completed
      });
      
      // Reload tasks and progress
      if (user) {
        loadUserTasks(user.id);
        loadProgress(user.id);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Church className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Welcome to Tanbih</h2>
            <p className="text-gray-600 mb-6">Please complete onboarding to get started</p>
            <Button 
              onClick={() => window.location.href = '/onboarding'}
              data-testid="start-onboarding-btn"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              Start Onboarding
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sidebarItems = [
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard', path: 'dashboard' },
    { icon: <Clock className="w-5 h-5" />, label: 'Prayer Times', path: 'prayer' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Quran', path: 'quran' },
    { icon: <Book className="w-5 h-5" />, label: 'Hadith', path: 'hadith' },
    { icon: <Heart className="w-5 h-5" />, label: 'Duas', path: 'duas' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'AI Assistant', path: 'assistant' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Schedule', path: 'schedule' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: 'settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-white/95 backdrop-blur-md border-r border-emerald-100 shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Church className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Tanbih
            </span>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                data-testid={`nav-${item.path}`}
                className="w-full justify-start space-x-3 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-emerald-100">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50">
              <User className="w-8 h-8 text-emerald-600" />
              <div>
                <div className="font-semibold text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-600">{user.occupation}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
              data-testid="menu-toggle"
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            <div className="flex-1 lg:ml-0 ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Assalamu Alaikum, {user.name}
              </h1>
              <p className="text-gray-600">
                May Allah bless your day
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-8" data-testid="dashboard-content">
          {/* Prayer Times Card */}
          {prayerTimes && (
            <Card className="shadow-lg border border-emerald-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span>Prayer Times - {prayerTimes.city}, {prayerTimes.country}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" data-testid="prayer-times-grid">
                  {[
                    { name: 'Fajr', time: prayerTimes.fajr },
                    { name: 'Sunrise', time: prayerTimes.sunrise },
                    { name: 'Dhuhr', time: prayerTimes.dhuhr },
                    { name: 'Asr', time: prayerTimes.asr },
                    { name: 'Maghrib', time: prayerTimes.maghrib },
                    { name: 'Isha', time: prayerTimes.isha }
                  ].map((prayer, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                      <div className="font-semibold text-gray-800">{prayer.name}</div>
                      <div className="text-lg font-bold text-emerald-600" data-testid={`${prayer.name.toLowerCase()}-time`}>
                        {prayer.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Today's Tasks */}
            <Card className="shadow-lg border border-emerald-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Today's Tasks</span>
                  <Badge variant="secondary" data-testid="tasks-count">
                    {tasks.filter(t => !t.completed).length} remaining
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-3" data-testid="tasks-list">
                    {tasks.slice(0, 8).map((task, index) => (
                      <div 
                        key={task.id} 
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                          task.completed 
                            ? 'bg-emerald-50 border-emerald-200' 
                            : 'bg-white border-gray-200 hover:border-emerald-300'
                        }`}
                        data-testid={`task-${index}`}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => completeTask(task.id, !task.completed)}
                          data-testid={`task-toggle-${index}`}
                          className="p-1"
                        >
                          <CheckCircle 
                            className={`w-5 h-5 ${
                              task.completed ? 'text-emerald-600' : 'text-gray-300'
                            }`} 
                          />
                        </Button>
                        <div className="flex-1">
                          <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </div>
                          <div className="text-sm text-gray-600">{task.description}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            {progress && (
              <Card className="shadow-lg border border-emerald-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div data-testid="completion-rate">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Completion Rate</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {progress.completion_rate}%
                      </span>
                    </div>
                    <Progress value={progress.completion_rate} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-emerald-50">
                      <div className="text-2xl font-bold text-emerald-600" data-testid="completed-tasks">
                        {progress.completed_tasks}
                      </div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gray-50">
                      <div className="text-2xl font-bold text-gray-600" data-testid="total-tasks">
                        {progress.total_tasks}
                      </div>
                      <div className="text-sm text-gray-600">Total Tasks</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Daily Tasks</span>
                      <span className="font-semibold" data-testid="daily-tasks">
                        {progress.daily_tasks}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Tasks</span>
                      <span className="font-semibold" data-testid="weekly-tasks">
                        {progress.weekly_tasks}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Streak</span>
                      <span className="font-semibold text-emerald-600" data-testid="streak-days">
                        {progress.streak_days} days
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Actions */}
          <Card className="shadow-lg border border-emerald-100 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <BookOpen className="w-6 h-6" />, label: 'Read Quran', color: 'emerald' },
                  { icon: <MessageCircle className="w-6 h-6" />, label: 'Ask AI', color: 'blue' },
                  { icon: <Heart className="w-6 h-6" />, label: 'Daily Duas', color: 'rose' },
                  { icon: <Plus className="w-6 h-6" />, label: 'Add Task', color: 'purple' }
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    data-testid={`quick-action-${index}`}
                    className="h-20 flex-col space-y-2 hover:shadow-md transition-shadow"
                  >
                    {action.icon}
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;