<script setup>

const blocks = [
    {
        index: 0,
        color: 'sky-blue'
    },
    {
        index: 1,
        color: 'sunglow'
    },
    {
        index: 2,
        color: 'prussian-blue'
    }
]

const lecturers = ref([]);

async function getLecturers() {
    await $fetch('/api/lecturers', {
        method: 'get',
        onResponse(response) {
            lecturers.value = response.response._data[0] || {};
        }
    });
};
onMounted(() => {
    getLecturers();
});
</script>

<template>
    <div class="blocks-container">
        <LecturerBlock v-for="(block, index) in blocks" :color="block.color" />
    </div>
</template>
