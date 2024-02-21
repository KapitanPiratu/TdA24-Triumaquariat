<script setup>

const dashdata = defineDashdata(['color', 'display']);

onMounted(() => {
})
</script>

<template>
    <div class="NázevVymyslím">
        <div class="FirstDashboardSubcard">
            {{ name }}
            {{ email }}
            {{ phone }}
        </div>
        <div class="SecondDashboardSubcard">
            {{ date }}
            {{ time_from }}
            {{ time_to }}
            {{ place }}
        </div>
        <div class="ThirdDashboardSubcard">
            {{ tags }}
        </div>
        <div class="FourthDashboardSubcard">
            {{ comment }}
        </div>
    </div>
</template>