"use client";

export const Logo = ({ className = "h-8 w-8" }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path
                d="M12 2a10 10 0 1 0 10 10"
                className="text-primary transition-all duration-500"
            />
            <path
                d="M12 12a10 10 0 0 1 10 10" // Decorative visual break
                className="text-transparent"
            />
            <circle cx="12" cy="12" r="4" className="fill-current text-foreground opacity-20" />
        </svg>
    );
};
