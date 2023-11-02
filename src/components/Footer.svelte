<script lang="ts">
    import { getEpoch, getLocation } from "./Footer";
    import { onMount } from "svelte";
    import { socialmedia } from "$lib/socialmedia";
    import brand from '$lib/images/brand.svg';

    let epoch: string = '';
    let location: string = '';

    onMount(() => {
		epoch = getEpoch();
        location = getLocation();
	});
</script>

<footer>
    <div class="container outer-grid">
        <div class="flex column">
            <img src={brand} height={24} alt=""/>
            <p>Epoch: {epoch}</p>
            <p>Location: Orbiting {location}</p>
            <div class="status">
                <div class="circle">
                    <div class="pulse-ring" />
                </div>
                <div class="text">Status: Connected</div>
            </div>
        </div>
        <div class="inner-grid">
            <div class="flex column">
                <h3>Site</h3>
                <a href="/">Home</a>
                <a href="/projects">Projects</a>
                <a href="/articles">Articles</a>
                <a href="/contact">Contact</a>
            </div>
            <div class="flex column">
                <h3>Social</h3>
                <a href={socialmedia.linkedin} target="_blank">LinkedIn</a>
                <a href={socialmedia.github} target="_blank">Github</a>
                <a href={socialmedia.twitterx} target="_blank">TwitterX</a>
            </div>
            <div class="flex column">
                <h3>Featured</h3>
                <a href="/projects/project-1">Project One</a>
                <a href="/projects/project-2">Project Two</a>
                <a href="/projects/project-3">Project Three</a>
            </div>
            <div class="flex column">
                <h3>Legal</h3>
                <a href="/legal/privacy">Privacy</a>
                <a href="/legal/terms">Terms</a>
                <a href="/legal/acceptable">Acceptable</a>
            </div>
        </div>
        <div class="copy">
            <span>© 2023 Mark Horn, </span>
            <span>All rights reserved.</span>
        </div>
    </div>
</footer>

<style>
    footer {
        font-size: 0.85rem;
        border-top: 1px solid #333;
        background-color: #111;
        z-index: 1;
    }

    .outer-grid {
        display: grid;
        gap: 2rem;
        padding: 2rem 1.5rem;
        grid-template-columns: 1fr 2fr;
    }

    .inner-grid {
        display: grid;
        row-gap: 2rem;
        grid-template-columns: repeat(4,1fr);
    }

    .flex {
        display: flex;
        gap: 0.5rem;
    }

    .column {
        flex-direction: column;
        align-items: flex-start;
    }

    .status {
        font-size: var(--fs-normal);
		display: flex;
		align-items: center;
		padding: 0.25rem 0.5rem;
		background-color: var(--li-bg-color);
		border: 1px solid #323232;
		border-radius: 50px;
		width: fit-content;
		padding-right: 0.75rem;
	}

    .copy {
        color: var(--grey);
        grid-column: span 2;
        font-size: 0.85rem;
    }

	.status .text {
		margin-left: 0.5rem;
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 66%);
	}

	.circle {
		width: 8px;
		height: 8px;
		background-color: green;
		border-radius: 50%;
		position: relative;
	}

	.pulse-ring {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: rgba(0, 255, 0, 0.5);

		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 0;
		}
		50% {
			transform: scale(1.5);
			opacity: 1;
		}
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

    @media (max-width: 768px) {
        .outer-grid {
            grid-template-columns: 1fr;
        }
        .inner-grid {
            grid-template-columns: 1fr 1fr;
        }
        .copy {
            grid-column: span 1;
        }
    }

    @media (max-width: 480px) {
        .inner-grid {
            grid-template-columns: 1fr;
        }
    }
</style>