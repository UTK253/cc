"use client";

import { useState } from "react";
import { getAppData, Resource } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Headphones, Video, FileText, ExternalLink, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
    const data = getAppData();
    const [filter, setFilter] = useState("All");
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

    const categories = ["All", "Article", "Video", "Audio"];

    const filteredResources = filter === "All"
        ? data.resources
        : data.resources.filter(r => r.type === filter);

    const getIcon = (type: string) => {
        switch (type) {
            case "Article": return <FileText className="h-5 w-5" />;
            case "Video": return <Video className="h-5 w-5" />;
            case "Audio": return <Headphones className="h-5 w-5" />;
            default: return <BookOpen className="h-5 w-5" />;
        }
    };

    const handleResourceClick = (resource: Resource) => {
        if (resource.url) {
            // If resource has a URL, open it in a new tab
            window.open(resource.url, "_blank", "noopener,noreferrer");
        } else {
            // Otherwise, show the content in a modal
            setSelectedResource(resource);
        }
    };

    return (
        <div className="min-h-screen bg-muted/5 py-12">
            <div className="smartboard-container">
                {/* Back Button */}
                <Button variant="ghost" size="sm" className="mb-6" asChild>
                    <Link href="/"><ArrowLeft className="h-4 w-4 mr-2" />Back to Home</Link>
                </Button>

                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-4 smartboard-hero-title">Mental Health Library</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto smartboard-hero-subtitle">
                        Explore our curated collection of articles, guided meditations, and expert videos to help you manage specific challenges.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={filter === cat ? "default" : "outline"}
                            onClick={() => setFilter(cat)}
                            className="rounded-full px-6"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map(resource => (
                        <Card
                            key={resource.id}
                            className="hover:shadow-md transition-all group cursor-pointer border-primary/10"
                            onClick={() => handleResourceClick(resource)}
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                        {resource.category}
                                    </Badge>
                                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                                        {getIcon(resource.type)}
                                    </div>
                                </div>
                                <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                                <CardDescription>{resource.type} • {resource.readTime || resource.duration}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {resource.content || "Click to view this resource content..."}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-colors">
                                    View Resource <ExternalLink className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Resource Content Modal */}
            {selectedResource && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedResource(null)}
                >
                    <div
                        className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b flex justify-between items-start">
                            <div>
                                <Badge variant="secondary" className="bg-primary/10 text-primary mb-2">
                                    {selectedResource.category}
                                </Badge>
                                <h2 className="text-2xl font-bold">{selectedResource.title}</h2>
                                <p className="text-muted-foreground text-sm mt-1">
                                    {selectedResource.type} • {selectedResource.readTime || selectedResource.duration}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedResource(null)}
                                className="shrink-0"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                                {selectedResource.content || "Content not available."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
