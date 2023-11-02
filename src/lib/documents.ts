import { formatDateLong } from './date';

interface Document {
    title: string;
    description: string;
    lastUpdated: string;
    body: string;
  };

interface MarkdownFile {
    metadata: {}
    default: { 
        render: () => {
            html: string;
        }
    }
}

export const documents = await getDocuments();

async function getDocuments() {
	const markdownFiles = import.meta.glob('/.docs/*.md');
	const files = Object.entries(markdownFiles);

	return await Promise.all(
		files.map(async ([filepath, module]) => {
			const contents = await module() as MarkdownFile;
            const metadata = contents.metadata;
            const body = contents.default.render().html
            let document = { body, ...metadata } as Document;

            document.lastUpdated = formatDateLong(document.lastUpdated);

			return document;
		})
	)
}