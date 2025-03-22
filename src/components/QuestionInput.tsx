
import { useState } from 'react';
import { Send, Plus, Search, Lightbulb } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

export const QuestionInput = ({ onSubmit, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState('');
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question);
      setQuestion('');
    }
  };

  return (
    <div className="w-full px-4 py-3 bg-dark border-t border-dark-secondary">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
            className="w-full bg-dark-input text-white rounded-full px-4 py-3 pr-12 focus:outline-none"
            aria-label="Question Input"
          />
          
          <button
            type="submit"
            disabled={!question.trim() || isLoading}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
              !question.trim() || isLoading ? 'text-muted-foreground' : 'text-white'
            }`}
            aria-label="Submit Question"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex justify-center mt-3 space-x-3">
          <Button variant="ghost" size="circle-sm" className="bg-dark-secondary text-white">
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="circle-sm" className="bg-dark-secondary text-white">
            <Search className="h-5 w-5" />
            <span className="ml-1 text-xs">DeepSearch</span>
          </Button>
          <Button variant="ghost" size="circle-sm" className="bg-dark-secondary text-white">
            <Lightbulb className="h-5 w-5" />
            <span className="ml-1 text-xs">Think</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
