
import { useState } from 'react';
import { Mic, VoiceIcon, Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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

  if (isMobile) {
    return (
      <div className="w-full mx-auto mb-16">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center rounded-full border border-input bg-card shadow-sm p-1">
            <button
              type="button"
              className="p-2 rounded-full"
              aria-label="Voice Input"
            >
              <Mic className="h-5 w-5 text-muted-foreground" />
            </button>
            
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-transparent border-none focus:outline-none text-sm px-2 py-1"
              aria-label="Question Input"
            />
            
            <button
              type="submit"
              disabled={!question.trim() || isLoading}
              className={`p-2 rounded-full ${
                !question.trim() || isLoading
                  ? 'text-muted-foreground'
                  : 'text-primary'
              }`}
              aria-label="Submit Question"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask an Islam-related question (e.g., What does the Quran say about charity?)"
            className="w-full h-[120px] px-4 py-3 rounded-xl bg-background border border-input shadow-sm focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none transition-all duration-300 resize-none"
            aria-label="Question Input"
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading}
            className={`absolute bottom-3 right-3 p-2 rounded-md ${
              !question.trim() || isLoading
                ? 'bg-muted text-muted-foreground'
                : 'bg-teal hover:bg-teal-light text-white'
            } transition-all duration-300 ease-in-out`}
            aria-label="Submit Question"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
