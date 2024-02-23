<script setup>
const logged_count = ref(0);
provide('logged_count', logged_count);

function logged_in() {
  let value = logged_count.value;
  value++;
  logged_count.value = value;
}
</script>

<template>
  <v-app>
    <NuxtPage @logged_in="logged_in"></NuxtPage>
    <Navbar />
  </v-app>
</template>
