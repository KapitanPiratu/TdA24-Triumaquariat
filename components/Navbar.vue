<template>
    <div class="navbar">
        <nuxt-link to="/">
            <img src="~/assets/svg/tda_logo.svg" alt="tda logo">
        </nuxt-link>
    </div>
</template>

<style scoped>
.navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 13vh;
    max-width: 100%;
    background-color: var(--jet);
}

img {
    width: 6vw;
    margin: 1vw;
    margin-left: 2vw;
}
</style>