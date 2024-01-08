<script setup>

const { color } = defineProps(['color']);

onMounted(() => {
    console.log(color)
})
</script>

<template>
    <div class="block" :class="color">
        <p>{{ lecturers }}</p>
    </div>
</template>

<style scoped>
.blocks-container {
    white-space: nowrap;
}

.block {
    display: inline-block;
    height: 40vw;
    width: 23vw;
    margin-top: 4vw;
}

.sunglow {
    background-color: var(--sunglow);
    margin-left: 7.5vw;
}

.sky-blue {
    background-color: var(--sky-blue);
    margin-left: 7.5vw;
}

.prussian-blue {
    background-color: var(--prussian-blue);
    margin-left: 7.5vw;
}
</style>