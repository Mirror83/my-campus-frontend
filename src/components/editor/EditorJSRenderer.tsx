import EditorJS, { OutputData } from "@editorjs/editorjs"

import { useRef, useEffect } from "react"
import { EDITOR_JS_TOOLS } from "./new-editor-tools"

type Props = {
  data: OutputData
  holder: string
}

const EditorJSRenderer = ({ data, holder }: Props) => {
  //add a reference to editor
  const ref = useRef<EditorJS>()

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        // eslint-disable-next-line
        tools: EDITOR_JS_TOOLS,
        data,
        readOnly: true,
      })
      ref.current = editor
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
      }
    }
  }, [])

  return (
    <div className="prose">
      <div className="px-4 sm-[400px] md:w-[800px]" id={holder}></div>
    </div>
  )
}

export default EditorJSRenderer
