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
      <div v-if="cards.length > 0" v-show="showCards" class="flex justify-around">
    
        <CardBat
          v-for="(card, index) in batterie.allBatteryData"
          :key="index"
          :parc="card.parc.nom_parc"
          :nomBatterie="card.nom +` `+ card.technologie"
          :capacite="card.capacite_nominal"
          :tension="card.tension_nominale"
          @click="toggle(card)"
        />
      </div>
      <div v-else class="flex justify-center items-center h-full">
        <p class="text-gray-500">Aucune donnée de batterie disponible.</p>
      </div>
      <div v-show="!showCards" class="flex justify-around">
        <CardBat
          :parc="selectCard.parc.nom_parc"
          :nomBatterie="selectCard.nom +` `+ selectCard.technologie"
          :capacite="selectCard.capacite_nominal"
          :tension="selectCard.tension_nominale"
        />
        <div class="w-[55%] flex flex-col items-center p-5">
          <div class="relative flex flex-col items-center border border-solid border-gray-200 rounded-2xl transition-all duration-500 md:flex-row md:max-w-lg h-[160px]  w-[500px]">
            <div class="block overflow-hidden md:w-52 h-full flex justify-center items-center">
              <div class="relative size-[70%]">
                <svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200" stroke-width="2"></circle>
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-blue-600" stroke-width="2" stroke-dasharray="100" stroke-dashoffset="65" stroke-linecap="round"></circle>
                </svg>
                <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <span class="text-center text-2xl font-bold text-blue-600">35%</span>
                </div>
              </div>
            </div>
            <div class="p-4">
              <h4 class="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500">État de Santé SOH </h4>
              <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-5">Indique combien de capacité une batterie a conservée par rapport à son état initial.</p>
              <span class="inline-flex items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ms-1 me-1.5 size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm whitespace-nowrap">Paid</p>
              </span>
              <span class="inline-flex items-center justify-center rounded-full border border-amber-500 px-2.5 py-0.5 text-amber-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ms-1 me-1.5 size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
                </svg>
                <p class="text-sm whitespace-nowrap">Refunded</p>
              </span>
              <span class="inline-flex items-center justify-center rounded-full border border-red-500 px-2.5 py-0.5 text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ms-1 me-1.5 size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p class="text-sm whitespace-nowrap">Failed</p>
              </span>
            </div>
          </div>
          <div class="relative flex flex-col items-center border border-solid border-gray-200 rounded-2xl transition-all duration-500 md:flex-row md:max-w-lg h-[160px] mt-10 w-[500px]">
            <div class="block overflow-hidden md:w-52 h-full flex justify-center items-center">
              <div class="relative size-[70%]">
                <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <span class="text-center text-2xl font-bold text-blue-600">1523</span>
                </div>
              </div>
            </div>
            <div class="p-4">
              <h4 class="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500">Durée de Vie Utile Restante RUL</h4>
              <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-5">Estime le temps restant avant que la batterie ne soit inutilisable.</p>
              <span class="inline-flex items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ms-1 me-1.5 size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm whitespace-nowrap">Paid</p>
              </span>
              <span class="inline-flex items-center justify-center rounded-full border border-amber-500 px-2.5 py-0.5 text-amber-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ms-1 me-1.5 size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
                </svg>
                <p class="text-sm whitespace-nowrap">Refunded</p>
              </span>
              <span class="inline-flex items-center justify-center rounded-full border border-red-500 px-2.5 py-0.5 text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ms-1 me-1.5 size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p class="text-sm whitespace-nowrap">Failed</p>
              </span>
            </div>
          </div>
        </div>
        <div class="w-[40px] h-[40px] flex justify-center items-center" @click="toggle( batterie.allBatteryData[0])">
          <a class="inline-block rounded-full border border-indigo-600 bg-indigo-600 p-1 text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden" href="#">
            <svg class="h-4 w-4 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
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
import CardBat from "@/components/containtes/cards/CardBat.vue";
import Spinner from '@/components/containtes/modals/Spinner.vue';

const batterie = useBatterie();
const show = useShow();
const useParc = parcStore();

const cards = ref([
  { parc: 'Parc 01', nomBatterie: 'Batterie Lithium', capacite: '2.8', tension: '3.7' },
  { parc: 'Parc 02', nomBatterie: 'Batterie Nickel', capacite: '3.0', tension: '4.0' },
  { parc: 'Parc 03', nomBatterie: 'Batterie Plomb', capacite: '1.5', tension: '6.0' }
]);

const showCards = ref(true);
const selectCard = ref({});
const loading = ref(true);

const toggle = (card) => {
  selectCard.value = card;
  showCards.value = !showCards.value;
};

onMounted(() => {
  selectCard.value = batterie.allBatteryData[0]
  // Simuler un délai de chargement
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
