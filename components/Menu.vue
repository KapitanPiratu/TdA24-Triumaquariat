<script setup>
const showMenu = ref(false);

function hideMenu() {
    validateToken()
    showMenu.value = false;
};

const validToken = ref(false);

async function validateToken() {
    const token = localStorage.getItem('token');

    if (!token) return;

    await $fetch('/api/validate', {
        method: 'post',
        body: {
            token: token
        },
        onResponse(response) {
            validToken.value = response.response._data.valid;
        }
    })
}

function logout() {
    localStorage.removeItem('token');
    showMenu.value = false;
    validToken.value = false;
}

onMounted(() => {
    validateToken()
})

const logged_count = inject('logged_count');
watch(logged_count, validateToken);
</script>

<template>
    <v-btn id="menu-activator" class="menu-button">
        <img class="menu-icon" ref="svg" src="~/assets/svg/menu.svg" alt="menu icon">
        <p class="menu-text">Menu</p>
    </v-btn>

    <v-menu activator="#menu-activator" class="menu-list" :class="{ 'menu-large': validToken }">

        <nuxt-link @click="hideMenu" class="link" to="/">
            <img class="icon" src="~/assets/svg/home.svg" alt="home svg">
            <p>Domů</p>
        </nuxt-link>

        <nuxt-link @click="hideMenu" class="link" to="/#cards-container">
            <img class="icon" src="~/assets/svg/lector.svg" alt="home svg">
            <p>Seznam lektorů</p>
        </nuxt-link>

        <nuxt-link v-if="validToken" @click="hideMenu" class="link" to="/dashboard">
            <img class="icon" src="~/assets/svg/time.svg" alt="home svg">
            <p>Moje rezervace</p>
        </nuxt-link>

        <nuxt-link v-else @click="hideMenu" class="link" to="/login">
            <img class="icon" src="~/assets/svg/lecturer_login.svg" alt="home svg">
            <p>Přihlášení pro lektory</p>
        </nuxt-link>

        <nuxt-link v-if="validToken" @click="logout" class="link" to="/">
            <img class="icon" src="~/assets/svg/logout.svg" alt="home svg">
            <p>Odhlásit se</p>
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
    height: 27vh;

    background-color: var(--white);
    box-shadow: 1px 1px 3px var(--jet);

    display: grid;
    grid-template-columns: 1fr;
}

.menu-list * {
    transform: translateX(-1vw);
}

.menu-large {
    height: 35vh !important;
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