<svelte:head>
    <title>markhorn.dev | {data.project.title}</title>
    <meta name="description" content={data.project.description}>
</svelte:head>

<script lang="ts">
    export let data;
    import LiveLink from '$lib/images/live-link.svg';
    import GithubLink from '$lib/images/github-link.svg';
    import Carousel from '../../../components/Carousel.svelte';
    import '../../../css/markdown.css';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    let loaded = false;
    onMount(() => loaded = true)
</script>

<div class="project container">
    <p>{data.project.datePublished}</p>
    <h1>{data.project.title}</h1>
    <p>{data.project.description}</p>
    <ul class="stack">
        {#each data.project.tags as tag}
            <li>{tag}</li>
        {/each}
    </ul>
    {#key loaded}
        <div in:fly={{
            y: 200,
            delay: 800
        }}>
            {#if data.project.slides.length > 0}
                <Carousel slides={data.project.slides}/>
            {/if}

            <div class="content markdown">
                {@html data.project.body}
            </div>
        </div>
    {/key}
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
        flex-wrap: wrap;
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

</style>

