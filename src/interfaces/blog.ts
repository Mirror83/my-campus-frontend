import { OutputData } from "@editorjs/editorjs"

export interface Blog {
    title: string
    topics: string[]
    content: OutputData
    excerpt: string
    imageUrl: string
    slug: string
    author_type: string
    author: string
    likes: number
    followers: number
    following: number
}