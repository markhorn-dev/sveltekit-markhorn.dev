import { basename, dirname } from 'path';
import { formatDate } from './date';

interface Project {
    slug: string;
    href: string;
    title: string;
    description: string;
    datePublished: string;
    body: string;
    tags: string[];
    imgURL: string;
    liveURL: string;
    githubURL: string;
  };

interface MarkdownFile {
    metadata: {}
    default: { 
        render: () => {
            html: string;
        }
    }
}

export const projects = await getProjects();

async function getProjects() {
	const markdownFiles = import.meta.glob('/.data/projects/**/project.md');
	const files = Object.entries(markdownFiles);

	return await Promise.all(
		files.map(async ([filepath, module]) => {
            const slug = basename(dirname(filepath));
            const href = '/projects/' + slug;
			const contents = await module() as MarkdownFile;
            const metadata = contents.metadata;
            const imgURL = 'images/projects/' + slug + '/project.jpg'
            const body = contents.default.render().html

            let project = { 
                slug,
                href,
                body,
                imgURL,
                ...metadata 
            } as Project;

            // TODO: Rewrite img urls in the body

            project.datePublished = formatDate(project.datePublished);

			return project;
		})
	)
}