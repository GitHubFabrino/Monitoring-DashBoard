// stores/mqttStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import mqtt from "mqtt";

export const useMqttStore = defineStore("mqtt", () => {
  // Données reçues par MQTT
  const dataReceived = ref([]);
  const temperatures = ref([0, 0, 0]);
  const tensions = ref([0, 0, 0]);
  const courants = ref([0, 0, 0]);
  const socs = ref([0, 0, 0]);
  const sohs = ref([0, 0, 0]);
  const progress1 = ref(0);
  const progress2 = ref(0);
  const progress3 = ref(0);
  const currentTemperature = ref(0);

  // Connexion MQTT
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

      // Mise à jour des tensions, courants, températures, SOCs et SOHs
      tensions.value = parsedMessage.map(battery => parseFloat(battery.tension).toFixed(2));
      courants.value = parsedMessage.map(battery => parseFloat(battery.courant).toFixed(2));
      temperatures.value = parsedMessage.map(battery => parseFloat(battery.temperature).toFixed(2));
      socs.value = parsedMessage.map(battery => battery.soc);
      sohs.value = parsedMessage.map(battery => battery.soh);

      // Mise à jour des valeurs de progression en fonction des données reçues
      if (parsedMessage.length >= 1) {
        progress1.value = parseFloat(parsedMessage[0].soc).toFixed(0);
      }
      if (parsedMessage.length >= 2) {
        progress2.value = parseFloat(parsedMessage[1].soc).toFixed(0);
      }
      if (parsedMessage.length >= 3) {
        progress3.value = parseFloat(parsedMessage[2].soc).toFixed(0);
      }

    } catch (error) {
      console.error("Erreur lors du traitement du message MQTT :", error);
    }
  });

  client.on("error", (err) => {
    console.error("Erreur MQTT :", err);
  });

  return {
    dataReceived,
    temperatures,
    tensions,
    courants,
    socs,
    sohs,
    progress1,
    progress2,
    progress3,
    currentTemperature
  };
});
