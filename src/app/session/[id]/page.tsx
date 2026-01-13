"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, MoreVertical, Users, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getCounselorById } from "@/lib/data";
import Link from "next/link";

export default function SessionPage() {
    const params = useParams();
    const router = useRouter();
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [connected, setConnected] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Mock counselor ID from params (in a real app, we'd fetch the specific appointment)
    // For this prototype, we'll randomize or just pick one if not found, but let's try to be consistent
    const counselorId = "c1"; // Default for demo
    const counselor = getCounselorById(counselorId);

    useEffect(() => {
        // Simulate connection delay
        const timer = setTimeout(() => {
            setConnected(true);
        }, 1500);

        // Clock timer
        const clock = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(clock);
        };
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="h-screen bg-neutral-900 text-white relative overflow-hidden">
            {/* Main Video Background */}
            <div className="absolute inset-0">
                {connected ? (
                    <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
                        alt="Counselor"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900">
                        <div className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center mb-6 animate-pulse">
                            <Users className="h-10 w-10 text-neutral-500" />
                        </div>
                        <p className="text-neutral-400 text-lg">Waiting for counselor to join...</p>
                    </div>
                )}
                {/* Gradient Overlays */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
            </div>

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-2.5 rounded-xl">
                        <Video className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-lg drop-shadow-md">Wellness Check-in</h1>
                        <div className="flex items-center gap-2 text-sm text-white/80 drop-shadow-md">
                            <span className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}></span>
                            {connected ? "00:42" : "Connecting..."}
                        </div>
                    </div>
                </div>
                <div className="hidden md:block bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                    <span className="text-sm font-mono tracking-wider">{formatTime(currentTime)}</span>
                </div>
            </header>

            {/* Self View (PIP) - Floating */}
            <div className="absolute top-24 right-6 w-40 md:w-64 aspect-video bg-black/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 z-10">
                {videoOn ? (
                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                        <Users className="h-10 w-10 text-neutral-400" />
                        <span className="sr-only">Your Video</span>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-900/80 text-white/50 text-sm">
                        Camera Off
                    </div>
                )}
                <div className="absolute bottom-2 left-3 text-xs font-medium bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">You</div>
            </div>

            {/* Counselor Name Tag */}
            {connected && (
                <div className="absolute bottom-32 left-6 z-10">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                        <p className="font-semibold text-lg">{counselor?.name || "Dr. Sarah Chen"}</p>
                        <p className="text-sm text-white/70">Licensed Counselor</p>
                    </div>
                </div>
            )}

            {/* Control Bar */}
            <footer className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-6 z-20">
                <Button
                    variant={micOn ? "secondary" : "destructive"}
                    size="lg"
                    className={`rounded-full h-16 w-16 shadow-lg transition-all transform hover:scale-105 ${micOn ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10" : "bg-red-500 hover:bg-red-600 border-none"}`}
                    onClick={() => setMicOn(!micOn)}
                >
                    {micOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                </Button>

                <Button
                    variant={videoOn ? "secondary" : "destructive"}
                    size="lg"
                    className={`rounded-full h-16 w-16 shadow-lg transition-all transform hover:scale-105 ${videoOn ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10" : "bg-red-500 hover:bg-red-600 border-none"}`}
                    onClick={() => setVideoOn(!videoOn)}
                >
                    {videoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                </Button>

                <Button
                    variant="destructive"
                    size="lg"
                    className="rounded-full h-20 w-20 mx-4 shadow-xl bg-red-600 hover:bg-red-700 hover:scale-110 transition-all border-4 border-red-900/20"
                    onClick={() => router.push('/dashboard')}
                >
                    <PhoneOff className="h-8 w-8" />
                </Button>

                <Button
                    variant="ghost"
                    size="lg"
                    className="rounded-full h-16 w-16 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 shadow-lg"
                >
                    <MessageSquare className="h-6 w-6" />
                </Button>

                <Button
                    variant="ghost"
                    size="lg"
                    className="rounded-full h-16 w-16 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 shadow-lg"
                >
                    <Settings className="h-6 w-6" />
                </Button>
            </footer>
        </div>
    );
}
