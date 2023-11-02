<script>
    export let data;
</script>

<svelte:head>
    <title>markhorn.dev | {data.document.title}</title>
    <meta name="description" content={data.document.description}>
</svelte:head>

<div class="document container">
    <div class="topper">
        <h1>{data.document.title}</h1>
        <p>{data.document.description}</p>
    </div>
    <div class="markdown">
        <div class="content">{@html data.document.body}</div>
        <div class="bottom">Last updated: {data.document.lastUpdated}</div>
    </div>
</div>

<style>
    .document {
        flex: 1;
        width: 100%;
        padding: 8rem 1.5rem;
    }

    .topper {
        text-align: center;
    }

    .markdown {
        margin: 4rem 0;
    }

    .content {
        padding: 1.5rem;
        border: 1px solid #333;
        border-radius: var(--border-radius-outer);
        margin: 0 auto;
        max-width: 768px;
    }

    .bottom {
        margin: .75rem auto;
        max-width: 768px;
        display: flex;
        justify-content: flex-end;
        color: #888;
    }
</style>

