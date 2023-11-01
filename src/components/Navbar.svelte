<script lang="ts">
    import brand from '$lib/images/brand.svg';
    import burger from '$lib/images/burger.svg';
    import close from '$lib/images/close.svg';
    import { scrolled, drawerOpen } from '$lib/store';
    import { fly } from 'svelte/transition';
    import { circInOut } from 'svelte/easing';
    import { afterNavigate } from '$app/navigation';
    import { beforeNavigate } from '$app/navigation'

    // TODO links and resume button visible status when drawer is open
    // store
    
    

    

    let navigating: boolean = false;

    beforeNavigate(({ to, from, cancel }) => {
        navigating = true;
    });

    afterNavigate(({}) => {
        setTimeout(() => { navigating = false }, 1000);
    })

    function toggleDrawer(event: Event) {
        drawerOpen.update(drawerOpen => !drawerOpen);
    }

    function downloadResume() {
        console.log('download resume')
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
                <a href="/">
                    <img src={brand} height={28} alt=""/>
                </a>
            </div>
            <div class="center">
                <ul class="links">           
                    {#each links as link}
                        <li>
                            <a href={link.url}>{link.name}</a>
                        </li>
                    {/each} 
                </ul>
            </div>
            <div class="right">
                <button class="resume" on:click={downloadResume}>
                    Resume
                </button>
                <button class="drawer" on:click={toggleDrawer}>
                    {#if $drawerOpen}
                        <img src={close} width={16} height={16} alt=""/>
                    {:else}
                        <img src={burger} width={16} height={16} alt=""/>
                    {/if}
                </button>
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
        margin-right: 5px;
        align-items: center;
        display: flex;
        justify-content: center;
        flex-direction: row;
        margin-right: 5px;
        gap: 5px;
    }

    button.resume {
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

    button.resume:hover {
        background-color: #333;
        background-color: white;
    }

    button.drawer {
        display: none;
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
        button.resume {
            display: none;
        }
    }
</style>
