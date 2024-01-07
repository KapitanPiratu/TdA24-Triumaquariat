<script setup>

const color = defineProps()

onMounted(() => {
    console.log(color)
})
</script>

<template>
    <div class="block" :class="color">
        <p>data bloku</p>
    </div>
</template>

<style scoped>
.block {
    padding: 10rem;
    margin: 1rem;
    width: 10rem;
}

.sunglow {
    background-color: var(--sunglow);
}

.firstblock {
    background-color: var(--sky-blue);
    padding: 528px;
    color: var(--jet);
    width: 295px;
}

.secondblock {
    background-color: var(--sunglow);
    padding: 528px;
    color: var(--jet);
    width: 295px;
}

.thirdblock {
    background-color: var(--white);
    padding: 528px;
    color: var(--jet);
    width: 295px;
}
</style>