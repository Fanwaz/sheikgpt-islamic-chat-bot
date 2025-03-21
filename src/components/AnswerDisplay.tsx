
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Reference {
  id: string;
  text: string;
  source: string;
}

interface AnswerDisplayProps {
  question: string;
  answer: string | null;
  isLoading: boolean;
  references: Reference[];
}

export const AnswerDisplay = ({ question, answer, isLoading, references }: AnswerDisplayProps) => {
  const [expandedRef, setExpandedRef] = useState<string | null>(null);

  const toggleReference = (id: string) => {
    setExpandedRef(expandedRef === id ? null : id);
  };

  const renderAnswerWithReferences = (text: string) => {
    if (!text) return null;
    
    let result = text;
    
    // Simple pattern to match references like [1], [2], etc.
    // In a real app, you might want to use a more sophisticated approach
    references.forEach((ref) => {
      const pattern = new RegExp(`\\[${ref.id}\\]`, 'g');
      result = result.replace(
        pattern,
        `<button class="inline-flex items-center px-1 text-teal hover:text-teal-light font-medium" 
          data-ref-id="${ref.id}">
          [${ref.id}] <ExternalLink class="ml-1 h-3 w-3" />
        </button>`
      );
    });
    
    return <div dangerouslySetInnerHTML={{ __html: result }} onClick={handleReferenceClick} />;
  };

  const handleReferenceClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const refButton = target.closest('button[data-ref-id]');
    
    if (refButton) {
      const refId = refButton.getAttribute('data-ref-id');
      if (refId) {
        toggleReference(refId);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm animate-pulse">
        <div className="h-3 md:h-4 bg-muted rounded w-3/4 mb-3 md:mb-4"></div>
        <div className="h-3 md:h-4 bg-muted rounded w-1/2 mb-3 md:mb-4"></div>
        <div className="h-3 md:h-4 bg-muted rounded w-5/6 mb-3 md:mb-4"></div>
        <div className="h-3 md:h-4 bg-muted rounded w-2/3"></div>
      </div>
    );
  }

  if (!question || !answer) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-6 md:mb-8 transition-all duration-300 ease-in-out">
        <div className="p-3 md:p-4 border-b border-border bg-muted/50">
          <h3 className="font-medium text-sm md:text-base">Your Question</h3>
          <p className="mt-1 text-sm">{question}</p>
        </div>
        
        <div className="p-4 md:p-6">
          <h3 className="font-medium text-sm md:text-base mb-2 md:mb-3">Answer</h3>
          <div className="prose prose-sm max-w-none text-sm">
            {answer.includes("I only answer Islam-related questions") ? (
              <p className="text-destructive">{answer}</p>
            ) : (
              renderAnswerWithReferences(answer)
            )}
          </div>

          {expandedRef && (
            <div className="mt-3 md:mt-4 p-3 md:p-4 bg-muted rounded-lg animate-fade-in">
              <h4 className="font-medium text-xs md:text-sm mb-1 md:mb-2">Reference [{expandedRef}]</h4>
              <p className="text-xs md:text-sm">
                {references.find(ref => ref.id === expandedRef)?.text}
              </p>
              <a 
                href={references.find(ref => ref.id === expandedRef)?.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs mt-1 md:mt-2 text-teal inline-flex items-center hover:underline"
              >
                View Source <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
