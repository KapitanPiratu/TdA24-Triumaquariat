<template>
    <div class="reservation-button">
        <p>Rezervovat lektora</p>
    </div>
</template>

<style scoped>
.reservation-button {
    position: absolute;
    bottom: 2vh;
    left: 50%;
    transform: translateX(-50%);

    width: 18vw;
    height: 7.5vh;

    background-color: var(--sunglow);
    border-radius: 4px;

    transition-duration: 0.3s;
    opacity: 95%;
}

p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-transform: uppercase;
}

.reservation-button:hover {
    opacity: 100%;
    box-shadow: 0.5px 0.5px 4px 2px var(--prussian-blue);
}
</style>