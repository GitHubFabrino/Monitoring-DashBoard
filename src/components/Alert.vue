<template>
  <template v-for="(value, index) in alert.list" :key="index">
    <v-alert
      :type="value.type"
      v-show="value.isShow"
      prominent
      :class="['alert', value.type]"
    >
      {{ value.message }}
      <button class="btn" @click="alert.remove(index)">X</button>
    </v-alert>
  </template>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useAlertStore } from "../stores/alert";

const alert = useAlertStore();
</script>

<style scoped>
.alert {
  position: fixed;
  top: 60px;
  right: 12px;
  margin: auto;
  z-index: 1000;
  padding: 10px 20px;
  color: #fff;
  font-weight: 600;
  border-radius: 2px;
}

.error {
  background-color: rgb(240, 101, 101);
}
.warning {
  background-color: rgb(236, 175, 62);
}
.success {
  background-color: rgb(53, 233, 53);
}
.btn {
  border: none;
  background-color: rgba(255, 255, 255, 0);
  color: white;
}
</style>
