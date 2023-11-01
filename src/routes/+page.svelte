<script lang="ts">
    //sticky skills section
    //interstellar black hole
    //eclipse

    import { onMount } from "svelte";

    onMount(() => {
        const starContainer = document.getElementById('home')

        function createStar() {
            if (starContainer) {
                console.log('creating star')
                const star = document.createElement('div');
                star.className = 'star';
                const size = Math.random() * 1 + 0.5; // Star sizes from 0.5px to 2px
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${Math.random() * 100}vw`;
                star.style.top = `${Math.random() * 100}vh`;
                star.style.position = `absolute`;
                star.style.backgroundColor = `white`
                starContainer.appendChild(star);
            }
        }

        for (let i = 0; i < 100; i++) { // Adjust the number of stars as needed
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
        <div class="shooting-star"></div>
        <h1>Mark Horn</h1>
        <h2>SOFTWARE ENGINEER</h2>
        <!-- <p>Motivated by challenging projects with self-guided research and dynamic problem solving.</p> -->
        <p>Currently designing products for humans.</p>
        <button>Explore galaxy</button>
    </section>
</div>

<style>
    .home {
        flex: 1;
        z-index: 1;
        width: 100%;
        height: 100%;
    }

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; 
    }

    section p {
        text-align: center;
    }

    .hero {
        height: 100vh;
        background: linear-gradient(to bottom, #1a1a1a, #000), black;
    }

    .hero p {
        width: 33%;
    }

    h1, h2 {
        font-family: 'Antonio Variable', sans-serif;
    }

    h1 {
        font-size: 4rem;
        border-bottom: 1px solid grey;
    }

    h2 {
        font-size: 2rem;
        margin-top: 0;
    }

    p {
        margin-top: .5rem;
    }

    .hero button {
        margin-top: 2rem;
        z-index: 1;
        color: white;
        padding: .5rem 1rem;
        background-color: #333;
        border: 1px solid #555;
        border-radius: 50px;
        cursor: pointer;
        transition: 300ms ease all;
    }

    .hero button:hover {
        background-color: #444;
        border: 1px solid #666;
    }
</style>
