export function toggleVolume(
    volume: number,
    setVolume: (volume: number) => void,
) {
    const cachedVolume = JSON.parse(localStorage.getItem('volumeCached') || '1') as number | null;

    if (volume === 0 && !cachedVolume) {
        setVolume(1);

        return;
    }

    if (volume === 0) {
        setVolume(cachedVolume!)
        localStorage.removeItem('volumeCached');

        return;
    }

    localStorage.setItem('volumeCached', JSON.stringify(volume));
    setVolume(0);
}