
import { useState } from 'react';
import { Send } from 'lucide-react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

export const QuestionInput = ({ onSubmit, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question);
      setQuestion('');
    }
  };

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
