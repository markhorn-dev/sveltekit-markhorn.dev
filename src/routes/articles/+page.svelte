<script lang="ts">
    export let data;
    let articles = data.articles;
    import Checked from "$lib/images/checked.svg";
    import Unchecked from "$lib/images/unchecked.svg";

    type Filters = {
        [key: string]: boolean;
    };

    const filters: Filters = {};

    for (const tag of data.tags) {
        filters[tag] = false;
    }

    //This is the
    function toggleFilter(tag: string) {
        filters[tag] = !filters[tag];
        onFilterChanged();
    }

    //Required function for accessibility, because the div uses an on:click event
    function handleKeyPress(e: Event) {}

    //When the filter is changed, update the data to include only selected tags
    function onFilterChanged() {
        const activeTags = Object.keys(filters).filter((tag) => filters[tag]);
        const filteredData = data.articles.filter((article) => {
            //@ts-ignore
            return activeTags.every((tag: string) => article.tags.includes(tag));
        });
        articles = filteredData;
    }
</script>

<svelte:head>
    <title>markhorn.dev | Articles</title>
    <meta
        name="description"
        content="Recent technical and personal articles on topics I am passionate about."
    />
</svelte:head>

<div class="container">
    <h1>Articles</h1>
    <p>Some technical and personal articles on topics I am passionate about.</p>
    <div class="grid">
        <h4>FILTER</h4>
        <h5>SHOWING {articles.length} OF {data.articles.length} ARTICLES</h5>
        <div class="filters">
            {#each data.tags as tag}
                <div
                    class="control"
                    role="checkbox"
                    aria-checked="false"
                    tabindex="0"
                    on:click={() => toggleFilter(tag)}
                    on:keydown={handleKeyPress}
                >
                    <img
                        src={filters[tag] ? Checked : Unchecked}
                        height={18}
                        width={18}
                        alt=""
                    />
                    <div class={filters[tag] ? "text highlighted" : "text"}>
                        {tag}
                    </div>
                </div>
            {/each}
        </div>

        <ul class="articles">
            {#each articles as article}
                <li class="article">
                    <a href={"/articles/" + article.slug}>
                        <h5>{article.datePublished}</h5>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <ul class="tags">
                            {#each article.tags as tag}
                                <li class="tag">{tag}</li>
                            {/each}
                        </ul>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .container {
        flex: 1;
        width: 100%;
        padding: 8rem 1.5rem;
    }

    .grid {
        margin: 4rem 0;
        display: grid;
        gap: 1rem 2rem;
        grid-template-columns: 1fr 2fr;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    ul.articles {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
    }

    li.article {
        height: fit-content;
        padding: 1.5rem;
        border: 1px solid #333;
        border-radius: var(--border-radius-outer);
        transition: 300ms ease all;
        background-color: #111;
    }

    li.article:hover {
        background-color: #222;
    }

    ul.tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
    }

    li.tag {
        font-size: 0.85rem;
        border-radius: 2rem;
        padding: 0.25rem 0.5rem;
        color: aqua;
        background-color: rgba(0, 255, 255, 10%);
    }

    h5 {
        color: var(--grey);
    }

    .articles h3 {
        margin-top: 1.5rem;
    }

    .articles p {
        margin-bottom: 1.5rem;
    }

    .control {
        display: flex;
        padding: 0.5rem;
        flex-direction: row;
        background-color: #111;
        color: var(--grey);
        cursor: pointer;
        align-items: center;
        border-radius: var(--border-radius-inner);
        transition: 300ms ease all;
    }

    .control:hover {
        background-color: #222;
    }

    .control img {
        margin-right: 0.5rem;
    }

    .filters {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .highlighted {
        color: #fff;
    }

    @media (max-width: 768px) {
        .grid {
            grid-template-columns: 1fr;
        }
        .filters {
            flex-direction: row;
        }
        .grid > h4 {
            order: 1;
        }
        .grid > h5 {
            order: 3;
        }
        .grid > .filters {
            order: 2;
        }
        .grid > ul {
            order: 4;
        }
    }
</style>
