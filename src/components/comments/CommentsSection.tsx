import { BlogComment } from "@/interfaces/comment"
import { AuthorAvatar } from "../blog-post/AuthorAvatar"
import { Button } from "../ui/button"
import { Form, useSubmit } from "react-router-dom"
import { useState } from "react"

interface CommentSectionProps {
  comments: BlogComment[]
}

interface CommentProps {
  comment: BlogComment
}

export function CommentsSection({ comments }: CommentSectionProps) {
  const [commentContent, setCommentContent] = useState("")
  const commentElements = comments.map(comment => (
    <Comment comment={comment} key={comment.unique_id} />
  ))

  const submit = useSubmit()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = {
      content: commentContent,
    }
    submit(JSON.stringify(data), {
      method: "post",
      encType: "application/json",
    })
  }

  return (
    <div className="bg-slate-200 mtx-8 min-h-[200px] p-4 rounded-sm">
      <h2 className="text-3xl my-4">Comments</h2>
      <div className="">
        <Form method="post" onSubmit={handleSubmit}>
          <input
            name="comment"
            placeholder="Share your thoughts here..."
            className="p-2 w-4/6 me-4 rounded-sm"
            value={commentContent}
            onChange={event => {
              console.log("input: " + event.target.value)
              setCommentContent(event.target.value)
            }}
            required={true}
          />
          <Button>Send</Button>
        </Form>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          {commentElements.length}{" "}
          {comments.length === 1 ? "comment" : "comments"}
        </p>
        {commentElements}
      </div>
    </div>
  )
}

function CommentorDetailsRow({ comment }: CommentProps) {
  return (
    <div className="flex items-center gap-2">
      <AuthorAvatar authorName={comment.commentor} src={""} />
      <h3 className="text-bold text-xl">{comment.commentor}</h3>
    </div>
  )
}

function Comment({ comment }: CommentProps) {
  return (
    <div className="p-4">
      <CommentorDetailsRow comment={comment} />
      <div className="p-2">{comment.comment}</div>
    </div>
  )
}
