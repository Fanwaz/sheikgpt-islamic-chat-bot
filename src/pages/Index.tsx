import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { QuestionInput } from '@/components/QuestionInput';
import { AnswerDisplay } from '@/components/AnswerDisplay';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Compass } from 'lucide-react';

interface HistoryItem {
  id: string;
  question: string;
  answer: string;
  date: string;
  references: Reference[];
}

interface Reference {
  id: string;
  text: string;
  source: string;
}

const mockAnswerQuestion = (question: string): Promise<{ answer: string, references: Reference[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isIslamRelated = /islam|quran|muslim|prayer|ramadan|hajj|zakat|prophet|muhammad|allah|mosque|salat|surah|charity/i.test(question);
      
      if (!isIslamRelated) {
        resolve({
          answer: "I only answer Islam-related questions—please ask about Islamic teachings, history, or culture.",
          references: []
        });
        return;
      }
      
      if (question.toLowerCase().includes('charity')) {
        resolve({
          answer: "The Quran emphasizes the importance of charity (Sadaqah) and obligatory giving (Zakat). In Surah Al-Baqarah [1], Allah states that those who give charity will receive great rewards. The Prophet Muhammad (peace be upon him) also emphasized charity as described in the hadith collections [2], saying it is a proof of faith.",
          references: [
            { 
              id: "1", 
              text: "\"And establish prayer and give zakah, and whatever good you put forward for yourselves - you will find it with Allah. Indeed, Allah of what you do, is Seeing.\"", 
              source: "https://quran.com/2/110" 
            },
            { 
              id: "2", 
              text: "Narrated by Abu Malik Al-Ashari: The Prophet said, \"Cleanliness is half of faith and Alhamdulillah fills the scale, and Subhanallah and Alhamdulillah fill what is between the heavens and the earth, and prayer is a light, and charity is a proof (of one's faith).\"", 
              source: "https://sunnah.com/muslim/2/1" 
            }
          ]
        });
      } else if (question.toLowerCase().includes('ramadan')) {
        resolve({
          answer: "Fasting during Ramadan is one of the Five Pillars of Islam, as mentioned in Surah Al-Baqarah [1]. This month of fasting is obligatory for all adult Muslims who are healthy and not traveling. The Prophet Muhammad (peace be upon him) explained various virtues of Ramadan [2], including that it is a month in which the gates of Paradise are opened.",
          references: [
            { 
              id: "1", 
              text: "\"O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.\"", 
              source: "https://quran.com/2/183" 
            },
            { 
              id: "2", 
              text: "Narrated Abu Huraira: Allah's Messenger said, \"When the month of Ramadan starts, the gates of heaven are opened and the gates of Hell are closed and the devils are chained.\"", 
              source: "https://sunnah.com/bukhari/30/9" 
            }
          ]
        });
      } else {
        resolve({
          answer: "According to Islamic teachings, this question relates to fundamental principles in Islam. The Quran [1] provides guidance on this topic, and the Prophet Muhammad's (peace be upon him) teachings [2] further elaborate on the practice and understanding.",
          references: [
            { 
              id: "1", 
              text: "Relevant Quranic verse related to the question topic.", 
              source: "https://quran.com" 
            },
            { 
              id: "2", 
              text: "Relevant hadith (sayings of Prophet Muhammad) related to the question topic.", 
              source: "https://sunnah.com" 
            }
          ]
        });
      }
    }, 1500);
  });
};

const Index = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [currentReferences, setCurrentReferences] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }
    
    if (user) {
      const savedHistory = localStorage.getItem(`history_${user.id}`);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    }
  }, [user]);

  const handleSubmitQuestion = async (question: string) => {
    setCurrentQuestion(question);
    setIsLoading(true);
    setCurrentAnswer(null);
    setCurrentReferences([]);

    try {
      const { answer, references } = await mockAnswerQuestion(question);
      
      setCurrentAnswer(answer);
      setCurrentReferences(references);
      
      if (user) {
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          question,
          answer,
          date: new Date().toISOString(),
          references
        };
        
        const updatedHistory = [newHistoryItem, ...history];
        setHistory(updatedHistory);
        
        localStorage.setItem(`history_${user.id}`, JSON.stringify(updatedHistory));
      }
    } catch (error) {
      console.error('Error answering question:', error);
      setCurrentAnswer('Sorry, there was an error processing your question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFromHistory = (id: string) => {
    setSelectedHistoryId(id);
    const historyItem = history.find(item => item.id === id);
    
    if (historyItem) {
      setCurrentQuestion(historyItem.question);
      setCurrentAnswer(historyItem.answer);
      setCurrentReferences(historyItem.references);
    }
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  return (
    <div className="flex flex-col h-screen bg-dark text-white">
      <Navbar />
      
      <main className="flex-1 overflow-y-auto flex flex-col">
        {!currentQuestion && !currentAnswer && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Compass className="h-16 w-16 text-muted-foreground animate-float opacity-30" />
            <h2 className="text-lg font-medium mt-4 text-muted-foreground">Ask anything</h2>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4">
          <AnswerDisplay 
            question={currentQuestion} 
            answer={currentAnswer} 
            isLoading={isLoading}
            references={currentReferences}
          />
        </div>

        <QuestionInput onSubmit={handleSubmitQuestion} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Index;
