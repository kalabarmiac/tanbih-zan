import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Clock, BookOpen, Heart, CheckCircle, Church } from 'lucide-react';

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

export default LandingPage;