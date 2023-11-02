import { articles } from "$lib/articles";
import { error } from '@sveltejs/kit'

export async function load() {
    if (!articles) {
        throw error(404, 'Not Found')
    }

    articles.sort((a,b) => {
        return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
    })

    let tags: string[] = [];

    for (const article of articles) {
        for (const tag of article.tags) {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        }
    }
    tags = tags.sort();

    return {
        articles, tags
    }
}