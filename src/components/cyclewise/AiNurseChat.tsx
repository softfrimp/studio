
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CornerDownLeft, Loader2, User, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { askAiNurse } from '@/ai/flows/nurse-flow';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function AiNurseChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askAiNurse(input);
      const assistantMessage: Message = { role: 'assistant', content: response.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Nurse Error:', error);
      toast({
        title: 'Error',
        description: 'Sorry, the AI Nurse is unavailable right now. Please try again later.',
        variant: 'destructive',
      });
      // Optionally remove the user message if the API call fails
      setMessages((prev) => prev.slice(0, prev.length -1));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="w-full max-w-4xl mx-auto glass flex flex-col h-[calc(100vh-10rem)]">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Bot />
            AI Nurse
        </CardTitle>
        <CardDescription>
          Ask questions about your cycle, symptoms, or general wellness.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div ref={scrollAreaRef} className="flex-grow overflow-y-auto pr-4 space-y-4">
          <AnimatePresence>
            {messages.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y:10 }}
                    animate={{ opacity: 1, y:0 }}
                    className="text-center text-muted-foreground p-8"
                >
                    <p>Start a conversation by typing your question below.</p>
                </motion.div>
            )}
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                layout
                className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-muted-foreground rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                 {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <User className="w-5 h-5 text-accent-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
             {isLoading && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-muted text-muted-foreground rounded-bl-none flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin"/>
                        <span>Thinking...</span>
                    </div>
                </motion.div>
             )}
          </AnimatePresence>
        </div>
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2 pt-4 border-t">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="e.g., Why am I feeling so tired?"
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="animate-spin" /> : <CornerDownLeft />}
             <span className="sr-only">Send</span>
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center pt-2">
          Disclaimer: AI Nurse is for informational purposes only and is not a substitute for professional medical advice. Always consult a healthcare provider for any medical concerns.
        </p>
      </CardContent>
    </Card>
  );
}
