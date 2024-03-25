import type EditorJS from "@editorjs/editorjs"
import type { OutputData } from "@editorjs/editorjs"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { BASE_URL } from "@/constants"
import { usePlugins } from "@/lib/editor/usePlugins"

type Props = {
  data: OutputData
}

function ReadOnlyEditor({ data }: Props) {
  const ref = useRef<EditorJS>()

  // Stream in the editor as it is large and will take a while to load
  const initializeEditor = useCallback(async () => {
    const { EditorJS, Image, List, Header } = await usePlugins()

    // If editor is not initialized
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor-container",
        onReady: () => {
          // So that we do not re-initialize the editor
          ref.current = editor
          console.log("Editor is ready")
        },
        data,
        readOnly: true,
        tools: {
          header: Header,
          list: List,
          image: Image,
        },
      })
      ref.current = editor
    }
  }, [data])

  useEffect(() => {
    async function createEditor() {
      await initializeEditor()
    }

    if (!ref.current) {
      createEditor()
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
        ref.current = undefined
      }
    }
  }, [ref, initializeEditor])

  return (
    <div className="prose min-h-[500px] px-4 max-w-[800px]">
      <div id="editor-container" />
    </div>
  )
}

export default ReadOnlyEditor
