<script lang="ts">
    import brand from '$lib/images/brand.svg';
    import burger from '$lib/images/burger.svg';
    import close from '$lib/images/close.svg';
    import { scrolled, drawerOpen } from '$lib/store';
    import { fly } from 'svelte/transition';
    import { circInOut } from 'svelte/easing';
    import { afterNavigate } from '$app/navigation';
    import { beforeNavigate } from '$app/navigation'
    import { onMount } from 'svelte';

    let navigating: boolean = false;
    let windowWidth: number = 0;

    beforeNavigate(({ to, from, cancel }) => {
        if (from?.route.id != to?.route.id)
            navigating = true;
    });

    afterNavigate(({}) => {
        setTimeout(() => { navigating = false }, 1000);
    })

    onMount(() => {
        window.addEventListener('resize', function() {
            windowWidth = window.innerWidth;
        });
        windowWidth = window.innerWidth;
    })

    function toggleDrawer(event: Event) {
        drawerOpen.update(drawerOpen => !drawerOpen);
    }

    const links = [
        { name: 'Home', url: '/' },
        { name: 'Projects', url: '/projects' },
        { name: 'Articles', url: '/articles' },
        { name: 'Contact', url: '/contact' },
    ]
</script>

{#if !navigating}
    <nav transition:fly={{
                duration: 500, 
                y: '-100vh', 
                opacity: 0.5, 
                easing: circInOut,
                
    }}>
        <div class="panel" class:scrolled={$scrolled}>
            <div class="left">
                <a href="/" class="brand">
                    <img class="brand" src={brand} height={28} alt=""/>
                </a>
            </div>
            <div class="center">
                <ul class="links"> 
                    {#if !$drawerOpen}          
                        {#each links as link}
                            <li>
                                <a href={link.url}>{link.name}</a>
                            </li>
                        {/each} 
                    {/if}
                </ul>
            </div>
            <div class="right">
                <a class="resume" href="/resume.pdf" download>
                    Resume
                </a>
                {#if $drawerOpen || windowWidth < 768}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-interactive-supports-focus -->
                    <div class="drawer-btn" on:click={toggleDrawer} role="button">
                        {#if $drawerOpen}
                            <img src={close} alt=""/>
                        {:else}
                            <img src={burger} alt=""/>
                        {/if}
                    </div>
                {/if}
            </div>
        </div> 
    </nav>
{/if}

<style>
    nav {
        z-index: 3;
        position: fixed;
        width: 100%;
        padding: 1rem 1rem 0 1rem;
    }

    .panel {
        height: 50px;
        position: relative;
        display: flex;
        align-items: center;
        border-radius: 50px;
        border: 1px solid transparent;
        transition: 500ms ease all;
    }

    .panel.scrolled {
        border: 1px solid rgba(255, 255, 255, 0.10);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.10);
    }

    .left {
        left: 0;
        position: absolute;
    }

    .left:first-child {
        margin-left: 10px;
    }

    .right {
        right: 0;
        position: absolute;
        align-items: center;
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 5px;
        margin-right: 5px;
    }

    .resume {
        display: flex;
        height: 40px;
        color: #FFF;
        border-radius: 40px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 0.85rem;
        padding: 0 1rem;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        transition: 300ms ease all;
        color: #000;
        background-color: aqua;
    }

    .resume:hover {
        background-color: #333;
        background-color: white;
    }

    button.drawer {
        display: flex;
        height: 40px;
        width: 40px;
        align-items: center;
        justify-content: center;
        border-radius: 40px;
        background-color: #111;
        border: 1px solid #333;
        cursor: pointer;
        transition: 300ms ease all;
    }

    .drawer-btn {
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 40px;
        background-color: #111;
        border: 1px solid #333;
        cursor: pointer;
        transition: 300ms ease all;
    }

    button.drawer img {
        width: 16px;
        height: 16px;
        min-height: 16px;
        max-height: 16px;

    }

    button.drawer:hover {
        background-color: #333;
    }

    .center {
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
    }

    ul.links {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        flex-wrap: nowrap;
        gap: 1.5rem;
    }

    ul.links a {
        color: #fff;
        transition: 300ms ease all;
    }

    ul.links a:hover {
        color: #999;
    }

    @media (max-width: 768px) {
        .center {
            display: none;
        }
        button.drawer {
            display: flex;
        }
    }
</style>
