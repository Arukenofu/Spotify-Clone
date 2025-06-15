export default function getCommaSeparatedString<T>(array: T[], pick?: keyof T, separator: string = `, `) {
  let result: string = ''

  array.map((value, index, array) => {
    if (pick) {
      result += value[pick]
    }
    else {
      result += value
    }

    if (index !== array.length - 1) {
      result += separator
    }
  })

  return result
}
