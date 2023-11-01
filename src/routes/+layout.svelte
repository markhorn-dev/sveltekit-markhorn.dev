<script lang="ts">
    export let data;
    import "@fontsource/inter";
    import "@fontsource/fira-mono";
    import '@fontsource-variable/antonio';
    import "../css/reset.css";
    import "../css/style.css";
    import "../css/markdown.css";
    import "../css/vscode-dark.css";
    import Navbar from "../components/Navbar.svelte";
    import Footer from "../components/Footer.svelte";
    import Drawer from "../components/Drawer.svelte";
    import { onMount } from "svelte";
    import { circInOut } from "svelte/easing";
    import {  beforeNavigate } from "$app/navigation";
    import { scrolled } from '$lib/store';

    let direction = 0;

    const order = [
        "/",
        "/projects",
        "/articles",
        "/contact",
        "/legal",
        "/privacy",
        "/terms",
        "/acceptable",
    ];

    function onPageScroll(e:any) {
        //console.log(e.target.scrollTop)
        scrolled.set(e.target.scrollTop)
    }

    beforeNavigate(({ to, from, cancel }) => {
        let toURL = to?.route.id;
        let fromURL = from?.route.id;

        if (toURL && fromURL) {
            let toBaseURL = toURL.replace("/[slug]", "").replace("/legal", "");

            let fromBaseURL = fromURL
                .replace("/[slug]", "")
                .replace("/legal", "");

            let fromIdx = order.indexOf(fromBaseURL);
            let toIdx = order.indexOf(toBaseURL);

            //the default direction of the animation based on order index
            direction = toIdx < fromIdx ? -1 : 1;
            //console.log(fromIdx, toIdx, toBaseURL);

            //handle case where we go from slug to list view (we go back)
            if (fromIdx == toIdx) {
                if (fromURL.includes("[slug]") && !toURL.includes("[slug]")) {
                    direction = -1;
                }
            }
        }
    });

    function slideIn(node: HTMLElement) {
        return {
            duration: 1000,
            easing: circInOut,
            css: (t: number, u: number) => `
                    transform: translateX(${u * direction * 100}%)`,
        };
    }

    function foldOut(node: HTMLElement) {
        const opacity: number = Number(getComputedStyle(node).opacity);
        return {
            duration: 1000,
            easing: circInOut,
            css: (t: number, u: number) => `
            opacity: ${t * opacity};
            transform: translateX(${u * -(direction * 100)}%) rotateY(${
                u * -(direction * 90)
            }deg);
            transform-origin: ${direction < 0 ? "left center" : "right center"};
            `,
        };
    }
</script>

<div class="app">
    <Navbar />
    <Drawer />
    {#key data.pathname}
        <main in:slideIn out:foldOut>
            <div id="page" class="page" on:scroll={onPageScroll}>
                <slot />
                <Footer />
            </div>
        </main>
    {/key}
</div>

<style>
    .app {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: fixed;
        perspective: 960px;
        background-color: #161616;
    }

    main {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .page {
        height: 100%;
        width: 100%;
        color: white;
        background-color: black;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
    }
</style>
