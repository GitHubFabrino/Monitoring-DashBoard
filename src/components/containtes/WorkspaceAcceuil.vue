<template>
  <div class="container">
    <BatteryItem
      title="Batterie 01"
      :progress="store.progress1"
      :color1="color1"
      :temperature="store.currentTemperature"
      :color2="color2"
      :timeData="timeData"
      :voltageData="voltageData"
      :currentData="currentData"
    />
    <BatteryItem
      title="Batterie 02"
      :progress="store.progress2"
      :color1="color1"
      :temperature="store.currentTemperature"
      :color2="color2"
      :timeData="timeData"
      :voltageData="voltageData"
      :currentData="currentData"
    />
    <BatteryItem
      title="Batterie 03"
      :progress="store.progress3"
      :color1="color1"
      :temperature="store.currentTemperature"
      :color2="color2"
      :timeData="timeData"
      :voltageData="voltageData"
      :currentData="currentData"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import "primeicons/primeicons.css";
import { useProgressStore } from "@/stores/progress";
import BatteryItem from "@/components/containtes/subContaines/BatteryItem.vue"; // Importer le nouveau composant

const store = useProgressStore();
const color1 = "rgb(2, 200, 2)";
const color2 = "#FB7A58";

const timeData = ref(["0s", "1s", "2s", "3s", "4s", "5s", "6s"]);
const voltageData = ref([12, 13, 14, 13, 15, 14, 20]);
const currentData = ref([1, 2, 1.5, 2.5, 2, 3, 5]);
</script>

<style scoped>
.container {
  width: 99%;
  height: 76vh;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  align-content: center;
}
</style>
