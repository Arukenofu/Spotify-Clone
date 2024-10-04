export default function (max: number, exclude?: number): number {
  let randomNumber: number;

  do {
    randomNumber = Math.floor(Math.random() * (max + 1));
  } while (randomNumber === exclude);

  return randomNumber;
}
