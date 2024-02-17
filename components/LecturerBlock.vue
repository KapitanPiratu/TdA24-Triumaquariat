<script setup>

const props = defineProps(['color', 'display', 'lecturer']);

onMounted(() => {
})
</script>

<template>
    <div class="block" :class="props.color">

        <div class="names-container" v-if="props.display.includes('names')">
            <h1 style="text-align: center;">
                {{ props.lecturer.title_before }}
                {{ props.lecturer.first_name }}
                {{ props.lecturer.middle_name }}
                {{ props.lecturer.last_name }}
                {{ props.lecturer.title_after }}
            </h1>

            <div style="text-align: center;">
                <img v-if="props.lecturer.picture_url" class="image_paragraph" :src="props.lecturer.picture_url"
                    alt="tda image" />
                <img v-else class="image_paragraph" src="~/assets/svg/tda_studium.svg" alt="tda image">
            </div>

            <h2 class="claim">{{ props.lecturer.claim }}</h2>
        </div>

        <div v-if="props.display.includes('personaldata')">
            <Tags class="tags" :tags="props.lecturer.tags" />
            <p class="bio" style="text-align: left;" v-html="props.lecturer.bio"></p>
        </div>

        <div v-if="props.display.includes('contact')">
            <div class="contact-container">

                <div>
                    <h2>Lokace:</h2>
                    <p class="location_paragraph">{{ props.lecturer.location }}</p>
                </div>

                <div>
                    <h2>Cena:</h2>
                    <p class="price_per_hour_paragraph">{{ props.lecturer.price_per_hour }} Kč/h</p>
                </div>

                <div v-if="props.lecturer.contact" class="numbers_container">
                    <h2>Kontakt:</h2>
                    <p class="telephone_numbers_paragraph" v-for="number in props.lecturer.contact.telephone_numbers">{{
                        number
                    }}</p>
                </div>

                <div v-if="props.lecturer.contact" class="emails_paragraph">
                    <p class="email_paragraph" v-for="email in props.lecturer.contact.emails">{{ email }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.blocks-container {
    white-space: nowrap;
}

.block {
    height: 70vh;
    width: 23vw;

    margin: 5vw;
    margin-top: 4vh;

    border-radius: 6.5px;

    overflow-y: auto;
    transition-duration: 0.5s;
}

.sunglow {
    background-color: var(--sky-blue);
}

.sky-blue {
    background-color: var(--sky-blue);
}

.prussian-blue {
    background-color: var(--sky-blue);
}

.block:hover {
    box-shadow: 10px 10px var(--prussian-blue);
}

.image_paragraph {
    width: 15vw;
    text-align: center;
    border-radius: 6.5px;
    box-shadow: 5px 5px 5px var(--jet);
}

.bio {
    width: 22vw;
    padding: 2vh;
}

.contact-container {
    height: 70vh;
    width: 23vw;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    text-align: center;
}

.contact-container * {
    margin: 1rem;
}

.claim {
    text-align: center;
}

.names-container {
    max-height: 35vw;
    width: 23vw;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.names-container * {
    margin-top: 3vh;
    margin-bottom: 3vh;
}

.tags {
    margin: 1vh;
    max-height: none;
}
</style>