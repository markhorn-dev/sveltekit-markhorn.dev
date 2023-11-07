import { basename, dirname } from 'path';
import { formatDate } from './date';

let imgTypes = ['jpg', 'jpeg', 'gif', '.png'];

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
    slides: string[] | [];
    slideBg: string;
  };

interface MarkdownFile {
    metadata: {}
    default: { 
        render: () => {
            html: string;
        }
    }
}

interface slide {
    slug: string;
    file: string;
    url: string;
}

export const projects = await getProjects();

async function getProjects() {
	const markdownFiles = import.meta.glob('/.data/projects/**/project.md');
	const files = Object.entries(markdownFiles);


    let slideFiles: slide[] = [];
    const imageFiles = import.meta.glob('/.data/projects/**/slides/*.*');
    for(const key in imageFiles) {
        const parts = key.split('/');
        const projName = parts[2];
        const fileName = parts[4];
        const slideURL = `/images/projects/${projName}/slides/${fileName}`
        slideFiles.push({ slug: projName, file: fileName, url: slideURL })
    }

    const projectImages = import.meta.glob('/.data/projects/**/project.*');

    let allProjectImages: any[] = [];

    for (const key in projectImages) {
        const parts = key.split('/');
        const slug = parts[2];
        const name = parts[3];
        const ext = name.split('.').pop();
        if (ext && imgTypes.includes(ext)) {
            const path = `images/projects/${slug}/${name}`
            allProjectImages.push({slug:slug, path: path})
        }
    }
 
	let unsorted = await Promise.all(
		files.map(async ([filepath, module]) => {
            const slug = basename(dirname(filepath));
            const href = '/projects/' + slug;
			const contents = await module() as MarkdownFile;
            const metadata = contents.metadata;
            const body = contents.default.render().html

            let foundSlides = slideFiles.filter(slide => slide.slug === slug);
            let slides: string[] = [];
            if (foundSlides.length > 0) {
                foundSlides.forEach(slide => {
                    slides.push(slide.url)
                });
            }

            let projectImage = allProjectImages.filter(x => x.slug === slug )[0];
            const imgURL = projectImage.path;

            let project = { 
                slug,
                href,
                body,
                imgURL,
                slides,
                ...metadata 
            } as Project;

            project.datePublished = formatDate(project.datePublished);

			return project;
		})
	)

    const sorted = unsorted.sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());

    return sorted;
}