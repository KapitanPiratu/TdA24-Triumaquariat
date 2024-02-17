<script setup>
const props = defineProps(['tags']);
</script>

<template>
    <div class="tags-container" :class="{ 'margin_for_list': props.margin }">
        <div class="tag" v-for="tag in props.tags">
            <p>{{ tag.name }}</p>
        </div>
    </div>
</template>

<style scoped>
.tags-container {
    max-height: 20vh;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
}

.tag {
    height: 4.6vh;
    padding: 1vh;
    margin: 0.5vh;

    border: 3px solid var(--white);
    border-radius: 30px;

    background-color: var(--white);
    transition-duration: 0.2s;
    font-size: 0.9rem;
}
</style>