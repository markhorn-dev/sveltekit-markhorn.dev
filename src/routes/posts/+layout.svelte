<script lang="ts">
    export let title  = '';
</script>

<div class="container">
    <h1>{title}</h1>
    <slot/>
</div>

<style>
    .container {
        flex: 1;
        width: 100%;
        padding: 8rem 1.5rem;
    }
</style>