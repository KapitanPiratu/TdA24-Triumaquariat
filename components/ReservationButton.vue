<script setup>
const props = defineProps(['lecturer']);

const reservationDialog = useModel(false);

const name = useModel('');
const email = useModel('');
const comment = useModel('');
const time = useModel(null);
const place = useModel('');

const menu = useModel(false);

const date = useModel(null);
const formatedDate = useModel('');
function formatDate() {
    formatedDate.value = date.value.toLocaleDateString('cs-CZ');
}

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

async function postReservation() {
    await $fetch(`/api/reservation`, {
        method: 'post',
        body: {
            name: name.value,
            email: email.value,
            date: formatedDate.value,
            time_from: time.value,
            time_to: 'disabled',
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

            <v-card-item>
                <v-form class="form">

                    <div class="form-container">
                        <v-text-field v-model="name" class="dialog-input" label="Jméno"></v-text-field>
                        <v-text-field v-model="email" class="dialog-input" label="Email"></v-text-field>

                        <v-textarea v-model="comment" class="dialog-input" label="Komentář (dobrovolný)"></v-textarea>
                    </div>

                    <div class="form-container">
                        <v-select class="dialog-input" label="Vyber čas" v-model="time"
                            :items="['8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00']">
                        </v-select>

                        <v-text-field class="dialog-input" v-model="formatedDate" label="Vyber datum" readonly
                            @click="menu = !menu"></v-text-field>

                        <v-dialog v-model="menu" class="dialog">
                            <v-card class="date-card">
                                <v-date-picker @click="formatDate()" v-model="date" v-if="menu" type="time"
                                    class="date-picker" color="#ddd"></v-date-picker>
                            </v-card>
                        </v-dialog>

                        <v-select class="dialog-input" label="Vyber místo" v-model="place"
                            :items="['Online', 'Offline (lektorova lokace)']"></v-select>

                        <div>
                            <p class="tags-button" @click="tagsDialog = true">Vybrat štítky</p>

                            <v-dialog v-model="tagsDialog" class="dialog">

                                <v-card class="tags-card">

                                    <v-card-title>
                                        <p>Vyber štítky</p>
                                    </v-card-title>

                                    <div class="tags-container" v-if="tagsSelected.length">
                                        <div class="tag selected" @click="removeTag(tag.name)"
                                            @mouseenter="tag.mouseover = true" @mouseleave="tag.mouseover = false"
                                            v-for="tag in tagsSelected">
                                            <p>{{ tag.name }} <span v-if="tag.mouseover">X</span></p>
                                        </div>
                                    </div>

                                    <div class="tags-container">
                                        <div class="tag" @click="addTag(tag.name)" v-for="tag in props.lecturer.tags">
                                            <p>{{ tag.name }}</p>
                                        </div>
                                    </div>
                                </v-card>
                            </v-dialog>
                        </div>

                    </div>

                    <v-btn class="dialog-btn" @click="postReservation">Odeslat</v-btn>
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
    top: 0;
    left: 0;

    margin-bottom: 5vh;
}

.form {
    width: 80vw;
    height: 60vh;

    display: flex;
}

.form-container {
    flex-grow: 1;
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
    position: absolute;
    top: 3vh;
    right: 3vw;

    width: 15vw;
    height: 6vh !important;

    background-color: var(--sky-blue);
}

.tags-button {
    cursor: pointer;
    margin: 1vw;
    text-decoration: underline;
}

.tags-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 35vw;
    min-height: 80vh;

    background-color: var(--white);
    box-shadow: 1px 1px 3px var(--jet);
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
</style>