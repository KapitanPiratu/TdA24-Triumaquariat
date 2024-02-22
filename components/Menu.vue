<script setup>
const showMenu = ref(false);

function hideMenu() {
    showMenu.value = false;
};
</script>

<template>
    <v-btn id="menu-activator" class="menu-button">
        <img class="menu-icon" ref="svg" src="~/assets/svg/menu.svg" alt="menu icon">
        <p class="menu-text">Menu</p>
    </v-btn>

    <v-menu activator="#menu-activator" class="menu-list" :class="{ shown: true }">

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

    </v-menu>
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
    height: 5.5vh !important;
    position: absolute;
    left: 1.5vw;
    margin: 0.5vh;
    box-shadow: none;
    background-color: transparent;
}

.menu-list {
    position: absolute;
    top: 21.5vh;
    transform: translateX(-5vw);

    width: 26vw;
    height: 30vh;

    background-color: var(--white);
    box-shadow: 1px 1px 3px var(--jet);

    display: none;
    grid-template-columns: 1fr;
}

.menu-list * {
    transform: translateX(-1vw);
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
    transform: translateY(-45%);
    left: 3vw;

    width: 15vw;

    font-size: 1.4rem;
}
</style>