import { documents } from "$lib/documents.js";
import { error } from '@sveltejs/kit';

export async function load() {
    const document = documents.find((doc) => doc.title.toLowerCase().includes('terms'));

    if (!document) {
        throw error(404, 'Not Found')
    }

    return {
        document
    }
}