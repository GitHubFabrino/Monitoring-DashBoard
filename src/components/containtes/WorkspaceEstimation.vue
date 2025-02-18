
<template>
  <div class="bg-[#f6f8fa] w-full h-[76vh] shadow-md shadow-gray-400 rounded-md p-5 overflow-hidden">
    <div class="flex justify-between items-center p-[10px] border-b border-gray-300">
      <h3 class="font-semibold w-[60%] text-[var(--primary-color)]">
        Estimation des performances
      </h3>
    </div>
    <div v-if="loading" class="flex justify-center items-center h-full">
      <Spinner />
    </div>
    <div v-else>
      <div v-if="lectureStore.allLectureDataPredict.length > 0"  class="flex justify-around">
        <!-- {{ lectureStore.allLectureDataPredict }} -->
        <CardBat
          v-for="(card, index) in lectureStore.allLectureDataPredict"
          :key="index"
          :parc="card.batterie_Info.parc.nom_parc"
          :nomBatterie="card.batterie_Info.nom +` `+ card.batterie_Info.technologie"
          :capacite="card.batterie_Info.capacite_nominal"
          :tension="card.batterie_Info.tension_nominale"
          @click="toggle(card)"
        />
      </div>
      <div v-else class="flex justify-center items-center h-full">
        <p class="text-gray-500">Aucune donnée de batterie disponible.</p>
      </div>
   
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { ref, onMounted, onUnmounted, computed, watchEffect } from "vue";
import { useShow } from "@/stores/show";
import { useBatterie } from "@/stores/batterieStore";
import { parcStore } from "@/stores/parcStore";
import { useLectureStore } from "@/stores/lectureStore";
import CardBat from "@/components/containtes/cards/CardBat.vue";
import Spinner from '@/components/containtes/modals/Spinner.vue';

const useParc = parcStore();
const batterie = useBatterie();
const show = useShow();
const lectureStore = useLectureStore();


const showCards = ref(true);

const loading = ref(true);
const toggle = (card) => {
  show.selectCard = card;
  showCards.value = !showCards.value;
  show.showEstimation = !show.showEstimation
  show.showEstimationDetails = !show.showEstimationDetails
};




onMounted(() => {
  let parcid = useParc.parcSuperviser.id;
  console.log('ty', parcid);
  lectureStore.getAllDataPredictByParc(parcid);
  if (lectureStore.allLectureDataPredict) {
    loading.value= false
    console.log(lectureStore.allLectureDataPredict.length);
  }
});

watchEffect(()=>{
  if (lectureStore.allLectureDataPredict) {
    loading.value= false
  }
})
</script>

<style>
</style>
