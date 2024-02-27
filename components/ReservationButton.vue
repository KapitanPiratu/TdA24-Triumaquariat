<script setup>
const props = defineProps(['lecturer']);
const formDisabled = ref(false);
const reservationDialog = useModel(false);
const dialogSnackbar = useModel(true);
const snackbarMessage = ref('');

//inputs
const name = useModel('');
const email = useModel('');
const comment = useModel('');
const place = useModel('');

//date
const menu = useModel(false);

const date = useModel(null);
const formatedDate = useModel('');
function formatDate() {
    formatedDate.value = date.value.toLocaleDateString('cs-CZ');
}

const today = ref(new Date());
today.value.toISOString()

//times
const time_start = useModel(null);
const time_end = useModel(null);

const timesList = ref(['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']);
const timesList2 = ref(timesList.value);

watch(time_start, updateTimesList);

function updateTimesList() {
    let list = JSON.parse(JSON.stringify(timesList.value));

    const index = list.indexOf(time_start.value);

    if (index !== -1) {
        list.splice(0, index + 1)

        timesList2.value = list;

        if (!timesList2.value.includes(time_end.value)) {
            time_end.value = null;
        }
    }
}

const timesListForStart = computed(() => {
    let list = JSON.parse(JSON.stringify(timesList.value));
    list.pop();
    return list;
})

//tags
const tagsSelected = ref([]);
const tagsDisplay = ref(props.lecturer.tags);

function addTag(name) {
    if (!tagsSelected.value.find(tag => tag.name == name)) {
        let list = tagsSelected.value;
        list.push({ name: name });
        tagsSelected.value = list;

        let displayList = tagsDisplay.value;
        displayList = displayList.filter(el => el.name != name);
        tagsDisplay.value = displayList;
    }
}

function removeTag(name) {
    let displayList = tagsDisplay.value;
    displayList.unshift({ name: name });
    tagsDisplay.value = displayList;

    let list = tagsSelected.value;
    list = list.filter(el => el.name != name);
    tagsSelected.value = list;
}

//place
const placeItems = ref([
    { title: 'Online', value: 'Online' },
    { title: `${props.lecturer.location} (lektorova lokace)`, value: `${props.lecturer.location}` }
]);

const rules = [
    value => !!value || false
]

const form = ref(null);

async function postReservation() {

    const { valid } = await form.value.validate();
    if (valid) {
        formDisabled.value = true;
        await useHttp(`/api/reservation`, {
            method: 'post',
            body: {
                name: name.value,
                email: email.value,
                date: formatedDate.value,
                time_from: time_start.value,
                time_to: time_end.value,
                place: place.value,
                comment: comment.value || '',
                tags: tagsSelected.value,
                lecturer_uuid: props.lecturer.uuid
            },
            onResponse(response) {
                if (response.response.status == 200) {
                    form.value.reset();
                    formDisabled.value = false;

                    snackbarMessage.value = 'Rezervace úspěšně vytvořena';
                    dialogSnackbar.value = true;
                    reservationDialog.value = false;
                } else {
                    alert('Something went wrong');
                }
            }
        })
    }
}

const moveDown = ref(false);

function showDialog() {
    const body = document.querySelector('html');
    console.log(body.scrollTop)
    if (body.scrollTop < 75) {
        moveDown.value = true;
    } else {
        moveDown.value = false;
    }

    reservationDialog.value = true;
}
</script>

<template>
    <div class="reservation-button" @click="showDialog">
        <p class="button-text">Rezervovat lektora</p>
    </div>

    <v-dialog v-model="reservationDialog" class="dialog">
        <v-card class="dialog-card" :class="{ 'move-down': moveDown }">

            <v-card-title class="dialog-title">
                <p>Rezervace lektora</p>
            </v-card-title>

            <v-card-item class="card-item">
                <v-form class="form" ref="form" @submit.prevent="postReservation" :disabled="formDisabled">

                    <div class="form-container">
                        <v-text-field v-model="name" :rules="rules" class="dialog-input" label="Jméno"></v-text-field>
                        <v-text-field v-model="email" :rules="rules" class="dialog-input" label="Email"></v-text-field>

                        <v-textarea v-model="comment" class="dialog-input" label="Komentář (dobrovolný)"></v-textarea>
                    </div>

                    <div class="form-container">

                        <div class="times-container">
                            <v-text-field class="dialog-input date-input" v-model="formatedDate" :rules="rules"
                                label="Vyber datum" readonly @click="menu = !menu"></v-text-field>

                            <v-dialog v-model="menu" class="dialog">
                                <v-card class="date-card">
                                    <v-date-picker @click="formatDate()" v-model="date" v-if="menu" :min="today" type="time"
                                        class="date-picker" color="#ddd"></v-date-picker>
                                </v-card>
                            </v-dialog>

                            <v-select class="dialog-input time-input" :rules="rules" label="Vyber čas" v-model="time_start"
                                :items="timesListForStart">
                            </v-select>

                            <p class="time-dash">—</p>

                            <v-select class="dialog-input time-input" :rules="rules" label="Vyber čas" v-model="time_end"
                                :items="timesList2">
                            </v-select>
                        </div>

                        <v-select class="dialog-input place-input" :rules="rules" label="Vyber místo" v-model="place"
                            :items="placeItems"></v-select>

                        <div class="tags-card" :class="{ 'tags-disabled': formDisabled }">

                            <v-card-title class="tags-title">
                                <p>Čeho se lekce bude týkat?</p>
                            </v-card-title>

                            <div class="tags-container" v-if="tagsSelected.length">
                                <p class="tags-label">Vybrané:</p>
                                <div class="tag selected" @click="removeTag(tag.name)" v-for="tag in tagsSelected">
                                    <p>{{ tag.name }}</p>
                                </div>
                            </div>
                            <br v-if="tagsSelected.length">
                            <div class="tags-container">
                                <p class="tags-label">Dostupné:</p>
                                <div class="tag" @click="addTag(tag.name)" v-for="tag in tagsDisplay">
                                    <p>{{ tag.name }}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <button class="dialog-btn" type="submit">
                        <p>Potvrdit</p>
                    </button>
                    <v-progress-circular class="spinner" v-if="formDisabled" indeterminate></v-progress-circular>
                </v-form>
            </v-card-item>

        </v-card>
    </v-dialog>
    <v-snackbar class="snackbar" v-model="dialogSnackbar" location="top" :timeout="3000" color="#74c7d3">{{ snackbarMessage
    }}</v-snackbar>
</template>

<style scoped>
.reservation-button {
    position: absolute;
    bottom: 2vh;
    left: 50%;
    transform: translateX(-50%);

    width: 18vw;
    height: 7.5vh;

    background-color: var(--sunglow);
    border-radius: 4px;

    transition-duration: 0.3s;
    opacity: 95%;

    cursor: pointer;
}

.button-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-transform: uppercase;
}

.reservation-button:hover {
    opacity: 100%;
    box-shadow: 0.5px 0.5px 4px 2px var(--prussian-blue);
}

.dialog {
    width: 80vw;
    height: 72vh;
}

.dialog-card {
    width: 80vw;
    height: 72vh;

    background-color: var(--white);
    box-shadow: 1px 1px 3px var(--jet);

    transform: translateY(-2vh);
}

.move-down {
    transform: translateY(8vh);
}

.date-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    min-width: 360px;
    min-height: 530px;

    background-color: transparent;
}

.dialog-title {
    position: relative;
    top: 2.5vh;
    left: 1.1vw;

    font-size: 1.7rem;

    margin-bottom: 3.7vh;
}

.form {
    width: 80vw;
    height: 55vh;

    display: flex;
}

.form-container {
    flex-grow: 1;
    position: relative;
    width: 9vw;

    margin: 1vw;
    margin-top: 0;
    margin-bottom: 0;
}

.date-picker {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.dialog-input {
    margin: 1vw;
    height: 8vh;
}

.dialog-btn {
    position: fixed;
    bottom: 4vh;
    left: 2vw;

    width: 18vw;
    height: 7.5vh !important;

    background-color: var(--sunglow);
    border-radius: 4px;
    transition-duration: 0.5s;

    font-size: 1.05rem;
}

.dialog-btn:hover {
    filter: brightness(100%);
    box-shadow: 10px 10px var(--prussian-blue);
}

.tags-button {
    cursor: pointer;
    margin: 1vw;
    text-decoration: underline;
}

.tags-card {
    width: 10vw;
}

.tags-container {
    width: 35vw;

    margin: 1vw;
    margin-bottom: 0;

    display: inline-flex;
    flex-wrap: wrap;
}

.tag {
    width: auto;
    height: 4.4vh;

    padding: 1vh;
    padding-left: 0.8vw;
    padding-right: 0.8vw;
    margin: 0.5vh;

    border: 3px solid var(--sky-blue);
    border-radius: 30px;

    background-color: var(--sky-blue);
    transition-duration: 0.2s;
    font-size: 0.9rem;

    cursor: pointer;
}


.tag p {
    position: relative;
    top: 50%;
    transform: translateY(-52%);
    user-select: none;
}

.selected p span {
    margin-left: 0.6vw;
}

.selected {
    padding-left: 1.2vh;
}

.selected:hover {
    text-decoration: line-through;
}

.tags-title {
    width: 35vw;

    margin-left: 0.7vw;
    margin-top: 1vh;
}

.tags-disabled {
    opacity: 70%;
}

.tags-label {
    margin-top: 1.2vh;
    margin-bottom: 2vh;
    margin-right: 1vw;
}

.card-item {
    padding: 0 !important;
}

.times-container {
    display: inline-flex;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    width: 36vw;
}

.time-input {
    width: 7vw;
}

.time-input:last-child {
    margin-right: 0;
}

.time-dash {
    margin: 0.2vw !important;
    margin-top: 3.5vh !important;
}

.date-input {
    width: 13vw;
    margin-left: 0;
    margin-right: 2.5vw;
}

.times-container p {
    font-size: 1.2rem;
    margin: 1vh;
}

.place-input {
    margin-top: 0;
}

.spinner {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>