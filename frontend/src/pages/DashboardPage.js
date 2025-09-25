import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ScrollArea } from '../components/ui/scroll-area';
import { Clock, CheckCircle, BookOpen, MessageCircle, Heart, Church } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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

  export default DashboardPage;