<script setup>
const lecturers = ref([]);
const locations = ref([]);
const tags = ref([]);

async function getTags() {
    await useHttp('/api/tags', {
        method: 'get',
        onResponse(response) {
            if (response.response.status == 200) {
                tags.value = response.response._data;
                tags.value.forEach(tag => {
                    tag.selected = ref(false);
                });
            }
        }
    });
}

async function getLocations() {
    await useHttp('/api/lecturers', {
        method: 'get',
        onResponse(response) {
            lecturers.value = response.response._data;

            response.response._data.forEach(lecturer => {

                if (!locations.value.find(el => el.location == lecturer.location)) {
                    locations.value.push({
                        location: lecturer.location,
                        selected: ref(false)
                    });
                }

            })
        }
    })

}

const emit = defineEmits(['locationChange', 'tagsChange', 'priceRangeChange'])

function locationChange() {
    emit('locationChange', locations);
}

function tagsChange() {
    emit('tagsChange', tags);
}

onMounted(() => {
    getTags();
    getLocations();
});

const tagsDialog = ref(false);
const locationsDialog = ref(false);

//price slider
const min = ref(0);
function updateMin() {
    let x;

    lecturers.value.forEach(lecturer => {
        if (lecturer.price_per_hour < x || !x) x = lecturer.price_per_hour;
    })
    min.value = x;
}

const max = ref(0);
function updateMax() {
    let x;

    lecturers.value.forEach(lecturer => {
        if (lecturer.price_per_hour > x || !x) x = lecturer.price_per_hour;
    })
    max.value = x;
}

const priceRange = ref([0, 0]);

watch(lecturers, () => {
    updateMax();
    updateMin()
    priceRange.value = [JSON.parse(JSON.stringify(min.value)), JSON.parse(JSON.stringify(max.value))]
});

function priceRangeChange() {
    emit('priceRangeChange', priceRange);
}

watch(priceRange, priceRangeChange);
</script>

<template>
    <div id="filters" class="filters-wrapper">
        <p class="filters-header">Vyhledávání lektora</p>

        <div class="headers-container">
            <div class="location-header">
                <p>Lokalita</p>
            </div>
            <div class="tags-header">
                <p>Štítky</p>
            </div>
        </div>

        <div class="filters-container">


            <div class="location-container">

                <div class="filter-item" v-if="locations.length > 3" v-for="location in locations.slice(0, 2)">
                    <input :id="location.location" @change="locationChange" v-model="location.selected" type="checkbox">
                    <label :for="location.location">{{ location.location }}</label>
                </div>

                <div class="filter-item" v-if="locations.length > 3">
                    <p @click="locationsDialog = !locationsDialog" class="open-dialog">více lokalit ...</p>
                </div>

                <div class="filter-item" v-else v-for="location in locations">
                    <input :id="location.location" @change="locationChange" v-model="location.selected" type="checkbox">
                    <label :for="location.location">{{ location.location }}</label>
                </div>

            </div>

            <div class="tags-container">

                <div class="filter-item" v-if="tags.length > 9" v-for="tag in tags.slice(0, 8)">
                    <input :id="tag.uuid" @change="tagsChange" v-model="tag.selected" type="checkbox">
                    <label :for="tag.uuid">{{ tag.name }}</label>
                </div>

                <div class="filter-item" v-if="tags.length > 9">
                    <p class="open-dialog" @click="tagsDialog = !tagsDialog">více štítků ...</p>
                </div>

                <div class="filter-item" v-if="tags.length <= 9" v-for="tag in tags">
                    <input :id="tag.uuid" @change="tagsChange" v-model="tag.selected" type="checkbox">
                    <label :for="tag.uuid">{{ tag.name }}</label>
                </div>
            </div>

        </div>

        <div class="headers-container price-header">
            <div>
                <p>Cenové rozpětí</p>
            </div>
        </div>

        <div class="price-container">
            <v-range-slider color="#fecb2e" :min="min" :max="max" v-model="priceRange" :step="5" class="price-range">
                <template v-slot:prepend>
                    <v-text-field v-model="priceRange[0]" hide-details single-line type="number" variant="outlined"
                        density="compact" style="width: 100px"></v-text-field>
                </template>
                <template v-slot:append>
                    <v-text-field v-model="priceRange[1]" hide-details single-line type="number" variant="outlined"
                        style="width: 100px" density="compact"></v-text-field>
                </template>
            </v-range-slider>
        </div>

    </div>

    <v-dialog v-model="tagsDialog">
        <v-card class="dialog-card">
            <div class="tags-container dialog-container">
                <div class="filter-item dialog-item" v-for="tag in tags">
                    <input :id="tag.uuid" @change="tagsChange" v-model="tag.selected" type="checkbox">
                    <label :for="tag.uuid">{{ tag.name }}</label>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <v-dialog v-model="locationsDialog">
        <v-card class="dialog-card">
            <div class="tags-container dialog-container">
                <div class="filter-item dialog-item" v-for="location in locations">
                    <input :id="location.location" @change="locationChange" v-model="location.selected" type="checkbox">
                    <label :for="location.location">{{ location.location }}</label>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.filters-wrapper {
    position: relative;
    top: 21.5vh;
    left: 50%;
    transform: translateX(-50%);

    width: 65vw;
    height: 50vh;

    /* background-color: red; */
}

.filters-header {
    font-size: 1.7rem;
    margin-top: 3vh;
}

.filters-container {
    display: flex;

    width: 65vw;
    height: 20vh;
}

.location-container {
    flex-grow: 1;
}

.tags-container {
    flex-grow: 3;
}

.location-container,
.tags-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
}

.headers-container {
    margin-top: 3vh;
    margin-bottom: 3vh;

    width: 65vw;
    height: auto;

    display: flex;

    font-size: 1.1rem;
    font-weight: bold;
}

.location-header {
    flex-grow: 1;
}

.tags-header {
    flex-grow: 3;
}

.filter-item {
    width: auto;
    height: 6vh;
}

.filter-item * {
    display: inline;
}

.filter-item input {
    margin-right: 1vw;
}

.open-dialog {
    cursor: pointer;
}

.dialog-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 25vw;
    height: 70vh;
}

.dialog-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(auto-fill, 5vh);

    overflow-y: auto;
    margin: 1vw;
    margin-top: 3vh;
}

.dialog-item {
    width: 8vw;
    min-height: 5vh;
    max-height: 5vh;

    margin: 2vh;
    margin-left: 1.5vw;
    margin-right: 1.5vw;
}

.price-range {
    margin-left: 0 !important;
    margin-top: 1vh;
    width: 27vw;
}

.price-header {
    margin-top: 0 !important;
}
</style>