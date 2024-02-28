<script setup>
const lecturers = ref([]);
const filteredLecturers = ref([]);

async function getLecturers() {
    await useHttp('/api/lecturers', {
        method: 'get',
        headers: useRequestHeaders(['authorization']),
        onResponse(response) {
            lecturers.value = response.response._data || [];
            filteredLecturers.value = lecturers.value;
        }
    });
};

onMounted(() => {
    getLecturers();
})

const locations = ref([]);
const tags = ref([]);

async function filter() {
    let list = lecturers.value;

    console.log('filtering')

    tags.value.forEach(tag => {
        console.log(tag.selected)
        if (tag.selected) list = list.filter(lecturer => {
            return lecturer.tags.some(el => el.name == tag.name);
        });
    })

    locations.value.forEach(location => {
        console.log(location.selected)
        if (location.selected) list = list.filter(lecturer => lecturer.location == location.location);
    })

    filteredLecturers.value = list;
    console.log(filteredLecturers.value);
}

function tagsChange(newTags) {
    tags.value = newTags.value;
    filter();
}

function locationChange(newLocations) {
    locations.value = newLocations.value;
    filter();
}
</script>

<template>
    <Welcome />

    <div class="layout">
        <Filters @locationChange="locationChange" @tagsChange="tagsChange" />

        <div id="cards-container" class="cards-container">
            <LecturerCard v-for="lecturer in filteredLecturers" :key="lecturer.uuid" :lecturer="lecturer" />

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