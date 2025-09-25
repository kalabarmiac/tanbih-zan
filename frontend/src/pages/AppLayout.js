import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { User, Menu, Church, BarChart3, Clock, BookOpen, Book, Heart, MessageCircle, Calendar, Settings } from 'lucide-react';

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

  export default AppLayout;