import { compileMarkdown } from "$lib/markdown";

export async function load() {
    let data = await compileMarkdown('.docs/privacy.md');
    let markdown = data
    return {
        markdown
    };
}