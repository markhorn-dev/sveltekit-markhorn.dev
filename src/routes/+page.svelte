<script lang="ts">
    //sticky skills section
    //interstellar black hole
    //eclipse

    import { onMount } from "svelte";

    onMount(() => {
        const starContainer = document.getElementById('home')

        function createStar() {
            if (starContainer) {
                const star = document.createElement('div');
                star.className = 'star';
                const size = Math.random() * 1 + 0.5;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${Math.random() * 100}vw`;
                star.style.top = `${Math.random() * 100}vh`;
                star.style.position = `fixed`;
                star.style.backgroundColor = `white`
                star.style.zIndex = `1`
                starContainer.appendChild(star);
            }
        }

        for (let i = 0; i < 100; i++) {
          createStar();
        }
    })
</script>


<svelte:head>
    <title>markhorn.dev | Home</title>
    <meta
        name="description"
        content="The portfolio website of Mark Horn."
    />
</svelte:head>

<div id="home" class="home">
    <section class="hero">
        <h1 class="name">Mark Horn</h1>
        <h2 class="title">SOFTWARE ENGINEER</h2>
        <p>Currently designing products for humans.</p>
    </section>
</div>

<style>
    .home {
        flex: 1;
        background: linear-gradient(to bottom, #1a1a1a, #000), black;
    }

    section {
        position: relative;
        z-index: 12;
        display: flex;
        flex-direction: column;
        justify-content: center; 
        padding: 4rem 0;
    }

    .hero {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
        
    }

    .hero .name, .hero .title {
        font-family: 'Antonio Variable', 'Inter';
    }

    .hero .name {
        font-size: 2rem;
        margin-bottom: 0;
    }

    .hero .title {
        font-size: 2rem;
    }

</style>
