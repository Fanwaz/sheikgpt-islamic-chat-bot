
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  const toggleReference = (id: string) => {
    setExpandedRef(expandedRef === id ? null : id);
  };

  const renderAnswerWithReferences = (text: string) => {
    if (!text) return null;
    
    let result = text;
    
    // Simple pattern to match references like [1], [2], etc.
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
      <div className="w-full max-w-2xl mx-auto py-4 animate-pulse">
        <div className="h-3 bg-dark-secondary rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-dark-secondary rounded w-1/2 mb-3"></div>
        <div className="h-3 bg-dark-secondary rounded w-5/6 mb-3"></div>
        <div className="h-3 bg-dark-secondary rounded w-2/3"></div>
      </div>
    );
  }

  if (!question || !answer) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-4 space-y-4">
      <div className="text-white">
        <p className="text-sm text-muted-foreground mb-1">You</p>
        <p className="text-sm">{question}</p>
      </div>
      
      <div className="text-white">
        <p className="text-sm text-muted-foreground mb-1">Sheik GPT</p>
        <div className="text-sm">
          {answer.includes("I only answer Islam-related questions") ? (
            <p className="text-destructive">{answer}</p>
          ) : (
            renderAnswerWithReferences(answer)
          )}
        </div>

        {expandedRef && (
          <div className="mt-2 p-2 bg-dark-secondary rounded animate-fade-in">
            <h4 className="font-medium text-xs mb-1">Reference [{expandedRef}]</h4>
            <p className="text-xs">
              {references.find(ref => ref.id === expandedRef)?.text}
            </p>
            <a 
              href={references.find(ref => ref.id === expandedRef)?.source} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs mt-1 text-teal inline-flex items-center hover:underline"
            >
              View Source <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
