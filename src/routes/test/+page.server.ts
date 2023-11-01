import fs from 'fs/promises';
import path from 'path';

export async function load() {
    const file = path.resolve('static', 'testProject.json');
    console.log(file);
    const json = await fs.readFile(file,"utf8");
    const parsed = JSON.parse(json);
    console.log(parsed);
    return {
        parsed
    }
}