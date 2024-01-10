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
        <img :src="lecturer.picture_url" alt="tda image" class="lecturer-picture">
        <div class="lecturer-basic">
            <h1>{{ lecturer.title_before }}
                {{ lecturer.first_name }}
                {{ lecturer.middle_name }}
                {{ lecturer.last_name }}
                {{ lecturer.title_after }}</h1>
        </div>
        <h1 class="lecturer-claim">{{ lecturer.claim }}</h1>
        <h1 class="lecturer-location">{{ lecturer.location }}</h1>
        <br>
    </div>
</template>

<style scoped>
.lecturer-card {
    padding: 1rem;
    background-color: var(--sky-blue);
    height: 40vw;
    width: 25vw;
}

.lecturer-claim {
    padding: 2vw;
    font-size: larger;
}

.lecturer-location {
    padding-left: 10vw;
    font-size: larger;
}

.lecturer-basic {
    font-size: 0.75rem;
    padding-right: 1.3vw;
    padding-top: 2vw;
}

.lecturer-picture {
    padding-left: 3.7vw;
    padding-top: 2vw;
}
</style>