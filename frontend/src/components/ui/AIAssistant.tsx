
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
    text: "Hello! I'm your MediRescue AI assistant. I can help with emergency medical information, guidance during emergencies, or answer questions about our services. How can I assist you today?", 
    sender: 'assistant' 
  }
];

// Comprehensive emergency and medical knowledge database
const knowledgeBase: Record<string, string> = {
  // Emergency Responses
  heart: "If you're experiencing chest pain or heart attack symptoms:\n- Call emergency services immediately\n- Sit down and rest in a position that makes breathing comfortable\n- Take aspirin (325mg) if available and not allergic\n- Loosen tight clothing\n- If prescribed, take nitroglycerin\n- If an AED is available nearby, have someone retrieve it\n- Stay calm and wait for help to arrive",
  
  breathing: "For breathing difficulties:\n- Sit upright in a comfortable position\n- Open windows for fresh air\n- Use prescribed inhalers if available\n- Loosen any tight clothing\n- Practice pursed lip breathing (breathe in through nose, out through pursed lips)\n- If symptoms worsen or include blue lips/face, call emergency services immediately\n- For someone with asthma, help them use their rescue inhaler",
  
  stroke: "If you suspect a stroke, remember FAST:\n- Face: Is it drooping on one side?\n- Arms: Can they raise both arms, or does one drift down?\n- Speech: Is it slurred or strange?\n- Time: Call emergency services immediately\n\nAdditional stroke signs:\n- Sudden numbness or weakness, especially on one side\n- Sudden confusion or trouble understanding\n- Sudden trouble seeing\n- Sudden trouble walking, dizziness, loss of balance\n- Sudden severe headache with no known cause",
  
  bleeding: "For severe bleeding:\n- Apply direct pressure to the wound with a clean cloth, gauze, or clothing\n- If possible, elevate the injured area above the heart\n- If bleeding doesn't stop, apply pressure to the appropriate pressure point (arm or groin)\n- Secure the dressing with a bandage\n- Don't remove blood-soaked bandages; add more on top\n- For embedded objects, don't remove them; stabilize and bandage around them\n- Call emergency services for severe bleeding",
  
  fracture: "For possible fractures or broken bones:\n- Immobilize the injured area without trying to realign the bone\n- Apply a cold pack wrapped in cloth to reduce swelling\n- Elevate the injured area if possible\n- For open fractures (bone visible), cover with a clean dressing\n- Don't move the person unless absolutely necessary\n- Call emergency services for transportation to medical facility",
  
  burns: "For burns:\n- Remove from the source of the burn\n- Cool the burn with cool (not cold) running water for 10-15 minutes\n- Don't use ice, butter, or ointments on severe burns\n- Don't break blisters\n- Cover with a clean, non-stick bandage\n- For chemical burns, remove contaminated clothing and rinse with water for 20 minutes\n- Seek medical attention for burns larger than 3 inches, or on face/hands",
  
  poison: "For poisoning:\n- Call poison control center immediately (US: 1-800-222-1222)\n- Don't induce vomiting unless specifically instructed by professionals\n- For chemical on skin, remove contaminated clothing and rinse with water\n- For poison in the eye, flush with lukewarm water for 15-20 minutes\n- Bring the poison container or substance to the hospital if possible",
  
  unconscious: "If someone is unconscious:\n- Check responsiveness by shouting and tapping shoulders\n- Check breathing and pulse\n- Call emergency services immediately\n- If not breathing, begin CPR if trained\n- Place in recovery position if breathing (on side, arm supporting head, top leg bent)\n- Monitor until help arrives\n- If you suspect spinal injury, avoid moving them",
  
  seizure: "For seizures:\n- Time the seizure from start to finish\n- Clear the area of harmful objects\n- Do NOT restrain the person or put anything in their mouth\n- Gently turn them on their side if possible\n- Cushion their head\n- After seizure ends, help them to a safe, comfortable position\n- Call emergency services if: first seizure, seizure lasts >5 minutes, repeated seizures, or slow recovery",
  
  allergic: "For severe allergic reaction (anaphylaxis):\n- Use epinephrine auto-injector (EpiPen) if available\n- Call emergency services immediately\n- Help the person stay calm and lie quietly on back with legs elevated\n- If breathing is difficult, let them sit up\n- If vomiting, turn them on their side\n- If no improvement after 5-15 minutes, give a second dose of epinephrine if available",
  
  choking: "For choking:\n- Ask 'Are you choking?' If they nod yes and cannot speak, act immediately\n- Stand behind them with one foot forward\n- Wrap your arms around their waist\n- Make a fist with one hand, place it above the navel\n- Grasp your fist with the other hand\n- Perform quick, upward abdominal thrusts until object is expelled\n- If person becomes unconscious, lower them to the ground and call emergency services",
  
  heatstroke: "For heatstroke:\n- Move to a cool place immediately\n- Remove excess clothing\n- Cool the body - apply cold water, ice packs to neck, armpits, groin\n- Use fans if available\n- Monitor temperature\n- Give cool water if fully conscious and not vomiting\n- Call emergency services - heatstroke is life-threatening",
  
  hypothermia: "For hypothermia:\n- Move to a warm place\n- Remove wet clothing\n- Warm the center of the body first (chest, neck, head)\n- Use dry blankets, skin-to-skin contact under loose, dry layers\n- Provide warm beverages if fully conscious\n- Seek medical attention, especially for severe symptoms (confusion, slowed breathing)",
  
  diabetes: "For diabetic emergencies:\n- Low blood sugar (hypoglycemia): Give sugar in the form of juice, glucose tablets, or sugar dissolved in water if conscious\n- High blood sugar (hyperglycemia): Provide water to prevent dehydration, seek medical help\n- If unconscious: Place in recovery position, call emergency services\n- If unsure whether high or low sugar: Give sugar, as low blood sugar is more immediately dangerous\n- Look for medical ID bracelet or necklace",
  
  // MediRescue Information
  about: "MediRescue is a revolutionary emergency medical response platform that connects patients to help instantly. Our technology bridges critical gaps in traditional emergency response systems by providing:\n1. Instant alerts to nearby medical professionals\n2. AI-powered location tracking for faster response\n3. One-tap emergency requests\n4. Integrated ambulance dispatch\n5. Digital health profiles for responders\n6. Multi-channel communication\n\nWe are committed to reducing response times and improving outcomes during medical emergencies.",
  
  how: "MediRescue works through these simple steps:\n1. When you press the Emergency button, our system immediately activates\n2. Your location and medical profile are securely shared with our network\n3. Our AI matches your emergency with appropriate nearby responders\n4. Medical professionals are alerted through multiple channels\n5. Responders can see your real-time location and route to you\n6. You're kept updated on the responder's ETA\n7. After assistance arrives, the app facilitates hospital coordination if needed",
  
  services: "MediRescue offers multiple services:\n• Digital Health Briefing: Secure access to your medical history for responders\n• Live Emergency Dispatch: Immediate connection to medical teams\n• Smart Location Detection: AI-powered tracking for faster response\n• Emergency Responder Network: Quick connection to medical professionals\n• Multi-Channel Communication: Coordination through calls, SMS and in-app alerts\n• One-Tap Emergency Request: Simple and fast way to summon help",
  
  profile: "Your MediRescue medical profile is crucial during emergencies. It includes:\n• Basic information (name, age, blood type)\n• Emergency contacts\n• Existing medical conditions\n• Current medications\n• Allergies\n• Previous surgeries or treatments\n• Doctor contact information\n• Insurance details\n\nThis information helps responders provide appropriate care immediately. You can update your profile anytime in the app settings.",
  
  privacy: "MediRescue takes your privacy seriously. Your medical information is:\n• Encrypted end-to-end\n• Only shared during active emergencies\n• Accessible only to verified medical professionals\n• Never sold or used for marketing\n• Compliant with healthcare data regulations\n• Stored on secure, HIPAA-compliant servers\n\nYou maintain control of your data and can delete your account at any time.",
  
  // General Medical Knowledge
  cpr: "Basic CPR steps (only if certified or no alternative):\n1. Check responsiveness and call for emergency help\n2. Place the person on their back on a firm surface\n3. Give 30 chest compressions: Push hard and fast in center of chest (2-2.4 inches deep, 100-120/minute)\n4. Open the airway using head-tilt, chin-lift\n5. Give 2 rescue breaths (optional if untrained)\n6. Continue cycles of 30 compressions and 2 breaths\n7. Use AED as soon as available\n8. Continue until professional help arrives or person shows signs of life",
  
  firstaid: "Essential first aid kit contents:\n• Adhesive bandages (various sizes)\n• Gauze pads and rolls\n• Adhesive tape\n• Antiseptic wipes\n• Antibiotic ointment\n• Tweezers and scissors\n• Instant cold pack\n• Disposable gloves\n• Emergency blanket\n• Breathing barrier for CPR\n• Thermometer\n• First aid manual\n• Personal medications\n• Emergency contact information",
  
  vitalsigns: "Normal vital signs for adults:\n• Heart rate: 60-100 beats per minute\n• Respiration: 12-20 breaths per minute\n• Blood pressure: around 120/80 mmHg\n• Temperature: around 98.6°F (37°C)\n• Oxygen saturation: 95-100%\n\nSignificant deviation from these ranges may indicate a medical emergency.",
  
  bloodtypes: "Blood types and compatibility:\n• Type A can receive from: A, O\n• Type B can receive from: B, O\n• Type AB can receive from: A, B, AB, O (universal recipient)\n• Type O can receive from: O only\n• Type O can donate to: A, B, AB, O (universal donor)\n\nRh factor (+ or -) is also important for transfusion compatibility. Rh- can only receive Rh- blood.",
};

// Keywords to detect emergency situations
const emergencyKeywords = [
  'emergency', 'help', 'urgent', 'dying', 'critical', 'ambulance', 'call', 'pain', 'attack',
  'bleeding', 'blood', 'unconscious', 'breathing', 'breath', 'choke', 'choking', 'seizure', 
  'heart', 'stroke', 'allergic', 'reaction', 'poison', 'burn', 'injury', 'broken', 'fracture', 
  'overdose', 'suicide', 'drown', 'drowning', 'accident', 'fell', 'fall', 'head', 'wound'
];

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
    
    // Check for emergency trigger words
    const isEmergencyQuery = emergencyKeywords.some(keyword => lowerInput.includes(keyword));
    
    // Generate appropriate response
    let response = '';
    
    // Emergency mode gives priority to emergency responses
    if (isEmergencyQuery) {
      response = "I notice you may be describing an emergency situation. If this is a life-threatening emergency, please call emergency services immediately.\n\n";
      
      // Try to find the most relevant emergency information
      for (const [keyword, info] of Object.entries(knowledgeBase)) {
        if (lowerInput.includes(keyword)) {
          response += info + "\n\n";
          break;
        }
      }
      
      response += "Remember: This AI assistant provides general guidance only and is not a substitute for professional emergency services or medical care.";
    } 
    // Information mode - check for information requests
    else {
      let foundInfo = false;
      
      // Check for MediRescue-specific information requests
      if (lowerInput.includes('about') || lowerInput.includes('what is') || lowerInput.includes('medirescue')) {
        response = knowledgeBase.about;
        foundInfo = true;
      } else if (lowerInput.includes('how') || lowerInput.includes('work') || lowerInput.includes('function')) {
        response = knowledgeBase.how;
        foundInfo = true;
      } else if (lowerInput.includes('service') || lowerInput.includes('offer') || lowerInput.includes('provide')) {
        response = knowledgeBase.services;
        foundInfo = true;
      } else if (lowerInput.includes('profile') || lowerInput.includes('medical info') || lowerInput.includes('my information')) {
        response = knowledgeBase.profile;
        foundInfo = true;
      } else if (lowerInput.includes('privacy') || lowerInput.includes('secure') || lowerInput.includes('data')) {
        response = knowledgeBase.privacy;
        foundInfo = true;
      }
      // Check for medical knowledge requests
      else {
        for (const [keyword, info] of Object.entries(knowledgeBase)) {
          if (lowerInput.includes(keyword)) {
            response = info;
            foundInfo = true;
            break;
          }
        }
      }
      
      // Default response if no specific information is found
      if (!foundInfo) {
        response = "I'm here to help with emergency medical information and questions about MediRescue services. Could you please clarify what you'd like to know? You can ask about:\n\n• Specific emergency situations (heart attack, stroke, etc.)\n• How MediRescue works\n• Our services\n• Medical profiles\n• Privacy and data security\n• General medical information like CPR, first aid, or vital signs";
      }
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
                placeholder="Ask about medical emergencies or our services..."
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
