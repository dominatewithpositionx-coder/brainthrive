'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

type NotificationSettings = {
  parent_email: string;
  reward_notifications: boolean;
  weekly_summary: boolean;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 🧠 Get logged-in user's email
  async function fetchUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error('⚠️ No logged-in user:', error);
      toast.error('You must be logged in to manage settings.');
      setLoading(false);
      return;
    }

    setUserEmail(user.email || null);
    await fetchSettings(user.email!);
  }

  // 🧠 Fetch or create settings for this user
  async function fetchSettings(email: string) {
    const { data, error } = await supabase
      .from('notification_settings')
      .select('*')
      .eq('parent_email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching settings:', error);
      toast.error('Error loading settings.');
    }

    if (!data) {
      // Create default settings for new users
      const { data: newSettings, error: insertError } = await supabase
        .from('notification_settings')
        .insert([{ parent_email: email }])
        .select()
        .single();

      if (insertError) {
        console.error('Error creating settings:', insertError);
        toast.error('Could not create settings record.');
      } else {
        setSettings(newSettings);
      }
    } else {
      setSettings(data);
    }

    setLoading(false);
  }

  // 💾 Update setting toggle
  async function updateSetting(field: keyof NotificationSettings, value: boolean) {
    if (!userEmail) return;

    const { error } = await supabase
      .from('notification_settings')
      .update({ [field]: value })
      .eq('parent_email', userEmail);

    if (error) {
      console.error('Error updating setting:', error);
      toast.error('Failed to update settings.');
    } else {
      setSettings((prev) => (prev ? { ...prev, [field]: value } : prev));
      toast.success('Settings updated!');
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p className="p-6">Loading settings...</p>;

  if (!userEmail)
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">
          Please <a href="/login" className="underline text-blue-600">log in</a> to access your settings.
        </p>
      </div>
    );

  return (
    <div className="p-6 max-w-lg space-y-6">
      <h1 className="text-2xl font-bold mb-4">Notification Settings</h1>
      <p className="text-gray-600 mb-4">
        Manage when BrainThrive sends you email updates and progress reports.
      </p>

      <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center">
          <span>🎁 Reward Redemption Notifications</span>
          <input
            type="checkbox"
            checked={settings?.reward_notifications ?? false}
            onChange={(e) => updateSetting('reward_notifications', e.target.checked)}
            className="w-5 h-5 accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="flex justify-between items-center">
          <span>📅 Weekly Summary Emails</span>
          <input
            type="checkbox"
            checked={settings?.weekly_summary ?? false}
            onChange={(e) => updateSetting('weekly_summary', e.target.checked)}
            className="w-5 h-5 accent-blue-600 cursor-pointer"
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 pt-4 border-t">
        Logged in as <span className="font-medium text-gray-700">{userEmail}</span>
      </div>
    </div>
  );
}
