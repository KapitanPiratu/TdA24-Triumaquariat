<script setup>

const lecturers = ref([]);

async function getLecturers() {
    lecturers.value = await $fetch('/api/lecturers', {
        method: 'get'
    });
}

onMounted(() => {
    getLecturers()
});
</script>

<template>
    <h1>{{ lecturers }}</h1>
</template>

<style scoped>
h1 {
    color: var(--prussian-blue);
}
</style>