import ReadOnlyEditor from "@/components/editor/ReadOnlyEditor"
import { blogPlaceholderContent, welcomePost } from "@/mock-content/mock-text"
import {
  CommentData,
  CommentsSection,
} from "@/components/comments/CommentsSection"
import { BlogPostMetaData } from "@/components/blog-post/BlogPostMetaData"

export function ReadBlog() {
  const comments: CommentData[] = [
    {
      content: "Nice story",
      userImage: "",
      userName: "tom_cat",
    },
  ] // Should be intialized with actual data

  return (
    <>
      <div className="mx-auto p-4 md:w-7/12">
        <BlogPostMetaData
          authorName="My Campus Team"
          dateCreated="28-02-2024"
          totalComments={comments.length}
          totalLikes={0}
        />
        <div className="mb-8">
          <ReadOnlyEditor content={welcomePost} />
        </div>
        <CommentsSection comments={comments} />
      </div>
    </>
  )
}
