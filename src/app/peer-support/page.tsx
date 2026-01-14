"use client";

import { useState } from "react";
import Link from "next/link";
import { getAppData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MessageSquare } from "lucide-react";

export default function PeerSupportPage() {
    const { events } = getAppData();
    const [activeTab, setActiveTab] = useState("forums");

    const forums = [
        { title: "Academic Stress Support", active: 24, posts: 156 },
        { title: "Social Anxiety Group", active: 12, posts: 89 },
        { title: "International Students", active: 35, posts: 240 },
        { title: "Sleep & Wellness", active: 8, posts: 45 },
    ];

    return (
        <div className="min-h-screen bg-muted/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight mb-4">Peer Support Community</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Connect with fellow students who understand what you're going through. Join a discussion group or attend an upcoming event.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid w-full grid-cols-2 mb-8 p-1 bg-muted rounded-lg border">
                        <button
                            onClick={() => setActiveTab("forums")}
                            className={`py-2 rounded-md text-sm font-medium transition-all ${activeTab === "forums" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50"}`}
                        >
                            Discussion Forums
                        </button>
                        <button
                            onClick={() => setActiveTab("events")}
                            className={`py-2 rounded-md text-sm font-medium transition-all ${activeTab === "events" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50"}`}
                        >
                            Upcoming Events
                        </button>
                    </div>

                    {activeTab === "forums" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 gap-4">
                                {forums.map((forum, idx) => (
                                    <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer">
                                        <CardHeader className="flex flex-row items-center justify-between py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-primary/10 p-2 rounded-full">
                                                    <MessageSquare className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">{forum.title}</CardTitle>
                                                    <CardDescription className="flex gap-4 mt-1">
                                                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {forum.active} online</span>
                                                        <span>{forum.posts} posts</span>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <Link href={`/session/community-${idx}?type=community&name=${encodeURIComponent(forum.title)}`}>
                                                <Button variant="outline">Join</Button>
                                            </Link>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                            <div className="mt-8 text-center bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl">
                                <h3 className="font-semibold mb-2">Community Guidelines</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Our community is moderated to ensure a safe, supportive environment. Be kind, respectful, and confidential.
                                </p>
                                <Button>Read Guidelines</Button>
                            </div>
                        </div>
                    )}

                    {activeTab === "events" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {events.map((event) => (
                                <Card key={event.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle>{event.title}</CardTitle>
                                                <CardDescription className="flex items-center gap-2 mt-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm mb-4">Location: {event.location}</p>
                                        <Button className="w-full">Register</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
