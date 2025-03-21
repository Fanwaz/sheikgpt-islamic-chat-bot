
import { ThemeToggle } from './ThemeToggle';
import { Moon, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border transition-all duration-300 ease-in-out">
      <div className="container flex h-14 md:h-16 items-center justify-between px-3 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-1 md:gap-2 transition-all duration-300 ease-in-out">
          <Moon className="h-6 w-6 md:h-7 md:w-7 text-teal animate-float" />
          <h1 className="text-lg md:text-xl font-bold tracking-tight">Sheik GPT</h1>
        </Link>
        
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 ease-in-out">
                  <span className="font-medium text-xs md:text-sm">{user.initials}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="text-muted-foreground" disabled>
                  {user.name}
                </DropdownMenuItem>
                <Link to="/settings">
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1 md:gap-2">
              <Link to="/signin">
                <Button variant="ghost" size="sm" className="text-xs md:text-sm px-2 md:px-3">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="text-xs md:text-sm px-2 md:px-3">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
