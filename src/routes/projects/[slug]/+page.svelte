<svelte:head>
    <title>markhorn.dev | {data.project.title}</title>
    <meta name="description" content={data.project.description}>
</svelte:head>

<script>
    export let data;
    let project = data.project;
    import LiveLink from '$lib/images/live-link.svg';
    import GithubLink from '$lib/images/github-link.svg';
</script>

<div class="project container">
    <p>Oct 1 2023</p>
    <h1>{project.title}</h1>
    <p>{project.description}</p>

    <ul class="stack">
        {#each project.tags as tag}
            <li>{tag}</li>
        {/each}
    </ul>

    {#if project.liveURL}
    <a href={project.liveURL} target="_blank">
            <img src={LiveLink} alt=""/>
            <h4>{project.liveURL}</h4>
        </a>
    {/if}

    {#if project.githubURL}
        <a href={project.githubURL} target="_blank">
            <img src={GithubLink} alt=""/>
            <h4>{project.githubURL}</h4>
        </a>
    {/if}

    <div class="content">
        {@html data.project.content}
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

    a {
        display: flex;
        align-items: center;
        opacity: 66%;
        transition: 300ms ease all;
    }

    a:hover {
        opacity: 100%;
    }

    a img {
        margin-right: .5rem;
        
    }

    .content {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #333;
    }

</style>

