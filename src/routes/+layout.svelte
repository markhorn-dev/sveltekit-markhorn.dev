<script>
    import "@fontsource/inter";
    import "@fontsource/fira-mono";
    import '../css/reset.css';
    import '../css/style.css';
    import Navbar from "../components/Navbar.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<div class="app">
    <nav>
        <Navbar/>
    </nav>
    <main>
        <slot/>
    </main>
    <footer>
        <Footer/>
    </footer>
</div>

<style>
    .app {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    main {
        flex: 1;
    }

    nav {
        border-bottom: 1px solid grey;
    }
    
    footer {
        border-top: 1px solid grey;
    }
</style>