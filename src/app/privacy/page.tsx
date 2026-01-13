export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="lead text-xl text-muted-foreground mb-8">
                    Your privacy is at the core of our mission. This policy outlines how CampusCare protects your data.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">1. Data Collection</h2>
                <p>
                    We strictly limit the data we collect. We do not record chat sessions unless a safety risk is identified. Appointment data is stored on HIPAA-compliant encrypted servers.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Confidentiality</h2>
                <p>
                    All counseling sessions are confidential. Information is only shared if there is an imminent threat of harm to yourself or others, as required by law.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. Cookies & Tracking</h2>
                <p>
                    We use minimal cookies strictly for session management. We do not use third-party tracking pixels or sell your data to advertisers.
                </p>

                <p className="mt-12 text-sm text-muted-foreground">Last updated: January 2026</p>
            </div>
        </div>
    );
}
