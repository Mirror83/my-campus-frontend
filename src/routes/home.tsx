import { AuthorAvatar } from "@/components/blog-post/AuthorAvatar"
import BlogCard from "@/components/home/BlogCard"
import { NavBar } from "@/components/home/NavBar"
import type { Blog } from "@/interfaces/blog"
import { Club } from "@/interfaces/clubs"
import type { Topic } from "@/interfaces/topics"
import axios from "@/lib/axios"
import { Link, useLoaderData } from "react-router-dom"

// TODO: Receive topics, clubs from the backend. For now, without pagination
// TODO: Store current tab using state
// TODO: Store tabs in a component
// TODO: Make all the components using CSS Grid responsive
// TODO: Ensure that the topics that are shown in the current tab thing are derived from
//       what the user likes. Otherwise, just pull up the first 5 topics

export async function loader() {
  const blogs = (await axios.get("api/v1/blog")).data
  const topics = (await axios.get("api/v1/topics/trending")).data
  const clubs = (await axios.get("api/v1/club/list")).data

  return { blogs, topics, clubs }
}

export function Home() {
  const { blogs, topics, clubs } = useLoaderData() as {
    blogs: Blog[]
    topics: Topic[]
    clubs: Club[]
  }

  const trendingTopicsElements = topics.slice(0, 4).map(topic => (
    <li key={topic.id} className="list-decimal m-2 underline">
      <Link to={`/topics/${topic.slug}`}>{topic.topic_name}</Link>
    </li>
  ))

  return (
    <div>
      <NavBar />
      <main>
        {/**The min-h is a stop-gap that needs to be checked */}
        <div className="grid grid-cols-[3fr_1fr] min-h-[100vh]">
          <div className="p-4 ">
            <div className="flex gap-4 overflow-x-auto p-2 font-light">
              {/**Bold represents a chosen element */}
              <div className="font-bold border-b-4 border-black">For you</div>
              <div>Trending</div>
              <div>Events</div>
            </div>
            <div className="grid grid-cols-2 my-4 gap-4">
              {blogs.map(blog => (
                <BlogCard blog={blog} key={blog.slug} />
              ))}
            </div>
          </div>

          {/**Sidebar */}
          <div className="bg-purple-100 shadow-lg">
            <div className="p-4 m-4">
              <h3 className="text-2xl">Trending Topics</h3>
              <ul>{trendingTopicsElements}</ul>
            </div>
            <div className="p-4 m-4">
              <h3 className="text-2xl">Recommended Clubs</h3>
              <ul className="mt-4">
                {clubs.map((club, i) => (
                  <Link
                    to={`/profile/club/${club.slug}`}
                    className="flex gap-2 items-center"
                  >
                    <AuthorAvatar authorName={club.club_name} src="" />
                    <li key={i}>{club.club_name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
