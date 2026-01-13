"use client";

import { useState } from "react";
import { getAppData, Counselor } from "@/lib/data";
import { db, Appointment } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Search, Star, Clock, X, CheckCircle2, Video, MessageCircle, User, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BookingState {
    counselor: Counselor | null;
    slot: string;
    step: "select" | "details" | "confirm" | "success";
    sessionType: "video" | "chat" | "in-person";
    concern: string;
    additionalNotes: string;
}

export default function BookingPage() {
    const data = getAppData();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");
    const [booking, setBooking] = useState<BookingState>({
        counselor: null,
        slot: "",
        step: "select",
        sessionType: "video",
        concern: "",
        additionalNotes: ""
    });

    // Extract unique specialties
    const specialties = ["All", ...Array.from(new Set(data.counselors.map(c => c.specialty)))];

    const filteredCounselors = data.counselors.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.bio.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty === "All" || c.specialty === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    const handleSelectSlot = (counselor: Counselor, slot: string) => {
        setBooking({
            ...booking,
            counselor,
            slot,
            step: "details"
        });
    };

    const handleConfirmBooking = () => {
        setBooking({ ...booking, step: "confirm" });
    };

    const handleFinalBook = () => {
        if (!booking.counselor) return;

        const storedUser = sessionStorage.getItem("currentUser");
        const currentUser = storedUser ? JSON.parse(storedUser) : { id: "guest", name: "Guest Student" };

        // Create appointment date (defaulting to tomorrow for demo purposes if no date picker)
        const appointmentDate = new Date();
        appointmentDate.setDate(appointmentDate.getDate() + 1); // Schedule for tomorrow

        const newAppointment: Appointment = {
            id: Date.now().toString(),
            studentId: currentUser.id,
            studentName: currentUser.name,
            counselorId: booking.counselor.id,
            date: appointmentDate.toISOString(),
            slot: booking.slot,
            sessionType: booking.sessionType,
            concern: booking.concern,
            status: "Upcoming",
            notes: booking.additionalNotes
        };

        db.createAppointment(newAppointment);
        setBooking({ ...booking, step: "success" });
    };

    const closeModal = () => {
        setBooking({
            counselor: null,
            slot: "",
            step: "select",
            sessionType: "video",
            concern: "",
            additionalNotes: ""
        });
        if (booking.step === "success") {
            router.push("/dashboard");
        }
    };

    const sessionTypes = [
        { id: "video", label: "Video Call", icon: Video, desc: "Face-to-face via Zoom" },
        { id: "chat", label: "Text Chat", icon: MessageCircle, desc: "Private messaging" },
        { id: "in-person", label: "In-Person", icon: User, desc: "Campus Wellness Center" }
    ];

    const concerns = [
        "Academic Stress",
        "Anxiety",
        "Depression",
        "Relationship Issues",
        "Family Problems",
        "Sleep Issues",
        "Self-Esteem",
        "Career Concerns",
        "Grief/Loss",
        "Other"
    ];

    return (
        <div className="min-h-screen bg-muted/5 py-12">
            <div className="smartboard-container">
                {/* Back Button */}
                <Button variant="ghost" size="sm" className="mb-6" asChild>
                    <Link href="/"><ArrowLeft className="h-4 w-4 mr-2" />Back to Home</Link>
                </Button>

                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4 smartboard-hero-title">
                        Find the Right Support for You
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto smartboard-hero-subtitle">
                        Browse our licensed counselors and book a session that fits your schedule. All sessions are confidential.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-background p-6 rounded-xl shadow-sm border mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name or keyword..."
                            className="w-full pl-9 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <label className="text-sm font-medium whitespace-nowrap">Filter by:</label>
                        <select
                            className="px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-48"
                            value={selectedSpecialty}
                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                        >
                            {specialties.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Counselors Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredCounselors.map((counselor) => (
                        <Card key={counselor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row">
                                {/* Counselor Image */}
                                <div className="h-48 sm:h-auto sm:w-48 bg-muted flex items-center justify-center shrink-0">
                                    <img src={counselor.image} alt={counselor.name} className="h-32 w-32 rounded-full object-cover bg-white" />
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-xl mb-1">{counselor.name}</CardTitle>
                                                <CardDescription className="flex items-center gap-1 text-primary font-medium">
                                                    {counselor.specialty}
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                                                <Star className="h-3 w-3 fill-current" />
                                                {counselor.rating}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                            {counselor.bio}
                                        </p>
                                    </CardHeader>

                                    <CardContent className="mt-auto">
                                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                            <Clock className="h-4 w-4" /> Available Slots
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {counselor.availableSlots.map(slot => (
                                                <Button
                                                    key={slot}
                                                    variant="secondary"
                                                    size="sm"
                                                    className="text-xs h-8 hover:bg-primary hover:text-white transition-colors"
                                                    onClick={() => handleSelectSlot(counselor, slot)}
                                                >
                                                    {slot}
                                                </Button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredCounselors.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No counselors found matching your criteria. Try adjusting the filters.
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {booking.counselor && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-background rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-6 border-b bg-muted/30">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={booking.counselor.image}
                                        alt={booking.counselor.name}
                                        className="h-14 w-14 rounded-full bg-white"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold">{booking.counselor.name}</h2>
                                        <p className="text-sm text-primary">{booking.counselor.specialty}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={closeModal}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Selected Time */}
                            <div className="mt-4 flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-2 rounded-lg w-fit">
                                <Calendar className="h-4 w-4" />
                                <span className="font-medium">{booking.slot}</span>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {/* Step: Details */}
                            {booking.step === "details" && (
                                <div className="space-y-6">
                                    {/* Session Type */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-3">Session Type</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {sessionTypes.map(type => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setBooking({ ...booking, sessionType: type.id as any })}
                                                    className={`p-3 rounded-xl border-2 text-center transition-all ${booking.sessionType === type.id
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                        }`}
                                                >
                                                    <type.icon className={`h-5 w-5 mx-auto mb-1 ${booking.sessionType === type.id ? "text-primary" : "text-muted-foreground"
                                                        }`} />
                                                    <div className="text-xs font-medium">{type.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Primary Concern */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-3">What would you like to discuss?</label>
                                        <select
                                            value={booking.concern}
                                            onChange={(e) => setBooking({ ...booking, concern: e.target.value })}
                                            className="w-full px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="">Select a topic...</option>
                                            {concerns.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Additional Notes */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-3">
                                            Anything else you&apos;d like to share? <span className="text-muted-foreground font-normal">(Optional)</span>
                                        </label>
                                        <textarea
                                            value={booking.additionalNotes}
                                            onChange={(e) => setBooking({ ...booking, additionalNotes: e.target.value })}
                                            placeholder="Share any context that might help your counselor prepare..."
                                            className="w-full px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
                                        />
                                    </div>

                                    <Button
                                        className="w-full h-12 rounded-xl text-base"
                                        onClick={handleConfirmBooking}
                                        disabled={!booking.concern}
                                    >
                                        Continue to Confirm
                                    </Button>
                                </div>
                            )}

                            {/* Step: Confirm */}
                            {booking.step === "confirm" && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Confirm Your Appointment</h3>

                                    <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Counselor</span>
                                            <span className="font-medium">{booking.counselor.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Date & Time</span>
                                            <span className="font-medium">{booking.slot}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Session Type</span>
                                            <span className="font-medium capitalize">{booking.sessionType.replace("-", " ")}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Topic</span>
                                            <span className="font-medium">{booking.concern}</span>
                                        </div>
                                    </div>

                                    <div className="text-sm text-muted-foreground bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 p-4 rounded-xl">
                                        <strong>Reminder:</strong> A confirmation will be sent to your student email. You can reschedule up to 24 hours before your appointment.
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex-1 h-12 rounded-xl"
                                            onClick={() => setBooking({ ...booking, step: "details" })}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="flex-1 h-12 rounded-xl"
                                            onClick={handleFinalBook}
                                        >
                                            Confirm Booking
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step: Success */}
                            {booking.step === "success" && (
                                <div className="text-center py-6 space-y-6">
                                    <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                                            Appointment Confirmed!
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Your session with {booking.counselor.name} is scheduled.
                                        </p>
                                    </div>

                                    <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-primary" />
                                            <span>{booking.slot}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {booking.sessionType === "video" && <Video className="h-4 w-4 text-primary" />}
                                            {booking.sessionType === "chat" && <MessageCircle className="h-4 w-4 text-primary" />}
                                            {booking.sessionType === "in-person" && <User className="h-4 w-4 text-primary" />}
                                            <span className="capitalize">{booking.sessionType.replace("-", " ")} Session</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        A confirmation email has been sent to your student email address.
                                    </p>

                                    <Button
                                        className="w-full h-12 rounded-xl"
                                        onClick={closeModal}
                                    >
                                        Done
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
