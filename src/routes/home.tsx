import BlogCard from "@/components/home/BlogCard"
import { NavBar } from "@/components/home/NavBar"
import { Blog } from "@/interfaces/blog"
import { Topic } from "@/interfaces/topics"
import { mockBlogList } from "@/mock-content/home-blog-previews"
import { mockTopics } from "@/mock-content/mock-topics"
import { Link } from "react-router-dom"

// TODO: Receive topics as props
// TODO: Store current tab using state
// TODO: Store tabs in a componenet
// TODO: Make all the components using CSS Grid resopnsive
// TODO: Ensure that the topics that are shown in the current tab thing are derived from
//       what the user likes. Otherwise, just pull up the first 5 topics
// Brainstorm: Maybe there should be an endpoint that returns the trending topics and the recommended clubs.

// The colours added to the elements here are just so that I can distinguish the two sections
export function Home() {
  const blogList: Blog[] = mockBlogList
  const topicList: Topic[] = mockTopics

  const trendingTopicsElements = topicList.slice(0, 4).map(topic => (
    <li key={topic.id}>
      <Link to={`topics/${topic.slug}`}>{topic.topic_name}</Link>
    </li>
  ))

  const blogCards = blogList.map(blog => (
    // Actual key will be blog.authorSlug
    <BlogCard blog={blog} key={blog.authorName} />
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
              <div>Technology</div>
              <div>Music</div>
              <div>Inspiration</div>
              <div>Technology</div>
              <div>Lifestyle</div>
              <div>Events</div>
            </div>
            <div className="grid grid-cols-2 my-4 gap-4">{blogCards}</div>
          </div>

          {/**Sidebar */}
          <div className="bg-purple-100 shadow-lg">
            <div className="p-4 m-4">
              <h3 className="text-2xl">Trending Topics</h3>
              <ul>{trendingTopicsElements}</ul>
            </div>
            <div className="p-4 m-4">
              <h3 className="text-2xl">Recommended Clubs</h3>
              <p className="text-sm">Based on your usage and interests</p>
              <ul className="mt-4">
                <Link to="">
                  <li>JKUAT Gavel Club</li>
                </Link>
                <Link to="">
                  <li>Architecture Students Association</li>
                </Link>
                <Link to="">
                  <li>Karate Club</li>
                </Link>
                <Link to="">
                  <li>Kipaji Club</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
