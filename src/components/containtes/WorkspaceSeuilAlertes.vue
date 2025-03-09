<template>
    <div class="w-full h-full shadow-sm rounded-sm px-4 py-2 bg-[#f6f8fa]">
    <div class="flex justify-between items-center p-[10px] border-b border-gray-300"
    >
      <h3 class="font-semibold w-[60%] text-[var(--primary-color)]">Seuil d'alerte des batteries</h3>
    </div>
    <div class="contenu">
      <template v-if="batterie.allBatteryData.length !== 0">
        <div
          v-for="batterie in batterie.allBatteryData"
          :key="batterie.id"
          class="item shadow-xl"
        >
          <div class="name">
            <div class="titreName">
              <h3>{{ batterie.nom }}</h3>
              <h5>{{ useParc.parcSuperviser.nom_parc }}</h5>
            </div>
          </div>
          <div class="detail">
            <div class="detailItem">
     
              <h4>Tension Nominal</h4>
              <h4>Courant</h4>
              <h4>DOD Max</h4>
              <h4>Température</h4>
      
            </div>
            <div class="valeur">
              <h4>{{ batterie.utilisation_cyclique }} V</h4>
              <h4>{{ batterie.courant }} A</h4>
              <h4>{{ batterie.temperature }} °C</h4>
              <h4>{{ batterie.dod_max }} %</h4>
         
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class=" p-10 h-[60%] w-full  ">
          <div class="w-full flex items-center flex-wrap justify-center gap-10">
            <CardNoData message="Aucune batterie n'est encore configurée" />
           
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useShow } from "@/stores/show";

const show = useShow();


import { useBatterie } from "@/stores/batterieStore";

const batterie = useBatterie();
import { parcStore } from "@/stores/parcStore";
import CardNoData from "./cards/CardNoData.vue";

const useParc = parcStore();
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
  color: #2d4051;
}
.titre {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #d3d3d3;
  align-items: center;
}
.btn {
  background-color: #fb7a58;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contenu {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  overflow-y: scroll;
  /* background-color: #fb7a58; */
  height: 65vh;
}

.item {
  background-color: #fb7b582d;
  width: 30%;
  height: 200px;
  padding: 10px;
  margin-top: 30px;
  border-radius: 5px;
}
.item h4 {
  padding: 5px;
}
.containerEmptyParc {
  display: flex;
  align-items: center;
  width: 100%;
  /* 
  
  background-color: #fb7a58; */
}

.containerEmptyParc h2{
  color: rgb(48, 50, 52)!important;;
}
.name {
  display: flex;
  /* background-color: red; */
  justify-content: space-between;
  border-bottom: 2px solid #fb7a58;
  margin-bottom: 5px;
}
.name h3 {
  color: #fb7a58;
  font-weight: 600;
  font-size: 14px;
}
.name h5 {
  font-weight: 600;
  font-size: 12px;
}

.detail {
  display: flex;
  justify-content: space-between;
}
.detail h4{
  font-size: 12px;
}
.valeur h4 {
  font-weight: 600;
}
</style>
