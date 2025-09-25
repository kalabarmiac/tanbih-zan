import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Clock } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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

  export default PrayerTimesPage;