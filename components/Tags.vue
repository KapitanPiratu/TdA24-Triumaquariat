<script setup>
const props = defineProps(['tags', 'margin']);

function randomIcon() {
    const icons = [
        'konverzace',
        'napad',
        'nastaveni',
        'pocitac',
        'studium'
    ]

    const icon = icons[Math.floor(Math.random() * icons.length)];

    return `../tda_${icon}.svg`
}
</script>

<template>
    <div class="tags-container" :class="{ 'margin_for_list': props.margin }">
        <div class="tag" v-for="tag in props.tags">
            <img :src="randomIcon()" alt="tda icon">
            <p>{{ tag.name }}</p>
        </div>
    </div>
</template>

<style scoped>
.tags-container {
    max-height: 10vh;
    overflow: hidden;
    white-space: nowrap;
    margin: 1vw;
    padding: 1vh;
}

.tags-container:hover {
    overflow-x: auto;
}

.tag {
    display: inline-flex;
    margin-right: 1vw;
    border: 3px solid var(--sunglow);
    border-radius: 30px;
    transition-duration: 0.2s;
    height: 5vh;
}

.tag p {
    /* color: var(--sunglow) !important; */
    padding: 1vh;
}

.tag:hover {
    background-color: var(--sunglow);
    border-radius: 30px;
}


img {
    width: 5vh;
    margin: 0.5vh;
    /* padding: 1vw; */
}

.margin_for_list {
    margin: 0;
}
</style>