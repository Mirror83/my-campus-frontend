export interface BlogComment {
   unique_id: string
   blog_slug: string
   comment: string
   commentor: string  // The username of the one who made the comment
   created_at: string
   updated_at: string
}