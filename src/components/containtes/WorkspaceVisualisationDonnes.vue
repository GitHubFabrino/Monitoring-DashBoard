<template>
  <div class="container">
    <div class="flex justify-between items-center p-[10px] border-b border-gray-300">
      <h3 class="font-semibold w-[60%] text-[var(--primary-color)]">Visualisation des données</h3>
    </div>
    <div class="contenu">
      <!-- <div class="entete">
        <div class="option">
          <div
            class="opt1"
            v-for="item in batterie.allBatteryData"
            :key="item.id"
          >
            <h4
              @click="selectBattery(item)"
              :class="{ select: selectedBattery?.id === item.id }"
            >
              Batterie {{ item.nom }}
            </h4>
            <div
              class="optionType"
              v-show="type && selectedBattery?.id === item.id"
            >
              <h4 @click="selectTimeRange('Jour')">Jour</h4>
              <h4 @click="selectTimeRange('Semaine')">Semaine</h4>
              <h4 @click="selectTimeRange('Mois')">Mois</h4>
              <h4 @click="selectTimeRange('Année')">Année</h4>
            </div>
          </div>
        </div>
        <h4>{{ selectedTimeRange }}</h4>
      </div> -->

      <div class="recent" v-if="show.showRecents">
        <!-- <VoltageCurrentTemperatureChart
          :timeData="lectureStore.voltageData"
          :voltageData="lectureStore.currentData"
          :currentData="lectureStore.temperatureData"
          :temperatureData="lectureStore.timeData"
          :height="'350px'"
        /> -->
        <VoltageCurrentTemperatureChart
  
        />

        <!-- <div v-if="batteries.length == 0">
          <div class="con">
            <div style="width: 100px">
              <svg
                viewBox="-9.1 -9.1 109.20 109.20"
                enable-background="new 0 0 91 91"
                id="Layer_1"
                version="1.1"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  stroke-width="0"
                  transform="translate(0,0), scale(1)"
                ></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.546"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path
                        d="M38.841,55.666l0.682-0.676l-0.02-0.016c-0.881-0.891,4.984-6.855,4.984-6.855l-8.119-8.118L8.663,66.904 c-1.973,1.977-2.92,4.705-2.658,7.686c0.242,2.793,1.533,5.49,3.813,7.771c2.43,2.424,5.553,3.66,8.533,3.66 c2.521,0,4.938-0.889,6.746-2.691l20.258-20.26l-5.111-5.17C39.604,57.252,39.151,56.488,38.841,55.666"
                        fill="#45596B"
                      ></path>
                      <path
                        d="M87.675,16.767l-1.621-3.891L75.616,23.317c-1.777,1.777-3.336,2.678-4.635,2.678 c-0.992,0-2.006-0.537-3.146-1.674l-0.188-0.184c-1.701-1.701-3.016-3.695,1.037-7.75L79.13,5.942l-3.893-1.621 C67.31,1.019,59.005-1.073,51.952,5.985l-6.457,6.451c-6.553,6.561-8.811,14.01-6.699,21.397l6.51,6.646l5.088-5.088 c0,0,3.248,1.688,5.568,3.182l13.875,14.061c3.398-1.033,6.664-3.059,9.732-6.129l6.441-6.452 C93.073,33.001,90.985,24.692,87.675,16.767"
                        fill="#45596B"
                      ></path>
                      <path
                        d="M80.097,69.682L54.472,43.714c-0.84-0.855-1.898-1.527-3.148-1.996l-1.51-0.568l-4.578,4.58L21.023,21.518 l2.235-2.237c0.602-0.6,0.9-1.439,0.813-2.283c-0.086-0.846-0.547-1.607-1.258-2.074L9.72,6.321 C8.601,5.587,7.118,5.739,6.169,6.687l-4.482,4.49c-0.945,0.947-1.096,2.428-0.361,3.545l8.6,13.094 c0.465,0.711,1.227,1.174,2.072,1.26c0.096,0.01,0.191,0.014,0.287,0.014c0.746,0,1.465-0.295,1.998-0.826l2.02-2.021 l24.211,24.211l-4.588,4.59l0.572,1.512c0.459,1.207,1.119,2.25,1.965,3.105l25.645,25.984c1.688,1.688,4.006,2.617,6.527,2.617 h0.002c2.994,0,6.018-1.309,8.334-3.627l0.133-0.139c2.057-2.051,3.318-4.678,3.553-7.396 C82.907,74.219,81.993,71.582,80.097,69.682z M75.522,80.99l-0.137,0.145c-1.344,1.344-3.076,2.117-4.75,2.117 c-0.838,0-2.039-0.201-2.979-1.139L42.026,56.141c-0.02-0.02-0.039-0.039-0.059-0.059l8.893-8.895 c0.012,0.014,0.023,0.027,0.035,0.039L76.54,73.211c0.844,0.848,1.246,2.076,1.125,3.455C77.53,78.211,76.784,79.73,75.522,80.99z "
                        fill="#f99b80"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <h1>Aucune batterie disponible</h1>

          </div>
        </div> -->
      </div>
      <!-- {{ voltageData }}
      {{ temperatureData }}
      {{ currentData }}
      {{ timeData }}

      {{ lectureStore.allLectureData }} -->

      <!-- <div class="historique" v-if="show.showHistoriqueCale">
        <div class="item">
          <div class="check">
            <i class="pi pi-check" style="font-size: 18px; color: #3af130"></i>
          </div>

          <div class="text">
            <div class="icon">
              <i
                class="pi pi-calendar"
                style="font-size: 12px; color: #2d4051"
              ></i>
            </div>
            <h4>Lorem ipsum dolor sit amet.</h4>
          </div>
          <div class="date"><h5>31 Janvier 2023 à 10h 15min 03</h5></div>
          <div class="action"></div>
        </div>

        <div class="item">
          <div class="check">
            <i class="pi pi-check" style="font-size: 18px; color: #3af130"></i>
          </div>

          <div class="text">
            <div class="icon">
              <i
                class="pi pi-calendar"
                style="font-size: 12px; color: #2d4051"
              ></i>
            </div>
            <h4>Lorem ipsum dolor sit amet.</h4>
          </div>
          <div class="date"><h5>31 Janvier 2023 à 10h 15min 03</h5></div>
          <div class="action"></div>
        </div>

        <div class="item">
          <div class="check">
            <i class="pi pi-times" style="font-size: 18px; color: #f13030"></i>
          </div>

          <div class="text">
            <div class="icon">
              <i
                class="pi pi-calendar"
                style="font-size: 12px; color: #2d4051"
              ></i>
            </div>
            <h4>Lorem ipsum dolor sit amet.</h4>
          </div>
          <div class="date"><h5>31 Janvier 2023 à 10h 15min 03</h5></div>
          <div class="action"></div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { ref, onMounted } from "vue";
import { useShow } from "@/stores/show";
import { useBatterie } from "@/stores/batterieStore";
import { parcStore } from "@/stores/parcStore";
import { useLectureStore } from "@/stores/lectureStore";
const batterie = useBatterie();
const show = useShow();
const useParc = parcStore();

// const batteries = batterie.allBatteryData; 

const lectureStore = useLectureStore();

import VoltageCurrentTemperatureChart from "@/components/containtes/VoltageCurrentTemperatureChart.vue";
const selectedBattery = ref("");
const selectedTimeRange = ref("");
const type = ref(false);

function selectBattery(item) {
  selectedBattery.value = item;
  type.value = selectedBattery.value && selectedBattery.value.id === item.id;
}

function selectTimeRange(range) {
  selectedTimeRange.value = range;
  type.value = false;
}

const voltageData = ref([]);
const currentData = ref([]);
const temperatureData = ref([]);
const timeData = ref([]);

function selecteData(idBat) {
  // Réinitialisation des tableaux pour éviter l'accumulation de données
  voltageData.value = [];
  currentData.value = [];
  temperatureData.value = [];
  timeData.value = [];

  // Parcours des données de lecture
  for (let index = 0; index < lectureStore.allLectureData.length; index++) {

    if (lectureStore.allLectureData[index].batterie_id === idBat) {

      // Parcours des lectures de la batterie sélectionnée
      for (
        let i = 0;
        i < lectureStore.allLectureData[index].lectures.length;
        i++
      ) {
        voltageData.value.push(
          Number(lectureStore.allLectureData[index].lectures[i].tension)
        );
        currentData.value.push(
          Number(lectureStore.allLectureData[index].lectures[i].courant)
        );
        temperatureData.value.push(
          Number(lectureStore.allLectureData[index].lectures[i].temperature)
        );
        timeData.value.push(
          lectureStore.allLectureData[index].lectures[i].created_at
        );
      }
    }
  }

 
}


import { watch } from "vue";

onMounted(async () => {
  let parcid = useParc.parcSuperviser.id;

  // Récupération des données initiales
  await lectureStore.getLectureByParcId(parcid);

  // Surveille les données et met à jour lorsque disponibles
  watch(
    () => batterie.allBatteryData,
    (newVal) => {
      if (newVal.length > 0) {
        selecteData(newVal[0].id); // Charge les données de la première batterie
      }
    },
    { immediate: true } // Exécute au moment où le `watch` est défini
  );
});

</script>

<style scoped>
.container {
  background-color: #f6f8fa;
  width: 100%;
  height: 76vh;
  box-shadow: 0px 0px 5px rgb(189, 189, 189);
  border-radius: 5px;
  padding: 20px;
}
.titre h3 {
  font-weight: 600;
  width: 60%;
  color: #2c3d5e;
}
.titre {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #d3d3d3;
  align-items: center;
}
.search {
  /* background-color: #4caf50; */
  width: 30%;
  justify-content: space-around;
  display: flex;
  align-items: center;
}

.searchInput {
  width: 86%;
  height: 30px;
  border: 2px solid #d5d6d5;
  padding: 5px;
  border-radius: 5px;
}
.btn {
  background-color: #4caf50;
  padding: 5px 10px;
  border-radius: 5px;
}
.btn h4 {
  font-weight: 600;
  color: #f6f8fa;
}

.icon {
  background-color: #e1e1e092;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.blue {
  background-color: #247bc8d2;
}
.orange {
  background-color: #fb7b58d8;
}
.red {
  background-color: rgb(255, 93, 93);
}

.option {
  display: flex;
  justify-content: space-between;
  /* background-color: #4caf50; */
  padding: 10px;
  width: 40%;
}

.option h4 {
  font-weight: 600;
  border-bottom: 2px solid #ebedee00;
  padding: 5px 10px;
}

.entete {
  display: flex;
  justify-content: space-between;
  /* background-color: #328ca8; */
  align-items: center;
}

.entete h4 {
  font-weight: 600;
  margin-right: 20px;
}

.select {
  color: #328ca8 !important;
  border-bottom: 2px solid #328ca8 !important;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: #4caf50; */
  margin: 5px 0px;
  border-bottom: 1px solid #d3d3d3;
}
.date h5 {
  font-weight: 500;
}
.action {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  width: 15%;
}
.check {
  background-color: #feffff;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
}
.text {
  display: flex;
  align-items: center;
  width: 60%;
}
.text h4 {
  font-weight: 500;
  padding-left: 10px;
}

.optionType {
  position: absolute;
  z-index: 100;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0px 2px 5px #d5d6d5;
}
</style>
