import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface ReadOnlyEditorProps {
  content: string
}

export default ({ content }: ReadOnlyEditorProps) => {
  const editor = useEditor({
    editable: false,
    content,
    extensions: [StarterKit],
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <EditorContent editor={editor} />
    </>
  )
}
