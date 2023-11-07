import { basename, dirname } from 'path';
import { formatDate } from './date';
import { JSDOM } from 'jsdom';

interface Article {
    slug: string;
    title: string;
    description: string;
    datePublished: string;
    body: string;
    tags: string[];
  };

interface MarkdownFile {
    metadata: {}
    default: { 
        render: () => {
            html: string;
        }
    }
}

export const articles = await getArticles();

async function getArticles() {
	const markdownFiles = import.meta.glob('/.data/articles/**/article.md');
	const files = Object.entries(markdownFiles);

	return await Promise.all(
		files.map(async ([filepath, module]) => {
            const slug = basename(dirname(filepath));
			const contents = await module() as MarkdownFile;
            const metadata = contents.metadata;
            const body = contents.default.render().html

            let article = { 
                slug,
                body,
                ...metadata 
            } as Article;

            //format the published date
            article.datePublished = formatDate(article.datePublished)
            .toUpperCase().replaceAll(',','');

            // Rewrite img urls in the body
            // article.png -> /images/articles/react-vs-svelte/article.png

            const dom = new JSDOM(article.body);
            const document = dom.window.document;
            const imgElements = document.querySelectorAll('img');

            imgElements.forEach(imgElement => {
                const oldSrc = imgElement.getAttribute('src') || '';
                const imageName = oldSrc.replace(/^.*[\\/]/, '');
                const newSrc = `/images/articles/${article.slug}/${imageName}`;
                imgElement.setAttribute('src', newSrc);
                //console.log(oldSrc, imageName, '->', newSrc)
            });
            article.body = document.documentElement.outerHTML;

			return article;
		})
	)
}
