<script setup>

const DashboardSubcardData = [
    {
        index: 0,
        color: 'white',
        display: [
            'names'
        ]
    },
    {
        index: 1,
        color: 'white',
        display: [
            'timedata'
        ]
    },
    {
        index: 2,
        color: 'white',
        display: [
            'tags'
        ]
    },
    {
        index: 3,
        color: 'white',
        display: [
            'comment'
        ]
    }
]

const validToken = ref(false);
const uuid = ref('');

async function validateToken() {
    const token = localStorage.getItem('token');

    await useHttp('/api/validate', {
        method: 'post',
        body: {
            token: token
        },
        onResponse(response) {
            validToken.value = response.response._data.valid;
            uuid.value = response.response._data.uuid;
        }
    })
}

onMounted(() => {
    validateToken();
})
</script>
<template>
    <div class="dashboard-container">
        <DashboardDialog :uuid="uuid" v-if="validToken" />
        <div v-else>
            <p>please <NuxtLink to="/login">log in</NuxtLink> first</p>
        </div>
    </div>

    <Footer></Footer>
</template>

<style scoped>
.dashboard-container {
    position: relative;
    top: 21.5vh;
    padding: 5vh;

    width: 100vw;
    height: 78.5vh;

    margin-bottom: 21.5vh;
}

.DB-main-title {
    font-size: 2.8vh;
}

.DB-biggest-area {
    margin-top: 3.5vh;
    width: 78.5vw;
    height: 90vh;
    border-radius: 5vh;
    background-color: var(--white);
    border: 1px solid var(--prussian-blue);
}

.DB-biggest-area .DB-BA-FL-date-from {
    display: inline-block;
    margin-top: 3.5vh;
    margin-left: 3.5vw;
}

.DB-BA-FL-date-to {
    display: inline-block;
    margin-left: 1vw;
}

.DB-BA-FL-delete-button {
    display: inline-block;
    margin-left: 40vw;
    background-color: var(--prussian-blue);
    color: var(--white);
    font-size: 1.5vh;
    border-radius: 1vh;
    padding-top: 1.2vh;
    padding-bottom: 1.2vh;
    padding-left: 3vh;
    padding-right: 3vh;
}

.DB-BA-FL-confirm-button {
    display: inline-block;
    margin-left: 1vw;
    background-color: var(--sunglow);
    font-size: 1.5vh;
    border-radius: 1vh;
    padding-top: 1.2vh;
    padding-bottom: 1.2vh;
    padding-left: 2.7vh;
    padding-right: 2.7vh;
}

.DB-BA-second-line {
    margin-top: 3vh;
    border-bottom: 1px solid #00384d;
    margin-left: 2.75vw;
    margin-right: 2vw;
}

.DB-BA-SL-date {
    display: inline-block;
    margin-left: 0.8vw;
    font-size: 1vw;
}

.DB-BA-SL-time {
    display: inline-block;
    margin-left: 7vw;
    font-size: 1vw;
}

.DB-BA-SL-place {
    display: inline-block;
    margin-left: 8vw;
    font-size: 1vw;
}

.DB-BA-SL-lection-topic {
    display: inline-block;
    margin-left: 8vw;
    font-size: 1vw;
}

.DB-BA-SL-names {
    display: inline-block;
    margin-left: 8vw;
    font-size: 1vw;
}

.DB-BA-SL-email {
    display: inline-block;
    margin-left: 6vw;
    font-size: 1vw;
}

.DB-BA-SL-comment {
    display: inline-block;
    margin-left: 7.5vw;
    font-size: 1vw;
}

.DB-BA-third-line {
    background-color: var(--white);
}

.choosing-record-button {
    padding: 0.5vw;
}

.DB-BA-TL-record-date {
    margin-left: 1vw;
    display: inline-block;
}

.DB-BA-TL-record-time {
    margin-left: 5.5vw;
    display: inline-block;
}

.DB-BA-TL-record-place {
    margin-left: 5.5vw;
    display: inline-block;
}

.DB-BA-TL-record-lection-topic {
    margin-left: 9vw;
    display: inline-block;
}

.DB-BA-TL-record-names {
    margin-left: 9.5vw;
    display: inline-block;
}

.DB-BA-TL-record-email {
    margin-left: 6vw;
    display: inline-block;
}

.DB-BA-TL-record-comment {
    margin-left: 3.5vw;
    display: inline-block;
}

.blue-underline {
    text-decoration: underline;
    color: var(--prussian-blue);
}

.DB-BA-TL-record1 {
    padding-top: 2vh;
    padding-bottom: 2vh;
    margin-left: 2.75vw;
    margin-right: 2vw;
    border-bottom: 1px solid #00384d;
    background-color: var(--white);
}

.DB-BA-fourth-line {
    display: inline-block;
    margin-top: 2vh;
}

.DB-RecordsOnPage-setting {
    display: inline-block;
    margin-left: 57vw;
}

.DB-page-number-index {
    display: inline-block;
    margin-left: 5vw
}

.DB-records-return-button {
    display: inline-block;
    margin-left: 1.5vw;
    font-size: 2.5vh;
    border: none;
    background-color: var(--white);
}


.DB-records-next-button {
    display: inline-block;
    margin-left: 1.5vw;
    font-size: 2.5vh;
    border: none;
    background-color: var(--white);
}
</style>
