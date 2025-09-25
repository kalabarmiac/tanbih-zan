import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../components/ui/dialog';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SettingsPage = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState(null);
    const [settings, setSettings] = useState({
      prayerNotifications: true,
      dailyReminders: true,
      weeklyGoals: true,
      soundEnabled: true
    });

    useEffect(() => {
      const savedUser = localStorage.getItem('tanbih_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        setUser(userData);
        setFormData(userData);
      }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, location: {...prev.location, [name]: value}}));
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({...prev, [name]: value}));
    }

    const updateSetting = (key, value) => {
      setSettings(prev => ({ ...prev, [key]: value }));
      toast.success('Settings updated');
    };

    const handleProfileUpdate = async () => {
        if (!user || !formData) return;
        try {
            const response = await axios.put(`${API}/users/${user.id}`, formData);
            localStorage.setItem('tanbih_user', JSON.stringify(response.data));
            setUser(response.data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        }
    }

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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  {formData && (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="occupation" className="text-right">Occupation</Label>
                        <Select name="occupation" value={formData.occupation} onValueChange={(value) => handleSelectChange('occupation', value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select occupation" />
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="city" className="text-right">City</Label>
                        <Input id="city" name="city" value={formData.location.city} onChange={handleLocationChange} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="country" className="text-right">Country</Label>
                        <Input id="country" name="country" value={formData.location.country} onChange={handleLocationChange} className="col-span-3" />
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={() => {
                        handleProfileUpdate();
                    }}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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

  export default SettingsPage;