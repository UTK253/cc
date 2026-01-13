import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Heart, Users } from "lucide-react";
import { getAppData } from "@/lib/data";

export default function AboutPage() {
    const { stats } = getAppData();

    return (
        <div className="min-h-screen bg-background py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Mission */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight mb-6">Our Mission</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        CampusCare is dedicated to creating a safe, inclusive, and accessible mental health support system for every student. We believe that mental wellness is the foundation of academic success and personal growth.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center p-6 bg-primary/5 rounded-2xl">
                        <div className="text-4xl font-bold text-primary mb-2">{stats.studentsHelped}+</div>
                        <div className="text-muted-foreground">Students Supported</div>
                    </div>
                    <div className="text-center p-6 bg-primary/5 rounded-2xl">
                        <div className="text-4xl font-bold text-primary mb-2">100%</div>
                        <div className="text-muted-foreground">Confidential</div>
                    </div>
                    <div className="text-center p-6 bg-primary/5 rounded-2xl">
                        <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                        <div className="text-muted-foreground">Crisis Support</div>
                    </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <Card>
                        <CardHeader>
                            <ShieldCheck className="h-8 w-8 text-secondary mb-2" />
                            <CardTitle>Privacy First</CardTitle>
                        </CardHeader>
                        <CardContent>
                            We use end-to-end encryption and adhere to strict HIPAA and FERPA guidelines to ensure your data and conversations remain completely private.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Heart className="h-8 w-8 text-destructive mb-2" />
                            <CardTitle>Compassionate Care</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Our team of licensed professionals and trained peer supporters are here to listen without judgment, providing empathy and understanding.
                        </CardContent>
                    </Card>
                </div>

                {/* Team Preview */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Meet the Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="text-center">
                                <img
                                    src={`https://api.dicebear.com/7.x/micah/svg?seed=Admin${i}&backgroundColor=e0f2fe`}
                                    alt="Team Member"
                                    className="w-32 h-32 rounded-full mx-auto mb-4 bg-muted shadow-lg"
                                />
                                <h3 className="font-semibold">Dr. Alex Smith</h3>
                                <p className="text-sm text-muted-foreground">Clinical Director</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
