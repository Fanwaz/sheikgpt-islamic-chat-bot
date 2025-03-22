
import { History, PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-dark border-b border-dark-secondary">
      <div className="flex h-14 items-center justify-between px-4">
        <Link to="/history">
          <Button variant="ghost" size="icon" className="text-white">
            <History className="h-5 w-5" />
          </Button>
        </Link>
        
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-medium text-white">Sheik GPT</h1>
          <span className="bg-dark-secondary text-xs px-2 py-0.5 rounded text-muted-foreground">beta</span>
        </div>
        
        <Button variant="ghost" size="icon" className="text-white">
          <PenSquare className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
