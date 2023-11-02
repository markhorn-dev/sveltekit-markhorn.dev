import { basename, dirname } from 'path';
import { formatDate } from './date';

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

            // TODO: Rewrite img urls in the body

            article.datePublished = formatDate(article.datePublished)
            .toUpperCase().replaceAll(',','');

			return article;
		})
	)
}