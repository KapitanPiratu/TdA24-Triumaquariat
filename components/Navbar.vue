<template>
    <div class="sub-navbar">
        <Menu></Menu>
    </div>
    <div class="navbar">
        <nuxt-link to="/">
            <img src="~/assets/svg/tda_logo.svg" alt="tda logo">
        </nuxt-link>
        <h1>Teacher Digital Agency</h1>
    </div>
</template>

<style scoped>
.navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 15vh;
    max-width: 100%;
    background-color: var(--jet);
    z-index: 3001;
}

h1 {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12vw;
    font-size: 3rem;
    color: var(--white);
}

img {
    height: 8vh;
    margin: 3.5vh;
    margin-left: 2vw;
}

.sub-navbar {
    background-color: var(--sky-blue);
    position: absolute;
    top: 15vh;
    width: 100vw;
    height: 6.5vh;
    box-shadow: 1px 1px 10px 1px black;
    z-index: 3000;
}
</style>