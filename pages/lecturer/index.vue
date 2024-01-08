<script setup>
const lecturers = ref([]);

async function getLecturers() {
    await $fetch('/api/lecturers', {
        method: 'get',
        onResponse(response) {
            lecturers.value = response.response._data || [];
        }
    });
};

onMounted(() => {
    getLecturers();
})
</script>

<template>
    <div v-for="lecturer in lecturers">
        <h1>{{ lecturer.title_before }}</h1>
        <h1>{{ lecturer.firts_name }}</h1>
        <h1>{{ lecturer.middle_name }}</h1>
        <h1>{{ lecturer.last_name }}</h1>
        <h1>{{ lecturer.title_after }}</h1>
        <h1>{{ lecturer.picture_url }}</h1>
        <h1>{{ lecturer.location }}</h1>
        <h1>{{ lecturer.claim }}</h1>
        <h1>{{ lecturer.bio }}</h1>
        <br>
    </div>
</template>

<style scoped>
h1 {
    padding: 1rem;
    background-color: var(--sky-blue);
}
</style>