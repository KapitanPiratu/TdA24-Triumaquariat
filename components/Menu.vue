<template>
    <div class="menu-button">
        <img class="menu-icon" ref="svg" src="~/assets/svg/menu.svg" alt="menu icon">
        <p class="menu-text">Menu</p>
    </div>
</template>

<style scoped>
img {
    width: 1.5rem;
}

.menu-icon {
    /* margin-left: 3vw; */
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
    /* font-weight: bold; */
}

.menu-button {
    cursor: pointer;
    width: 10vw;
    height: 5.5vh;
    position: absolute;
    left: 1.5vw;
    margin: 0.5vh;
}
</style>