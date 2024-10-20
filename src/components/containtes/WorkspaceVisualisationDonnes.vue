<template>
  <div class="container">
    <div class="titre">
      <h3>Visualisation des données</h3>
    </div>
    <div class="contenu">
      <div class="entete">
        <div class="option">
          <div class="opt1">
            <h4
              @click="show.setShowVisSelect('bat1')"
              :class="{
                select: show.showVisBat1 == true,
              }"
            >
              Batterie 01
            </h4>
            <div class="optionType" v-if="show.showVisBat1Horo">
              <h4 @click="show.setshowSeletHorodatage('Jour')">Jour</h4>
              <h4 @click="show.setshowSeletHorodatage('Semaine')">Semaine</h4>
              <h4 @click="show.setshowSeletHorodatage('Mois')">Mois</h4>
              <h4 @click="show.setshowSeletHorodatage('Année')">Année</h4>
            </div>
          </div>

          <div class="opt1">
            <h4
              @click="show.setShowVisSelect('bat2')"
              :class="{
                select: show.showVisBat2 == true,
              }"
            >
              Batterie 02
            </h4>
            <div class="optionType" v-if="show.showVisBat2Horo">
              <h4 @click="show.setshowSeletHorodatage('Jour')">Jour</h4>
              <h4 @click="show.setshowSeletHorodatage('Semaine')">Semaine</h4>
              <h4 @click="show.setshowSeletHorodatage('Mois')">Mois</h4>
              <h4 @click="show.setshowSeletHorodatage('Année')">Année</h4>
            </div>
          </div>

          <div class="opt1">
            <h4
              @click="show.setShowVisSelect('bat3')"
              :class="{
                select: show.showVisBat3 == true,
              }"
            >
              Batterie 03
            </h4>
            <div class="optionType" v-if="show.showVisBat3Horo">
              <h4 @click="show.setshowSeletHorodatage('Jour')">Jour</h4>
              <h4 @click="show.setshowSeletHorodatage('Semaine')">Semaine</h4>
              <h4 @click="show.setshowSeletHorodatage('Mois')">Mois</h4>
              <h4 @click="show.setshowSeletHorodatage('Année')">Année</h4>
            </div>
          </div>
        </div>
        <h4>{{ show.showSeletHorodatage }}</h4>
      </div>

      <div class="recent" v-if="show.showRecents">
        <VoltageCurrentTemperatureChart
          :timeData="[
            '0s',
            '1s',
            '2s',
            '3s',
            '4s',
            '5s',
            '6s',
            '7s',
            '8s',
            '9s',
            '10s',
            '11s',
            '12s',
            '13s',
            '14s',
            '15s',
            '16s',
            '17s',
            '18s',
            '19s',
            '20s',
            '21s',
            '22s',
            '23s',
            '24s',
            '25s',
            '26s',
            '27s',
            '28s',
            '29s',
            '30s',
            '31s',
            '32s',
            '33s',
            '34s',
            '35s',
            '36s',
            '37s',
            '38s',
            '39s',
            '40s',
            '41s',
            '42s',
            '43s',
            '44s',
            '45s',
            '46s',
            '47s',
            '48s',
            '49s',
            '50s',
            '51s',
            '52s',
            '53s',
            '54s',
            '55s',
            '56s',
            '57s',
            '58s',
            '59s',
          ]"
          :voltageData="[
            12.5, 12.52, 12.54, 12.56, 12.58, 12.6, 12.61, 12.63, 12.64, 12.66,
            12.67, 12.68, 12.69, 12.69, 12.7, 12.7, 12.7, 12.69, 12.69, 12.69,
            12.68, 12.67, 12.66, 12.64, 12.63, 12.61, 12.6, 12.59, 12.57, 12.55,
            12.53, 12.51, 12.49, 12.47, 12.45, 12.43, 12.41, 12.39, 12.37,
            12.36, 12.34, 12.33, 12.32, 12.31, 12.3, 12.3, 12.3, 12.3, 12.3,
            12.3, 12.3, 12.3, 12.31, 12.32, 12.33, 12.34, 12.35, 12.36, 12.37,
            12.38, 12.39, 12.4, 12.41,
          ]"
          :currentData="[
            2.0, 2.02, 2.04, 2.06, 2.07, 2.08, 2.09, 2.1, 2.1, 2.09, 2.09, 2.08,
            2.07, 2.05, 2.03, 2.01, 1.99, 1.97, 1.95, 1.93, 1.92, 1.91, 1.9,
            1.9, 1.9, 1.9, 1.91, 1.92, 1.93, 1.95, 1.97, 1.99, 2.01, 2.03, 2.04,
            2.06, 2.07, 2.08, 2.09, 2.1, 2.1, 2.09, 2.09, 2.08, 2.07, 2.06,
            2.04, 2.03, 2.02, 2.02, 2.02, 2.03, 2.04, 2.06, 2.07, 2.09, 2.1,
            2.1, 2.1, 2.1, 2.1,
          ]"
          :temperatureData="[
            25.0, 25.1, 25.2, 25.3, 25.4, 25.5, 25.6, 25.7, 25.8, 25.9, 26.0,
            26.1, 26.2, 26.3, 26.4, 26.5, 26.6, 26.7, 26.8, 26.9, 27.0, 27.1,
            27.2, 27.3, 27.4, 27.5, 27.6, 27.7, 27.8, 27.9, 28.0, 28.1, 28.2,
            28.3, 28.4, 28.5, 28.6, 28.7, 28.8, 28.9, 29.0, 29.1, 29.2, 29.3,
            29.4, 29.5, 29.6, 29.7, 29.8, 29.9, 30.0, 30.1, 30.2, 30.3, 30.4,
            30.5, 30.6, 30.7, 30.8, 30.9,
          ]"
          :height="'350px'"
        />
      </div>

      <div class="historique" v-if="show.showHistoriqueCale">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useShow } from "@/stores/show";
import VoltageCurrentTemperatureChart from "@/components/containtes/VoltageCurrentTemperatureChart.vue";

const show = useShow();
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
