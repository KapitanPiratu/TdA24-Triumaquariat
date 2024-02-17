<script setup>

function scrollDown() {
    const cards = document.getElementById('cards-container');
    cards.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    });
}

</script>

<template>
    <div class="welcome-container">
        <p class="moto">Usnadňujeme&nbsp;vám&nbsp;najít&nbsp;si&nbsp;svého&nbsp;vysněného&nbsp;lektora</p>
        <button @click="scrollDown" class="go-to-search-btn">
            <p>Začít hledat</p>
        </button>
        <img class="icons-line" src="~/assets/svg/tda_ikony_celek.svg" alt="tda icons">
    </div>
</template>

<style scoped>
.welcome-container {
    position: relative;
    top: 21.5vh;
    width: 100vw;
    height: 78.5vh;
}

.moto {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 7vh;
    width: auto;

    font-size: 3rem;
    font-weight: 600;
}

.go-to-search-btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20vh;

    background-color: var(--sunglow);
    width: 200px;
    height: 60px;
    border: none;
    border-radius: 4px;
    box-shadow: 1px 3px 3px -2px #00000033;
    cursor: pointer;
    transition-duration: 0.5s;
}

.go-to-search-btn p {
    font-size: 1.3rem;
}

.go-to-search-btn:hover {
    box-shadow: 10px 10px var(--prussian-blue);
}

.icons-line {
    position: absolute;
    top: 40vh;
    left: 50%;
    transform: translateX(-50%);

    width: 90vw;
}
</style>