import React, { useState } from 'react';

export const useJournal = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const addMessage = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };

  return {
    messages,
    addMessage,
  };
};
