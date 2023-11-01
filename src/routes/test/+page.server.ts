import fs from 'fs/promises';
import path from 'path';

export async function load() {
    const file = path.join(process.cwd(), 'posts', 'test.json');
    const data = await fs.readFile(file, 'utf8');
    const json = JSON.parse(data);
    console.log(json)
    return {
      props: {
        data,
      },
    };
  }