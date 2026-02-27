import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const botResponses: Record<string, string> = {
  default: "Thank you for reaching out! For detailed inquiries, please email us at info@theconsumex.com or register using the form above.",
  hello: "Hello! Welcome to FAIDAS 2026 – Future of AI in Data Analytics Summit, Hyderabad. How can I help you today?",
  hi: "Hi there! Welcome to FAIDAS 2026. How can I assist you?",
  date: "FAIDAS 2026 Hyderabad is scheduled for April 16, 2026.",
  when: "The summit takes place on April 16, 2026 in Hyderabad, India.",
  where: "FAIDAS 2026 will be held in Hyderabad, India. Exact venue details will be shared with registered attendees.",
  venue: "The venue is in Hyderabad, India. Exact venue details will be shared with registered attendees.",
  register: "You can register by scrolling down to the Registration Form section or clicking 'Register' in the navigation menu!",
  sponsor: "For sponsorship opportunities, please scroll to the 'Why Sponsor' section or email us at info@theconsumex.com for a customized package.",
  agenda: "The full-day agenda includes keynotes, panel discussions, fireside chats, technical deep-dives, and the FAIDAS 25 Recognition Gala. Check the Agenda section for details!",
  speakers: "We have 20+ distinguished speakers from companies like US Bank, Shell, HSBC, Warner Bros. Discovery, Vodafone, and more. See the Speakers section!",
  price: "For pricing and ticket information, please register your interest via the form or contact us at info@theconsumex.com.",
  cost: "For pricing and ticket information, please register your interest via the form or contact us at info@theconsumex.com.",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(botResponses)) {
    if (key !== "default" && lower.includes(key)) return value;
  }
  return botResponses.default;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! Welcome to FAIDAS 2026. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const botMsg: Message = { role: "bot", text: getResponse(userMsg.text) };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-primary-foreground shadow-xl hover:scale-105 transition-transform flex items-center justify-center"
        title="Chat with us"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[420px] bg-card rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-fade-in">
          {/* Header */}
          <div className="gradient-teal px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <MessageCircle size={18} className="text-primary-foreground" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-primary-foreground">FAIDAS Support</p>
              <p className="text-[10px] text-primary-foreground/70">Typically replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card text-card-foreground shadow-sm border border-border rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-teal-light transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
