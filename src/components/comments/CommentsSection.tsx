import { AuthorAvatar } from "../blog-post/AuthorAvatar"
import { Button } from "../ui/button"

interface CommentSectionProps {
  comments: CommentData[]
}

interface CommentProps {
  comment: CommentData
}

export interface CommentData {
  userImage: string
  userName: string
  content: string
}

export function CommentsSection({ comments }: CommentSectionProps) {
  const commentElements = comments.map(comment => (
    // The key here should be an id field
    <Comment comment={comment} key={comment.userName} />
  ))
  return (
    <div className="bg-slate-200 mtx-8 min-h-[200px] p-4 rounded-sm">
      <h2 className="text-3xl my-4">Comments</h2>
      <div className="">
        <form>
          <input
            name="comment"
            placeholder="Share your thoughts here..."
            className="p-2 w-4/6 me-4 rounded-sm"
          />
          <Button>Send</Button>
        </form>
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
      <AuthorAvatar authorName={comment.userName} src={comment.userImage} />
      <h3 className="text-bold text-xl">{comment.userName}</h3>
    </div>
  )
}

function Comment({ comment }: CommentProps) {
  return (
    <div className="p-4">
      <CommentorDetailsRow comment={comment} />
      <div className="p-2">{comment.content}</div>
    </div>
  )
}
