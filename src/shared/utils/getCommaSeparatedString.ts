export default function<T>(array: T[], pick?: keyof T) {
  let result: string = '';

  array.map((value, index, array) => {
    if (pick) {
      result += value[pick];
    } else {
      result += value;
    }

    if (index !== array.length - 1) {
      result += `, `;
    }
  });

  return result;
}
