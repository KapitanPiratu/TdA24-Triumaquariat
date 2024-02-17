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
    <Welcome />

    <div class="layout">
        <div id="cards-container" class="cards-container">
            <LecturerCard v-for="lecturer in lecturers" :lecturer="lecturer" />

        </div>
        <Footer />
    </div>
</template>

<style scoped>
.cards-container {
    position: relative;
    top: 21.5vh;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 20vh;

    display: flex;
    flex-wrap: wrap;

    width: 65vw;
    min-height: 100vh;
    max-width: 100%;
}

.layout {
    display: grid;
    grid-template-rows: 1fr auto;
}
</style>