export default async function(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
}