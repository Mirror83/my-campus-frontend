import {
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  useEditor,
  Editor,
} from "@tiptap/react"

import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import StarterKit from "@tiptap/starter-kit"

import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

declare interface MenuBarProps {
  children?: React.ReactNode
  editor: Editor
}

const MenuBar = (menuBarProps: MenuBarProps) => {
  const editor = menuBarProps.editor
  if (!editor) {
    return null
  }

  return (
    <div className="flex gap-2 flex-wrap py-4">
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(editor.isActive("bold") && "is-active")}
      >
        bold
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </Button>
    </div>
  )
}

// define your extension array
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this space is where you'll write <em>your</em> story. You can have:
</p>
<ul>
  <li>
    a bullet list with one …
  </li>
  <li>
    … or two list items (or more).
  </li>
</ul>
<p>
  Or, a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  and more, to help you convey your message. Give it a try and click a little bit around. And when you're 
  ready, erase this and start from a fresh canvas.
</p>
<blockquote>
“The secret of getting ahead is getting started.
 The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks,
 and then starting on the first one.”
  <br />
  — Mark Twain
</blockquote>
`

export function WriteBlog() {
  const editor = useEditor({
    extensions,
    content,
  })

  // Will probably be used to push to the db
  function saveContent() {
    console.log(JSON.stringify(editor?.getJSON(), null, 2))
    toast("Saved successfully!", {
      description: `Stored to localStorage at ${new Date(Date.now()).toLocaleDateString()}`,
      dismissible: true,
      action: {
        label: "View full post",
        onClick: () => console.log("Navigating to full post..."),
      },
    })
  }

  return (
    <div>
      <div className="mx-10 my-4 w-10/12 lg:w-8/12">
        <h1 className="text-3xl pb-4">Create</h1>
        {editor && (
          <>
            <MenuBar editor={editor} />
            <div className="outline outline-1 rounded-md">
              <EditorContent editor={editor} />
              <FloatingMenu editor={editor}>
                This is the floating menu
              </FloatingMenu>
              <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
            </div>
            <div className="py-4">
              <Button onClick={saveContent} className="me-4">
                Save
              </Button>
              <Button
                variant="destructive"
                onClick={() => editor.commands.clearContent()}
              >
                Clear
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
