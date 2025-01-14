<template>
  <div class="container">
    <template v-if="dataReceived.length > 0 && dataReceived.length <= 3">
      <BatteryItem v-for="(item, index) in dataReceived.length" :key="index" :title="titles[index]" 
                   :progress="store.progress1" :color1="colors.progressionTextColor"
                   :temperature="parseFloat(temperatures[index])" :color2="colors.temperatureColor"
                   :parc="parc" :batteryIdBat="index + 1" />
    </template>
    <template v-else>
      <div class="containerEmpty">
        <div class="center">
          <i
            class="pi pi-database"
            style="font-size: 50px; color: #2d4051"
          ></i>
          <h1>Aucune donnée reçue</h1>
          <h3 style="color: #7b7d7e;">Le dispositif n'a pas renvoyé de données</h3>

      </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import "primeicons/primeicons.css";
import { useProgressStore } from "@/stores/progress";
// import { useMqttStore } from "@/stores/mqttStore";
import BatteryItem from "@/components/containtes/subContaines/BatteryItem.vue";
import mqtt from "mqtt";
import { colors } from "@/service/color";

// Store pour le progrès (si utilisé)
const store = useProgressStore();
// const mqttStore = useMqttStore()

// Références pour les températures des batteries
const temperatures = ref([0, 0, 0]);
const titles = ["01", "02", "03"];
const parc = "Parc 01";
const dataReceived = ref([]); // Liste de données reçues par MQTT

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

      // Mise à jour des données reçues
      dataReceived.value = parsedMessage;

      // Mise à jour des températures (converties en nombres)
      temperatures.value = parsedMessage.map(battery => parseFloat(battery.temperature).toFixed(0));

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
.containerEmpty{
  
  display: flex;
  align-items: center;
}
.center{
  text-align: center;
}
</style>
