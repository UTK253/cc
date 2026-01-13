"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AssessmentPage() {
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);

    // GAD-7 Anxiety Scale (Simulated generic questions)
    // Generic options for GAD-7
    const gadOptions = [
        { label: "Not at all", val: 0 },
        { label: "Several days", val: 1 },
        { label: "More than half the days", val: 2 },
        { label: "Nearly every day", val: 3 }
    ];

    const questions = [
        { text: "Feeling nervous, anxious, or on edge?", options: gadOptions },
        { text: "Not being able to stop or control worrying?", options: gadOptions },
        { text: "Worrying too much about different things?", options: gadOptions },
        { text: "Trouble relaxing?", options: gadOptions },
        { text: "Being so restless that it is hard to sit still?", options: gadOptions },
        { text: "Becoming easily annoyed or irritable?", options: gadOptions },
        { text: "Feeling afraid, as if something awful might happen?", options: gadOptions },
        // New question with different options to show flexibility
        {
            text: "How would you rate your sleep quality over the past week?",
            options: [
                { label: "Very Good", val: 0 },
                { label: "Good", val: 1 },
                { label: "Fair", val: 2 },
                { label: "Poor", val: 3 }
            ]
        }
    ];

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const calculateScore = () => answers.reduce((a, b) => a + b, 0);

    const getResult = () => {
        const score = calculateScore();
        if (score < 5) return { level: "Minimal Anxiety", color: "text-green-600", msg: "You seem to be doing okay. Keep practicing self-care!" };
        if (score < 10) return { level: "Mild Anxiety", color: "text-yellow-600", msg: "You might be feeling a bit stressed. Consider exploring our mindfulness resources." };
        if (score < 15) return { level: "Moderate Anxiety", color: "text-orange-600", msg: "Anxiety is affecting you. Connecting with a peer support group might help." };
        return { level: "Severe Anxiety", color: "text-red-600", msg: "You're going through a tough time. We strongly recommend booking a session with a counselor." };
    };

    if (!started) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/10 p-4">
                <Card className="max-w-xl w-full text-center p-6 shadow-lg smartboard-card">
                    <CardHeader>
                        <Button variant="ghost" size="sm" className="w-fit mb-4" asChild>
                            <Link href="/"><ArrowLeft className="h-4 w-4 mr-2" />Back to Home</Link>
                        </Button>
                        <CardTitle className="text-3xl font-bold mb-2">Self-Assessment Check-in</CardTitle>
                        <CardDescription className="text-lg">
                            Understand your mental well-being with a quick, confidential screening.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-left bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg text-sm text-muted-foreground">
                            <p>• Takes less than 2 minutes</p>
                            <p>• Completely anonymous</p>
                            <p>• Personalized recommendations</p>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button size="lg" className="px-8 text-lg" onClick={() => setStarted(true)}>Start Assessment</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    if (showResults) {
        const result = getResult();
        const score = calculateScore();

        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/10 p-4">
                <Card className="max-w-xl w-full shadow-lg">
                    <CardHeader className="text-center">
                        <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                        <CardTitle className="text-3xl mb-2">Assessment Complete</CardTitle>
                        <CardDescription>Here is your personalized summary</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <h3 className={`text-2xl font-bold ${result.color} mb-2`}>{result.level}</h3>
                            <p className="text-muted-foreground">{result.msg}</p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                            <div className="flex justify-between text-sm mb-1">
                                <span>Score Analysis</span>
                                <span className="font-bold">{score} / 21</span>
                            </div>
                            <Progress value={(score / 21) * 100} className="h-2" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full" asChild>
                                <a href="/resources">View Resources</a>
                            </Button>
                            <Button className="w-full" asChild>
                                <a href="/booking">Book Counselor</a>
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button variant="ghost" onClick={() => {
                            setStarted(false);
                            setAnswers([]);
                            setCurrentQuestion(0);
                            setShowResults(false);
                        }}>Retake Assessment</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-xl w-full shadow-lg">
                <CardHeader>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                        <span>Question {currentQuestion + 1} of {questions.length}</span>
                        <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
                    </div>
                    <Progress value={((currentQuestion) / questions.length) * 100} className="h-2" />
                </CardHeader>
                <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-8 text-center">{questions[currentQuestion].text}</h2>
                    <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300" key={currentQuestion}>
                        {questions[currentQuestion].options.map((opt) => (
                            <Button
                                key={`q${currentQuestion}-${opt.val}`} // Unique key per question
                                variant="outline"
                                className="h-12 text-left justify-start px-4 hover:border-primary hover:bg-primary/5 transition-all focus:ring-2 focus:ring-primary focus:border-primary"
                                onClick={(e) => {
                                    (e.currentTarget as HTMLButtonElement).blur(); // Remove focus
                                    handleAnswer(opt.val);
                                }}
                            >
                                {opt.label}
                                <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
