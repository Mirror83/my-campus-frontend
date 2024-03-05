import EditorJS, { OutputData } from "@editorjs/editorjs"

// eslint-disable-next-line  @typescript-eslint/no-implicit-any
import { EDITOR_JS_TOOLS } from "./new-editor-tools"
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
        // eslint-disable-next-line
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
