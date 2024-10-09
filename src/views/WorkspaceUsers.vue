<template>
  <div>
    <NavigationBar />
    <RouterView />
  </div>
</template>

<script setup>
import NavigationBar from "../components/NavigationBar.vue";
import { RouterView } from "vue-router";
</script>

<style scoped></style>
