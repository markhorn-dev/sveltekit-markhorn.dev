import { documents } from "$lib/documents.js";
import { error } from '@sveltejs/kit'
import { title } from "process";

export async function load() {
    const document = documents.find((doc) => doc.title.toLowerCase().includes('acceptable'));

    if (!document) {
        throw error(404, 'Not Found')
    }

    return {
        document
    }
}