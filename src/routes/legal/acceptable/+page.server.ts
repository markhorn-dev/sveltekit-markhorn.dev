import { compileMarkdown } from "$lib/markdown";

export async function load() {
    let data = await compileMarkdown('.docs/acceptable.md');
    let markdown = data
    return {
        markdown
    };
}
