"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAppData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Lock, ArrowLeft } from "lucide-react";

export default function CounselorLoginPage() {
    const router = useRouter();
    const data = getAppData();
    const [selectedCounselor, setSelectedCounselor] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCounselor) {
            setError("Please select a counselor");
            return;
        }
        // For demo purposes, any password works
        if (password.length < 1) {
            setError("Please enter a password");
            return;
        }
        // Store counselor as currentUser in sessionStorage for proper authentication
        const currentUser = {
            id: selectedCounselor,
            role: 'counselor'
        };
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        sessionStorage.setItem("counselorId", selectedCounselor); // Keep for backward compatibility
        router.push("/counselor");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl border-0">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Counselor Portal</CardTitle>
                    <CardDescription>Sign in to access your dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="ghost" size="sm" className="mb-4" asChild>
                        <Link href="/"><ArrowLeft className="h-4 w-4 mr-2" />Back to Home</Link>
                    </Button>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Select Counselor</label>
                            <select
                                value={selectedCounselor}
                                onChange={(e) => {
                                    setSelectedCounselor(e.target.value);
                                    setError("");
                                }}
                                className="w-full px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Choose your profile...</option>
                                {data.counselors.map(c => (
                                    <option key={c.id} value={c.id}>{c.name} - {c.specialty}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    placeholder="Enter password"
                                    className="w-full pl-10 pr-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Demo: Any password will work</p>
                        </div>

                        {error && (
                            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>
                        )}

                        <Button type="submit" className="w-full h-12 rounded-xl text-base">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
