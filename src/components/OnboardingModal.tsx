
import { useState } from 'react';
import { Check, ArrowRight, Moon } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: 'Welcome to Sheik GPT',
      description: 'Your Islamic Q&A Companion',
      content: (
        <div className="flex justify-center items-center py-8">
          <div className="rounded-full bg-teal/10 p-6">
            <Moon className="h-16 w-16 text-teal" />
          </div>
        </div>
      ),
    },
    {
      title: 'Ask Islam-Related Questions',
      description: 'Get answers with verified sources from Islamic texts',
      content: (
        <div className="space-y-4 py-6">
          <div className="rounded-lg border border-border p-4 bg-card/50">
            <p className="text-sm">Try asking questions like:</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-teal mr-2 mt-0.5" />
                <span>What does the Quran say about charity?</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-teal mr-2 mt-0.5" />
                <span>How to perform the five daily prayers?</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-teal mr-2 mt-0.5" />
                <span>What is the significance of Ramadan?</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'Verify with Sources',
      description: 'Every answer comes with references you can check',
      content: (
        <div className="space-y-4 py-6">
          <div className="rounded-lg border border-border p-4 bg-card/50">
            <p className="text-sm mb-2">
              All responses include references to Islamic texts that you can click to expand and verify.
            </p>
            <div className="p-2 rounded bg-muted">
              <p className="text-xs text-muted-foreground">Example reference:</p>
              <p className="text-sm mt-1">
                "The Quran emphasizes charity in Surah Al-Baqarah, 2:110 <span className="text-teal">[click to view]</span>"
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-card border border-border rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
          <p className="text-muted-foreground mt-1">{steps[currentStep].description}</p>
          
          <div className="mt-4">
            {steps[currentStep].content}
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <span 
                  key={index} 
                  className={`block h-2 w-2 rounded-full ${
                    index === currentStep ? 'bg-teal' : 'bg-border'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextStep}
              className="btn-primary flex items-center space-x-2"
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
