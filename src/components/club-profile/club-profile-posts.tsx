import BlogCard from "@/components/home/BlogCard"
import { Blog } from "@/interfaces/blog"

interface ClubProfilePostsProps {
  blogs: Blog[]
}

export function ClubProfilePosts({ blogs }: ClubProfilePostsProps) {
  if (blogs.length) {
    return (
      <div className="flex flex-wrap flex-col gap-4 p-8">
        <h3 className="font-bold text-lg">Posts</h3>

        {blogs.map((blog, i) => (
          <BlogCard blog={blog} key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <h3 className="font-bold text-lg">Posts</h3>

      <div className="text-center">
        <p className="text-bold text-3xl mb-4"> No blog posts currently. 😭</p>
        <p className="mb-4">Check back later. </p>
      </div>
    </div>
  )
}
