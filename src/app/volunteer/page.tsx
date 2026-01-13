"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, HandHeart, Sparkles } from "lucide-react";

export default function VolunteerPage() {
    return (
        <div className="min-h-screen bg-muted/5 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-entrace">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Join Our Peer Support Team</h1>
                    <p className="text-lg text-muted-foreground">
                        Make a difference in your campus community. Become a trained peer listener.
                    </p>
                </div>

                <div className="grid gap-8 animate-entrace">
                    <div className="grid md:grid-cols-3 gap-4">
                        <Card className="glass-panel text-center p-4">
                            <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                            <h3 className="font-semibold">Empathy</h3>
                            <p className="text-sm text-muted-foreground">Listen without judgment.</p>
                        </Card>
                        <Card className="glass-panel text-center p-4">
                            <HandHeart className="h-8 w-8 text-secondary mx-auto mb-2" />
                            <h3 className="font-semibold">Support</h3>
                            <p className="text-sm text-muted-foreground">Guide peers to resources.</p>
                        </Card>
                        <Card className="glass-panel text-center p-4">
                            <Sparkles className="h-8 w-8 text-accent mx-auto mb-2" />
                            <h3 className="font-semibold">Growth</h3>
                            <p className="text-sm text-muted-foreground">Gain valuable training.</p>
                        </Card>
                    </div>

                    <Card className="glass-panel">
                        <CardHeader>
                            <CardTitle>Application Form</CardTitle>
                            <CardDescription>
                                Fill out the details below. We'll contact you for an interview.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Application submitted! We will contact you soon."); }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First name</Label>
                                        <Input id="firstName" placeholder="Jane" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last name</Label>
                                        <Input id="lastName" placeholder="Doe" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Student Email</Label>
                                    <Input id="email" type="email" placeholder="jane.doe@university.edu" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="major">Major / Year</Label>
                                    <Input id="major" placeholder="Psychology, Junior" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason">Why do you want to volunteer?</Label>
                                    <Textarea
                                        id="reason"
                                        placeholder="Tell us about your motivation..."
                                        className="min-h-[100px]"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full" size="lg">Submit Application</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
