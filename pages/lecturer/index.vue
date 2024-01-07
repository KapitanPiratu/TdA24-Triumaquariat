<script setup>
const lecturers = ref([]);

async function getLecturers() {
    await $fetch('/api/lecturers', {
        method: 'get',
        onResponse(response) {
            lecturers.value = response.response._data[0] || {};
        }
    });
};

onMounted(() => {
    getLecturers();
})
</script>

<template>
    <p>{{ lecturers }}</p>
</template>