<template>
  <div class="card1">
    <div>
      <div class="titre">
        <div class="icon">
          <i class="pi pi-bolt" style="font-size: 18px; color: #fff"></i>
        </div>
        <h3>Batterie {{ title }}</h3>
        <h5>{{ parc }}</h5>
      </div>
      <div class="charge">
        <div class="progression">
          <div class="prog">
            <Progression
              :progress.sync="progress"
              :color="color1"
              :unites="'%'"
              :batteryId="batteryIdBat"
            />
          </div>
          <h4 class="charger">En Charge</h4>
        </div>
        <div class="progression">
          <div class="prog">
            <TemperatureBar :temperature="temperature" :color="color2" />
          </div>
          <h4 class="tempe">Température</h4>
        </div>
      </div>
      <div class="courbe">
        <RealTimeCurrentTensionChart
          :chartHeight="'280px'"
          :chartWidth="'96.5%'"
          :batteryId="batteryIdBat"
          topic="batteries"
          :colorTension="colors.tensionColor"
          :colorCourant="colors.courantColor"
          :showTime="false"
          :showTitle="false"
        />
      </div>
    </div>
    <div class="btn" @click="show.showBattDetails(title, batteryIdBat)">
      <h4>Détails</h4>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Progression from "@/components/containtes/chart/Progression.vue";
import TemperatureBar from "@/components/containtes/TemperatureBar.vue";
import BatterieDetail from "@/components/containtes/modals/BatterieDetail.vue";
import { useShow } from "@/stores/show";
import RealTimeCurrentTensionChart from "@/components/containtes/chart/RealTimeCurrentTensionChart.vue";
import { colors } from "@/service/color";
const show = useShow();
const props = defineProps({
  title: String,
  progress: Number,
  color1: String,
  temperature: Number,
  color2: String,
  parc: String,
  batteryIdBat: Number,
});

console.log("curent ", props);
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
.cardItem1 {
  /* background-color: red; */
  background-color: rgb(253, 253, 253);
  width: 35%;
}
.card1 {
  width: 33%;
  height: 37vw;
  background-color: rgb(253, 253, 253);
  /* border: 1px solid red; */
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgb(189, 189, 189);
}
.item {
  background-color: #f9f6fa;
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
  font-size: 12px;
  font-weight: 600;
}

.titre h5 {
  font-size: 12px;
  font-weight: 600;
  margin-left: 100px;
}
.charge {
  width: 100%;
  padding-top: 5px;
  display: flex;
  margin: 0 auto;
  padding: 0 5px;
  align-items: center;
  justify-content: space-between;
  /* background-color: rebeccapurple; */
}
.progression {
  width: 48%;
  /* background-color: rgb(149, 255, 0); */
  padding: 10px;
  text-align: center;
  /* border-right: 4px solid #ced1d28e;  */
}

.tempe{
  font-weight: 600;
  color: #fb7a58;
  background-color: #fc8d6e52;
  border-radius: 3px;
}
.charger{
  font-weight: 600;
  color: rgb(2, 200, 2);
  background-color: rgba(13, 255, 0, 0.402);
  border-radius: 3px;
}
.prog {
  width: 100%;
  height: 100px;
  background-color: #dfe2e285;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgb(189, 189, 189);
}
.courbe {
  display: flex;
  justify-content: center;
  width: 96%;
  height: 230px;
  background-color: #e1dfe285;
  /* background-color: #fb7a58; */
  /* padding: 5px; */
  margin: 5px auto;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgb(189, 189, 189);
}
.temp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: blue;
  width: 45%;
  margin: 0 auto;
  text-align: center;
}
.temperature {
  width: 100%;
  height: 100px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  background-color: #dfe2e285;
  /* background-color: red; */
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgb(189, 189, 189);
}
.temp h4 {
  display: block;
  width: 100%;
  font-weight: 600;
  color: #fb7a58;
  background-color: #fc8d6e52;
  border-radius: 3px;
}

.btn {
  position: relative;
  /* bottom: -25px; */
  /* left: 10px; */
  background-color: #328ca8;
  padding: 5px;
  margin: 10px auto;
  width: 30%;
  /* padding: 10px; */
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
