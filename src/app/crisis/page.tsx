import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageSquare, AlertTriangle, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function CrisisPage() {
    return (
        <div className="flex flex-col min-h-screen bg-red-50/50 dark:bg-red-950/10">
            <div className="container max-w-4xl mx-auto py-12 px-4">

                {/* Urgent Banner */}
                <div className="bg-destructive/10 border-l-4 border-destructive p-6 mb-8 rounded-r-lg shadow-sm">
                    <div className="flex items-start">
                        <AlertTriangle className="h-6 w-6 text-destructive mt-1 mr-4 shrink-0" />
                        <div>
                            <h1 className="text-xl font-bold text-destructive mb-2">Are you in immediate danger?</h1>
                            <p className="text-destructive/80 mb-4">
                                If you or someone else is at risk of harm, please do not wait. Call emergency services immediately.
                            </p>
                            <Button variant="destructive" size="lg" className="w-full sm:w-auto font-bold text-lg animate-pulse" asChild>
                                <a href="tel:911">Call 911 Now</a>
                            </Button>
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center mb-8">Crisis Support Resources</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Hotline Card */}
                    <Card className="border-primary/20 shadow-md">
                        <CardHeader className="text-center">
                            <Phone className="h-12 w-12 mx-auto text-primary mb-2" />
                            <CardTitle className="text-2xl">Suicide & Crisis Lifeline</CardTitle>
                            <CardDescription>Free, confidential support 24/7</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-4xl font-black text-primary mb-6">988</div>
                            <div className="space-y-3">
                                <Button className="w-full text-lg" size="lg" asChild>
                                    <a href="tel:988">Call 988</a>
                                </Button>
                                <p className="text-sm text-muted-foreground">Available for everyone, everywhere.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Text Line Card */}
                    <Card className="border-accent/20 shadow-md">
                        <CardHeader className="text-center">
                            <MessageSquare className="h-12 w-12 mx-auto text-accent mb-2" />
                            <CardTitle className="text-2xl">Crisis Text Line</CardTitle>
                            <CardDescription>Text with a trained counselor</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-4xl font-black text-accent mb-6">HOME to 741741</div>
                            <div className="space-y-3">
                                <Button variant="outline" className="w-full text-lg border-accent text-accent hover:bg-accent hover:text-white" size="lg" asChild>
                                    <a href="sms:741741?body=HOME">Text Now</a>
                                </Button>
                                <p className="text-sm text-muted-foreground">Text from anywhere in the US/Canada.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Specialized Resources */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Specialized Support</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardHeader className="p-4">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4 text-purple-600" />
                                    Domestic Violence
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-sm font-bold">1-800-799-SAFE</p>
                            </CardContent>
                        </Card>
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardHeader className="p-4">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4 text-blue-600" />
                                    Veterans Crisis Line
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-sm font-bold">988 (Press 1)</p>
                            </CardContent>
                        </Card>
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardHeader className="p-4">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4 text-pink-600" />
                                    LGBTQ+ Trevor Project
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-sm font-bold">1-866-488-7386</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/" className="text-muted-foreground hover:text-primary underline underline-offset-4">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
