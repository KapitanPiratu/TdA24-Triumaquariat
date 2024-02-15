<script setup>
const username = ref('');
const password = ref('');

async function login(e) {
    e.preventDefault();
    await $fetch('/api/login', {
        method: 'post',
        body: {
            username: username.value,
            password: password.value
        }
    })
}
</script>

<template>
    <div class="login-container">
        <h1>Login</h1>
        <form>
            <input v-model="username" type="text"> <br>
            <input v-model="password" type="text"> <br>
            <button @click="login">Potvrdit</button>
        </form>
    </div>
</template>

<style scoped>
.login-container {
    position: absolute;
    top: 13vh;
    background-color: var(--sky-blue);
    padding: 5vh;
}

input {
    color: #000;
}
</style>