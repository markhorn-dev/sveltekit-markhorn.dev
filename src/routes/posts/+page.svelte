<script>
    const posts = Object.entries(import.meta.glob('/.data/**/*.md', { eager: true }))
    console.log(posts)
</script>

<div class="container">
    <h1>POSTS</h1>
    {#each posts as post}
        {post[0]}<br/>
    {/each}
</div>


<style>
    .container {
        flex: 1;
        padding: 8rem 0;
    }
</style>