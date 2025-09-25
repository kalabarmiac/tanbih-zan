import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { Switch } from '../components/ui/switch';
import { Church, CheckCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

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

  export default OnboardingPage;