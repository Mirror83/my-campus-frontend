/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-ignore
import Image from "@editorjs/image"
// @ts-ignore
import Header from "@editorjs/header"
// @ts-ignore
import List from "@editorjs/list" 

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  header: Header,
  image: Image,
  list: List
}
