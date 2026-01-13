"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAppData, getCounselorById, getAppointmentsForCounselor, FullAppointment, Counselor } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Calendar, Clock, Users, CheckCircle2, Video, MessageCircle, User,
    LogOut, Phone, ArrowRight, PlayCircle
} from "lucide-react";
import Link from "next/link";

export default function CounselorDashboard() {
    const router = useRouter();
    const [counselor, setCounselor] = useState<Counselor | null>(null);
    const [appointments, setAppointments] = useState<FullAppointment[]>([]);
    const [selectedSession, setSelectedSession] = useState<FullAppointment | null>(null);

    useEffect(() => {
        const counselorId = sessionStorage.getItem("counselorId");
        if (!counselorId) {
            router.push("/counselor/login");
            return;
        }
        const c = getCounselorById(counselorId);
        if (c) {
            setCounselor(c);
            setAppointments(getAppointmentsForCounselor(counselorId));
        }
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem("counselorId");
        router.push("/counselor/login");
    };

    const upcomingAppointments = appointments.filter(a => a.status === "Upcoming");
    const completedAppointments = appointments.filter(a => a.status === "Completed");
    const todaysAppointments = appointments.filter(a => {
        const today = new Date().toDateString();
        return new Date(a.date).toDateString() === today && a.status === "Upcoming";
    });

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
            case "In Progress": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    if (!counselor) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/5 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={counselor.image}
                            alt={counselor.name}
                            className="h-16 w-16 rounded-full bg-white shadow-md"
                        />
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Welcome, {counselor.name}</h1>
                            <p className="text-muted-foreground">{counselor.specialty} Specialist</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" /> Sign Out
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Today&apos;s Sessions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{todaysAppointments.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Upcoming</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{upcomingAppointments.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{completedAppointments.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">⭐ {counselor.rating}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Appointments List */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Today's Sessions */}
                        {todaysAppointments.length > 0 && (
                            <Card className="border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        Today&apos;s Schedule
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {todaysAppointments.map(apt => (
                                        <div
                                            key={apt.id}
                                            className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer"
                                            onClick={() => setSelectedSession(apt)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="bg-primary/10 p-2.5 rounded-full">
                                                    {getSessionIcon(apt.sessionType)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{apt.studentName}</p>
                                                    <p className="text-sm text-muted-foreground">{apt.concern} • {apt.slot}</p>
                                                </div>
                                            </div>
                                            <Button size="sm" className="gap-2">
                                                <PlayCircle className="h-4 w-4" /> Start
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {/* All Appointments */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    All Appointments
                                </CardTitle>
                                <CardDescription>View and manage your scheduled sessions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {appointments.length === 0 ? (
                                        <p className="text-center text-muted-foreground py-8">No appointments scheduled</p>
                                    ) : (
                                        appointments.map(apt => (
                                            <div
                                                key={apt.id}
                                                className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                                                onClick={() => setSelectedSession(apt)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-muted p-2.5 rounded-full">
                                                        {getSessionIcon(apt.sessionType)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{apt.studentName}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {apt.concern} • {new Date(apt.date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
                                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Session Details Sidebar */}
                    <div>
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Session Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {selectedSession ? (
                                    <div className="space-y-4">
                                        <div className="text-center pb-4 border-b">
                                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xl font-bold mb-3">
                                                {selectedSession.studentName.charAt(0)}
                                            </div>
                                            <h3 className="font-bold text-lg">{selectedSession.studentName}</h3>
                                            <p className="text-sm text-muted-foreground">{selectedSession.studentId}</p>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Date</span>
                                                <span className="font-medium">{new Date(selectedSession.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Time</span>
                                                <span className="font-medium">{selectedSession.slot}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Type</span>
                                                <span className="font-medium capitalize">{selectedSession.sessionType}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Concern</span>
                                                <span className="font-medium">{selectedSession.concern}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Status</span>
                                                <Badge className={getStatusColor(selectedSession.status)}>{selectedSession.status}</Badge>
                                            </div>
                                        </div>

                                        {selectedSession.notes && (
                                            <div className="pt-4 border-t">
                                                <p className="text-sm font-medium mb-2">Session Notes</p>
                                                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                                    {selectedSession.notes}
                                                </p>
                                            </div>
                                        )}

                                        {selectedSession.status === "Upcoming" && (
                                            <div className="pt-4 space-y-2">
                                                <Button className="w-full gap-2">
                                                    <PlayCircle className="h-4 w-4" /> Start Session
                                                </Button>
                                                <Button variant="outline" className="w-full">
                                                    Reschedule
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-center text-muted-foreground py-8">
                                        Select an appointment to view details
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
