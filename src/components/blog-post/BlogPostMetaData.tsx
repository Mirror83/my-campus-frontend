import { ChatBubbleIcon } from "@radix-ui/react-icons"
import { AuthorAvatar } from "./AuthorAvatar"
import { Link, useFetcher } from "react-router-dom"
import { ThumbsUp } from "lucide-react"
import { useState } from "react"

interface BlogPostMetaDataProps {
  authorName: string
  authorType?: string
  dateCreated: string
  totalComments: number
  totalLikes: number
  className?: string
}

export function BlogPostMetaData({
  authorName,
  authorType = "user",
  dateCreated,
  totalComments,
  totalLikes,
  className,
}: BlogPostMetaDataProps) {
  const fetcher = useFetcher()
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className={className}>
      <div className="flex gap-4 py-2 items-center text-sm">
        <Link
          to={`/profile/${authorType}/${authorName}`}
          className="flex gap-4 items-center"
        >
          <AuthorAvatar src="" authorName={authorName} />
          <strong>{authorName}</strong>
        </Link>

        <em>{dateCreated}</em>
      </div>
      <div className="flex gap-4 py-1 items-center">
        <div className="flex gap-2 items-center">
          <ChatBubbleIcon className="h-6 w-6" />
          <em>{totalComments}</em>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={() => setIsLiked(!isLiked)}>
            <ThumbsUp className="h-6 w-6" fill={isLiked ? "#242748" : "none"} />
          </button>
          <em>{isLiked ? totalLikes + 1 : totalLikes}</em>
        </div>
      </div>
    </div>
  )
}
