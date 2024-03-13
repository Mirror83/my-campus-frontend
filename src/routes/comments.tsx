import { CommentsSection } from "@/components/comments/CommentsSection"
import { BlogComment } from "@/interfaces/comment"
import axios from "@/lib/axios"
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router"

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const response = await axios.get("/comments")
    const comments: BlogComment[] = response.data
    return { comments }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = await request.json()

  const newComment: BlogComment = {
    unique_id: Math.random().toString(),
    blog_slug: params.blogSlug as string,
    comment: data.content as string,
    commentor: "curret_user", // Current user should be passed in with the request (as JSON)
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  }

  try {
    const response = await axios.post("/comments", newComment)
    console.log(response.status)

    return { newComment }
  } catch (error) {
    throw error
  }
}

export default function Comments() {
  const { comments } = useLoaderData() as { comments: BlogComment[] }
  return <CommentsSection comments={comments} />
}
