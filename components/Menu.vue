<script setup>
const showMenu = ref(false);

function hideMenu() {
    showMenu.value = false;
};
</script>

<template>
    <div class="menu-list" :class="{ shown: showMenu }">

        <nuxt-link @click="hideMenu" class="link" to="/">
            <img class="icon" src="~/assets/svg/home.svg" alt="home svg">
            <p>Domů</p>
        </nuxt-link>

        <nuxt-link @click="hideMenu" class="link" to="/#cards-container">
            <img class="icon" src="~/assets/svg/lector.svg" alt="home svg">
            <p>Seznam lektorů</p>
        </nuxt-link>

        <nuxt-link @click="hideMenu" class="link" to="/login">
            <img class="icon" src="~/assets/svg/lecturer_login.svg" alt="home svg">
            <p>Přihlášení pro lektory</p>
        </nuxt-link>

    </div>

    <div class="menu-button" @click="showMenu = !showMenu">
        <img class="menu-icon" ref="svg" src="~/assets/svg/menu.svg" alt="menu icon">
        <p class="menu-text">Menu</p>
    </div>
</template>

<style scoped>
img {
    width: 1.5rem;
}

.menu-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1.5vw
}

.menu-text {
    position: absolute;
    top: 50%;
    transform: translateY(-54%);
    font-size: 1.5rem;
    left: 4vw;
}

.menu-button {
    cursor: pointer;
    width: 10vw;
    height: 5.5vh;
    position: absolute;
    left: 1.5vw;
    margin: 0.5vh;
}

.menu-list {
    position: absolute;
    top: 6.5vh;

    width: 20vw;
    height: auto;

    background-color: var(--white);
    box-shadow: 1px 1px 3px var(--jet);

    display: none;
    grid-template-columns: 1fr;
}

.shown {
    display: grid;
}

.link {
    position: relative;

    margin: 2vh;
    margin-left: 2.7vw;

    height: 5vh;

    text-decoration: none;
    cursor: pointer;
}

.link * {
    display: inline;
}

.icon {
    height: 5vh;
    width: auto;
}

.menu-list p {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 3vw;

    font-size: 1.4rem;
}
</style>