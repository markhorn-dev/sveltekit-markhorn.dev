<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    export let slides: string[] = [];

    let images = slides;

    let rnd = Math.floor(Math.random() * 3) + 1;
    let bgImage = `/images/.default/${rnd}.jpg`;


    let index = 0;
    let distance = 0;
    let direction = 1;
    let animating = false;

    function next() {
        if (animating) return;
        direction = 1;
        index = (index + 1) % images.length;
    }

    function prev() {
        if (animating) return;
        direction = -1;
        index = (index - 1 + images.length) % images.length;
    }

    function goto(i: number) {
        if (animating) return;
        direction = i > index ? 1 : -1;
        index = i;
    }

    function windowResize() {
        let car = document.getElementById("carousel");
        distance = car?.scrollWidth || 0;
    }

    onMount(() => {
        window.addEventListener("resize", windowResize);
        () => {
            window.removeEventListener("resize", windowResize);
        };
        windowResize();
    });
</script>

{#if images.length > 0}
<div id="carousel" class="carousel" style="background-image: url({bgImage})">
    {#key index}
        <img
            src={images[index]}
            alt=""
            in:fly={{
                x: direction == -1 ? -distance : distance,
                opacity: 1,
                duration: 500,
            }}
            out:fly={{
                x: direction == -1 ? distance : -distance,
                opacity: 1,
                duration: 500,
            }}
            on:introstart={() => (animating = true)}
            on:introend={() => (animating = false)}
        />
    {/key}
    
    <nav>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-interactive-supports-focus -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="prev" on:click={prev} />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-interactive-supports-focus -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="next" on:click={next} />
    </nav>
</div>

<div class="indicator">
    {#key index}
        {#each images as image, idx}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-interactive-supports-focus -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="bullet-case" on:click={() => goto(idx)}>
                <div
                    class="bullet"
                    class:active={index == idx}
                    on:click={() => goto(idx)}
                />
            </div>
        {/each}
    {/key}
</div>
{/if}

<style>
    .carousel {
        margin-top: 2rem;
        width: 100%;
        padding-top: 75%; /* 4:3 */
        position: relative;
        overflow: hidden;
        background-size: 100%;
    }

    img {
        position: absolute;
        width: 100%;
        top: 0;
    }

    .indicator {
        display: flex;
        margin-top: 1rem;
        justify-content: center;
    }

    .bullet-case {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .bullet {
        border: none;
        margin: 0;
        padding: 0;
        width: 8px;
        height: 8px;
        border-radius: 3px;
        scale: 1;
        background-color: #444;
        transition: 100ms ease all;
    }

    .bullet-case:hover > .bullet:not(.bullet.active) {
        background-color: #fff;
    }

    .bullet.active {
        scale: 1.25;
        background-color: aqua;
    }

    nav div {
        position: absolute;
        top: 0;
        bottom: 0;
        border: none;
        background: transparent;
        cursor: pointer;
        width: 25%;
        transition: 300ms ease all;
    }

    nav .next {
        right: 0;
    }

    nav .prev {
        left: 0;
    }
</style>
