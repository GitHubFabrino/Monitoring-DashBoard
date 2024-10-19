<script setup>
import { ref } from "vue";
import { useShow } from "@/stores/show";
const show = useShow();
const color1 = "rgb(2, 200, 2)";
const color2 = "#FB7A58";
import { useProgressStore } from "@/stores/progress";
const store = useProgressStore();
import Progression from "@/components/containtes/Progression.vue";
import TemperatureBar from "@/components/containtes/TemperatureBar.vue";
import VoltageCurrentChart from "@/components/containtes/VoltageCurrentChart.vue";
const timeData = ref(["0s", "1s", "2s", "3s", "4s", "5s", "6s"]);
const voltageData = ref([12, 13, 14, 13, 15, 14, 20]);
const currentData = ref([1, 2, 1.5, 2.5, 2, 3, 5]);
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showBatt">
      <div class="formModal">
        <div class="titre">
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 18px; color: #fff"></i>
          </div>
          <h3>{{ show.showBatterieItem }}</h3>
        </div>
        <div class="container">
          <div class="containerOne">
            <div class="item">
              <div class="cont">
                <h4>CHARGE</h4>
                <h5>En charge</h5>
              </div>
              <div class="progression">
                <div class="prog">
                  <Progression
                    :progress="store.progress1"
                    :color="color1"
                    :unites="'%'"
                  />
                </div>
              </div>
            </div>
            <div class="item">
              <div class="cont">
                <h4>TENSION</h4>
                <h5>Normale</h5>
              </div>
              <div class="progression">
                <div class="prog">
                  <Progression :progress="12" :color="color1" :unites="'V'" />
                </div>
              </div>
            </div>
            <div class="item">
              <div class="cont">
                <h4>COURANT</h4>
                <h5>Normale</h5>
              </div>
              <div class="progression">
                <div class="prog">
                  <Progression
                    :progress="store.progress1"
                    :color="color1"
                    :unites="'A'"
                  />
                </div>
              </div>
            </div>
            <div class="item">
              <div class="cont">
                <h4>TEMPERATURE</h4>
                <h5>Normale</h5>
              </div>
              <div class="progression">
                <div class="prog">
                  <Progression
                    :progress="store.progress1"
                    :color="color1"
                    :unites="'°C'"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="containerTwo">
            <div class="option">
              <h4
                @click="show.setShowGraph('Tension')"
                :class="{
                  bg: show.showTension === true,
                }"
              >
                Tension
              </h4>
              <h4
                @click="show.setShowGraph('Courant')"
                :class="{
                  bg: show.showCourant === true,
                }"
              >
                Courant
              </h4>
              <h4
                @click="show.setShowGraph('TensionCourant')"
                :class="{
                  bg: show.showTensionCourant === true,
                }"
              >
                Tension/Courant
              </h4>
            </div>
            <div class="graph" v-if="show.showTension">
              <div class="containerG">
                <VoltageCurrentChart
                  :timeData="[0, 1, 2, 3]"
                  :voltageData="[12, 14, 15, 13]"
                  chartType="voltage"
                  height="300px"
                />
              </div>
            </div>
            <div class="graph" v-if="show.showCourant">
              <div class="containerG">
                <VoltageCurrentChart
                  :timeData="[0, 1, 2, 3]"
                  :currentData="[5, 6, 7, 6]"
                  chartType="current"
                  height="300px"
                />
              </div>
            </div>
            <div class="graph" v-if="show.showTensionCourant">
              <div class="containerG">
                <VoltageCurrentChart
                  :timeData="[0, 1, 2, 3]"
                  :voltageData="[12, 14, 15, 13]"
                  :currentData="[5, 6, 7, 6]"
                  chartType="both"
                  height="300px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="closeForm" @click="show.closeBattDetails">
        <i class="pi pi-times" style="font-size: 18px; color: #2d4051"></i>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.closeForm {
  background-color: rgb(231, 230, 230);
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: absolute;
  right: 180px;
  top: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
}
.showModal {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(92, 90, 90, 0.927);
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(43, 38, 38, 0.801);
  justify-content: center;
  align-items: center;
}

.formModal {
  width: 70%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
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
.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.containerOne {
  width: 30%;
  height: 100%;
}
.item {
  background-color: #e9f0f67d;
  margin-bottom: 2px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
}
.cont {
  width: 45%;
  height: 100px;
  text-align: center;
}
.cont h4 {
  font-weight: 600;
  padding: 10px;
}

.cont h5 {
  font-weight: 600;
  padding: 10px;
  background-color: #58fb60;
  border-radius: 5px;
}
.progression {
  width: 50%;
  padding: 5px;
  text-align: center;
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

  box-shadow: 0px 2px 5px rgb(189, 189, 189);
}

.temp {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.temperature {
  height: 100px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  background-color: #dfe2e285;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgb(189, 189, 189);
}
.temp h4 {
  font-weight: 600;
  color: #fb7a58;
  background-color: #fc8d6e52;
  border-radius: 3px;
}

.containerTwo {
  width: 65%;
  height: 75vh;
}
.option {
  display: flex;
  justify-content: space-around;
  width: 50%;
  position: relative;
  left: 283px;
  top: 2px;
  margin-top: 10px;
}
.graph {
  background-color: #e9f0f6;
  width: 95%;
  margin: 0 auto;
  height: 65vh;
  border: 2px solid #c7c7c72d;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.containerG {
  width: 550px;
  height: 300px;
  margin: 0 auto;
}
.bg {
  background-color: #e9f0f6;
  border-bottom: 2px solid #e9f0f6;
  border-top: 2px solid #c7c7c72d;
  border-left: 2px solid #c7c7c72d;
  border-right: 2px solid #c7c7c72d;
  border-radius: 5px 5px 0px 0px;
}
.option h4 {
  padding: 5px;
}
</style>
