<script setup>
const emit = defineEmits(['logged_in'])

const username = ref('');
const password = ref('');

const status = ref('');

async function login() {
    const response = await useHttp('/api/login', {
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
                    emit('logged_in')
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
            <v-text-field class="input" v-model="username" type="text" label="username"> </v-text-field>
            <v-text-field class="input" v-model="password" type="text" label="password"> </v-text-field>
            <p class="status">{{ status }}</p>
            <v-btn class="button" @click="login">Potvrdit</v-btn>
        </form>
    </div>
</template>

<style scoped>
.login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: var(--sky-blue);
    padding: 5vh;
    border-radius: 6.5px;
}

.button {
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    width: 10vw !important;
    height: 6vh !important;

    margin: 2vh;
    margin-left: 0;

    background-color: var(--sunglow);
}

.input {
    width: 25vw;
}
</style>