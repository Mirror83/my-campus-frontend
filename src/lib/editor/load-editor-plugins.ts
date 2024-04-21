export async function loadEditorPlugins() {
  const EditorJS = (await import("@editorjs/editorjs")).default

  // @ts-ignore
  const Image = (await import("@editorjs/image")).default

  // @ts-ignore
  const Header = (await import("@editorjs/header")).default

  // @ts-ignore
  const List = (await import("@editorjs/list")).default

  // @ts-ignore
  const Code = (await import("@editorjs/code")).default

   // @ts-ignore
  const InlineCode = (await import("@editorjs/inline-code")).default

  // @ts-ignore
  const Table = (await import("@editorjs/table")).default

  return { EditorJS, Image, Header, List, Code, InlineCode, Table }
}
