<script setup>

const props = defineProps(['color', 'display', 'lecturer']);

onMounted(() => {
    // console.log(props.lecturer)
})
// let new_telephone_numbers = props.lecturer.telephone_numbers;
</script>

<template>
    <div class="block" :class="props.color">
        <div v-if="props.display.includes('names')">
            <h1>{{ props.lecturer.title_before }} {{ props.lecturer.first_name }} {{ props.lecturer.middle_name }} {{
                props.lecturer.last_name }} {{ props.lecturer.title_after }}</h1>
            <img :src="props.lecturer.picture_url" alt="tda image" />
        </div>
        <div v-if="props.display.includes('personaldata')">
            <div v-html="props.lecturer.bio"></div>
        </div>
        <div v-if="props.display.includes('contact')">
            <div>
                <p>{{ props.lecturer.location }}</p>
                <p>{{ props.lecturer.price_per_hour }} Kč/h</p>
                <p v-for="number in props.lecturer.telephone_numbers">{{ number }}</p>
                <p v-for="email in props.lecturer.emails">{{ email }}</p>
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
</style>