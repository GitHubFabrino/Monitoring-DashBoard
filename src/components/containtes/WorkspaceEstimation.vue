
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


          :image="card.batterie_Info.file"
          :id="card.batterie_Info.id"
          
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



const loading = ref(true);
const toggle = (card) => {
  show.selectCard = card;
  show.showEstimation = false
  show.showEstimationDetails = true

  if(!show.showPrediction){
    show.showPrediction = true
  }
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


const selectCard = ref({});
// const loading = ref(true);
const progressValue = ref(0);
const targetNumber = ref(0);
const currentNumber = ref(0);
let progressInterval;
let numberInterval;

const formattedNumber = computed(() => {
  return new Intl.NumberFormat().format(currentNumber.value);
});

const progressColor = computed(() => {
  if (progressValue.value < 50) {
    return "text-red-600";
  } else if (progressValue.value < 80) {
    return "text-yellow-500";
  } else {
    return "text-green-600";
  }
});


const startProgressAnimation = () => {
  progressInterval = setInterval(() => {
    progressValue.value += 1;
    if (progressValue.value >= 100) {
      progressValue.value = 0;
    }
  }, 50);
};

const startNumberAnimation = () => {
  numberInterval = setInterval(() => {
    if (currentNumber.value < targetNumber.value) {
      currentNumber.value += 1;
    } else {
      clearInterval(numberInterval);
    }
  }, 10);
};

onMounted(() => {
  show.selectCard.value = batterie.allBatteryData[0];
  setTimeout(() => {
    loading.value = false;
    startProgressAnimation();
  }, 2000);
});

onMounted(() => {
  show.selectCard.value = batterie.allBatteryData[0];
  targetNumber.value = 2543;
  setTimeout(() => {
    loading.value = false;
    startNumberAnimation();
  }, 2000);
});

onUnmounted(() => {
  clearInterval(progressInterval);
  clearInterval(numberInterval);
});
</script>

<style>
</style>
