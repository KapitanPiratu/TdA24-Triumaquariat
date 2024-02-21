<script setup>

const DashboardSubcardData = [
    {
        index: 0,
        color: 'white',
        display: [
            'names'
        ]
    },
    {
        index: 1,
        color: 'white',
        display: [
            'timedata'
        ]
    },
    {
        index: 2,
        color: 'white',
        display: [
            'tags'
        ]
    },
    {
        index: 3,
        color: 'white',
        display: [
            'comment'
        ]
    }
]

const validToken = ref(false);

async function validateToken() {
    const token = localStorage.getItem('token');

    await $fetch('/api/validate', {
        method: 'post',
        body: {
            token: token
        },
        onResponse(response) {
            validToken.value = response.response._data.valid;
        }
    })
}

onMounted(() => {
    validateToken();
})
</script>
<template>
    <div class="dashboard-container">
        <div v-if="validToken">
            dashboard
            <DashboardSubcardBlock v-for="(DashboardDataCard, index) in DashboardSubcards" :color="DashboardSubcards.color"
                :display="DashboardSubcards.display" />
        </div>
        <div v-else>
            <p>please <NuxtLink to="/login">log in</NuxtLink> first</p>
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    position: absolute;
    top: 21.5vh;
    background-color: var(--sky-blue);
    padding: 5vh;
}
</style>