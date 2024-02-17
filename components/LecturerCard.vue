<script setup>
const props = defineProps(['lecturer']);

const lecturer = props.lecturer;
</script>

<template>
    <div class="lecturer-card-wrapper">
        <nuxt-link class="link" :to="'/lecturer/' + lecturer.uuid">
            <div class="lecturer-card">

                <img v-if="props.lecturer.picture_url" class="lecturer-picture" :src="lecturer.picture_url"
                    alt="profile picture">
                <img v-else class="lecturer-picture default-picture" src="~/assets/svg/tda_studium.svg"
                    alt="profile picture">

                <h1 class="lecturer-name">
                    {{ lecturer.title_before }}
                    {{ lecturer.first_name }}
                    {{ lecturer.middle_name }}
                    {{ lecturer.last_name }}
                    {{ lecturer.title_after }}
                </h1>

                <div class="details-wrapper">
                    <div class="row">

                        <div class="details-container" v-if="lecturer.location">
                            <img class="icon" src="~/assets/svg/location.svg" alt="location icon">
                            <p>{{ lecturer.location }}</p>
                        </div>

                        <div class="details-container" v-if="lecturer.price_per_hour">
                            <img class="icon" src="~/assets/svg/money.svg" alt="money icon">
                            <p>{{ lecturer.price_per_hour }} Kč/h</p>
                        </div>

                    </div>

                    <div class="row">
                        <div class="details-container" v-if="lecturer.contact.telephone_numbers">
                            <img class="icon" src="~/assets/svg/phone.svg" alt="phone icon">
                            <p>{{ lecturer.contact.telephone_numbers[0] }}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="details-container" v-if="lecturer.contact.emails">
                            <img class="icon" src="~/assets/svg/email.svg" alt="email icon">
                            <p>{{ lecturer.contact.emails[0] }}</p>
                        </div>
                    </div>

                    <div class="row">
                        <p class="lecturer-claim">
                            <q>{{ lecturer.claim }}</q>
                        </p>
                    </div>

                </div>

                <Tags :tags="lecturer.tags" />

                <ReservationButton />

            </div>
        </nuxt-link>
    </div>
</template>

<style scoped>
.lecturer-card-wrapper {
    margin: 0.5vw;
    margin-top: 3vh;
    margin-bottom: 0;
}

.link {
    text-decoration: none;
}

.lecturer-card {
    height: 85vh;
    width: 20.5vw;

    padding: 1rem;
    border-radius: 6.5px;

    background-color: var(--sky-blue);

    text-align: center;
    position: relative;
    transition-duration: 0.5s;
}

.lecturer-card:hover {
    box-shadow: 10px 10px var(--prussian-blue);
}

.lecturer-picture {
    width: 18vw;
    height: 35vh;

    background-color: var(--prussian-blue);
    box-shadow: 1px 1px 3px 0px black;

    border-radius: 6.5px;
}

.default-picture {
    padding: 2vh;
}

.lecturer-name {
    text-align: left;
    margin-left: 1vw;
    margin-top: 1vh;
}

.icon {
    height: 4vh;
}

.row {
    display: flex;
    justify-content: space-between;
    position: relative;
}

.details-container {
    margin-left: 1vw;
    margin-right: 5vw;
}

.details-container * {
    display: inline;
}

.details-container p {
    position: absolute;
    top: 50%;
    transform: translateY(-60%);
}

.lecturer-claim {
    font-style: italic;
    margin: 2.2vh;
}
</style>