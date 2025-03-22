
import { useState } from 'react';
import { X, Search, MoreVertical, User, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

interface HistoryItem {
  id: string;
  question: string;
  date: string;
}

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get history from local storage
  const getHistoryFromStorage = (): HistoryItem[] => {
    if (!user) return [];
    const savedHistory = localStorage.getItem(`history_${user.id}`);
    return savedHistory ? JSON.parse(savedHistory) : [];
  };
  
  const history = getHistoryFromStorage();
  
  // Filter history based on search term
  const filteredHistory = history.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group history by day
  const groupedHistory: Record<string, HistoryItem[]> = {};
  
  filteredHistory.forEach(item => {
    const date = new Date(item.date);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    if (!groupedHistory[day]) {
      groupedHistory[day] = [];
    }
    
    groupedHistory[day].push(item);
  });
  
  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
  
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="p-4 flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white" 
          onClick={() => navigate('/')}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Sheik History"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 bg-dark-input text-white focus:outline-none rounded-full"
          />
        </div>
      </div>
      
      {/* Divider */}
      <div className="border-b border-gray-800 w-full" />
      
      {/* History list */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="px-4 py-3 text-sm text-gray-400">Conversations</h2>
        
        {Object.keys(groupedHistory).length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-400">
            No conversations yet
          </div>
        ) : (
          Object.entries(groupedHistory).map(([day, items]) => (
            <div key={day}>
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="px-4 py-3 flex justify-between hover:bg-gray-900"
                  onClick={() => navigate('/')}
                >
                  <div className="flex-1">
                    <p className="text-white mb-1">{item.question}</p>
                    <p className="text-xs text-gray-400">{day}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      
      {/* Bottom navigation */}
      <div className="border-t border-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <User className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>
          <span className="text-white font-medium">
            {user?.displayName || "Guest"}
          </span>
        </div>
        
        <Link to="/settings">
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default History;
