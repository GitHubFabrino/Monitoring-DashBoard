<template>
  <div class="container">
    <div class="titre">
      <h3>Visualisation des données</h3>
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

const lectureStore = useLectureStore();

import VoltageCurrentTemperatureChart from "@/components/containtes/VoltageCurrentTemperatureChart.vue";
const selectedBattery = ref("");
const selectedTimeRange = ref("");
const type = ref(false);

function selectBattery(item) {
  selectedBattery.value = item;
  console.log("selectedBattery.value ", selectedBattery.value);
  type.value = selectedBattery.value && selectedBattery.value.id === item.id;
  console.log("type", type.value);
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
    console.log("ato");

    if (lectureStore.allLectureData[index].batterie_id === idBat) {
      console.log("oui", lectureStore.allLectureData[index]);

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

  console.log("voltageData", voltageData.value);
  console.log("currentData", currentData.value);
  console.log("temperatureData", temperatureData.value);
  console.log("timeData", timeData.value);
}

// onMounted(() => {
//   let parcid = useParc.parcSuperviser.id;
//   console.log("id", parcid);

//   // Récupération des données de la batterie avant de les sélectionner
//   console.log("######################");
//   lectureStore.getLectureByParcId(parcid);

//   // Sélection des données pour la première batterie
//   selecteData(batterie.allBatteryData[0].id);
// });


import { watch } from "vue";

onMounted(async () => {
  let parcid = useParc.parcSuperviser.id;
  console.log("id", parcid);

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
