import { read } from 'fs';
import fs from 'fs/promises';

let posts: string[] = [];

export async function load() {
    console.log('load')
    let res: string[] = [];
    const entries = Object.entries(import.meta.glob('/.data/**/*.json', { eager: true }))
    .map(([filepath, entry]) => {
        res.push(filepath)
    })

    
    console.log(res)
    posts = res;
    let data = await fs.readFile(posts[0], 'utf-8');
    console.log(data)

    return {
        post: data
    }
}