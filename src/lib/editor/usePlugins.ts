export async function usePlugins() {
  const EditorJS = (await import("@editorjs/editorjs")).default

  // @ts-ignore
  const Image = (await import("@editorjs/image")).default

  // @ts-ignore
  const Header = (await import("@editorjs/header")).default

  // @ts-ignore
  const List = (await import("@editorjs/list")).default

  return { EditorJS, Image, Header, List }
}
