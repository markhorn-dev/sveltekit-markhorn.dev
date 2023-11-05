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
    <!-- <section class="hero">
        <h1>Mark Horn</h1>
        <h2>SOFTWARE ENGINEER</h2>
        <p>Motivated by challenging projects with self-guided research and dynamic problem solving.</p>
        <p>Currently designing products for humans.</p>
        <button>Explore</button>
    </section> -->
    <section class="hero">
        <h1 class="name">Mark Horn</h1>
        <h2 class="title">SOFTWARE ENGINEER</h2>
        <p>Currently designing products for humans.</p>
    </section>
    <!-- <section class="about">
        <div class="container">
            <h1 class="section-heading">What I do</h1>
            <p class="section-description">What I bring to the table.</p>
            <ul>
                <li>
                    <div class="glyph"></div>
                    <p class="title">System Design</p>
                    <p class="description">Thougtful design decisions ensuring seamless integration, efficiency, and scalability, for your digital products.</p>
                </li>
                <li>
                    <div class="glyph"></div>
                    <p class="title">UI Design</p>
                    <p class="description">UI designs blending creativity and functionality, enhancing user experiences with visually engaging interfaces.</p>
                </li>
                <li>
                    <div class="glyph"></div>
                    <p class="title">Development</p>
                    <p class="description">Empowering your products journey with tailored software solutions for seamless innovation and reliability.</p>
                </li>
                <li>
                    <div class="glyph"></div>
                    <p class="title">Consulting</p>
                    <p class="description">Comprehensive software and design consulting, with custom solutions for your business.</p>
                </li>
                <li>
                    <div class="glyph"></div>
                    <p class="title">Mentoring</p>
                    <p class="description">Mentoring by both teaching and learning from others in the pursuit of technical excellence.</p>
                </li>
            </ul>
        </div>
    </section>
    <section class="stack">
        <div class="container">
            <div class="outer-grid">
                <div class="heading">
                    <h1>Stack</h1>
                    <p>Languages and frameworks I have expertise with.</p>
                </div>
                <div class="inner-grid">
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                </div>
            </div>
        </div>
    </section>
    <section class="another">
        hello
    </section> -->
</div>

<style>
    .home {
        flex: 1;
        background: linear-gradient(to bottom, #1a1a1a, #000), black;
    }

    .container {
        width: 100%;
    }

    section {
        position: relative;
        z-index: 12;
        display: flex;
        flex-direction: column;
        justify-content: center; 
        padding: 4rem 0;
    }

    .section-heading, .section-description {
        text-align: center;
    }

    .section-description {
        margin-bottom: 3rem;
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

    .about .glyph {
        height: 40px;
        width: 40px;
        background-color: black;
        border-radius: 6px;
    }

    .about .title {
        margin-top: .5rem;
        color: white;
        font-size: 1.05rem;
        font-weight: bold;
    }

    .about .description {
        margin-top: 0.25rem;
        font-size: 0.95rem;
    }

    .about ul {
        width: 100%;
        display: grid;
        margin: 0;
        padding: 0;
        gap: 1.5rem;
        list-style-type: none;
        grid-template-columns: repeat(12,1fr);
    }

    .about li {
        grid-column: span 4;
        border: 1px solid #444;
        padding: 1.5rem;
        border-radius: 12px;
        background-color: #222;

    }

    .about li:nth-child(4) {
        grid-column: 3 / 7;
    }

    @media (max-width: 768px) {
        .about ul {
            grid-template-columns: repeat(4, 1fr);
        }
        .about li {
            grid-column: span 2;
        }
        .about li:nth-child(4) {
            grid-column: span 2;
        }
        .about li:nth-child(5) {
            grid-column: 2 / 4;
        }
    }

    @media (max-width: 600px) {
        .about ul {
            grid-template-columns: 1fr;
        }
        .about li {
            grid-column: span 1;
        }
        .about li:nth-child(4) {
            grid-column: span 1;
        }
        .about li:nth-child(5) {
            grid-column: 1;
        }
    }

    /* STACK *****************************/

    .stack {
        background-color: #111;
        border-top: 1px solid #333;
        border-bottom: 1px solid #222;
    }

    .heading {
            background-color: blue;
        }

    .outer-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .inner-grid {
        background-color: red;
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(6,1fr);
    }

    .item {
        width: 32px;
        height: 32px;
        background-color: aliceblue;
    }

    @media (max-width: 768px) {

        .heading {
            grid-column: span 2;
        }

    }


</style>
