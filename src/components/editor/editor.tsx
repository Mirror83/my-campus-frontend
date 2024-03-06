// @ts-ignore
import Header from "@editorjs/header"
// @ts-ignore
import Image from "@editorjs/image"
// @ts-ignore
import List from "@editorjs/list"

import type { OutputData } from "@editorjs/editorjs"
import EditorJS from "@editorjs/editorjs"

import { memo, useEffect, useRef } from "react"
import { BASE_URL } from "@/constants"

type Props = {
  data?: OutputData
  onChange(val: OutputData): void
  holder: string
}

const EditorBlock = ({ data, onChange, holder }: Props) => {
  const ref = useRef<EditorJS>()

  // Initialize editorjs
  useEffect(() => {
    // Added tools here so that I can get the value of the access token from
    // localstorage from when the component is mounted.
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
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
        data,
        async onChange(api, event) {
          const data = await api.saver.save()
          onChange(data)
        },
      })
      ref.current = editor
    }

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
