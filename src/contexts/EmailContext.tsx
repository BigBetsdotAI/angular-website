import { createContext, useContext, useState, ReactNode } from "react";

export interface Recipient {
  name: string;
  email: string;
  [key: string]: string;
}

interface EmailContextType {
  subject: string;
  setSubject: (subject: string) => void;
  content: string;
  setContent: (content: string) => void;
  recipients: Recipient[];
  setRecipients: (recipients: Recipient[]) => void;
  clearAll: () => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error("useEmail must be used within an EmailProvider");
  }
  return context;
};

interface EmailProviderProps {
  children: ReactNode;
}

export function EmailProvider({ children }: EmailProviderProps) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  const clearAll = () => {
    setSubject("");
    setContent("");
    setRecipients([]);
  };

  return (
    <EmailContext.Provider
      value={{
        subject,
        setSubject,
        content,
        setContent,
        recipients,
        setRecipients,
        clearAll,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}
