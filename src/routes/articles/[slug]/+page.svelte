<svelte:head>
    <title>markhorn.dev | {data.article.title}</title>
    <meta name="description" content={data.article.description}>
</svelte:head>

<script lang="ts">
    export let data;
    import LiveLink from '$lib/images/live-link.svg';
    import GithubLink from '$lib/images/github-link.svg';
    import "../../../css/markdown.css";
</script>

<div class="article container">
    <p class="date">{data.article.datePublished}</p>
    <h1>{data.article.title}</h1>
    <p>{data.article.description}</p>
    <ul class="stack">
        {#each data.article.tags as tag}
            <li>{tag}</li>
        {/each}
    </ul>
    <div class="content markdown">
        {@html data.article.body}
    </div>
</div>

<style>
    .container {
        flex: 1;
        width: 100%;
        padding: 8rem 1.5rem;
        max-width: 768px;
        display: flex;
        flex-direction: column;
    }

    ul {
        margin: 0;
        padding: 0;
        padding: .75rem 0;
        list-style-type: none;
        display: flex;
        gap: .25rem;
    }

    li {
        padding: .25rem .5rem;
        border-radius: 50px;
        font-size: 0.85rem;
        color: aqua;
        border: 1px solid rgba(0,255,255,15%);
        background-color: rgba(0,255,255,15%);
    }

    .content {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #333;
    }

    p.date {
        font-size: 0.875rem;
    }

</style>

