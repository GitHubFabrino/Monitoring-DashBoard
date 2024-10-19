<template>
  <div class="item">
    <div class="titre">
      <div class="icon">
        <i class="pi pi-bolt" style="font-size: 18px; color: #fff"></i>
      </div>
      <h3>{{ title }}</h3>
    </div>
    <div class="charge">
      <div class="progression">
        <div class="prog">
          <Progression :progress="progress" :color="color1" :unites="'%'" />
        </div>
        <h4>En Charge</h4>
      </div>
      <div class="temp">
        <div>
          <div class="temperature">
            <TemperatureBar :temperature="temperature" :color="color2" />
          </div>
          <h4>Temperature</h4>
        </div>
      </div>
    </div>
    <div class="courbe">
      <VoltageCurrentChart
        :timeData="timeData"
        :voltageData="voltageData"
        :currentData="currentData"
        height="160px"
      />
    </div>
    <div class="btn" @click="show.showBattDetails(title)"><h4>Détails</h4></div>

    <BatterieDetail v-if="false" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Progression from "@/components/containtes/Progression.vue";
import TemperatureBar from "@/components/containtes/TemperatureBar.vue";
import VoltageCurrentChart from "@/components/containtes/VoltageCurrentChart.vue";
import BatterieDetail from "@/components/containtes/modals/BatterieDetail.vue";
import { useShow } from "@/stores/show";
const show = useShow();
const props = defineProps({
  title: String,
  progress: Number,
  color1: String,
  temperature: Number,
  color2: String,
  timeData: Array,
  voltageData: Array,
  currentData: Array,
});
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
.item {
  background-color: #f6f8fa;
  width: 32%;
  height: 76vh;
  box-shadow: 0px 0px 5px rgb(189, 189, 189);
}
.icon {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fb7a58;
  margin-right: 10px;
}
.titre {
  padding: 5px 10px;
  background-color: #dddddd78;
  display: flex;
  align-items: center;
}
.titre h3 {
  font-weight: 600;
}
.charge {
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
}
.progression {
  width: 50%;
  /* background-color: rgb(149, 255, 0); */
  padding: 10px;
  text-align: center;
  border-right: 4px solid #ced1d28e;
}

.progression h4 {
  font-weight: 600;
  color: rgb(2, 200, 2);
  background-color: rgba(13, 255, 0, 0.402);
  border-radius: 3px;
}
.prog {
  width: 100%;
  height: 100px;
  background-color: #dfe2e285;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgb(189, 189, 189);
}
.courbe {
  width: 96%;
  background-color: #dfe2e285;
  padding: 5px;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgb(189, 189, 189);
}
.temp {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
  width: 50%;
  text-align: center;
}
.temperature {
  width: 140px;
  height: 100px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  background-color: #dfe2e285;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgb(189, 189, 189);
}
.temp h4 {
  font-weight: 600;
  color: #fb7a58;
  background-color: #fc8d6e52;
  border-radius: 3px;
}

.btn {
  background-color: #328ca8;
  padding: 5px;
  margin: 0 auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
.btn h4 {
  font-weight: 600;
  color: #f6f8fa;
}
</style>
