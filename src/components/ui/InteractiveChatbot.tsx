
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotKnowledge {
  keywords: string[];
  response: string;
}

const knowledgeBase: ChatbotKnowledge[] = [
  {
    keywords: ['sign up', 'register', 'create account', 'signup'],
    response: "To sign up, click the 'Sign Up' button in the top right corner. You'll need to provide your name, email, phone number, and choose whether you're a user or responder. After signing up, you'll receive a verification email that you must click to activate your account."
  },
  {
    keywords: ['emergency', 'help', 'what happens', 'emergency button', 'how does it work'],
    response: "When you press the emergency button, our system immediately gets your GPS location and connects you to the nearest verified medical responder. Your medical information is securely shared with them so they can provide appropriate help. The whole process takes just seconds!"
  },
  {
    keywords: ['medical history', 'update profile', 'medical info', 'medical data'],
    response: "Yes! After logging in, go to your dashboard and click 'Update Medical Info'. You can add your blood type, medical conditions, allergies, medications, and emergency contacts. This information helps responders provide better care during emergencies."
  },
  {
    keywords: ['privacy', 'data', 'secure', 'who sees', 'medical information'],
    response: "Your medical data is encrypted and only shared with verified responders during active emergencies. We follow strict privacy protocols and never sell your information. Only you and emergency responders can access your medical details when needed."
  },
  {
    keywords: ['free', 'cost', 'price', 'payment'],
    response: "Yes! MediRescue is completely free to use for emergencies and medical alerts. Our mission is to save lives, not make money from people in distress. All emergency services through our platform are provided at no cost to users."
  },
  {
    keywords: ['test', 'try', 'practice', 'demo'],
    response: "For safety reasons, we restrict testing of the emergency button to prevent false alarms. Please only use the emergency feature during real medical emergencies. If you want to explore the app, you can update your profile and view the dashboard features safely."
  },
  {
    keywords: ['responder', 'medical professional', 'doctor', 'who responds'],
    response: "Our responders are verified medical professionals including EMTs, paramedics, nurses, and doctors who volunteer their time to help in emergencies. All responders go through background checks and credential verification before joining our network."
  },
  {
    keywords: ['login', 'log in', 'sign in'],
    response: "To log in, click the 'Log In' button in the top right corner and enter your email and password. Make sure you've verified your email first - check your inbox after signing up!"
  },
  {
    keywords: ['hello', 'hi', 'hey', 'help'],
    response: "Hello! I'm here to help you with any questions about MediRescue. You can ask me about signing up, how emergencies work, updating your medical profile, or anything else about our service. What would you like to know?"
  }
];

const InteractiveChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm the MediRescue assistant. I can help you understand how our emergency response system works. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Find the knowledge entry with the most keyword matches
    let bestMatch = null;
    let maxMatches = 0;
    
    for (const knowledge of knowledgeBase) {
      const matches = knowledge.keywords.filter(keyword => 
        lowerInput.includes(keyword.toLowerCase())
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = knowledge;
      }
    }
    
    if (bestMatch && maxMatches > 0) {
      return bestMatch.response;
    }
    
    // Default response for unmatched queries
    return "I'm not sure about that specific question, but I can help you with:\n\n• How to sign up for MediRescue\n• What happens during an emergency\n• Updating your medical profile\n• Privacy and data security\n• Pricing information\n• How to log in\n\nTry asking about any of these topics!";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Generate bot response
    const botResponse = findBestResponse(inputValue);
    
    // Add bot response with a slight delay for realism
    setTimeout(() => {
      const botMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
    
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-medical-600 text-white rounded-full p-4 shadow-lg hover:bg-medical-700 transition-all z-50 animate-bounce"
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} />
      </button>
      
      {/* Chat modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md bg-white rounded-lg shadow-2xl z-50 border border-neutral-200 overflow-hidden flex flex-col max-h-[500px] sm:max-h-[600px]">
          {/* Header */}
          <div className="bg-medical-600 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">MediRescue Assistant</h3>
              <p className="text-xs text-medical-100">Ask me anything!</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 min-h-[300px] max-h-[400px]">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`max-w-[85%] p-3 rounded-lg ${
                  message.sender === 'bot' 
                    ? 'bg-gray-100 self-start rounded-bl-none' 
                    : 'bg-medical-100 text-medical-800 self-end rounded-br-none'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-neutral-200 bg-gray-50">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about MediRescue..."
                className="flex-1 text-sm"
              />
              <Button 
                onClick={handleSendMessage} 
                size="sm" 
                className="bg-medical-600 hover:bg-medical-700 px-3"
                disabled={!inputValue.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ask about signup, emergencies, medical profiles, or pricing
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveChatbot;
