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

async function getLecturers() {
    await $fetch('/api/lecturers', {
        method: 'get',
        onResponse(response) {
            lecturers.value = response.response._data[0] || {};
            console.log(lecturers.value);
        }
    });
};
onMounted(() => {
    getLecturers();
});
computed: {

};
</script>

<template>
    <div class="blocks-container">
        <LecturerBlock v-for="(block, index) in blocks" :color="block.color" :display="block.display"
            :lecturer="lecturers" />
    </div>
</template>

<style scoped>
.blocks-container {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 13vh;
    width: 100vw;
    max-width: 100%;
    height: 87vh;
}
</style>