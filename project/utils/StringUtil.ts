function getRandomString(length: number, characters: string): string {
    let result: string = '';
    for (let i: number = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getRandomAlphanumeric(length: number): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return getRandomString(length, characters);
}

export { getRandomAlphanumeric };
