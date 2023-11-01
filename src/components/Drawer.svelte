<script lang="ts">
    import { drawerOpen } from '$lib/store';
    import { fly } from 'svelte/transition';
    import { quintOut, elasticInOut, circInOut, quintIn, expoInOut, bounceInOut, quadInOut, sineInOut, circIn, backOut, elasticOut, circOut  } from 'svelte/easing';
    import { goto } from '$app/navigation';

    function clickedLink(e: Event, url:string) {
        e.preventDefault()
        drawerOpen.update(x => false);
        setTimeout(() => {
            goto(url)
        }, 500);
    }

    const links = [
        { name: 'Home', url: '/' },
        { name: 'Projects', url: '/projects' },
        { name: 'Articles', url: '/articles' },
        { name: 'Contact', url: '/contact' },
        { name: 'Resume', url: '/resume' }
    ]
</script>

{#if $drawerOpen}
	<div class="drawer" transition:fly={{ 
            duration: 300, 
            y: '-100vh', 
            opacity: 0.5, 
            easing: circOut 
    }}>
        <ul>
            {#each links as link, index}
                <li transition:fly|global={{ 
                    delay: (index * 50) + 200,
                    duration: 300, 
                    x: '200px', 
                    opacity: 0, 
                    easing: circOut 
                }}>
                    <a href={link.url} on:click={(e) => clickedLink(e,link.url)}>
                        <h2>{link.name}</h2>
                    </a>
                </li>
            {/each}
        </ul>
	</div>
{/if}

<style>
    .drawer {
        z-index: 2;
        position: fixed;
        top: 0; bottom: 0;
        left: 0; right: 0;
        background-color: #222;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    h2 {
        font-size: 2rem;
    }

    a h2 {
        color: #999;
    }

    a:hover h2 {
        color: #FFF;
    }
</style>