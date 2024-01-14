<script setup>

const props = defineProps(['color', 'display', 'lecturer']);

onMounted(() => {
})
</script>

<template>
    <div class="block" :class="props.color">
        <div v-if="props.display.includes('names')">
            <h1 style="text-align: center;">{{ props.lecturer.title_before }} {{ props.lecturer.first_name }} {{
                props.lecturer.middle_name }} {{
        props.lecturer.last_name }} {{ props.lecturer.title_after }}</h1>
            <div style="text-align: center;">
                <img class="image_paragraph" :src="props.lecturer.picture_url" alt="tda image" />
            </div>
        </div>
        <div v-if="props.display.includes('personaldata')">
            <div class="bio" style="text-align: left;" v-html="props.lecturer.bio"></div>
        </div>
        <div v-if="props.display.includes('contact')">
            <div>
                <p class="location_paragraph">{{ props.lecturer.location }}</p>
                <p class="price_per_hour_paragraph">{{ props.lecturer.price_per_hour }} Kč/h</p>
                <p class="telephone_numbers_paragraph" v-for="number in props.lecturer.telephone_numbers">{{ number }}</p>
                <p class="email_paragraph" v-for="email in props.lecturer.emails">{{ email }}</p>
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
    position: static;
    display: inline-block;
    height: 40vw;
    width: 23vw;
    margin-top: 4vw;
    border-radius: 6.5px;
}

.sunglow {
    background-color: var(--sunglow);
    margin-left: 37.5vw;
    position: absolute;
}

.sky-blue {
    background-color: var(--sky-blue);
    margin-left: 7.5vw;
    position: absolute;
}

.prussian-blue {
    background-color: var(--prussian-blue);
    margin-left: 67.5vw;
    position: absolute;
}

.telephone_numbers_paragraph {
    text-align: center;
    position: relative;
    margin-top: 27vh;
}

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
}

.image_paragraph {
    text-align: center;
    border-radius: 6.5px;
    box-shadow: 5px 5px 5px var(--jet);
}

.bio {
    padding: 1rem;
}
</style>