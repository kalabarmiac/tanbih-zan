import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, Book, MessageCircle, User, Menu, X, Church, BookOpen, Heart, BarChart3, CheckCircle, Plus, Settings, Send, Copy, Search, Play, Pause, ChevronLeft, ChevronRight, Star, Volume2 } from 'lucide-react';
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
import { Textarea } from './components/ui/textarea';
import { Switch } from './components/ui/switch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Notification helper
const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

const showNotification = (title, body, icon = null) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/favicon.ico',
      badge: '/favicon.ico'
    });
  }
};

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
              onClick={() => navigate('/onboarding')}
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
      
      // Request notification permission
      await requestNotificationPermission();
      
      toast.success('Welcome to Tanbih! Your spiritual journey begins now.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create account. Please try again.');
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
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.prayer_notifications}
                    onCheckedChange={(checked) => setFormData({...formData, prayer_notifications: checked})}
                  />
                  <Label>Enable prayer time notifications</Label>
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

// Main App Layout with Navigation
const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('tanbih_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const sidebarItems = [
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Clock className="w-5 h-5" />, label: 'Prayer Times', path: '/prayer-times' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Quran', path: '/quran' },
    { icon: <Book className="w-5 h-5" />, label: 'Hadith', path: '/hadith' },
    { icon: <Heart className="w-5 h-5" />, label: 'Duas', path: '/duas' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'AI Assistant', path: '/ai-assistant' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Schedule', path: '/schedule' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' }
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
              <Link
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
                data-testid={`nav-${item.path.replace('/', '')}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {user && (
            <div className="mt-8 pt-6 border-t border-emerald-100">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50">
                <User className="w-8 h-8 text-emerald-600" />
                <div>
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.occupation}</div>
                </div>
              </div>
            </div>
          )}
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
                {user ? `Assalamu Alaikum, ${user.name}` : 'Welcome to Tanbih'}
              </h1>
              <p className="text-gray-600">
                May Allah bless your day
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

// Dashboard Page
const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
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
      
      toast.success(completed ? 'Task completed! 🎉' : 'Task marked incomplete');
      
      if (user) {
        loadUserTasks(user.id);
        loadProgress(user.id);
      }
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error('Failed to update task');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-96">
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

  return (
    <div className="space-y-8" data-testid="dashboard-content">
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
              { icon: <BookOpen className="w-6 h-6" />, label: 'Read Quran', path: '/quran' },
              { icon: <MessageCircle className="w-6 h-6" />, label: 'Ask AI', path: '/ai-assistant' },
              { icon: <Heart className="w-6 h-6" />, label: 'Daily Duas', path: '/duas' },
              { icon: <Clock className="w-6 h-6" />, label: 'Prayer Times', path: '/prayer-times' }
            ].map((action, index) => (
              <Link key={index} to={action.path}>
                <Button
                  variant="outline"
                  data-testid={`quick-action-${index}`}
                  className="h-20 w-full flex-col space-y-2 hover:shadow-md transition-shadow"
                >
                  {action.icon}
                  <span className="text-sm">{action.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Prayer Times Page
const PrayerTimesPage = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('tanbih_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      loadPrayerTimes(userData.location.city, userData.location.country);
    }
  }, []);

  const loadPrayerTimes = async (city, country) => {
    try {
      const response = await axios.get(`${API}/prayer-times`, {
        params: { city, country }
      });
      setPrayerTimes(response.data);
      
      // Setup prayer notifications
      if (notifications && 'Notification' in window) {
        setupPrayerNotifications(response.data);
      }
    } catch (error) {
      console.error('Error loading prayer times:', error);
      toast.error('Failed to load prayer times');
    }
  };

  const setupPrayerNotifications = (times) => {
    const prayers = [
      { name: 'Fajr', time: times.fajr },
      { name: 'Dhuhr', time: times.dhuhr },
      { name: 'Asr', time: times.asr },
      { name: 'Maghrib', time: times.maghrib },
      { name: 'Isha', time: times.isha }
    ];

    prayers.forEach(prayer => {
      const [hours, minutes] = prayer.time.split(':');
      const prayerDate = new Date();
      prayerDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      const now = new Date();
      let timeUntilPrayer = prayerDate.getTime() - now.getTime();
      
      if (timeUntilPrayer < 0) {
        // Prayer time has passed, schedule for next day
        prayerDate.setDate(prayerDate.getDate() + 1);
        timeUntilPrayer = prayerDate.getTime() - now.getTime();
      }

      // Schedule notification 5 minutes before prayer
      const notificationTime = timeUntilPrayer - (5 * 60 * 1000);
      
      if (notificationTime > 0) {
        setTimeout(() => {
          showNotification(
            `${prayer.name} Prayer Reminder`,
            `${prayer.name} prayer time is in 5 minutes (${prayer.time})`
          );
        }, notificationTime);
      }
    });
  };

  const toggleNotifications = async () => {
    if (!notifications) {
      const permitted = await requestNotificationPermission();
      if (permitted) {
        setNotifications(true);
        toast.success('Prayer notifications enabled');
        if (prayerTimes) {
          setupPrayerNotifications(prayerTimes);
        }
      } else {
        toast.error('Please enable notifications in your browser');
      }
    } else {
      setNotifications(false);
      toast.info('Prayer notifications disabled');
    }
  };

  if (!user) {
    return (
      <Card className="w-96 mx-auto">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600 mb-4">Please complete onboarding first</p>
          <Button onClick={() => window.location.href = '/onboarding'}>
            Go to Onboarding
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Prayer Times</h2>
          <p className="text-gray-600">{user.location.city}, {user.location.country}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={notifications}
            onCheckedChange={toggleNotifications}
          />
          <Label>Notifications</Label>
        </div>
      </div>

      {prayerTimes ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Fajr', time: prayerTimes.fajr, desc: 'Dawn Prayer' },
            { name: 'Sunrise', time: prayerTimes.sunrise, desc: 'Sunrise' },
            { name: 'Dhuhr', time: prayerTimes.dhuhr, desc: 'Noon Prayer' },
            { name: 'Asr', time: prayerTimes.asr, desc: 'Afternoon Prayer' },
            { name: 'Maghrib', time: prayerTimes.maghrib, desc: 'Sunset Prayer' },
            { name: 'Isha', time: prayerTimes.isha, desc: 'Night Prayer' }
          ].map((prayer, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{prayer.name}</h3>
                <div className="text-3xl font-bold text-emerald-600 mb-2">{prayer.time}</div>
                <p className="text-gray-600">{prayer.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Loading prayer times...</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Quran Page
const QuranPage = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSurahs();
  }, []);

  const loadSurahs = async () => {
    try {
      const response = await axios.get(`${API}/quran/surahs`);
      setSurahs(response.data.data || []);
    } catch (error) {
      console.error('Error loading surahs:', error);
      toast.error('Failed to load Quran chapters');
    }
  };

  const loadSurah = async (surahNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/quran/surah/${surahNumber}`);
      setSurahData(response.data.data);
      setSelectedSurah(surahNumber);
    } catch (error) {
      console.error('Error loading surah:', error);
      toast.error('Failed to load Surah');
    }
    setLoading(false);
  };

  const copyVerse = (arabic, english) => {
    const text = `${arabic}\n\n${english}`;
    navigator.clipboard.writeText(text);
    toast.success('Verse copied to clipboard');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Holy Quran</h2>
          <p className="text-gray-600">Read and reflect upon Allah's words</p>
        </div>
        {selectedSurah && (
          <Button
            variant="outline"
            onClick={() => {
              setSelectedSurah(null);
              setSurahData(null);
            }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Chapters
          </Button>
        )}
      </div>

      {!selectedSurah ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {surahs.map((surah) => (
            <Card 
              key={surah.number}
              className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm"
              onClick={() => loadSurah(surah.number)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                    {surah.number}
                  </div>
                  <Badge variant={surah.revelationType === 'Meccan' ? 'default' : 'secondary'}>
                    {surah.revelationType}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{surah.englishName}</h3>
                <p className="text-2xl font-arabic text-emerald-600 mb-2">{surah.name}</p>
                <p className="text-gray-600 text-sm">{surah.englishNameTranslation}</p>
                <p className="text-gray-500 text-sm mt-2">{surah.numberOfAyahs} verses</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : loading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Loading Surah...</p>
          </CardContent>
        </Card>
      ) : surahData ? (
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl font-bold mb-2">{surahData.englishName}</h1>
              <p className="text-3xl font-arabic mb-2">{surahData.name}</p>
              <p className="text-emerald-100">{surahData.englishNameTranslation}</p>
              <div className="flex justify-center items-center space-x-4 mt-4 text-sm">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {surahData.revelationType}
                </Badge>
                <span>{surahData.numberOfAyahs} Verses</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {surahData.ayahs.map((ayah) => (
              <Card key={ayah.number} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline">{ayah.numberInSurah}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyVerse(ayah.arabic, ayah.english)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <p className="text-2xl font-arabic text-right leading-loose text-gray-900">
                      {ayah.arabic}
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {ayah.english}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

// Hadith Page
const HadithPage = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [hadithData, setHadithData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const response = await axios.get(`${API}/hadith/collections`);
      setCollections(response.data.collections || []);
    } catch (error) {
      console.error('Error loading collections:', error);
      toast.error('Failed to load Hadith collections');
    }
  };

  const loadHadith = async (collectionName) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/hadith/${collectionName}?page=1&limit=20`);
      setHadithData(response.data);
      setSelectedCollection(collectionName);
    } catch (error) {
      console.error('Error loading hadith:', error);
      toast.error('Failed to load Hadith');
    }
    setLoading(false);
  };

  const copyHadith = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Hadith copied to clipboard');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Hadith Collections</h2>
          <p className="text-gray-600">Authentic sayings and traditions of Prophet Muhammad ﷺ</p>
        </div>
        {selectedCollection && (
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCollection(null);
              setHadithData(null);
            }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Collections
          </Button>
        )}
      </div>

      {!selectedCollection ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Card
              key={collection.name}
              className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm"
              onClick={() => loadHadith(collection.name)}
            >
              <CardContent className="p-6 text-center">
                <Book className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{collection.title}</h3>
                <p className="text-gray-600">Authentic Hadith Collection</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : loading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Loading Hadith...</p>
          </CardContent>
        </Card>
      ) : hadithData ? (
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <CardContent className="p-8 text-center">
              <h1 className="text-3xl font-bold mb-2">
                {collections.find(c => c.name === selectedCollection)?.title}
              </h1>
              <p className="text-emerald-100">Authentic Hadith Collection</p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {hadithData.hadiths?.map((hadith, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline">Hadith {index + 1}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyHadith(hadith.text || hadith.english)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {hadith.arabic && (
                      <p className="text-xl font-arabic text-right leading-loose text-gray-900">
                        {hadith.arabic}
                      </p>
                    )}
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {hadith.text || hadith.english}
                    </p>
                    {hadith.narrator && (
                      <p className="text-sm text-gray-500 italic">
                        Narrator: {hadith.narrator}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )) || (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">No hadith available for this collection</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

// Duas Page
const DuasPage = () => {
  const [duas, setDuas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadDuas();
  }, []);

  const loadDuas = async () => {
    try {
      const response = await axios.get(`${API}/duas`);
      setDuas(response.data.duas || []);
    } catch (error) {
      console.error('Error loading duas:', error);
      toast.error('Failed to load Duas');
    }
  };

  const copyDua = (arabic, english, transliteration) => {
    const text = `${arabic}\n\n${english}\n\nTransliteration: ${transliteration}`;
    navigator.clipboard.writeText(text);
    toast.success('Dua copied to clipboard');
  };

  const categories = ['all', 'daily', 'emotional', 'worship'];
  const filteredDuas = selectedCategory === 'all' 
    ? duas 
    : duas.filter(dua => dua.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Islamic Duas</h2>
        <p className="text-gray-600">Supplications and prayers for daily life</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDuas.map((dua) => (
          <Card key={dua.id} className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-gray-900">{dua.title}</CardTitle>
                <div className="flex space-x-2">
                  <Badge variant="secondary" className="capitalize">
                    {dua.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyDua(dua.arabic, dua.english, dua.transliteration)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl font-arabic text-right leading-loose text-gray-900 p-4 bg-emerald-50 rounded-lg">
                {dua.arabic}
              </div>
              <div className="space-y-2">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Translation:</strong> {dua.english}
                </p>
                <p className="text-sm text-gray-600 italic">
                  <strong>Transliteration:</strong> {dua.transliteration}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// AI Assistant Page
const AIAssistantPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('tanbih_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Add welcome message
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: 'Assalamu Alaikum! I am your Islamic AI assistant. I can help you with questions about Islam, Quran, Hadith, and provide guidance on Islamic practices. How can I assist you today?',
        timestamp: new Date()
      }
    ]);
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/ai-assistant`, {
        question: inputMessage,
        user_id: user?.id
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.data.answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I\'m currently unable to process your question. Please try again later or consult with a local Islamic scholar.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Islamic AI Assistant</h2>
        <p className="text-gray-600">Get answers to your Islamic questions from authentic sources</p>
      </div>

      <Card className="h-96 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-4 rounded-lg">
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-6 border-t">
            <div className="flex space-x-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Islam, Quran, Hadith, or Islamic practices..."
                className="flex-1 resize-none"
                rows={1}
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !inputMessage.trim()}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Questions:</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              "What are the 5 pillars of Islam?",
              "How do I perform Wudu correctly?",
              "What is the significance of Ramadan?",
              "How should I make Dua?",
              "What are the benefits of reading Quran?",
              "How can I be a better Muslim?"
            ].map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left justify-start h-auto p-3 text-sm"
                onClick={() => setInputMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Schedule Page
const SchedulePage = () => {
  const [currentDate] = useState(new Date());

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">My Schedule</h2>
        <p className="text-gray-600">Your Islamic calendar and reminders</p>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6);
              const isToday = date.toDateString() === new Date().toDateString();
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              
              return (
                <div
                  key={i}
                  className={`
                    p-2 h-12 flex items-center justify-center text-sm rounded-lg
                    ${isToday ? 'bg-emerald-600 text-white font-bold' : ''}
                    ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                    ${!isToday && isCurrentMonth ? 'hover:bg-emerald-50' : ''}
                  `}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Upcoming Islamic Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Jummah Prayer', date: 'Friday', time: '1:00 PM' },
              { name: 'Islamic Study Circle', date: 'Saturday', time: '7:00 PM' },
              { name: 'Community Iftar', date: 'Next Week', time: 'TBD' }
            ].map((event, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-semibold text-gray-900">{event.name}</div>
                  <div className="text-sm text-gray-600">{event.date} at {event.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Daily Reminders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { task: 'Morning Dhikr', completed: true },
              { task: 'Read Quran (10 minutes)', completed: false },
              { task: 'Evening Dhikr', completed: false },
              { task: 'Istighfar before sleep', completed: false }
            ].map((reminder, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <CheckCircle 
                  className={`w-5 h-5 ${reminder.completed ? 'text-emerald-600' : 'text-gray-300'}`}
                />
                <div className={reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                  {reminder.task}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Settings Page
const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    prayerNotifications: true,
    dailyReminders: true,
    weeklyGoals: true,
    soundEnabled: true
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('tanbih_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success('Settings updated');
  };

  const signOut = () => {
    localStorage.removeItem('tanbih_user');
    window.location.href = '/';
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your app preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <Input value={user.name} readOnly className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Occupation</Label>
                  <Input value={user.occupation} readOnly className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">City</Label>
                  <Input value={user.location?.city || ''} readOnly className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Country</Label>
                  <Input value={user.location?.country || ''} readOnly className="mt-1" />
                </div>
              </div>
            )}
            <Button variant="outline">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Prayer Time Notifications</Label>
                <p className="text-sm text-gray-600">Get notified before each prayer time</p>
              </div>
              <Switch
                checked={settings.prayerNotifications}
                onCheckedChange={(checked) => updateSetting('prayerNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Daily Reminders</Label>
                <p className="text-sm text-gray-600">Receive daily Islamic reminders</p>
              </div>
              <Switch
                checked={settings.dailyReminders}
                onCheckedChange={(checked) => updateSetting('dailyReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Weekly Goals</Label>
                <p className="text-sm text-gray-600">Get weekly spiritual goal suggestions</p>
              </div>
              <Switch
                checked={settings.weeklyGoals}
                onCheckedChange={(checked) => updateSetting('weeklyGoals', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Sound Enabled</Label>
                <p className="text-sm text-gray-600">Play notification sounds</p>
              </div>
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>App Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-base font-medium">Language</Label>
              <Select defaultValue="english">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="arabic">العربية</SelectItem>
                  <SelectItem value="urdu">اردو</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Prayer Calculation Method</Label>
              <Select defaultValue="isna">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="isna">Islamic Society of North America</SelectItem>
                  <SelectItem value="mwl">Muslim World League</SelectItem>
                  <SelectItem value="egypt">Egyptian General Authority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Export My Data
            </Button>
            <Button variant="destructive" onClick={signOut} className="w-full">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
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