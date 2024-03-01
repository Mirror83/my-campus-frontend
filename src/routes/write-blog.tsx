import {
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  useEditor,
} from "@tiptap/react"

import { ArrowLeftIcon } from "@radix-ui/react-icons"

import MenuBar from "@/components/editor/MenuBar"

import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import StarterKit from "@tiptap/starter-kit"

import { Button } from "@/components/ui/button"

import { toast } from "sonner"
import { blogPlaceholderContent } from "@/mock-content/mock-text"
import { useNavigate } from "react-router"

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

export function WriteBlog() {
  const editor = useEditor({
    extensions,
    content: blogPlaceholderContent,
  })

  const navigate = useNavigate()

  // Will probably be used to push to the db
  function saveContent() {
    console.log(JSON.stringify(editor?.getJSON(), null, 2))
    toast("Saved successfully!", {
      description: `Stored to localStorage at ${new Date(Date.now()).toLocaleDateString()}`,
      dismissible: true,
      action: {
        label: "Go to profile",
        onClick: () => navigate("/profile"),
      },
    })
  }

  return (
    <div>
      <div className="mx-10 my-4 w-10/12 lg:w-8/12">
        <div className="flex gap-1 items-center">
          <Button
            variant="ghost"
            onClick={() => {
              // Navigate back to the previous page
              navigate(-1)
            }}
          >
            <ArrowLeftIcon />
          </Button>

          <h1 className="text-3xl">Create</h1>
        </div>

        {editor && (
          <>
            <MenuBar editor={editor} />
            <div className="outline outline-1 rounded-md">
              <EditorContent editor={editor} />
              <FloatingMenu editor={editor}>
                <div className="bg-slate-600 text-white p-2 rounded">
                  This is the floating menu
                </div>
              </FloatingMenu>
              <BubbleMenu editor={editor}>
                <div className="bg-slate-600 text-white p-2 rounded">
                  This is the bubble menu
                </div>
              </BubbleMenu>
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
