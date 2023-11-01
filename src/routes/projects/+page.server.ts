import path from "path";
import fs from 'fs/promises';
import { formatDate } from "$lib/date";
import { error } from "console";
import type { Project } from "$lib/types";

export async function load() {
    try {
        let projects = await loadProjects();
        let tags = loadTags(projects);
        return {
            projects, tags
        };
    } catch (err) {
        console.log(err);
        throw error(500, 'Internal Server Error');
    }
}

async function loadProjects() {
    const projectsDirectory = path.join(process.cwd(), '.data/projects');
    const slugs = await fs.readdir(projectsDirectory);

    const projects = [];

    for (const slug of slugs) {
        const projectFilePath = path.join(projectsDirectory, slug, 'project.json');
        try {
            const projectData = await fs.readFile(projectFilePath, 'utf-8');
            const project = JSON.parse(projectData) as Project;
            project.published = formatDate(project.published);
            projects.push({ slug, ...project });
        } catch (err) {
            console.error(`Error loading project for slug '${slug}': ${err}`);
        }
    }

    projects.sort((a,b) => {
        return new Date(b.published).getTime() - new Date(a.published).getTime();
    })

    return projects;
}

async function loadTags(projects: Project[]) {
    let tags: string[] = [];

    for (const project of projects) {
        project.published = formatDate(project.published);
        for (const tag of project.tags) {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        }
    }
    tags = tags.sort();

    return tags;
}


// let projects = [
//     {
//         slug: 'project-1',
//         title: 'Project One',
//         description: 'Lorem ipsum dolor sit amet, ne vix dicant lucilius, duo graeci accumsan petentium ne.',
//         tags: ['Sveltekit', 'Typescript', 'Javascript']
//     },
//     {
//         slug: 'project-2',
//         title: 'Project Two',
//         description: 'Ne vix dicant lucilius, duo graeci accumsan petentium ne. Lorem ipsum dolor sit amet.',
//         tags: ['Golang']
//     },
//     {
//         slug: 'project-3',
//         title: 'Project Three',
//         description: 'Duo graeci accumsan petentium ne. Lorem ipsum dolor sit amet, ne vix dicant lucilius.',
//         tags: ['React', 'Javascript', 'AWS']
//     },
//     {
//         slug: 'project-4',
//         title: 'Project Four',
//         description: 'Lorem ipsum dolor sit amet, ne vix dicant lucilius, duo graeci accumsan petentium ne.',
//         tags: ['Python', 'Vue']
//     }
// ]; 

// export async function load() {
//     return {
//         projects
//     };
// }


// // import path from 'path';
// // import { readdir } from 'fs/promises';
// // import fs from 'fs/promises';
// // import { mdsvex, compile } from 'mdsvex';

// // interface Project {
// //     title: string;
// //     description: string;
// //     published: string;
// //     stack: string[];
// //     liveURL: string;
// //     githubURL: string;
// //     content: string; //written
// //     slug: string; //written
// //     image: string; //written
// // }

// // export async function load() {
// //     const baseURL = path.join(process.cwd(), '.data', 'projects');
// //     const slugs = await readdir(baseURL);

// //     let projects: Project[] = [];

// //     for (const slug of slugs) {
// //         const fileURL = path.join(process.cwd(), '.data', 'projects', slug, 'project.md');
// //         let project = await loadProject(fileURL, slug);
// //         if (project) {
// //             projects.push(project);
// //         }
// //     }



// //     return {projects};
// // }

// // async function loadProject(url: string, slug: string) {
// //     try {
// //         const content = await fs.readFile(url, 'utf-8');
        
// //         const project = await compile(content).then(x => {
// //             let p = x?.data?.fm as Project;
// //             p.slug = slug;
// //             p.content = x?.code as string;
// //             p.content = p.content?.replaceAll("{@html `", "").replaceAll("</code>`}</pre>", "</code></pre>"); 
// //             return p;
// //         });

// //         // Handle cover image
// //         let imgURL = path.join('./static/images', 'projects', slug, 'image.jpg');

// //         try {
// //             const image = await fs.access(imgURL);
// //             imgURL = imgURL.replace('static/','')
// //             project.image = imgURL
// //         } catch (err) {}
        
// //         return project;
// //     } catch (err) {
// //         return null
// //     }
// // }
