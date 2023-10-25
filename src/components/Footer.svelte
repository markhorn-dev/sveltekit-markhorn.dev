<div class="container">
        <div class="copy">
            © 2023 Mark Horn, All rights reserved.
        </div>
        <div class="love">
            Made with ❤️ in Philadelphia, USA
        </div>
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .copy {
        text-align: left;
    }

    .love {
        text-align: right;
    }

    @media (max-width: 600px) {
        .container {
            grid-template-columns: 1fr;
        }

        .copy, .love {
            text-align: center;
        }
    }

</style>