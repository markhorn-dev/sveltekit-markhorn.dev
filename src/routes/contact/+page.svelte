<svelte:head>
    <title>markhorn.dev | Contact</title>
    <meta name="description" content="How to contact me.">
</svelte:head>

<script lang="ts">
    import linkedin from '$lib/images/linkedin.svg';
    import github from '$lib/images/github.svg';
    import twitterx from '$lib/images/twitterx.svg';
    import { socialmedia } from '$lib/socialmedia';
    import { onMount } from 'svelte';
    import { fly, slide, scale, draw } from 'svelte/transition';
    import { elasticInOut } from 'svelte/easing';

    function initializeForm() {
        return {
            email: {
                value: '',
                valid: false,
                error: false
            },
            subject: {
                value: '',
                valid: false,
                error: false
            },
            message: {
                value: '',
                valid: false,
                error: false
            },
            valid: false,
            error: false,
        }
    }

    let form = initializeForm();
    let isSubmitting = false;
    let successful = false;

    function onInput(e: Event) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        form.email.valid = regex.test(form.email.value);
        form.subject.valid = form.subject.value.length > 0
        form.message.valid = form.message.value.length > 0
        updateForm()
    }

    function onSubmit(e: Event) {
        e.preventDefault()
        successful = false
        form.email.error = !form.email.valid
        form.subject.error = !form.subject.valid
        form.message.error = !form.message.valid
        updateForm()
        submitForm()
    }

    function updateForm() {
        form.valid = form.email.valid && form.subject.valid && form.message.valid
        form.error = form.email.error || form.subject.error || form.message.error
    }

    async function submitForm() {
        isSubmitting = true;

        const response = await fetch('/api/email', {
            method: 'POST',
            body: JSON.stringify({
                email: form.email.value,
                subject: form.subject.value,
                message: form.message.value
            })
        })

        if (response.ok) {
            const result = await response.json();
            form = initializeForm();
            resetTextArea()
            successful = true;
        } else {
            const errors = await response.json();
            console.log('errors',errors);
        }
        
        isSubmitting = false;
    }

    let loaded = false;

    onMount(() => {
        const textArea = document.getElementById("message");
        if(textArea) {
            textArea.addEventListener("input", function () {
                this.style.height = "auto";
                this.style.height = (this.scrollHeight + 2) + "px";
            });
        }
        loaded = true;
    })

    function resetTextArea() {
        const textArea = document.getElementById("message");
        if(textArea) {
            textArea.style.height = "auto";
            textArea.style.height = (textArea.scrollHeight + 2) + "px";
        }
    }
</script>

<div class="contact container container-padded">
    <div class="grid">
        <div class="info">
            <h1>Let's Connect</h1>
            <p>Reach out to me on social media, or send an email here.</p>
            {#key loaded}
            <div class="social">
                <a href={socialmedia.linkedin} target="_blank" in:scale={{
                    start: 0.5,
                    delay: 1000,
                    duration: 500
                }}>
                    <img src={linkedin} height={32} alt="link to mark horn's linkedin account"/>
                </a>
                <a href={socialmedia.github} target="_blank" in:scale={{
                    start: 0.5,
                    delay: 1100,
                    duration: 500
                }}>
                    <img src={github} height={32} alt="link to mark horn's github account"/>
                </a>
                <a href={socialmedia.twitterx} target="_blank" in:scale={{
                    start: 0.5,
                    delay: 1200,
                    duration: 500
                }}>
                    <img src={twitterx} height={32} alt="link to mark horn's twitter X account"/>
                </a>
            </div>
            {/key}
        </div>

        {#key loaded}
        <form on:submit={onSubmit} in:fly={{
                        x: 200,
                        delay: 800,
                        duration: 500
                    }}>
            {#if successful}
                <div class="successful">
                    <div>Your email has been sent successfully.</div>
                </div>
            {/if}
            <h4>Email</h4>
            <input type="text" maxlength="255" disabled={isSubmitting} bind:value={form.email.value} on:input={onInput}/>
            {#if form.email.error}
                {#if form.email.valid}
                <div class="validation valid">Looks good</div>
                {:else}
                    <div class="validation invalid">Please enter a valid email address.</div>
                {/if}
            {/if}
            <h4>Subject</h4>
            <input type="text" maxlength="100" disabled={isSubmitting} bind:value={form.subject.value} on:input={onInput}/>
            {#if form.subject.error}
                {#if form.subject.valid}
                    <div class="validation valid">Looks good</div>
                {:else}
                    <div class="validation invalid">Please enter a valid subject.</div>
                {/if}
            {/if}
            <h4>Message</h4>
            <textarea id="message" maxlength="500" disabled={isSubmitting} bind:value={form.message.value} on:input={onInput}></textarea>
            {#if form.message.error}
                {#if form.message.valid}
                <div class="validation valid">Looks good</div>
                {:else}
                    <div class="validation invalid">Please enter a valid message.</div>
                {/if}
            {/if}
            <button type="submit" disabled={(form.error && !form.valid) || isSubmitting}>Submit</button>
        </form>
        {/key}
    </div>
</div>

<style>
    .contact {
        flex: 1;
        width: 100%;
    }

    .grid {
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr 1fr;
    }

    form {
        display: flex;
        flex-direction: column;
    }
    
    form > h4, button {
        margin-top: 1rem;
    }

    form > h4:first-child {
        margin-top: 0;
    }

    input, textarea {
        padding: .5rem;
        color: #FFF;
        border: 1px solid #333;
        background-color: #111;
        margin-top: .25rem;
        border-radius: var(--border-radius-inner);
    }

    input:focus, textarea:focus {
        outline: none;
        border: 1px solid #FFF;
    }

    .validation {
        margin-top: .25rem;
    }

    .valid {
        color: green;
    }

    .invalid {
        color: red;
    }

    textarea {
        resize: none;
    }

    button {
        width: fit-content;
        color: #FFF;
        padding: .25rem .75rem;
        border: 1px solid aqua;
        border-radius: var(--border-radius-inner);
        cursor: pointer;
        margin-top: 2rem;
        background-color: rgba(0, 255, 255, 10%);
        transition: 300ms ease all;
    }

    button:not(:disabled):hover {
        color:#111;
        background-color: aqua;
    }

    button:disabled {
        opacity: 66%;
        cursor: default;
    }

    input:disabled, textarea:disabled {
        color: #666;
    }

    .social {
        display: flex;
        gap: .5rem;
        margin: 1rem 0;
    }

    .social a {
        scale: 1;
        opacity: 66%;
        transition: 300ms ease all;
    }

    .social a:hover {
        scale: 1.1;
        opacity: 100%;
    }

    .successful {
        color: white;
        padding: .75rem;
        border: 1px solid green;
        background-color: rgba(0, 255, 0, 20%);
        border-radius: 6px;
    }

    @media (max-width: 768px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>

