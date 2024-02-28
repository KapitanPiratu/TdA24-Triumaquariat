<script setup>
const emit = defineEmits(['logged_in'])

const username = ref('');
const password = ref('');

const status = ref('');

const snackbarMessage = ref('Někde nastala chyba, máš zadané údaje?');

async function login() {
    const response = await $fetch('/api/login', {
        method: 'post',
        body: {
            username: username.value,
            password: password.value
        },
        onResponse(response) {
            console.log(response.response.status)

            if (response.response.status == 400 || response.response.status == 401 || response.response.status == 404) {
                snackbarMessage.value = "Někde nastala chyba, máš zadané údaje?"
                dialogSnackbar.value = true;
            } else {

                const data = response.response._data;
                if (data.token) {
                    status.value = 'successfullu logged in';
                    localStorage.setItem('token', data.token);
                    emit('logged_in')
                    navigateTo('/dashboard')
                    snackbarMessage.value = 'Přihlášení bylo úspěšné!';
                    dialogSnackbar.value = true;
                } else {
                    snackbarMessage.value = 'Špatné jméno nebo heslo.';
                    dialogSnackbar.value = true;
                }
            }
        }
    })
}

const dialogModel = ref(false);
const dialogSnackbar = ref(false);
</script>

<template>
    <div class="login-container">
        <h1>Přihlášení</h1>
        <form>
            <v-text-field class="inputuser" v-model="username" type="text" label="Přihlašovací jméno" bg-color="white">
            </v-text-field>
            <v-text-field class="inputpass" v-model="password" type="password" label="Heslo" bg-color="white">
            </v-text-field>
            <p class="status">{{ status }}</p>
            <v-btn class="button" @click="login">Přihlásit se</v-btn>
            <p class="problemek" @click="dialogModel = !dialogModel">Problémy s přihlášením?</p>
        </form>
    </div>

    <v-dialog v-model="dialogModel">
        <v-card title="Problémy s přihlášením?">
            <v-card-text>
                Nejprve prosím zkuste proces zopakovat, jestliže problémy přetrvávají, kontaktujete <a
                    href="mailto:triumaquariat@gmail.com">administrátory</a>, popřípadě přímo <a
                    href="mailto:jknapovsky@gmail.com">TdAgency</a>.
            </v-card-text>

            <v-card-actions>
                <v-btn text="Zavřít" @click="dialogModel = false"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-snackbar class="snackbar" v-model="dialogSnackbar" location="top" :timeout="3000" color="#74c7d3">{{ snackbarMessage
    }}</v-snackbar>
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
    left: 20%;
    transform: translateX(-50%);

    width: 10vw !important;
    height: 6vh !important;

    margin: 2vh;
    margin-left: 0;

    background-color: var(--sunglow);
}

.inputuser {
    width: 25vw;
}

.inputpass {
    width: 25vw;
}

.problemek {
    position: relative;
    left: 61%;
    cursor: pointer;
}

.snackbar {
    z-index: 3005;
}
</style>
