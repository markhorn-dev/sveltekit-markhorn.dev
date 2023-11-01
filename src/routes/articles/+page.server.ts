import path from "path";
import fs from 'fs/promises';
import { formatDate } from "$lib/date";
import { error } from "console";
import type { Article } from "$lib/types";

export async function load() {
    try {
        let articles = await loadArticles();
        let tags = loadTags(articles);
        return {
            articles, tags
        };
    } catch (err) {
        console.log(err);
        throw error(500, 'Internal Server Error');
    }
}

async function loadArticles() {
    const articlesDirectory = path.join(process.cwd(), '.data/articles');
    const slugs = await fs.readdir(articlesDirectory);

    const articles = [];

    for (const slug of slugs) {
        const articleFilePath = path.join(articlesDirectory, slug, 'article.json');
        try {
            const articleData = await fs.readFile(articleFilePath, 'utf-8');
            const article = JSON.parse(articleData) as Article;
            article.published = formatDate(article.published);
            articles.push({ slug, ...article });
        } catch (err) {
            console.error(`Error loading article for slug '${slug}': ${err}`);
        }
    }

    articles.sort((a,b) => {
        return new Date(b.published).getTime() - new Date(a.published).getTime();
    })

    return articles;
}

async function loadTags(articles: Article[]) {
    let tags: string[] = [];

    for (const article of articles) {
        article.published = formatDate(article.published);
        for (const tag of article.tags) {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        }
    }
    tags = tags.sort();

    return tags;
}
