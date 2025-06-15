let tempTitle: string

export default function (title: string, options?: Options) {
  const isTemporarily = options?.temporarily || false

  if (isTemporarily) {
    if (!title) {
      document.title = tempTitle
      tempTitle = ''

      return
    }

    tempTitle = document.title
    document.title = title

    return
  }

  if (tempTitle) {
    tempTitle = title

    return
  }

  document.title = title
}

interface Options {
  temporarily?: boolean
}
