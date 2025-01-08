interface Image { url?: string }
type Images = Image[];

type Item =
    | { album: { images: Images } }
    | { images: Images };

export default function getImageFromEntity(
    item: Item,
    arrayKey: number = 1
) {
    if ('album' in item) {
        return item.album.images[arrayKey]?.url ?? null;
    }

    return item.images[arrayKey]?.url ?? null;
}