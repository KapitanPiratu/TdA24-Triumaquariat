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
    <div class="cards-container">
        <div class="lecturer-card-wrapper" v-for="lecturer in lecturers">
            <nuxt-link class="link" :to="'/lecturer/' + lecturer.uuid">
                <div class="lecturer-card">
                    <Tags :tags="lecturer.tags" :margin="true" />
                    <div :class="{ 'lecturer-card-absolute': lecturer.tags[0].uuid }">
                        <img v-if="lecturer.picture_url" :src="lecturer.picture_url" alt="tda image"
                            class="lecturer-picture">
                        <img v-else src="~/assets/svg/tda_studium.svg" alt="tda image"
                            class="lecturer-picture default-picture">
                        <div class="lecturer-basic">
                            <h1>{{ lecturer.title_before }}
                                {{ lecturer.first_name }}
                                {{ lecturer.middle_name }}
                                {{ lecturer.last_name }}
                                {{ lecturer.title_after }}</h1>
                        </div>
                        <div class="location-price-wrapper">
                            <h2 class="lecturer-location">{{ lecturer.location }}</h2>
                            <h2 class="lecturer-price">{{ lecturer.price_per_hour }}&nbsp;Kč/h</h2>
                        </div>
                        <p class="lecturer-claim">{{ lecturer.claim }}</p>
                        <br>
                    </div>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<style scoped>
.lecturer-card {
    padding: 1rem;
    background-color: var(--sky-blue);
    height: 70vh;
    width: 21vw;
    border-radius: 6.5px;
    text-align: center;
    position: relative;
    transition-duration: 0.5s;
}

.lecturer-card-absolute {
    position: absolute;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
}

.lecturer-card-wrapper {
    margin: 1.5vw;
}

.link {
    text-decoration: none;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 13vh;
    width: 100vw;
    max-width: 100%;
}

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
}
</style>