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
    <div class="lecturer-card" v-for="lecturer in lecturers">
        <div>
            <img :src="lecturer.picture_url" alt="tda image">
            <h1>{{ lecturer.title_before }}</h1>
            <h1>{{ lecturer.first_name }}</h1>
            <h1>{{ lecturer.middle_name }}</h1>
            <h1>{{ lecturer.last_name }}</h1>
            <h1>{{ lecturer.title_after }}</h1>
        </div>
        <h1 class="lecturer-claim">{{ lecturer.claim }}</h1>
        <h1>{{ lecturer.location }}</h1>
        <br>
    </div>
</template>

<style scoped>
.lecturer-card {
    padding: 1rem;
    background-color: var(--sky-blue);
    height: 37vw;
    width: 25vw;
}

.lecturer-claim {
    padding: auto;
    font-size: larger;
}
</style>