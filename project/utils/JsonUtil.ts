import fs from "fs/promises";

async function parseJsonFromFile(path: string) {
    return JSON.parse(await fs.readFile(path, 'utf-8'));
}

export { parseJsonFromFile }