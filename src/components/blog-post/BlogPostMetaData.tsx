import { ChatBubbleIcon, PlusIcon } from "@radix-ui/react-icons"
import { AuthorAvatar } from "./AuthorAvatar"

interface BlogPostMetaDataProps {
  authorName: string
  dateCreated: string
  totalComments: number
  totalLikes: number
  className?: string
}

export function BlogPostMetaData({
  authorName,
  dateCreated,
  totalComments,
  totalLikes,
  className,
}: BlogPostMetaDataProps) {
  return (
    <div className={className}>
      <div className="flex gap-4 py-2 items-center text-sm">
        <AuthorAvatar src="https://github.com/shadcn.png" authorName="shadcn" />
        <strong>{authorName}</strong>
        <em>{dateCreated}</em>
      </div>
      <div className="flex gap-4 py-1 items-center">
        <div className="flex gap-1 items-center">
          <ChatBubbleIcon />
          <em>{totalComments}</em>
        </div>
        <div className="flex gap-1 items-center">
          <PlusIcon />
          <em>{totalLikes}</em>
        </div>
      </div>
    </div>
  )
}
