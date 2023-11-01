<script>
    export let data;
</script>

<svelte:head>
    <title>markhorn.dev | Acceptable Use</title>
    <meta name="description" content="markhorn.dev acceptable use policy">
</svelte:head>

<div class="acceptable container">
    <div class="topper">
        <h1>Acceptable Use Policy</h1>
        <p>The acceptable use policy of markhorn.dev.</p>
    </div>
    <div class="markdown">
        <div class="content">{@html data.markdown}</div>
    </div>
</div>

<style>
    .acceptable {
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
</style>

