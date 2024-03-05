//index.tsx
import { OutputData } from "@editorjs/editorjs"
import { useState } from "react"
import EditorBlock from "@/components/editor/new-editor"
import { NavBar } from "@/components/home/NavBar"
import { blogPlaceholder } from "@/mock-content/mock-text"
import { Button } from "@/components/ui/button"

export const WriteBlog = () => {
  //State to hold output data. We'll use this to store
  const [data, setData] = useState<OutputData>(blogPlaceholder)

  function onSave() {
    console.log(data)
  }

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-12">
        <div className="p-4 col-span-8">
          <EditorBlock
            data={data}
            onChange={setData}
            holder="editorjs-container"
          />
        </div>
        <div className="p-4">
          <div className="flex gap-4">
            <Button onClick={onSave}>Save</Button>
            <Button variant={"destructive"}>Discard</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
