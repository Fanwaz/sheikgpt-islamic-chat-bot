
import { ThemeToggle } from './ThemeToggle';
import { Moon } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border transition-all duration-300 ease-in-out">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2 transition-all duration-300 ease-in-out">
          <Moon className="h-7 w-7 text-teal animate-float" />
          <h1 className="text-xl font-bold tracking-tight">Sheik GPT</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 ease-in-out">
            <span className="font-medium text-sm">AW</span>
          </button>
        </div>
      </div>
    </header>
  );
};
