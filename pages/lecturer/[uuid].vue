<script setup>

const blocks = [
    {
        index: 0,
        color: 'sky-blue',
        display: [
            'names'
        ]
    },
    {
        index: 1,
        color: 'sunglow',
        display: [
            'personaldata'
        ]
    },
    {
        index: 2,
        color: 'prussian-blue',
        display: [
            'contact'
        ]
    }
]

const lecturers = ref([]);

const route = useRoute();

async function getLecturers() {
    await useHttp(`/api/lecturers/${route.params.uuid}`, {
        method: 'get',
        onResponse(response) {
            lecturers.value = response.response._data || {};
            console.log(lecturers.value);
        }
    });
};
onMounted(() => {
    getLecturers();
});
</script>

<template>
    <div class="blocks-container">
        <LecturerBlock v-for="(block, index) in blocks" :color="block.color" :display="block.display"
            :lecturer="lecturers" />
    </div>

    <Footer />
</template>

<style scoped>
.blocks-container {
    position: relative;
    top: 21.5vh;

    margin-bottom: 15vh;

    width: 100vw;
    max-width: 100%;
    height: 87vh;

    display: flex;
    justify-content: space-between;
}
</style>