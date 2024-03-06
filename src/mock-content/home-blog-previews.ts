import type { Blog } from "@/interfaces/blog";

/** This file will store all the blog preview used for the current dummy version of the home page */
export const mockBlogList: Blog[] = [
    {
        title: "Tech Trends 2024",
        content: "Some content",
        imageUrl: "",
        topics: ["Technology"],
        authorName: "Guru B"
    },
    {
        title: " Unveiling the Soul of Contemporary Art",
        content: "Step into the vibrant realm of contemporary art, where each stroke tells a story and every canvas whispers emotions",
        imageUrl: "",
        topics: ["Art"],
        authorName: "Joint Artists Group"
    },
    {
        title: " The Science of Happiness",
        content: "Discover simple habits for a happier you. It is generally belived that happiness is a state that naturally happens. This misconception has penetrated society and has made them think that happiness should not be worked for.",
        imageUrl: "",
        topics: ["Psychology", "Lifestyle"],
        authorName: "Major Kabithu"
    },
]