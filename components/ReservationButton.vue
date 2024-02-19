<script setup>
const reservationDialog = useModel(false);

const time = useModel(null);
const menu = useModel(false);

const date = useModel(null);

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
                        <v-text-field class="dialog-input" label="Jméno"></v-text-field>
                        <v-text-field class="dialog-input" label="Email"></v-text-field>

                        <v-textarea class="dialog-input" label="Komentář (dobrovolný)"></v-textarea>
                    </div>

                    <div class="form-container">
                        <v-select class="dialog-input" label="Vyber čas"
                            :items="['8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00']">
                        </v-select>

                        <div>
                            <v-text-field class="dialog-input" :value="time" label="Vyber datum" readonly
                                @click="menu = !menu"></v-text-field>

                            <v-dialog v-model="menu" class="dialog">
                                <v-card class="date-card">
                                    <v-date-picker v-model="date" v-if="menu" type="time" class="date-picker"
                                        color="#74c7d3"></v-date-picker>
                                </v-card>
                            </v-dialog>
                        </div>

                        <v-select class="dialog-input" label="Vyber místo"
                            :items="['Online', 'Offline (lektorova lokace)']"></v-select>

                    </div>
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
</style>