import { cn, extractInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AuthorAvatarProps {
  src: string
  authorName: string
  className?: string
}

export function AuthorAvatar({
  src = "",
  authorName,
  className,
}: AuthorAvatarProps) {
  return (
    <Avatar className={cn(className, "font-bold")}>
      <AvatarImage src={src} alt={`@${authorName}`} />
      <AvatarFallback>{extractInitials(authorName)}</AvatarFallback>
    </Avatar>
  )
}
