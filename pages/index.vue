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

    <div id="cards-container" class="cards-container">
        <LecturerCard v-for="lecturer in lecturers" :lecturer="lecturer" />
    </div>
</template>

<style scoped>
/* 
.lecturer-card-absolute {
    position: absolute;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
} */


.cards-container {
    position: absolute;
    top: 100vh;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    flex-wrap: wrap;

    width: 65vw;
    min-height: 100vh;
    max-width: 100%;
}

/* 
.lecturer-claim {
    font-size: larger;
}

.lecturer-location,
.lecturer-price {
    margin: 2.5vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
}

.location-price-wrapper {
    display: flex;
    justify-content: space-between;
}

.lecturer-basic {
    font-size: 0.9rem;
    padding-top: 2vw;
    text-decoration: underline;
}

.lecturer-picture {
    margin-top: 2vh;
    border-radius: 6.5px;
    box-shadow: 5px 5px 5px var(--jet);
    width: 13vw;
    aspect-ratio: 1;
}

.default-picture {
    padding: 2vw;
}

.lecturer-card:hover {
    box-shadow: 10px 10px var(--prussian-blue);
} */
</style>