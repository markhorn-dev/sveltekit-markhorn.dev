import fs from 'fs/promises';
import path from 'path';

export async function load() {
    const file = path.join(process.cwd(), 'posts', 'test.json');
    const data = fs.readFile(file, 'utf8');
    console.log(file)
    return {
      props: {
        data,
      },
    };
  }