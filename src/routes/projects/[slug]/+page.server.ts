import { error } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import { compileMarkdown } from '$lib/markdown.js';
import type { Project } from '$lib/types.js';
import { formatDate } from '$lib/date.js';

export async function load({ params }) {

    try {    
        //load the json data
        const testFile = path.resolve(process.cwd(),'.data/projects',params.slug, 'project.json');
        console.log(testFile);
        const testJson = await fs.readFile(testFile,"utf8");
        const parsedJson = JSON.parse(testJson);
        console.log(testJson);
        // const jsonFile = '/.data/projects/'+ params.slug + 'project.json' + 'utf8';
        // //const jsonFile = path.join(process.cwd(), '.data/projects', params.slug, 'project.json');
        // const jsonData = await fs.readFile(process.cwd() + jsonFile, 'utf-8');
        

        //load the markdown data
        //const markdownFile = path.join(process.cwd(), '.data/projects', params.slug, 'project.md');
        //const markdownData = await compileMarkdown(markdownFile);
        const markdownData = '';
        
        //assemble the article
        const project: Project = parsedJson;
        project.content = markdownData;

        //format the date
        project.published = formatDate(project.published);

        //return the project data to the page
        return { project };  

    } catch (err) {
        console.log(err);
        throw error(404, 'Not Found');
    }
}
