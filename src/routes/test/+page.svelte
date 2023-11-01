<script>
    export let data;
</script>

<div class="test container">
    <h1>{data.parsed.title}</h1>
    <h4>{data.parsed.description}</h4>
</div>

<style>
    .test {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>