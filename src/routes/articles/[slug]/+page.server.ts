import { articles } from "$lib/articles";
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const { slug } = params
    const article = articles.find((article) => slug === article.slug)

    if (!article) {
        throw error(404, 'Not Found')
    }

    return {
        article
    }
}