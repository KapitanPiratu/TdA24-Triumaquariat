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

async function validateToken() {
    const token = localStorage.getItem('token');

    await $fetch('/api/validate', {
        method: 'post',
        body: {
            token: token
        },
        onResponse(response) {
            validToken.value = response.response._data.valid;
        }
    })
}

onMounted(() => {
    validateToken();
})
</script>
<template>
    <div class="dashboard-container">
        <div v-if="validToken">
            <div class="DB-main-title">Správa mých rezervací</div><!-- DB means dashboard -->
            <div class="DB-biggest-area">
                <div class="DB-BA-first-line"><!-- BA means biggest-area -->
                    <div class="DB-BA-FL-date-from">Datum od</div> <!-- FL means first-line -->
                    <div class="DB-BA-FL-date-to">Datum do</div>
                    <button class="DB-BA-FL-delete-button">Odstranit</button>
                    <button class="DB-BA-FL-confirm-button">Potvrdit</button>
                </div>
                <div class="DB-BA-second-line">
                    <div class="DB-BA-SL-date">Datum</div> <!-- SL means second-line -->
                    <div class="DB-BA-SL-time">Čas</div>
                    <div class="DB-BA-SL-place">Místo</div>
                    <div class="DB-BA-SL-lection-topic">Druh lekce</div>
                    <div class="DB-BA-SL-names">Jméno a Příjmení</div>
                    <div class="DB-BA-SL-email">E-mail</div>
                    <div class="DB-BA-SL-comment">Akce</div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>please <NuxtLink to="/login">log in</NuxtLink> first</p>
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    position: absolute;
    top: 21.5vh;
    padding: 5vh;
    margin-left: 8vw;
    margin-top: 3vh;
}

.DB-main-title {
    font-size: 2.8vh;
}

.DB-biggest-area {
    margin-top: 3.5vh;
    width: 78.5vw;
    height: 50vh;
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
    margin-left: 55vw;
    background-color: var(--prussian-blue);
    color: var(--white);
}

.DB-BA-FL-confirm-button {
    display: inline-block;
    margin-left: 1vw;
    background-color: var(--sunglow);
}

.DB-BA-second-line {
    margin-top: 3vh;
}

.DB-BA-SL-date {
    display: inline-block;
    margin-left: 3.5vw;
}

.DB-BA-SL-time {
    display: inline-block;
    margin-left: 8vw;
}

.DB-BA-SL-place {
    display: inline-block;
    margin-left: 8vw;
}

.DB-BA-SL-lection-topic {
    display: inline-block;
    margin-left: 8vw;
}

.DB-BA-SL-names {
    display: inline-block;
    margin-left: 8vw;
}

.DB-BA-SL-email {
    display: inline-block;
    margin-left: 8vw;
}

.DB-BA-SL-comment {
    display: inline-block;
    margin-left: 8vw;
}
</style>
