
import { useState } from 'react';
import { History, X, AlignJustify, Search, Compass, Settings as SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface HistoryItem {
  id: string;
  question: string;
  date: string;
}

interface HistorySidebarProps {
  history: HistoryItem[];
  onSelectQuestion: (id: string) => void;
}

export const HistorySidebar = ({ history, onSelectQuestion }: HistorySidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  // Mobile bottom navigation
  if (isMobile) {
    return (
      <>
        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
          <div className="flex justify-around items-center h-16">
            <button 
              className="flex flex-col items-center justify-center text-primary w-1/4 py-2"
              onClick={toggleSidebar}
            >
              <Search className="h-5 w-5 mb-1" />
              <span className="text-[10px]">Explore</span>
            </button>
            
            <button 
              className="flex flex-col items-center justify-center w-1/4 py-2"
              onClick={toggleSidebar}
            >
              <History className="h-5 w-5 mb-1" />
              <span className="text-[10px]">History</span>
            </button>
            
            <button className="flex flex-col items-center justify-center w-1/4 py-2">
              <Compass className="h-5 w-5 mb-1" />
              <span className="text-[10px]">Discover</span>
            </button>
            
            <Link to="/settings" className="flex flex-col items-center justify-center w-1/4 py-2">
              <SettingsIcon className="h-5 w-5 mb-1" />
              <span className="text-[10px]">Settings</span>
            </Link>
          </div>
        </div>

        {/* History Sidebar (will slide in) */}
        <div
          className={`fixed top-0 bottom-16 left-0 w-full bg-card shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold flex items-center">
                <History className="h-4 w-4 mr-2" /> Question History
              </h2>
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md hover:bg-muted transition-colors"
                aria-label="Close History"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {history.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  No questions yet
                </div>
              ) : (
                <ul className="space-y-1">
                  {history.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          onSelectQuestion(item.id);
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors truncate block"
                      >
                        <div className="text-xs text-muted-foreground mb-1">
                          {formatDate(item.date)}
                        </div>
                        <div className="truncate">{item.question}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop version
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-20 left-6 z-50 p-2 bg-card border border-border text-foreground rounded-md shadow-sm hover:bg-muted transition-all duration-300 hidden md:flex"
        aria-label="Toggle History"
      >
        <AlignJustify className="h-5 w-5" />
      </button>

      <div
        className={`fixed top-0 bottom-0 left-0 w-72 bg-card border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:${isOpen ? 'w-72' : 'w-0 opacity-0'}`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold flex items-center">
              <History className="h-4 w-4 mr-2" /> Question History
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-muted transition-colors"
              aria-label="Close History"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {history.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">
                No questions yet
              </div>
            ) : (
              <ul className="space-y-1">
                {history.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onSelectQuestion(item.id);
                        if (window.innerWidth < 768) {
                          setIsOpen(false);
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors truncate block"
                    >
                      <div className="text-xs text-muted-foreground mb-1">
                        {formatDate(item.date)}
                      </div>
                      <div className="truncate">{item.question}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
