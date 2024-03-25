import EditorJSRenderer from "@/components/editor/EditorJSRenderer"
import { BlogPostMetaData } from "@/components/blog-post/BlogPostMetaData"
import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router"
import { OutputData } from "@editorjs/editorjs"
import ReadOnlyEditor from "@/components/editor/ReadOnlyEditor"
import React from "react"

type ReceivedBlog = {
  id: number
  title: string
  slug: string
  updatedAt: string
  createdAt: string
  authorType: string
  author_username: string
  content: OutputData
}

export async function loader({ params }: LoaderFunctionArgs) {
  /** To be modified to call for data from backend using the slug in the url */
  const blogSlug = params.blogSlug
  const blog = {
    id: 1,
    title: "Ready, set, go...where?",
    slug: "",
    updatedAt: "2024-03-08 06:13:07.230597",
    createdAt: "2024-03-08 06:13:07.230597",
    authorType: "user",
    author_username: "jb",
    content: {
      time: 1709878318412,
      blocks: [
        {
          id: "oUq2g_tl8y",
          type: "header",
          data: { text: "Ready, set, go...where?", level: 1 },
        },
        {
          id: "zbGZFPM-iI",
          type: "paragraph",
          data: {
            text: "This is my first blog post and I am wondering what I am going to say from now own. But I think that I should just start and say something to get the momentum going.",
          },
        },
        {
          id: "AmbsAVu3vl",
          type: "image",
          data: {
            file: {
              url: "http://localhost:8000/media/blog/images/Sample1.png",
            },
            caption: "Sprite-sheet for a soccer game",
            withBorder: false,
            stretched: false,
            withBackground: false,
          },
        },
        {
          id: "0i5Bd0qjBY",
          type: "header",
          data: { text: "Premise", level: 2 },
        },
        {
          id: "uw1wSooZCy",
          type: "paragraph",
          data: {
            text: "I know that this is not the image we are expecting to see.",
          },
        },
      ],
      version: "2.29.0",
    },
  }

  return { blog }
}

export function ReadBlog() {
  // Test with comment data
  const { blog } = useLoaderData() as {
    blog: ReceivedBlog
  }

  return (
    <div className="mx-auto">
      <h1 className="px-8 pt-8 text-5xl">{blog.title}</h1>
      <BlogPostMetaData
        authorName={blog.author_username}
        dateCreated={new Date(blog.createdAt).toDateString()}
        totalComments={0}
        totalLikes={0}
        className="ms-8"
      />
      <ReadOnlyEditor data={blog.content} />
      <Outlet />
    </div>
  )
}
