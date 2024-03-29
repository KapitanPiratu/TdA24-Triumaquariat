<script setup>

const props = defineProps(['uuid']);

const spinner = ref(true);
const reservations = ref([]);

function sortReservations() {
    let array = reservations.value;

    function formatDate(dateString, timeString) {
        const dateComponents = dateString.split(". ");
        const day = parseInt(dateComponents[0], 10);
        const month = parseInt(dateComponents[1], 10) - 1; // Subtract 1 for zero-based month
        const year = parseInt(dateComponents[2], 10);

        const timeComponents = timeString.split(":");
        const hour = parseInt(timeComponents[0], 10);
        const minute = parseInt(timeComponents[1], 10);

        return new Date(year, month, day, hour, minute);
    }

    array.sort((a, b) => formatDate(a.date, a.time_from) - formatDate(b.date, b.time_from));

    reservations.value = array;
}

async function getReservations() {
    if (props.uuid) {
        await useHttp(`/api/reservation/${props.uuid}`, {
            method: 'get',
            onResponse(response) {
                reservations.value = response.response._data;
                sortReservations()
                spinner.value = false;
            }
        })
    }
}

watch(() => props.uuid, getReservations())

async function deleteReservation(uuid) {
    const check = window.confirm('Tato akce nelze vzít zpět! Jste si jistí, že chcete zrušit rezervaci?');
    if (check) await useHttp(`/api/reservation/${uuid}`, {
        method: 'delete',
        onResponse(response) {
            if (response.response.status == 204) {
                getReservations();
            }
        }
    });
}

function getTags(tags) {
    if (tags.length) {
        return tags[0].name;
    } else {
        return ''
    }
}
</script>

<template>
    <div class="dashboard-header">
        <p>Správa rezervací</p>
    </div>

    <div class="dashboard-card">

        <div class="reservation headers-row">
            <div class="reservation-column"> Datum</div>
            <div class="reservation-column"> Čas </div>
            <div class="reservation-column"> Místo</div>
            <div class="reservation-column"> Štítky </div>
            <div class="reservation-column"> Jméno </div>
            <div class="reservation-column"> Email</div>
            <div class="reservation-column"> Akce</div>
        </div>

        <div class="reservation" v-for="r in reservations" :key="r.uuid">
            <div class="reservation-column"> {{ r.date }}</div>
            <div class="reservation-column"> {{ r.time_from }} - {{ r.time_to }}</div>
            <div class="reservation-column"> {{ r.place }}</div>
            <div class="reservation-column"> {{ getTags(r.tags) }} </div>
            <div class="reservation-column"> {{ r.name }}</div>
            <div class="reservation-column"> {{ r.email }}</div>
            <div class="reservation-column">
                <v-btn class="delete-btn" @click="deleteReservation(r.uuid)">Zrušit</v-btn>
            </div>
        </div>

        <v-progress-circular class="spinner" v-if="spinner" indeterminate></v-progress-circular>
    </div>
</template>
<style scoped>
.dashboard-card {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    height: 50vh;
    width: 75vw;

    box-shadow: 1px 1px 3px 0.2px var(--jet);
    border-radius: 6.5px;

    display: grid;
    grid-template-rows: repeat(auto-fill, 8vh);

    overflow-y: auto;
}

.dashboard-header {
    position: absolute;
    top: 7vh;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 1.9rem;

    width: 75vw;
}

.reservation {
    margin-left: 2vw;
    margin-right: 2vw;

    display: grid;
    grid-template-columns: repeat(7, 1fr);

    border-bottom: 1.5px solid rgb(51, 51, 51, .5);
}

.reservation:last-child {
    border: none;
}

.reservation-column {
    text-align: center;
    vertical-align: middle;
    line-height: 8vh;
}


.headers-row * {
    font-size: 1.2rem;
    font-weight: 700;
}

.delete-btn {
    background-color: var(--sunglow);
}

.spinner {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>