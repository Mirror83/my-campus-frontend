import { BlogPostMetaData } from "@/components/blog-post/BlogPostMetaData"
import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router"
import { OutputData } from "@editorjs/editorjs"
import ReadOnlyEditor from "@/components/editor/ReadOnlyEditor"
import axios from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { Link } from "react-router-dom"

export interface ReceivedBlog {
  id: number
  title: string
  slug: string
  updated_at: string
  created_at: string
  authorType: string
  author_user: string
  content: OutputData
}

export async function loader({ params }: LoaderFunctionArgs) {
  /** To be modified to call for data from backend using the slug in the url */
  const blogSlug = params.blogSlug

  console.log(blogSlug)
  const response = await axios.get(`api/v1/blog/${blogSlug}`)
  const blog = response.data

  return { blog }
}

export function ReadBlog() {
  const { blog } = useLoaderData() as {
    blog: ReceivedBlog
  }

  return (
    <>
      <div className="w-full p-4 sticky">
        <Link to="/">
          <Button variant={"link"} className="flex gap-2 items-center">
            <ArrowLeftIcon />
            <span className="text-sm">Back Home</span>
          </Button>
        </Link>
      </div>
      <div className="mx-auto">
        <h1 className="px-8 pt-8 text-5xl">{blog.title}</h1>
        <BlogPostMetaData
          authorName={blog.author_user}
          dateCreated={new Date(blog.created_at).toDateString()}
          totalComments={0}
          totalLikes={0}
          className="ms-8"
        />
        <ReadOnlyEditor data={blog.content} />
        <Outlet />
      </div>
    </>
  )
}
