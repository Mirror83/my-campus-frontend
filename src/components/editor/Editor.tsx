// @ts-ignore
import Header from "@editorjs/header"
// @ts-ignore
import Image from "@editorjs/image"
// @ts-ignore
import List from "@editorjs/list"

import EditorJS, { OutputData } from "@editorjs/editorjs"

import { memo, useEffect, useRef } from "react"
import { BASE_URL } from "@/constants"

interface EditorProps {
  title: string
  setTitle: (title: string) => void
  editorData: OutputData
  setEditorData: (data: OutputData) => void
}

function Editor({ editorData, setEditorData }: EditorProps) {
  const editorRef = useRef<EditorJS>()

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editor-container",
        placeholder: "Write something awesome!",
        data: editorData,
        async onChange(api, _event) {
          const data = await api.saver.save()
          setEditorData(data)
        },
        tools: {
          header: Header,
          list: List,
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: `${BASE_URL}api/v1/image/upload`,
              },
              additionalRequestHeaders: {
                authorization: `JWT ${localStorage.getItem("access" ?? "")}`,
              },
            },
          },
        },
      })
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="prose min-h-[500px] max-w-full">
      <div id="editor-container" className="pt-2 transition-colors" />
    </div>
  )
}

export default memo(Editor)
