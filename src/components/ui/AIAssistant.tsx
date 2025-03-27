
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'assistant';
}

const initialMessages: Message[] = [
  { 
    text: "Hello! I'm your MediRescue AI assistant. How can I help you with emergency medical situations today?", 
    sender: 'assistant' 
  }
];

// Pre-defined emergency responses
const emergencyResponses: Record<string, string> = {
  heart: "If you're experiencing chest pain or heart attack symptoms:\n- Call emergency services immediately\n- Sit down and rest\n- Take aspirin if available and not allergic\n- Loosen tight clothing",
  
  breathing: "For breathing difficulties:\n- Sit upright in a comfortable position\n- Open windows for fresh air\n- Use prescribed inhalers if available\n- Call emergency services if severe",
  
  stroke: "If you suspect a stroke, remember FAST:\n- Face: Is it drooping?\n- Arms: Can they raise both?\n- Speech: Is it slurred?\n- Time: Call emergency services immediately",
  
  bleeding: "For severe bleeding:\n- Apply direct pressure to the wound\n- Elevate the injured area if possible\n- Use clean cloth or bandage\n- Call emergency services",
  
  unconscious: "If someone is unconscious:\n- Check breathing and pulse\n- Call emergency services\n- Place in recovery position if breathing\n- Begin CPR if not breathing",
  
  allergic: "For severe allergic reaction:\n- Use epinephrine auto-injector if available\n- Call emergency services\n- Lie flat with legs elevated\n- Remove trigger if possible",
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    
    // Process response
    const lowerInput = inputValue.toLowerCase();
    
    // Find matching emergency keywords
    let response = "I'm here to help with emergency guidance. Could you provide more details about the situation? Or you can ask about specific emergencies like heart attack, breathing problems, stroke, bleeding, or allergic reactions.";
    
    Object.entries(emergencyResponses).forEach(([keyword, responseText]) => {
      if (lowerInput.includes(keyword)) {
        response = responseText;
      }
    });
    
    // Special case for "emergency" keyword
    if (lowerInput.includes('emergency') && lowerInput.includes('help')) {
      response = "For immediate emergency help:\n1. Tap the red Emergency Call button at the top of the screen\n2. Your location is automatically shared with responders\n3. Stay on the line for further instructions";
    }
    
    // Add AI response with a small delay to seem more natural
    setTimeout(() => {
      const aiMessage: Message = { text: response, sender: 'assistant' };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
    
    setInputValue('');
  };

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-medical-600 text-white rounded-full p-4 shadow-lg hover:bg-medical-700 transition-all z-50"
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={24} />
      </button>
      
      {/* Chat modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md bg-white rounded-lg shadow-xl z-50 border border-neutral-200 overflow-hidden flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-medical-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">MediRescue AI Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 min-h-[300px]">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'assistant' 
                    ? 'bg-neutral-100 self-start' 
                    : 'bg-medical-100 text-medical-800 self-end'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-neutral-200">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your emergency question..."
                className="flex-1"
              />
              <Button type="submit" size="sm" className="bg-medical-600 hover:bg-medical-700">
                Send
              </Button>
            </form>
            <p className="text-xs text-neutral-500 mt-2">
              *This AI provides general guidance only. For real emergencies, call emergency services immediately.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
