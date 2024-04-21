import type { Blog } from "@/interfaces/blog"
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
  const excerpt: string = blog.excerpt.slice(0, 100) + "..."

  return (
    <div className="grid p-2 outline-1 outline rounded-sm">
      {/**Image */}
      {/* <div className="w-[100px] h-[100px] bg-black rounded-sm"></div> */}

      {/**Textual info */}
      <div className="p-4">
        <div className="flex gap-2 items-center">
          <AuthorAvatar src="" authorName={blog.author} />
          <Link to={`/profile/${blog.author_type}/${blog.author}`}>
            <span className="font-bold text-sm">{blog.author}</span>
          </Link>
        </div>

        <h3 className="text-2xl">{blog.title}</h3>
        {/**To add back the blog post excerpt. */}
        <p>{excerpt}</p>
        <p className="font-light">
          <Link to={`/read-blog/${blog.slug}`} className="underline">
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
