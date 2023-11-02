import path from "path";
import fs from 'fs/promises';
import { mdsvex, compile } from "mdsvex";

export async function compileMarkdown(url: string) {
    try {
        const data = await fs.readFile(url, 'utf-8');
        return await compile(data, {}).then(x => {
            let markdown = x?.code || '';

            markdown = markdown.replaceAll("{@html `", "").replaceAll("</code>`}</pre>", "</code></pre>"); 
            return markdown;
        });
    } catch (err) {
        return '';
    }
}