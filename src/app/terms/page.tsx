export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

                <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
                <p>
                    By accessing and using CampusCare, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Emergency Services</h2>
                <p>
                    CampusCare is NOT an emergency service. In case of emergency, call 911 or go to the nearest emergency room.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. User Conduct</h2>
                <p>
                    You agree to use the platform respectfully. Harassment or abuse in peer support forums will result in immediate suspension.
                </p>

                <p className="mt-12 text-sm text-muted-foreground">Last updated: January 2026</p>
            </div>
        </div>
    );
}
