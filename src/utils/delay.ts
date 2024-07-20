export function delay(seconds): Promise<any> {
    return new Promise((r) => setTimeout(r, seconds * 1000));
}
