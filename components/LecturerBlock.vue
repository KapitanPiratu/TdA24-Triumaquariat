<script setup>

const props = defineProps(['color', 'display', 'lecturer']);

onMounted(() => {
})
</script>

<template>
    <div class="block" :class="props.color">
        <div class="names-container" v-if="props.display.includes('names')">
            <h1 style="text-align: center;">{{ props.lecturer.title_before }} {{ props.lecturer.first_name }} {{
                props.lecturer.middle_name }} {{
        props.lecturer.last_name }} {{ props.lecturer.title_after }}</h1>
            <div style="text-align: center;">
                <img v-if="props.lecturer.picture_url" class="image_paragraph" :src="props.lecturer.picture_url"
                    alt="tda image" />
                <img v-else class="image_paragraph" src="~/assets/svg/tda_studium.svg" alt="tda image">
            </div>
            <h2 class="claim">{{ props.lecturer.claim }}</h2>
        </div>
        <div v-if="props.display.includes('personaldata')">
            <div class="tags-container">
                <div class="tag" v-for="tag in props.lecturer.tags">
                    <p>{{ tag.name }}</p>
                </div>
            </div>
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
        {{ lecturers }}
    </div>
</template>

<style scoped>
.blocks-container {
    white-space: nowrap;
}

.block {
    /* position: static; */
    /* display: inline-block; */
    height: 40vw;
    width: 23vw;
    border-radius: 6.5px;
    margin: 5vw;
    margin-top: 3vh;
    overflow-y: auto;
    transition-duration: 0.5s;
}

.sunglow {
    background-color: var(--sky-blue);
    /* margin-left: 37.5vw;
    position: absolute; */
}

.sky-blue {
    background-color: var(--sky-blue);
    /* margin-left: 7.5vw;
    position: absolute; */
}

.prussian-blue {
    background-color: var(--sky-blue);
    /* margin-left: 67.5vw;
    position: absolute; */
}

.block:hover {
    background-color: var(--prussian-blue);
}

/* 
.telephone_numbers_paragraph {
    text-align: center;
    position: relative;
    margin-top: 27vh;
} */

/* 
.email_paragraph {
    text-align: center;
    margin-bottom: 2vh;
}

.price_per_hour_paragraph {
    text-align: center;
    position: relative;
    margin-top: 15vw;
}

.location_paragraph {
    text-align: center;
    position: relative;
} */

.image_paragraph {
    text-align: center;
    border-radius: 6.5px;
    box-shadow: 5px 5px 5px var(--jet);
    width: 15vw;
}

.bio {
    position: absolute;
    top: 13vh;
    padding: 1rem;
    width: 22vw
}

.contact-container {
    height: 40vw;
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
    display: flex;
    flex-direction: column;
    max-height: 35vw;
    width: 23vw;
    justify-content: flex-start;
}

.names-container * {
    margin-top: 3vh;
    margin-bottom: 3vh;
}

.tags-container {
    max-height: 10vh;
    overflow: hidden;
    white-space: nowrap;
    margin: 1vw;
    padding: 1vh;
}

.tags-container:hover {
    overflow-x: auto;
}

.tag {
    display: inline-block;
    margin-right: 1vw;
    border: 3px solid var(--sunglow);
    border-radius: 30px;
    transition-duration: 0.2s;
}

.tag p {
    /* color: var(--sunglow) !important; */
    padding: 0.5vw;
}

.tag:hover {
    background-color: var(--sunglow);
    border-radius: 30px;
}
</style>