import { extractInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AuthorAvatarProps {
  src: string
  authorName: string
}

export function AuthorAvatar({ src, authorName }: AuthorAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={`@${authorName}`} />
      <AvatarFallback>{extractInitials(authorName)}</AvatarFallback>
    </Avatar>
  )
}
