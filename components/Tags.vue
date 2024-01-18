<script setup>
const props = defineProps(['tags']);
</script>

<template>
    <div class="tags-container">
        <div class="tag" v-for="tag in props.tags">
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
    display: inline-block;
    margin-right: 1vw;
    border: 3px solid var(--sunglow);
    border-radius: 30px;
    transition-duration: 0.2s;
}

.tag p {
    /* color: var(--sunglow) !important; */
    padding: 0.5vw;
}

.tag:hover {
    background-color: var(--sunglow);
    border-radius: 30px;
}
</style>