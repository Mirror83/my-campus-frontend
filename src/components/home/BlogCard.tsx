import { Blog } from "@/interfaces/blog"
import { AuthorAvatar } from "../blog-post/AuthorAvatar"
import { Link } from "react-router-dom"
import { badgeVariants } from "../ui/badge"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  blog: Blog
}

// TODO: Get author for corresponding post
// TODO: Include topics in the design
function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="grid p-2 border-none bg-red-100 rounded-sm">
      {/**Image */}
      {/* <div className="w-[100px] h-[100px] bg-black rounded-sm"></div> */}

      {/**Textual info */}
      <div className="p-4">
        <div className="flex gap-2 items-center">
          <AuthorAvatar src="" authorName={blog.authorName} />
          <Link to={""}>
            <span className="font-bold text-sm">{blog.authorName}</span>
          </Link>
        </div>

        <h3 className="text-2xl">{blog.title}</h3>
        {/**To be replaced with renderer, or maybe will think of a better way to handle it. */}
        <p className="font-light">
          {blog.content.substring(0, 100)}...
          <Link to={""} className="underline">
            Read more.
          </Link>
        </p>
        <div className="my-2">
          {blog.topics.map(topic => (
            <Link
              className={cn("me-2", badgeVariants({ variant: "secondary" }))}
              key={topic}
              to={""}
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogCard
