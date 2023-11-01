<script>
    export let data;

    //sticky info column
</script>

<svelte:head>
    <title>markhorn.dev | Projects</title>
    <meta
        name="description"
        content="Recent professional and personal projects."
    />
</svelte:head>

<div class="projects container">
    <h1>Projects</h1>
    <p>Recent professional and personal projects.</p>
    <ul class="projects">
        {#each data.projects as project}
            <li class="project">
                <a href={"/projects/" + project.slug}>
                    <img src={'images/projects/'+project.slug+'/project.jpg'} alt=""/>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul class="tags">
                        {#each project.tags as tag}
                            <li class="tag">{tag}</li>
                        {/each}
                    </ul> 
                </a>
            </li>
        {/each}
    </ul>
</div>

<style>
    .container {
        flex: 1;
        width: 100%;
        padding: 8rem 1.5rem;
    }
    
    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    ul.projects {
        margin: 4rem 0;
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr 1fr;
    }

    li.project {
        background-color: #111;
        border: 1px solid #333;
        border-radius: var(--border-radius-outer);
        transition: 300ms ease all;
    }

    li.project:hover {
        background-color: #222;
    }

    a {
        display: flex;
        padding: 1rem;
        height: 100%;
        flex-direction: column;
    }

    img {
        width: 100%;
        border-radius: var(--border-radius-inner);
    }

    ul.tags {
        display: flex;
        gap: .25rem;
        flex-wrap: wrap;
        margin-top: auto;
    }

    li.tag {
        font-size: 0.85rem;
        border-radius: 2rem;
        padding: .25rem .5rem;
        color: aqua;
        background-color: rgba(0,255,255,10%);
    }




    .projects h3 {
        margin-top: 1.5rem;
    }

    .project p {
        margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
        ul.projects {
            grid-template-columns: 1fr;
        }
    }
</style>
