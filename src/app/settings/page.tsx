"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Moon, Shield } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [anonMode, setAnonMode] = useState(false);

    return (
        <div className="min-h-screen bg-muted/5 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight mb-8">Account Settings</h1>

                <div className="grid gap-6">
                    <Card className="glass-panel">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
                            <CardDescription>Manage how you receive updates.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="notif-toggle">Enable email notifications</Label>
                                <Switch id="notif-toggle" checked={notifications} onCheckedChange={setNotifications} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-panel">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Privacy</CardTitle>
                            <CardDescription>Control your visibility.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="anon-toggle">Anonymous browsing mode</Label>
                                <Switch id="anon-toggle" checked={anonMode} onCheckedChange={setAnonMode} />
                            </div>
                            <p className="text-sm text-muted-foreground">When enabled, your name will be hidden in peer groups.</p>
                        </CardContent>
                    </Card>

                    <Card className="glass-panel">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Moon className="h-5 w-5" /> Appearance</CardTitle>
                            <CardDescription>Customize the interface.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="dark-toggle">Dark Mode (Simulated)</Label>
                                <Switch id="dark-toggle" checked={darkMode} onCheckedChange={(c) => {
                                    setDarkMode(c);
                                    // Simulate dark mode toggle
                                    if (c) document.body.classList.add('dark');
                                    else document.body.classList.remove('dark');
                                }} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline">Discard Changes</Button>
                        <Button>Save Settings</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
