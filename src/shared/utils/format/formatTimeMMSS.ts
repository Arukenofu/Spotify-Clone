export default function (time: number) {
  const minutes = `${Math.trunc(time / 60)}`
  const seconds = `${(time % 60).toFixed(0)}`

  return `${minutes.padStart(2, '')}:${seconds.padStart(2, '0')}`
}
