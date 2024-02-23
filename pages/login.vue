<script setup>
const username = ref('');
const password = ref('');

const status = ref('');

async function login(e) {
    e.preventDefault();
    const response = await $fetch('/api/login', {
        method: 'post',
        body: {
            username: username.value,
            password: password.value
        },
        onResponse(response) {
            console.log(response.response.status)

            if (response.response.status == 400 || response.response.status == 401 || response.response.status == 404) {
                status.value = 'Wrong username or password';
            } else {

                const data = response.response._data;
                if (data.token) {
                    status.value = 'successfullu logged in';
                    localStorage.setItem('token', data.token);
                    navigateTo('/dashboard')
                } else {
                    status.value = 'Někde nastala chyba, máš zadané údaje?';
                }
            }
        }
    })
}
</script>

<template>
    <div class="login-container">
        <h1>Login</h1>
        <form>
            <input v-model="username" type="text"> <br>
            <input v-model="password" type="password"> <br>
            <button @click="login">Potvrdit</button>
            <p class="status">{{ status }}</p>
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

input,
button {
    color: #000;
}
</style>