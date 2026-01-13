"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, Phone, HeartPulse, Users, BookOpen, UserCircle, LifeBuoy, Calendar, ChevronRight, Stethoscope, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import React from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled
                ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm py-2"
                : "bg-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Logo className="h-9 w-9 text-primary transition-transform duration-500 group-hover:rotate-90" />
                            <span className="font-bold text-2xl tracking-tighter text-foreground">
                                CampusCare
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav - Shadcn Navigation Menu */}
                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/" className={navigationMenuTriggerStyle()}>
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Getting Help</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                                                        href="/crisis"
                                                    >
                                                        <Phone className="h-6 w-6 text-white" />
                                                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                                                            Crisis Support
                                                        </div>
                                                        <p className="text-sm leading-tight text-white/90">
                                                            Immediate access to 24/7 emergency hotlines and chat.
                                                        </p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                            <ListItem href="/booking" title="Find a Counselor" icon={<HeartPulse className="h-4 w-4" />}>
                                                Book appointments with campus professionals.
                                            </ListItem>
                                            <ListItem href="/assessment" title="Self Assessment" icon={<LifeBuoy className="h-4 w-4" />}>
                                                Take a private check-in quiz.
                                            </ListItem>
                                            <ListItem href="/resources" title="Resource Library" icon={<BookOpen className="h-4 w-4" />}>
                                                Guides, audio tracks, and articles.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Community</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            <ListItem href="/peer-support" title="Peer Groups" icon={<Users className="h-4 w-4" />}>
                                                Join moderated student support discussions.
                                            </ListItem>
                                            <ListItem href="/peer-support" title="Events" icon={<Calendar className="h-4 w-4" />}>
                                                Workshops and wellness sessions.
                                            </ListItem>
                                            <ListItem href="/volunteer" title="Volunteer" icon={<UserCircle className="h-4 w-4" />}>
                                                Become a peer listener.
                                            </ListItem>
                                            <ListItem href="/counselor/login" title="Counselor Portal" icon={<Stethoscope className="h-4 w-4" />}>
                                                Login to manage appointments.
                                            </ListItem>
                                            <ListItem href="/about" title="About Us" icon={<HeartPulse className="h-4 w-4" />}>
                                                Our mission and team.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="outline" className="rounded-full px-5" asChild>
                            <Link href="/dashboard">
                                <LayoutDashboard className="h-4 w-4 mr-2" /> My Dashboard
                            </Link>
                        </Button>
                        <Button
                            className="rounded-full px-6 font-semibold shadow-none border border-transparent hover:border-primary/20 bg-primary text-primary-foreground hover:bg-primary/90"
                            asChild
                        >
                            <Link href="/crisis">
                                Crisis Help
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Nav - Sheet with Accordions */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="group">
                                    <Menu className="h-8 w-8 text-foreground group-hover:text-primary transition-colors" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] border-l-0 shadow-2xl overflow-y-auto">
                                <SheetHeader className="text-left mb-6">
                                    <SheetTitle className="flex items-center gap-2">
                                        <Logo className="h-7 w-7" />
                                        <span className="font-bold text-xl">Menu</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col">
                                    {/* Home Link */}
                                    <Link
                                        href="/"
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center justify-between py-3 px-2 rounded-lg text-lg font-semibold transition-colors",
                                            pathname === "/" ? "text-primary bg-primary/5" : "text-foreground hover:bg-muted"
                                        )}
                                    >
                                        Home
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </Link>

                                    <Accordion type="single" collapsible className="w-full">
                                        {/* Getting Help Accordion */}
                                        <AccordionItem value="getting-help" className="border-b-0">
                                            <AccordionTrigger className="py-3 px-2 text-lg font-semibold hover:no-underline hover:bg-muted rounded-lg [&[data-state=open]>svg]:text-primary">
                                                Getting Help
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-2">
                                                <div className="flex flex-col space-y-1 pl-4">
                                                    <MobileNavLink href="/booking" onClick={() => setIsOpen(false)} icon={<HeartPulse className="h-4 w-4" />}>Find a Counselor</MobileNavLink>
                                                    <MobileNavLink href="/assessment" onClick={() => setIsOpen(false)} icon={<LifeBuoy className="h-4 w-4" />}>Self Assessment</MobileNavLink>
                                                    <MobileNavLink href="/resources" onClick={() => setIsOpen(false)} icon={<BookOpen className="h-4 w-4" />}>Resources</MobileNavLink>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Community Accordion */}
                                        <AccordionItem value="community" className="border-b-0">
                                            <AccordionTrigger className="py-3 px-2 text-lg font-semibold hover:no-underline hover:bg-muted rounded-lg [&[data-state=open]>svg]:text-primary">
                                                Community
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-2">
                                                <div className="flex flex-col space-y-1 pl-4">
                                                    <MobileNavLink href="/peer-support" onClick={() => setIsOpen(false)} icon={<Users className="h-4 w-4" />}>Peer Groups</MobileNavLink>
                                                    <MobileNavLink href="/volunteer" onClick={() => setIsOpen(false)} icon={<UserCircle className="h-4 w-4" />}>Volunteer</MobileNavLink>
                                                    <MobileNavLink href="/counselor/login" onClick={() => setIsOpen(false)} icon={<Stethoscope className="h-4 w-4" />}>Counselor Portal</MobileNavLink>
                                                    <MobileNavLink href="/about" onClick={() => setIsOpen(false)} icon={<HeartPulse className="h-4 w-4" />}>About Us</MobileNavLink>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    {/* Quick Actions */}
                                    <div className="pt-6 mt-auto space-y-3">
                                        <Button variant="outline" className="w-full h-12 rounded-xl gap-2" asChild>
                                            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                                <LayoutDashboard className="h-4 w-4" />
                                                My Dashboard
                                            </Link>
                                        </Button>
                                        <Button variant="destructive" className="w-full h-12 rounded-xl gap-2" asChild>
                                            <Link href="/crisis" onClick={() => setIsOpen(false)}>
                                                <Phone className="h-4 w-4" />
                                                Emergency Help
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// Helper component for mobile nav links
const MobileNavLink = ({ href, onClick, icon, children }: { href: string; onClick: () => void; icon?: React.ReactNode; children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 py-2.5 px-3 rounded-lg text-base transition-colors",
                pathname === href ? "text-primary bg-primary/5 font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
        >
            {icon && <span className="text-primary">{icon}</span>}
            {children}
        </Link>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode; href: string }
>(({ className, title, children, icon, href, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    ref={ref as any}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        {icon && <span className="text-primary">{icon}</span>}
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5 ml-1">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
