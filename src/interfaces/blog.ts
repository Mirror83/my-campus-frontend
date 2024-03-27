import { OutputData } from "@editorjs/editorjs"

export interface Blog {
    title: string
    topics: string[]
    content: OutputData 
    imageUrl: string
    slug: string
    author: string
    likes: number
    followers: number
    following: number
}