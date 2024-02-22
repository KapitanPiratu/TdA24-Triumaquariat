<script setup>
const props = defineProps(['lecturer']);

const reservationDialog = useModel(false);

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
const tagsDialog = useModel(false);
const tagsSelected = ref([]);

function addTag(name) {
    if (!tagsSelected.value.find(tag => tag.name == name)) {
        let list = tagsSelected.value;
        list.push({ name: name });

        tagsSelected.value = list;
    }
}

function removeTag(name) {
    let list = tagsSelected.value;
    list = list.filter(el => el.name != name);
    tagsSelected.value = list;
}

async function postReservation(e) {
    e.preventDefault();
    await $fetch(`/api/reservation`, {
        method: 'post',
        body: {
            name: name.value,
            email: email.value,
            date: formatedDate.value,
            time_from: time_start.value,
            time_to: time_end.value,
            place: place.value,
            comment: comment.value,
            tags: tagsSelected.value,
            lecturer_uuid: props.lecturer.uuid
        }
    })
}
</script>

<template>
    <div class="reservation-button" @click="reservationDialog = !reservationDialog">
        <p class="button-text">Rezervovat lektora</p>
    </div>

    <v-dialog v-model="reservationDialog" class="dialog">
        <v-card class="dialog-card">

            <v-card-title class="dialog-title">
                <p>Rezervace lektora</p>
            </v-card-title>

            <v-card-item class="card-item">
                <v-form class="form">

                    <div class="form-container">
                        <v-text-field v-model="name" class="dialog-input" label="Jméno"></v-text-field>
                        <v-text-field v-model="email" class="dialog-input" label="Email"></v-text-field>

                        <v-textarea v-model="comment" class="dialog-input" label="Komentář (dobrovolný)"></v-textarea>
                    </div>

                    <div class="form-container">
                        <v-text-field class="dialog-input date-input" v-model="formatedDate" label="Vyber datum" readonly
                            @click="menu = !menu"></v-text-field>

                        <v-dialog v-model="menu" class="dialog">
                            <v-card class="date-card">
                                <v-date-picker @click="formatDate()" v-model="date" v-if="menu" type="time"
                                    class="date-picker" color="#ddd"></v-date-picker>
                            </v-card>
                        </v-dialog>

                        <div class="times-container">
                            <v-select class="dialog-input time-input" label="Vyber čas" v-model="time_start"
                                :items="timesListForStart">
                            </v-select>

                            <p>—</p>

                            <v-select class="dialog-input time-input" label="Vyber čas" v-model="time_end"
                                :items="timesList2">
                            </v-select>
                        </div>

                        <v-select class="dialog-input" label="Vyber místo" v-model="place"
                            :items="['Online', 'Offline (lektorova lokace)']"></v-select>

                    </div>

                    <div class="tags-card form-container">

                        <v-card-title class="tags-title">
                            <p>Vyber štítky</p>
                        </v-card-title>

                        <div class="tags-container" v-if="tagsSelected.length">
                            <div class="tag selected" @click="removeTag(tag.name)" @mouseenter="tag.mouseover = true"
                                @mouseleave="tag.mouseover = false" v-for="tag in tagsSelected">
                                <p>{{ tag.name }} <span v-if="tag.mouseover">X</span></p>
                            </div>
                        </div>
                        <br v-if="tagsSelected.length">
                        <div class="tags-container">
                            <div class="tag" @click="addTag(tag.name)" v-for="tag in props.lecturer.tags">
                                <p>{{ tag.name }}</p>
                            </div>
                        </div>
                    </div>
                    <button class="dialog-btn" @click="postReservation">
                        <p>Odeslat</p>
                    </button>
                </v-form>
            </v-card-item>

        </v-card>
    </v-dialog>
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
    height: 80vh;
}

.dialog-card {
    width: 80vw;
    height: 80vh;

    background-color: var(--white);
    box-shadow: 1px 1px 3px var(--jet);

    transform: translateY(-2vh);
}

.date-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 360px;
    height: 530px;

    background-color: transparent;
}

.dialog-title {
    position: relative;
    top: 2vh;
    left: 1vw;

    font-size: 1.6rem;

    margin-bottom: 5vh;
}

.form {
    width: 80vw;
    height: 60vh;

    display: flex;
}

.form-container {
    flex-grow: 1;
    position: relative;
    width: 9vw;
    margin: 1vw;
    margin-top: 0;
}

.date-picker {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.dialog-input {
    margin: 1vw;
}

.dialog-btn {
    position: fixed;
    bottom: 5vh;
    left: 50%;
    transform: translateX(-50%);

    width: 30vw;
    height: 7vh !important;

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
    margin: 1vw;

    display: inline-flex;
    flex-wrap: wrap;
}

.tag {
    width: auto;
    height: 4.6vh;

    padding: 1vh;
    margin: 0.5vh;

    border: 3px solid var(--sky-blue);
    border-radius: 30px;

    background-color: var(--sky-blue);
    transition-duration: 0.2s;
    font-size: 0.9rem;

    cursor: pointer;
}

.selected p span {
    margin-left: 0.6vw;
}

.selected:hover {
    filter: brightness(97%);
    padding-left: 1.2vh;
}

.tags-title {
    margin-left: 0.7vw;
    margin-top: 1vh;
}

.card-item {
    padding: 0;
}

.times-container {
    display: inline-flex;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}

.time-input {
    width: 9.1vw;
    margin-top: 0;
    margin-bottom: 0;
}

.times-container p {
    font-size: 1.2rem;
    margin: 1vh;
}
</style>