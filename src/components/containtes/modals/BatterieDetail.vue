<template>
  <Transition>
    <div class="showModal" v-if="show.showBatt">
      <div class="formModal">
        <div class="titre">
          <div class="title">
            <div class="icon">
            <i class="pi pi-bolt" style="font-size: 18px; color: #fff"></i>
          </div>
          <h3>Batterie {{ show.showBatterieItem }}</h3>
          </div>
          <div class="closeForm" @click="show.closeBattDetails">
            <i class="pi pi-times" style="font-size: 18px; color: #2d4051"></i>
          </div>
        </div>
        <div
          class="container"
          v-for="item in mqttStore.dataReceived"
          :key="item.id"
        >
          <div
            class="containerOne"
            v-if="item.batterie_id == show.showBatterieItemId"
          >
            <div class="item">
              <div class="cont">
                <h4>CHARGE</h4>
                <h5>En charge</h5>
              </div>
              <div class="progression">
                <div class="prog">
                  <Progression
                
                    :color="color1"
                    :unites="'%'"
                    :batteryId="show.showBatterieItemId"
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
                  <h1>⚡ {{ parseFloat(item.tension).toFixed(1) }}</h1>
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
                  <h1>🔌 {{ parseFloat(item.courant).toFixed(1) }}</h1>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="cont">
                <h4>TEMPERATURE</h4>
                <h5
                  :style="{
                    backgroundColor: classifyTemperatureColor(
                      parseFloat(item.temperature).toFixed(1)
                    ),
                  }"
                >
                  {{
                    classifyTemperatureText(
                      parseFloat(item.temperature).toFixed(1)
                    )
                  }}
                </h5>
              </div>

              <div class="progression">
                <div class="prog">
                  <h1>🌡️{{ parseFloat(item.temperature).toFixed(1) }}</h1>
                </div>
              </div>
            </div>
          </div>
          <div
            class="containerTwo"
            v-if="item.batterie_id == show.showBatterieItemId"
          >
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
            <div class="graph" v-show="show.showTension">
              <div class="containerG">
                <RealTimeChart
                  ref="tensionChart"
                  :chartWidth="'550px'"
                  :batteryId="show.showBatterieItemId"
                  topic="batteries"
                  :color="colors.tensionColor"
                  :showTime="true"
                  :showTitle="false"
                  type="tension"
                />
              </div>
            </div>
            <div class="graph" v-show="show.showCourant">
              <div class="containerG">
                <RealTimeChart
                  ref="courantChart"
                  :chartWidth="'550px'"
                  :batteryId="show.showBatterieItemId"
                  topic="batteries"
                  :color="colors.courantColor"
                  :showTime="true"
                  :showTitle="false"
                  type="courant"
                />
              </div>
            </div>
            <div class="graph" v-show="show.showTensionCourant">
              <div class="containerG">
                <RealTimeCurrentTensionChart
                  :chartWidth="'550px'"
                  ref="tensionCourantChart"
                  :batteryId="show.showBatterieItemId"
                  topic="batteries"
                  :colorTension="colors.tensionColor"
                  :colorCourant="colors.courantColor"
                  :showTime="true"
                  :showTitle="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, onMounted, watch, nextTick } from "vue";
import { useShow } from "@/stores/show";
import { colors } from "@/service/color";
const show = useShow();
const color1 = "rgb(2, 200, 2)";
import { useProgressStore } from "@/stores/progress";
const store = useProgressStore();
import Progression from "@/components/containtes/chart/Progression.vue";
import RealTimeCurrentTensionChart from "@/components/containtes/chart/RealTimeCurrentTensionChart.vue";
import RealTimeChart from "@/components/containtes/chart/RealTimeChart.vue";
const props = defineProps({
  batteryIdBat: Number,
});
import { useMqttStore } from "@/stores/mqttStore";
const mqttStore = useMqttStore();
// Fonction pour classifier les températures en couleurs
const classifyTemperatureColor = (temperature) => {
  if (temperature < 10) {
    return colors.tensionColor; // Température Basse
  } else if (temperature >= 10 && temperature <= 40) {
    return "#58fb60"; // Température Normale
  } else if (temperature > 40 && temperature <= 60) {
    return "orange"; // Température Élevée
  } else {
    return "red"; // Température Critique
  }
}; // Fonction pour classifier les températures en texte
const classifyTemperatureText = (temperature) => {
  if (temperature < 10) {
    return "Basse";
  } else if (temperature >= 10 && temperature <= 40) {
    return "Normale";
  } else if (temperature > 40 && temperature <= 60) {
    return "Élevée";
  } else {
    return "Critique";
  }
};

// Watch for changes in the showGraph value and resize the chart accordingly
watch(
  () => show.showGraph,
  async () => {
    await nextTick();
    if (show.showTension) {
      this.$refs.tensionChart.chartInstance.resize();
    } else if (show.showCourant) {
      this.$refs.courantChart.chartInstance.resize();
    } else if (show.showTensionCourant) {
      this.$refs.tensionCourantChart.chartInstance.resize();
    }
  }
);
</script>

<style scoped>
.closeForm {
  background-color: #fb7b5891;
  width: 40px;
  height: 40px;
  border-radius: 100%;

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
  /* height: 550px; */
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title{
  display: flex;
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
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;

  box-shadow: 0px 2px 5px rgb(189, 189, 189);
}

.prog h1 {
  display: block;
  align-self: center;
  margin: auto 0;
  width: 100%;
  font-weight: 600;
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
  /* background-color: #e7e8e9; */
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
  height: "90%";
  margin: 0 auto;
  /* background-color: red; */
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
