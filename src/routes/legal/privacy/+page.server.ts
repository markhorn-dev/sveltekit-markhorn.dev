import { documents } from "$lib/documents.js";
import { error } from '@sveltejs/kit'

export async function load() {
    const document = documents.find((doc) => doc.title.toLowerCase().includes('privacy'));

    if (!document) {
        throw error(404, 'Not Found')
    }

    return {
        document
    }
}