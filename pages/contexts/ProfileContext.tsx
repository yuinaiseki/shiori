// pages/contexts/ProfileContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, Profile } from '../../config/supabase';

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // For demo purposes, we'll use a mock user ID
  // In production, get this from Supabase auth
  const DEMO_USER_ID = 'demo-user-123';

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      
      // Try to fetch profile from Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', DEMO_USER_ID)
        .single();

      if (error) {
        // If profile doesn't exist, create a default one
        if (error.code === 'PGRST116') {
          await createDefaultProfile();
        } else {
          console.error('Error loading profile:', error);
        }
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in loadProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultProfile = async () => {
    const defaultProfile: Profile = {
      id: DEMO_USER_ID,
      username: 'BookLover',
      avatar_url: null,
      bio: 'Passionate reader exploring new worlds through books 📚',
      created_at: new Date().toISOString(),
      aesthetic_colors: [],
    };

    const { data, error } = await supabase
      .from('profiles')
      .insert([defaultProfile])
      .select()
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', DEMO_USER_ID)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in updateProfile:', error);
      throw error;
    }
  };

  const refreshProfile = async () => {
    await loadProfile();
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, updateProfile, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};