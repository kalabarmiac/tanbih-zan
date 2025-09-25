import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar, CheckCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SchedulePage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
      const savedUser = localStorage.getItem('tanbih_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        loadUserTasks(userData.id);
      }
    }, []);

    const loadUserTasks = async (userId) => {
      try {
        const response = await axios.get(`${API}/tasks/${userId}`);
        setTasks(response.data || []);
      } catch (error) {
        console.error('Error loading tasks:', error);
        toast.error('Failed to load tasks');
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
          }
        } catch (error) {
          console.error('Error completing task:', error);
          toast.error('Failed to update task');
        }
      };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    }

    const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
    const calendarDays = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    const tasksForSelectedDate = tasks.filter(task => {
        if (!task.created_at) return false;
        const taskDate = new Date(task.created_at);
        return taskDate.toDateString() === selectedDate.toDateString();
    });

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Schedule</h2>
          <p className="text-gray-600">Your Islamic calendar and tasks</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar View */}
            <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <Button variant="ghost" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>Prev</Button>
                        <CardTitle className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-emerald-600" />
                            <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </CardTitle>
                        <Button variant="ghost" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>Next</Button>
                    </div>
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
                    {calendarDays.map((day, i) => {
                        const date = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
                        const isToday = date?.toDateString() === new Date().toDateString();
                        const isSelected = date?.toDateString() === selectedDate.toDateString();

                        return (
                        <div
                            key={i}
                            onClick={() => day && setSelectedDate(date)}
                            className={`
                            p-2 h-16 flex items-center justify-center text-sm rounded-lg cursor-pointer
                            ${isSelected ? 'bg-emerald-600 text-white font-bold' : ''}
                            ${!day ? 'bg-transparent' : ''}
                            ${isToday && !isSelected ? 'bg-emerald-100' : ''}
                            ${day && !isSelected ? 'hover:bg-emerald-50' : ''}
                            `}
                        >
                            {day}
                        </div>
                        );
                    })}
                    </div>
                </CardContent>
            </Card>

            {/* Tasks for Selected Date */}
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Tasks for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                {tasksForSelectedDate.length > 0 ? tasksForSelectedDate.map((task) => (
                    <div key={task.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                        <Button variant="ghost" size="sm" onClick={() => completeTask(task.id, !task.completed)}>
                            <CheckCircle
                                className={`w-5 h-5 ${task.completed ? 'text-emerald-600' : 'text-gray-300'}`}
                            />
                        </Button>
                        <div className={task.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                            {task.title}
                        </div>
                    </div>
                )) : (
                    <p className="text-gray-500">No tasks for this day.</p>
                )}
                </CardContent>
            </Card>
        </div>
      </div>
    );
  };

  export default SchedulePage;