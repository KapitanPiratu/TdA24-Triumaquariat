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
                    <div class="DB-BA-FL-date-from">Datum od: <input type="time"></div> <!-- FL means first-line -->
                    <div class="DB-BA-FL-date-to">Datum do: <input type="time"></div>
                    <button class="DB-BA-FL-delete-button">ODMÍTNOUT</button>
                    <button class="DB-BA-FL-confirm-button">POTVRDIT</button>
                </div>
                <div class="DB-BA-second-line"><button class="choosing-record-button"></button>
                    <div class="DB-BA-SL-date">Datum</div> <!-- SL means second-line -->
                    <div class="DB-BA-SL-time">Čas</div>
                    <div class="DB-BA-SL-place">Místo</div>
                    <div class="DB-BA-SL-lection-topic">Druh lekce</div>
                    <div class="DB-BA-SL-names">Jméno a Příjmení</div>
                    <div class="DB-BA-SL-email">E-mail</div>
                    <div class="DB-BA-SL-comment">Akce</div>
                </div>
                <div class="DB-BA-third-line">
                    <div class="DB-BA-TL-record1"><button class="choosing-record-button"></button>
                        <p class="DB-BA-TL-record-date">28.2.2024</p>
                        <p class="DB-BA-TL-record-time">10:00-11:00</p>
                        <p class="DB-BA-TL-record-place">Text3</p>
                        <p class="DB-BA-TL-record-lection-topic">Text4</p>
                        <p class="DB-BA-TL-record-names">Jméno a příjmení</p>
                        <p class="DB-BA-TL-record-email">name@email.com</p>
                        <p class="DB-BA-TL-record-comment"><a href="" class="blue-underline">Zobrazit detail</a></p>
                    </div> <!-- TL means third-line -->
                    <div class="DB-BA-TL-record1"><button class="choosing-record-button"></button>
                        <p class="DB-BA-TL-record-date">28.2.2024</p>
                        <p class="DB-BA-TL-record-time">10:00-11:00</p>
                        <p class="DB-BA-TL-record-place">Text3</p>
                        <p class="DB-BA-TL-record-lection-topic">Text4</p>
                        <p class="DB-BA-TL-record-names">Jméno a příjmení</p>
                        <p class="DB-BA-TL-record-email">name@email.com</p>
                        <p class="DB-BA-TL-record-comment"><a href="" class="blue-underline">Zobrazit detail</a></p>
                    </div>
                    <div class="DB-BA-TL-record1"><button class="choosing-record-button"></button>
                        <p class="DB-BA-TL-record-date">28.2.2024</p>
                        <p class="DB-BA-TL-record-time">10:00-11:00</p>
                        <p class="DB-BA-TL-record-place">Text3</p>
                        <p class="DB-BA-TL-record-lection-topic">Text4</p>
                        <p class="DB-BA-TL-record-names">Jméno a příjmení</p>
                        <p class="DB-BA-TL-record-email">name@email.com</p>
                        <p class="DB-BA-TL-record-comment"><a href="" class="blue-underline">Zobrazit detail</a></p>
                    </div>
                    <div class="DB-BA-TL-record1"><button class="choosing-record-button"></button>
                        <p class="DB-BA-TL-record-date">28.2.2024</p>
                        <p class="DB-BA-TL-record-time">10:00-11:00</p>
                        <p class="DB-BA-TL-record-place">Text3</p>
                        <p class="DB-BA-TL-record-lection-topic">Text4</p>
                        <p class="DB-BA-TL-record-names">Jméno a příjmení</p>
                        <p class="DB-BA-TL-record-email">name@email.com</p>
                        <p class="DB-BA-TL-record-comment"><a href="" class="blue-underline">Zobrazit detail</a></p>
                    </div>
                    <div class="DB-BA-TL-record1"><button class="choosing-record-button"></button>
                        <p class="DB-BA-TL-record-date">28.2.2024</p>
                        <p class="DB-BA-TL-record-time">10:00-11:00</p>
                        <p class="DB-BA-TL-record-place">Text3</p>
                        <p class="DB-BA-TL-record-lection-topic">Text4</p>
                        <p class="DB-BA-TL-record-names">Jméno a příjmení</p>
                        <p class="DB-BA-TL-record-email">name@email.com</p>
                        <p class="DB-BA-TL-record-comment"><a href="" class="blue-underline">Zobrazit detail</a></p>
                    </div>
                    <div class="DB-BA-TL-record1"><button class="choosing-record-button"></button>
                        <p class="DB-BA-TL-record-date">28.2.2024</p>
                        <p class="DB-BA-TL-record-time">10:00-11:00</p>
                        <p class="DB-BA-TL-record-place">Text3</p>
                        <p class="DB-BA-TL-record-lection-topic">Text4</p>
                        <p class="DB-BA-TL-record-names">Jméno a příjmení</p>
                        <p class="DB-BA-TL-record-email">name@email.com</p>
                        <p class="DB-BA-TL-record-comment"><a href="" class="blue-underline">Zobrazit detail</a></p>
                    </div>
                    <div class="DB-BA-TL-record1"><button class="choosing-record-button"></button>
                        <p class="DB-BA-TL-record-date">28.2.2024</p>
                        <p class="DB-BA-TL-record-time">10:00-11:00</p>
                        <p class="DB-BA-TL-record-place">Text3</p>
                        <p class="DB-BA-TL-record-lection-topic">Text4</p>
                        <p class="DB-BA-TL-record-names">Jméno a příjmení</p>
                        <p class="DB-BA-TL-record-email">name@email.com</p>
                        <p class="DB-BA-TL-record-comment"><a href="" class="blue-underline">Zobrazit detail</a></p>
                    </div>
                    <div class="DB-BA-TL-record1"><button class="choosing-record-button"></button>
                        <p class="DB-BA-TL-record-date">28.2.2024</p>
                        <p class="DB-BA-TL-record-time">10:00-11:00</p>
                        <p class="DB-BA-TL-record-place">Text3</p>
                        <p class="DB-BA-TL-record-lection-topic">Text4</p>
                        <p class="DB-BA-TL-record-names">Jméno a příjmení</p>
                        <p class="DB-BA-TL-record-email">name@email.com</p>
                        <p class="DB-BA-TL-record-comment"><a href="" class="blue-underline">Zobrazit detail</a></p>
                    </div>
                    <div class="DB-BA-TL-record1"><button class="choosing-record-button"></button>
                        <p class="DB-BA-TL-record-date">28.2.2024</p>
                        <p class="DB-BA-TL-record-time">10:00-11:00</p>
                        <p class="DB-BA-TL-record-place">Text3</p>
                        <p class="DB-BA-TL-record-lection-topic">Text4</p>
                        <p class="DB-BA-TL-record-names">Jméno a příjmení</p>
                        <p class="DB-BA-TL-record-email">name@email.com</p>
                        <p class="DB-BA-TL-record-comment"><a href="" class="blue-underline">Zobrazit detail</a></p>
                    </div>
                    <div class="DB-BA-TL-record1"><button class="choosing-record-button"></button>
                        <p class="DB-BA-TL-record-date">28.2.2024</p>
                        <p class="DB-BA-TL-record-time">10:00-11:00</p>
                        <p class="DB-BA-TL-record-place">Text3</p>
                        <p class="DB-BA-TL-record-lection-topic">Text4</p>
                        <p class="DB-BA-TL-record-names">Jméno a příjmení</p>
                        <p class="DB-BA-TL-record-email">name@email.com</p>
                        <p class="DB-BA-TL-record-comment"><a href="" class="blue-underline">Zobrazit detail</a></p>
                    </div>
                </div>
                <div class="DB-BA-fourth-line">
                    <div class="DB-RecordsOnPage-setting">Počet na stránku 10</div>
                    <div class="DB-page-number-index"> 1-x z x</div>
                    <button class="DB-records-return-button"> &lt </button>
                    <button class="DB-records-next-button">></button>
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
