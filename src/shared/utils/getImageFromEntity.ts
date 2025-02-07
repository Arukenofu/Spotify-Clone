type Item = {url: string}[];

export default function getImageFromEntity(
    item: Item,
    arrayKey: number = 1
) {
    if (!item?.length || !item) {
        return null;
    }

    return item[arrayKey]?.url ?? null;
}