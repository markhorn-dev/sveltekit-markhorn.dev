<script>
    export let data;
</script>

<svelte:head>
    <title>markhorn.dev | Privacy</title>
    <meta name="description" content="markhorn.dev privacy policy">
</svelte:head>

<div class="privacy container">
    <div class="topper">
        <h1>Privacy Policy</h1>
        <p>Your privacy is of utmost importance.</p>
    </div>
    <div class="markdown">
        <div class="content">{@html data.markdown}</div>
    </div>
</div>

<style>
    .privacy {
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

