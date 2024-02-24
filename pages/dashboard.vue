<script setup>
const validToken = ref(false);

async function validateToken() {
    const token = localStorage.getItem('token');

    await useHttp('/api/validate', {
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
            <p>Dashboard</p>
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