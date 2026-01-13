"use client";

import { useState } from "react";
import { getAppData, getCounselorById, Appointment } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Calendar, Smile, BookOpen, Clock, Settings, LogOut,
    Video, MessageCircle, User, X, AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { user, counselors } = getAppData();
    const router = useRouter();
    const [cancelModal, setCancelModal] = useState<Appointment | null>(null);

    const upcomingAppointments = user.appointments.filter(a => a.status === "Upcoming");
    const pastAppointments = user.appointments.filter(a => a.status === "Completed");

    const getCounselor = (id: string) => counselors.find(c => c.id === id);

    const getSessionIcon = (type: string) => {
        switch (type) {
            case "video": return <Video className="h-4 w-4" />;
            case "chat": return <MessageCircle className="h-4 w-4" />;
            default: return <User className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Upcoming": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
            case "Completed": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
            case "Cancelled": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const handleCancel = () => {
        // For demo, just close modal (in real app would update state)
        alert("Appointment cancelled. A confirmation has been sent to your email.");
        setCancelModal(null);
    };

    return (
        <div className="min-h-screen bg-muted/5 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Hello, {user.name}</h1>
                        <p className="text-muted-foreground">Welcome to your wellness dashboard.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/settings"><Settings className="h-4 w-4 mr-2" /> Settings</Link>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => router.push("/")}>
                            <LogOut className="h-4 w-4 mr-2" /> Sign Out
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Daily Mood</CardTitle>
                            <Smile className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Good</div>
                            <p className="text-xs text-muted-foreground">+2 streak days</p>
                            <Button variant="link" className="p-0 h-auto text-xs mt-2 text-primary">Log today&apos;s mood</Button>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                            <Calendar className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                            <p className="text-xs text-muted-foreground">
                                {upcomingAppointments.length > 0
                                    ? `Next: ${upcomingAppointments[0].slot}`
                                    : "No upcoming sessions"}
                            </p>
                            <Button variant="link" className="p-0 h-auto text-xs mt-2" asChild><Link href="/booking">Book New</Link></Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Saved Resources</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3 Items</div>
                            <p className="text-xs text-muted-foreground">Last read: Grounding...</p>
                            <Button variant="link" className="p-0 h-auto text-xs mt-2" asChild><Link href="/resources">View Library</Link></Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Upcoming Sessions */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            Upcoming Sessions
                        </CardTitle>
                        <CardDescription>Your scheduled counseling appointments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {upcomingAppointments.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium mb-2">No upcoming sessions</p>
                                <p className="text-sm mb-4">Book a session with one of our counselors</p>
                                <Button asChild><Link href="/booking">Find a Counselor</Link></Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcomingAppointments.map(apt => {
                                    const counselor = getCounselor(apt.counselorId);
                                    return (
                                        <div key={apt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-xl bg-muted/30 gap-4">
                                            <div className="flex items-center gap-4">
                                                {counselor && (
                                                    <img
                                                        src={counselor.image}
                                                        alt={counselor.name}
                                                        className="h-14 w-14 rounded-full bg-white shadow"
                                                    />
                                                )}
                                                <div>
                                                    <p className="font-semibold text-lg">{counselor?.name || "Counselor"}</p>
                                                    <p className="text-sm text-muted-foreground">{counselor?.specialty}</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className="flex items-center gap-1 text-sm">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            {apt.slot}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-sm capitalize">
                                                            {getSessionIcon(apt.sessionType)}
                                                            {apt.sessionType}
                                                        </span>
                                                        <Badge variant="secondary">{apt.concern}</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                                <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
                                                <Button variant="outline" size="sm" onClick={() => setCancelModal(apt)}>
                                                    Cancel
                                                </Button>
                                                <Button size="sm">Join Session</Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Past Sessions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Session History
                        </CardTitle>
                        <CardDescription>Your past counseling sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pastAppointments.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">No session history yet</p>
                        ) : (
                            <div className="space-y-3">
                                {pastAppointments.map(apt => {
                                    const counselor = getCounselor(apt.counselorId);
                                    return (
                                        <div key={apt.id} className="flex items-center justify-between p-4 border rounded-xl">
                                            <div className="flex items-center gap-4">
                                                {counselor && (
                                                    <img
                                                        src={counselor.image}
                                                        alt={counselor.name}
                                                        className="h-10 w-10 rounded-full bg-white"
                                                    />
                                                )}
                                                <div>
                                                    <p className="font-medium">{counselor?.name || "Counselor"}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(apt.date).toLocaleDateString()} • {apt.concern}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Cancel Confirmation Modal */}
            {cancelModal && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setCancelModal(null)}
                >
                    <div
                        className="bg-background rounded-2xl shadow-2xl max-w-md w-full p-6"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Cancel Appointment?</h3>
                            <p className="text-muted-foreground mb-6">
                                Are you sure you want to cancel your session with {getCounselor(cancelModal.counselorId)?.name} on {cancelModal.slot}?
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setCancelModal(null)}
                                >
                                    Keep Appointment
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={handleCancel}
                                >
                                    Yes, Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

