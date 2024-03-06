/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/** eslint-disable  @typescript-eslint/no-implicit-any
 */

import type { OutputData } from "@editorjs/editorjs"
import EditorJS from "@editorjs/editorjs"

import { EDITOR_JS_TOOLS } from "./editor-tools"
import { memo, useEffect, useRef } from "react"

//props
type Props = {
  data?: OutputData
  onChange(val: OutputData): void
  holder: string
}

const EditorBlock = ({ data, onChange, holder }: Props) => {
  //add a reference to editor
  const ref = useRef<EditorJS>()

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_JS_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save()
          onChange(data)
        },
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
    <div className="prose w-[800px]">
      <div className="w-[800px]" id={holder}></div>
    </div>
  )
}

export default memo(EditorBlock)
