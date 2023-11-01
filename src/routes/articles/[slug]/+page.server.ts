import { error } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import { compileMarkdown } from '$lib/markdown.js';
import type { Article } from '$lib/types.js';
import { formatDate } from '$lib/date.js';

export async function load({ params }) {

    try {    
        //load the json data
        const jsonFile = path.join(process.cwd(), '.data/articles', params.slug, 'article.json');
        const jsonData = await fs.readFile(jsonFile, 'utf-8');
        const parsedJson = JSON.parse(jsonData);

        //load the markdown data
        const markdownFile = path.join(process.cwd(), '.data/articles', params.slug, 'article.md');
        const markdownData = await compileMarkdown(markdownFile);
        
        //assemble the article
        const article: Article = parsedJson;
        article.content = markdownData;

        //format the date
        article.published = formatDate(article.published);

        //return the article data to the page
        return { article }; 

    } catch (err) {
        console.log(err);
        throw error(404, 'Not Found');
    }
}
