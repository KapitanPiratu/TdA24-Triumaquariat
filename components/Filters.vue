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
                    <input @change="locationChange" v-model="location.selected" type="checkbox">
                    <p>{{ location.location }}</p>
                </div>

                <div class="filter-item" v-if="locations.length > 3">
                    <p @click="locationsDialog = !locationsDialog" class="open-dialog">více lokalit ...</p>
                </div>

                <div class="filter-item" v-else v-for="location in locations">
                    <input @change="locationChange" v-model="location.selected" type="checkbox">
                    <p>{{ location.location }}</p>
                </div>

            </div>

            <div class="tags-container">

                <div class="filter-item" v-if="tags.length > 9" v-for="tag in tags.slice(0, 8)">
                    <input @change="tagsChange" v-model="tag.selected" type="checkbox">
                    <p>{{ tag.name }}</p>
                </div>

                <div class="filter-item" v-if="tags.length > 9">
                    <p class="open-dialog" @click="tagsDialog = !tagsDialog">více štítků ...</p>
                </div>

                <div class="filter-item" v-if="tags.length <= 9" v-for="tag in tags">
                    <input @change="tagsChange" v-model="tag.selected" type="checkbox">
                    <p>{{ tag.name }}</p>
                </div>
            </div>

        </div>

        <div class="price-container">
            <v-range-slider :min="min" :max="max" v-model="priceRange" :step="5">
                <template v-slot:prepend>
                    <v-text-field v-model="priceRange[0]" hide-details single-line type="number" variant="outlined"
                        density="compact" style="width: 140px"></v-text-field>
                </template>
                <template v-slot:append>
                    <v-text-field v-model="priceRange[1]" hide-details single-line type="number" variant="outlined"
                        style="width: 140px" density="compact"></v-text-field>
                </template>
            </v-range-slider>
        </div>

    </div>

    <v-dialog v-model="tagsDialog">
        <v-card class="dialog-card">
            <div class="tags-container dialog-container">
                <div class="filter-item dialog-item" v-for="tag in tags">
                    <input @change="tagsChange" v-model="tag.selected" type="checkbox">
                    <p>{{ tag.name }}</p>
                </div>
            </div>
        </v-card>
    </v-dialog>

    <v-dialog v-model="locationsDialog">
        <v-card class="dialog-card">
            <div class="tags-container dialog-container">
                <div class="filter-item dialog-item" v-for="location in locations">
                    <input @change="locationChange" v-model="location.selected" type="checkbox">
                    <p>{{ location.location }}</p>
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

    width: 80vw;
    height: 60vh;

    /* background-color: red; */
}

.filters-header {
    font-size: 1.7rem;
    margin-top: 1vh;
}

.filters-container {
    display: flex;

    width: 80vw;
    height: 24vh;
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
    margin-bottom: 2vh;

    width: 80vw;
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
    height: 8vh;
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

    width: 39vw;
    height: 70vh;
}

.dialog-container {
    flex-direction: row;
    justify-content: flex-start;
    overflow-y: auto;
}

.dialog-item {
    width: 8vw;
    min-height: 15vh;
    max-height: 15vh;

    margin: 2vh;
    margin-left: 2vw;
    margin-right: 2vw;
}
</style>