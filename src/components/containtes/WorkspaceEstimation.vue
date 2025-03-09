<template>
  <div
    class="bg-[#f6f8fa] w-full h-full shadow-md shadow-gray-400 rounded-md p-5 overflow-hidden"
  >
    <div
      class="flex justify-between items-center p-[10px] border-b border-gray-300"
    >
      <h3 class="font-semibold w-[60%] text-[var(--primary-color)]">
        Estimation des performances
      </h3>
    </div>

    <template v-if="withdata">
      <div v-if="loading" class="flex justify-center items-center h-full">
        <Spinner />
      </div>
      <div v-else>
        <div
          v-if="lectureStore.allLectureDataPredict.length > 0"
          class="flex justify-around"
        >
          <!-- {{ lectureStore.allLectureDataPredict }} -->
          <CardBat
            v-for="(card, index) in lectureStore.allLectureDataPredict"
            :key="index"
            :parc="card.batterie_Info.parc.nom_parc"
            :nomBatterie="
              card.batterie_Info.nom + ` ` + card.batterie_Info.technologie
            "
            :capacite="card.batterie_Info.capacite_nominal"
            :tension="card.batterie_Info.tension_nominale"
            :image="card.batterie_Info.file"
            :id="card.batterie_Info.id"
            @click="toggle(card)"
          />
        </div>
        <div v-else class="flex justify-center items-center h-full pt-10">
          <CardNoData message="Aucune donnée de batterie disponible." />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col items-center h-[300px]">
        <CardNoData message="Aucune donnée de batterie disponible." />
        <a
          @click="withdata = !withdata"
          class="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
          href="#"
        >
          Retour
        </a>
      </div>
    </template>
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
import Spinner from "@/components/containtes/modals/Spinner.vue";
import CardNoData from "@/components/containtes/cards/CardNoData.vue";

const useParc = parcStore();
const batterie = useBatterie();
const show = useShow();
const lectureStore = useLectureStore();
const withdata = ref(true);

const loading = ref(true);
const toggle = (card) => {
  show.selectCard = card;

  if (card.cycle_summary.message) {
    console.log("nos");
    withdata.value = false;
  } else {
    show.showEstimation = false;
    console.log("ty le card", card.cycle_summary);
    let data = {
      Cycles: card.cycle_summary.total_cycles,
      T_discharge: card.cycle_summary.total_discharge_time_seconds,
      V_max_dis: card.cycle_summary.avg_discharge_voltage,
      V_min_chg: card.cycle_summary.avg_charge_voltage,
      T_charge: card.cycle_summary.total_charge_time_seconds,
      I_charge: card.cycle_summary.avg_charge_current,
      I_discharge: card.cycle_summary.avg_discharge_current,
      V_charge: card.cycle_summary.min_charge_tension,
      V_discharge: card.cycle_summary.max_discharge_tension,
      T_charge_temp: card.cycle_summary.avg_charge_temperature,
      T_discharge_temp: card.cycle_summary.avg_discharge_temperature,
    };

    lectureStore.sendPredict(data);
  }

  if (!show.showPrediction) {
    show.showPrediction = true;
  } else {
    console.log("no");
  }
};

onMounted(() => {
  let parcid = useParc.parcSuperviser.id;
  console.log("ty", parcid);
  lectureStore.getAllDataPredictByParc(parcid);
  if (lectureStore.allLectureDataPredict) {
    loading.value = false;
    console.log(lectureStore.allLectureDataPredict.length);
  }
});

watchEffect(() => {
  if (lectureStore.allLectureDataPredict) {
    loading.value = false;
  }
});

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

<style></style>
