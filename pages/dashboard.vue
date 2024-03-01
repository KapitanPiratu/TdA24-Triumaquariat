<script setup>
const spinner = ref(true);
const validToken = ref(false);
const uuid = ref('');

async function validateToken() {
    const token = localStorage.getItem('token');

    await useHttp('/api/validate', {
        method: 'post',
        body: {
            token: token
        },
        onResponse(response) {
            validToken.value = response.response._data.valid;
            uuid.value = response.response._data.uuid;
            spinner.value = false;
        }
    })
}

onMounted(() => {
    validateToken();
})
</script>
<template>
    <div class="dashboard-container">
        <DashboardDialog :uuid="uuid" v-if="validToken" />
        <div v-if="!spinner && !validToken">
            <p>please <NuxtLink to="/login">log in</NuxtLink> first</p>
        </div>
        <v-progress-circular class="spinner" v-if="spinner" indeterminate></v-progress-circular>
    </div>

    <Footer></Footer>
</template>

<style scoped>
.dashboard-container {
    position: relative;
    top: 21.5vh;
    padding: 5vh;

    width: 100vw;
    height: 78.5vh;

    margin-bottom: 21.5vh;
}

.spinner {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
