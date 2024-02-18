<script setup>
const locations = ref([]);
const tags = ref([]);

async function getTags() {
    await $fetch('/api/tags', {
        method: 'get',
        onResponse(response) {
            if (response.response.status == 200) {
                tags.value = response.response._data;
                console.log(tags.value)
            }
        }
    });
}

async function getLocations() {
    await $fetch('/api/lecturers', {
        method: 'get',
        onResponse(response) {
            response.response._data.forEach(el => {

                if (!locations.value.includes(el.location)) {
                    locations.value.push(el.location);
                }

            })
            console.log(locations.value)
        }
    })

}

onMounted(() => {
    getTags();
    getLocations();
});
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
                    <input type="checkbox">
                    <p>{{ location }}</p>
                </div>

                <div class="filter-item" v-if="locations.length > 3">
                    <p>více lokalit ...</p>
                </div>

                <div class="filter-item" v-else v-for="location in locations">
                    <input type="checkbox">
                    <p>{{ location }}</p>
                </div>

            </div>

            <div class="tags-container">

                <div class="filter-item" v-if="tags.length > 9" v-for="tag in tags.slice(0, 8)">
                    <input type="checkbox">
                    <p>{{ tag.name }}</p>
                </div>

                <div class="filter-item" v-if="tags.length > 9">
                    <p>více štítků ...</p>
                </div>

                <div class="filter-item" v-if="tags.length <= 9" v-for="tag in tags">
                    <input type="checkbox">
                    <p>{{ tag.name }}</p>
                </div>
            </div>

        </div>

    </div>
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
</style>