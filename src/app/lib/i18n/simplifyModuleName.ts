export default function<T extends Record<string, any>>(module: T): Record<string, any> {
    return Object.entries(module).reduce((acc: Record<string, any>, [key, value]) => {
        const simplifiedKey = key
            .replace('./locales/', '')
            .replace('.ts', '')
            .slice(3);
        acc[simplifiedKey] = value;
        return acc;
    }, {});
}