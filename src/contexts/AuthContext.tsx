
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  profileUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfilePicture: (file: File) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock signup function
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object with mock data
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        initials: name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signin function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll create a mock user
      const mockUser: User = {
        id: '123456',
        name: 'Demo User',
        email,
        initials: 'DU'
      };
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signout function
  const signOut = async () => {
    setIsLoading(true);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove from localStorage
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Signout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to update profile picture
  const updateProfilePicture = async (file: File) => {
    setIsLoading(true);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Convert file to base64 for storage in localStorage
      const reader = new FileReader();
      
      const profileUrlPromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert image to base64'));
          }
        };
        reader.onerror = reject;
      });
      
      reader.readAsDataURL(file);
      const profileUrl = await profileUrlPromise;
      
      if (user) {
        const updatedUser = { ...user, profileUrl };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      signUp, 
      signIn, 
      signOut,
      updateProfilePicture 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
