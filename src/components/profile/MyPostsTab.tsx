import type { Blog } from "@/interfaces/blog"
import BlogCard from "../home/BlogCard"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

type Props = {
  blogs: Blog[]
}

export function MyPosts({ blogs }: Props) {
  if (blogs.length) {
    return (
      <div className="flex flex-wrap flex-col gap-4">
        <Button className="mb-4">
          <Plus className="me-2" />
          <Link to="/write-blog">Add one</Link>
        </Button>
        {blogs.map((blog, i) => (
          <BlogCard blog={blog} key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <p className="text-bold text-3xl mb-4"> No blogs currently.</p>
        <p className="mb-4">But there's no better time than the present 😉. </p>

        <Button>
          <Plus className="me-2" />
          <Link to="/write-blog">Create one</Link>
        </Button>
      </div>
    </div>
  )
}
