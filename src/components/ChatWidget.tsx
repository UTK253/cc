"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hi! I'm the CampusCare assistant. How can I support you today?",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputText("");

        // Simulate bot response
        setTimeout(() => {
            const botResponses = [
                "I hear you. Dealing with college life can be tough.",
                "Would you like me to guide you to our counseling booking page?",
                "If this is an emergency, please click the red 'Crisis Help' button or call 988.",
                "Taking a deep breath can help. Have you checked our mindfulness resources?",
                "I'm here to listen. Tell me more.",
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    size="lg"
                    className="rounded-full h-14 w-14 shadow-xl bg-primary hover:bg-primary/90 transition-all hover:scale-110"
                >
                    <MessageCircle className="h-8 w-8 text-white" />
                </Button>
            )}

            {isOpen && (
                <Card className="w-80 md:w-96 h-[500px] shadow-2xl flex flex-col border-primary/20 animate-in fade-in slide-in-from-bottom-10 duration-300">
                    <CardHeader className="bg-primary text-primary-foreground p-4 rounded-t-lg flex flex-row justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Bot className="h-6 w-6" />
                            <div>
                                <CardTitle className="text-base">Support Assistant</CardTitle>
                                <p className="text-xs opacity-90">Always here for you</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary-foreground/20">
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === "user"
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-background border border-border shadow-sm text-foreground rounded-tl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </CardContent>
                    <CardFooter className="p-3 border-t bg-background">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            className="flex w-full gap-2"
                        >
                            <input
                                className="flex-1 px-3 py-2 text-sm rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Type a message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <Button type="submit" size="icon" className="rounded-full shrink-0">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
