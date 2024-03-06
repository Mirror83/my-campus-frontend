import type { OutputData } from "@editorjs/editorjs"
import EditorJS from "@editorjs/editorjs"

import { useRef, useEffect } from "react"
import { EDITOR_JS_TOOLS } from "./editor-tools"

type Props = {
  data: OutputData
  holder: string
}

const EditorJSRenderer = ({ data, holder }: Props) => {
  const ref = useRef<EditorJS>()

  // Initialize editorjs with some initial data
  // and the read-only property it set to true
  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_JS_TOOLS,
        data,
        readOnly: true,
      })
      ref.current = editor
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
      }
    }
  }, [data, holder])

  return (
    <div className="prose">
      <div className="px-4 sm-[400px] md:w-[800px]" id={holder}></div>
    </div>
  )
}

export default EditorJSRenderer
