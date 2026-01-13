import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Calendar, BookOpen, MessageCircle, Users, Activity, Heart, ArrowRight } from "lucide-react";
import { getAppData } from "@/lib/data";

export default function Home() {
  const data = getAppData();
  const { stats } = data;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 -z-20" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] -z-10" />

        <div className="smartboard-container relative z-10 text-center animate-entrace">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-foreground/80">Confidential • 24/7 Support • Free for Students</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight smartboard-hero-title">
            Peace of mind, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">made for students.</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed smartboard-hero-subtitle">
            Your safe space for mental wellness. Connect with counselors, find peer support, or just take a breath. We're here when you need us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300" asChild>
              <Link href="/booking">Find a Counselor</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg bg-white/50 dark:bg-black/20 backdrop-blur border-white/20 hover:bg-white/80 transition-all duration-300 group" asChild>
              <Link href="/assessment">
                Generic Check-in
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                title: "Crisis Help",
                desc: "Immediate support 24/7",
                href: "/crisis",
                color: "text-destructive",
                bg: "bg-destructive/10",
                btnVariant: "destructive" as const,
                btnText: "Talk Now"
              },
              {
                icon: Calendar,
                title: "Counseling",
                desc: "Book a 1:1 session",
                href: "/booking",
                color: "text-primary",
                bg: "bg-primary/10",
                btnVariant: "outline" as const,
                btnText: "Book Slot"
              },
              {
                icon: BookOpen,
                title: "Resources",
                desc: "Guides & Tools",
                href: "/resources",
                color: "text-secondary",
                bg: "bg-secondary/10",
                btnVariant: "outline" as const,
                btnText: "Explore"
              },
              {
                icon: Users,
                title: "Community",
                desc: "Peer Support Groups",
                href: "/peer-support",
                color: "text-accent",
                bg: "bg-accent/10",
                btnVariant: "outline" as const,
                btnText: "Join In"
              }
            ].map((item, i) => (
              <Card key={i} className="glass-panel border-none hover-lift overflow-hidden group">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`h-7 w-7 ${item.color}`} />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant={item.btnVariant} className="w-full rounded-xl" asChild>
                    <Link href={item.href}>{item.btnText}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-20 bg-muted/50 dark:bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-5xl font-black text-foreground mb-2 tracking-tighter">{stats.studentsHelped}+</div>
              <div className="text-lg text-muted-foreground font-medium">Students Supported</div>
            </div>
            <div className="p-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <div className="text-5xl font-black text-foreground mb-2 tracking-tighter">{stats.activeCounselors}</div>
              <div className="text-lg text-muted-foreground font-medium">Active Counselors</div>
            </div>
            <div className="p-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Activity className="h-8 w-8 text-accent" />
                </div>
              </div>
              <div className="text-5xl font-black text-foreground mb-2 tracking-tighter">{stats.avgWaitTime}</div>
              <div className="text-lg text-muted-foreground font-medium">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">Stories of Hope</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-panel border-white/50 dark:border-white/10 p-8 hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-0">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(i => <Heart key={i} className="h-5 w-5 text-red-400 fill-current" />)}
                </div>
                <p className="text-xl italic text-muted-foreground mb-8 leading-relaxed">
                  "I was overwhelmed with exam stress, but talking to Dr. Chen helped me find balance again. The booking process was so easy and respectful of my privacy."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-400 to-green-400" />
                  <div>
                    <p className="font-bold text-lg">Student, Class of '26</p>
                    <p className="text-sm text-muted-foreground">Computer Science Major</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-panel border-white/50 dark:border-white/10 p-8 hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-0">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(i => <Heart key={i} className="h-5 w-5 text-red-400 fill-current" />)}
                </div>
                <p className="text-xl italic text-muted-foreground mb-8 leading-relaxed">
                  "The peer support group made me realize I wasn't alone. It's a safe space where I can truly be myself without fear of judgment."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400" />
                  <div>
                    <p className="font-bold text-lg">Freshman Student</p>
                    <p className="text-sm text-muted-foreground">Arts & Humanities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
