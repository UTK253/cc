import Link from 'next/link';
import { Logo } from "@/components/ui/logo";

export default function Footer() {
    return (
        <footer className="bg-muted/30 border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4 group">
                            <Logo className="h-8 w-8 transition-transform group-hover:scale-110" />
                            <span className="font-bold text-xl text-foreground">CampusCare</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Supporting student mental health and wellness with confidential, accessible care. We are here for you, 24/7.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-6 text-foreground">Services</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/booking" className="hover:text-primary transition-colors">Find a Counselor</Link></li>
                            <li><Link href="/crisis" className="hover:text-primary transition-colors">Crisis Support</Link></li>
                            <li><Link href="/resources" className="hover:text-primary transition-colors">Resource Library</Link></li>
                            <li><Link href="/assessment" className="hover:text-primary transition-colors">Self Assessment</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-6 text-foreground">Community</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/peer-support" className="hover:text-primary transition-colors">Peer Groups</Link></li>
                            <li><Link href="/peer-support" className="hover:text-primary transition-colors">Events Calendar</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/volunteer" className="hover:text-primary transition-colors">Volunteer</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-6 text-destructive">Emergency</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            If you or someone you know is in immediate danger, please call emergency services.
                        </p>
                        <div className="space-y-3">
                            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-xl font-bold text-center border border-destructive/20 shadow-sm">
                                988 - Suicide & Crisis Lifeline
                            </div>
                            <div className="bg-destructive/5 text-destructive px-4 py-3 rounded-xl font-medium text-center border border-destructive/10 hover:bg-destructive/10 transition-colors cursor-pointer">
                                Campus Security: 555-0199
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>© 2026 CampusCare. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
