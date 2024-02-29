<script setup>

const props = defineProps(['uuid']);

</script>

<template>
    <div class="dashboard-header">
        <p>Správa rezervací</p>
    </div>

    <div class="dashboard-card">

    </div>
</template>
<style scoped>
.dashboard-card {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    height: 50vh;
    width: 70vw;
    box-shadow: 1px 1px 3px 0.2px var(--jet);

    border-radius: 6.5px;
}

.dashboard-header {
    position: absolute;
    top: 8vh;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 1.7rem;

    width: 70vw;
}
</style>