import type EditorJS from "@editorjs/editorjs"
import type { OutputData } from "@editorjs/editorjs"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { BASE_URL } from "@/constants"
import { usePlugins } from "@/lib/editor/usePlugins"

function Editor() {
  const ref = useRef<EditorJS>()

  // Stream in the editor as it is large and will take a while to load
  const initializeEditor = useCallback(async () => {
    const { EditorJS, Image, List, Header } = await usePlugins()
    // If editor is not initialized
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor-container",
        placeholder: "Type your content here...",
        onReady: () => {
          // So that we do not re-initialize the editor
          ref.current = editor
          console.log("Editor is ready")
        },
        inlineToolbar: true,
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
      ref.current = editor
    }
  }, [])

  useEffect(() => {
    async function createEditor() {
      await initializeEditor()
    }

    console.log(ref)

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

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    const blocks = await ref.current?.save()
    if (blocks) {
      console.log(blocks)
    } else {
      console.log("Unable to get blocks.")
    }
  }

  return (
    <div className="prose min-h-[500px] max-w-full">
      <form id="write-blog-form" onSubmit={submit}>
        <textarea
          placeholder="Title"
          className="text-4xl p-4 mx-2 w-full appearance-none active:border-0"
          maxLength={100}
        ></textarea>
        <div id="editor-container" />
      </form>
    </div>
  )
}

export default Editor
