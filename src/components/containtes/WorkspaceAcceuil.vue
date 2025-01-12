<template>
  <div class="container">


    <BatteryItem
      title="01"
      :progress="store.progress1"
      :color1="color1"
      :temperature="temperature1"
      :color2="color2"
      :timeData="timeData"
      :voltageData="voltageData"
      :currentData="currentData1"
      :parc="'Parc 01'"
      :batteryIdBat="1"
    />
    

    <BatteryItem
      title="02"
      :progress="store.progress1"
      :color1="color1"
      :temperature="temperature2"
      :color2="color2"
      :timeData="timeData"
      :voltageData="voltageData"
      :currentData="currentData1"
      :parc="'Parc 01'"
      :batteryIdBat="2"
    />

    <BatteryItem
      title="03"
      :progress="store.progress1"
      :color1="color1"
      :temperature="temperature3"
      :color2="color2"
      :timeData="timeData"
      :voltageData="voltageData"
      :currentData="currentData1"
      :parc="'Parc 01'"
      :batteryIdBat="3"
    />
    

    
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import "primeicons/primeicons.css";
import { useProgressStore } from "@/stores/progress";
import BatteryItem from "@/components/containtes/subContaines/BatteryItem.vue";
import RealTimeChart from "@/components/containtes/RealTimeChart.vue";
import mqtt from "mqtt";

// Store pour le progrès (si utilisé)
const store = useProgressStore();

const color1 = "rgb(2, 200, 2)";
const color2 = "#FB7A58";

const timeData = ref(["0s", "1s", "2s", "3s", "4s", "5s", "6s"]);
const voltageData = ref([12, 13, 14, 13, 15, 14, 20]);

// Initialisation des currentData pour chaque batterie
const currentData1 = ref([3, 0, 0, 0, 0, 0, 0]);
const currentData2 = ref([0, 0, 0, 0, 0, 0, 0]);
const currentData3 = ref([3, 0, 0, 0, 0, 0, 0]);

// Références pour les températures des batteries
const temperature1 = ref();
const temperature2 = ref();
const temperature3 = ref();

const progression1 = ref();
const progression2 = ref();
const progression3 = ref();

onMounted(() => {
  const client = mqtt.connect("ws://192.168.1.116:9001");

  client.on("connect", () => {
    console.log("Connecté au broker MQTT");
    client.subscribe("batteries", (err) => {
      if (err) {
        console.error("Erreur d'abonnement :", err);
      } else {
        console.log('Abonné au topic "batteries"');
      }
    });
  });

  client.on("message", (topic, message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());

      // Mise à jour des températures (converties en nombres)
      temperature1.value = parseFloat(parsedMessage[0].temperature).toFixed(0);
      temperature2.value = parseFloat(parsedMessage[1].temperature).toFixed(0)
      temperature3.value = parseFloat(parsedMessage[2].temperature).toFixed(0)

      // console.log("ici", store.progress1);
      // store.setProgress1(parseFloat(parsedMessage[0].soc).toFixed(0))
      // store.setProgress2(parseFloat(parsedMessage[1].soc).toFixed(0))
      // store.setProgress3(parseFloat(parsedMessage[2].soc).toFixed(0))

      console.log(`Données reçues :`, parsedMessage);
    } catch (error) {
      console.error("Erreur lors du traitement du message MQTT :", error);
    }
  });

  client.on("error", (err) => {
    console.error("Erreur MQTT :", err);
  });

  onUnmounted(() => {
    client.end();
  });
});

</script>

<style scoped>
.container {
  width: 99%;
  height: 76vh;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  align-content: center;
}
</style>
