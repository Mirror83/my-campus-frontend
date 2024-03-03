// TODO: Update the content field, for now it just holds a string summary so that I can render it 
//       the BlogCard elements
export interface Blog {
    title: string
    topics: string[]
    content: string 
    imageUrl: string
    /**The authorSlug is a unique id for each blog post and it associates each post to a user */
    /**Will just append slug to url for reading files */
    // authorSlug: string

    // Replace author slug with author name for display purposes for now
    authorName: string
}