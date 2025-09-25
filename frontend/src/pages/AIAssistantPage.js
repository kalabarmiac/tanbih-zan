import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { ScrollArea } from '../components/ui/scroll-area';
import { Send } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AIAssistantPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const savedUser = localStorage.getItem('tanbih_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // Add welcome message
      setMessages([
        {
          id: 1,
          type: 'ai',
          content: 'Assalamu Alaikum! I am your Islamic AI assistant. I can help you with questions about Islam, Quran, Hadith, and provide guidance on Islamic practices. How can I assist you today?',
          timestamp: new Date()
        }
      ]);
    }, []);

    const sendMessage = async () => {
      if (!inputMessage.trim()) return;

      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: inputMessage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setLoading(true);

      try {
        const response = await axios.post(`${API}/ai-assistant`, {
          question: inputMessage,
          user_id: user?.id
        });

        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: response.data.answer,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: 'I apologize, but I\'m currently unable to process your question. Please try again later or consult with a local Islamic scholar.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
      setLoading(false);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Islamic AI Assistant</h2>
          <p className="text-gray-600">Get answers to your Islamic questions from authentic sources</p>
        </div>

        <Card className="h-96 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0 h-full flex flex-col">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg p-4 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 p-4 rounded-lg">
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-6 border-t">
              <div className="flex space-x-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Islam, Quran, Hadith, or Islamic practices..."
                  className="flex-1 resize-none"
                  rows={1}
                />
                <Button
                  onClick={sendMessage}
                  disabled={loading || !inputMessage.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Questions:</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                "What are the 5 pillars of Islam?",
                "How do I perform Wudu correctly?",
                "What is the significance of Ramadan?",
                "How should I make Dua?",
                "What are the benefits of reading Quran?",
                "How can I be a better Muslim?"
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-3 text-sm"
                  onClick={() => setInputMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  export default AIAssistantPage;