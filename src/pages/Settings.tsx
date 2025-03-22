
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon, LogOut, ArrowLeft, Upload } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut, updateProfilePicture } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate('/signin');
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await updateProfilePicture(file);
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Could not update profile picture. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen pattern-bg flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto bg-background/80 backdrop-blur-md rounded-xl border border-border shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">Settings</h1>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Account</h2>
              {user && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-background">
                        {user.profileUrl ? (
                          <AvatarImage src={user.profileUrl} alt={user.name} />
                        ) : (
                          <AvatarFallback className="text-xl">{user.initials}</AvatarFallback>
                        )}
                      </Avatar>
                      <Label 
                        htmlFor="profile-upload" 
                        className="absolute -bottom-1 -right-1 bg-primary hover:bg-primary/90 text-primary-foreground p-1 rounded-full cursor-pointer"
                      >
                        <Upload className="h-3.5 w-3.5" />
                      </Label>
                      <Input 
                        id="profile-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploading}
                      />
                    </div>
                    <div>
                      <p><span className="text-muted-foreground">Name:</span> {user.name}</p>
                      <p><span className="text-muted-foreground">Email:</span> {user.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Appearance</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor="theme-toggle">Dark Mode</Label>
                  <Moon className="h-5 w-5 text-muted-foreground" />
                </div>
                <Switch 
                  id="theme-toggle" 
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <Button
                variant="destructive"
                className="flex gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
