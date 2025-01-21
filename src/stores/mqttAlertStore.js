import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import mqtt from "mqtt";
import { useShow } from "@/stores/show";

export const useMqttAlerteStore = defineStore("mqttAlerte", () => {
  // Données reçues par MQTT
  const dataReceived = ref([]);
  const alertes = ref([]);
  const show = useShow();
  

  // Connexion MQTT
  const client = mqtt.connect("ws://192.168.1.116:9001");

  const initializeMqtt = () => {
    client.on("connect", () => {
      console.log("Connecté au broker MQTT");
      client.subscribe("alerte_batteries", (err) => {
        if (err) {
          console.error("Erreur d'abonnement :", err);
        } else {
          console.log('Abonné au topic "alerte_batteries"');
        }
      });
    });

    client.on("message", (topic, message) => {
      try {
        const parsedMessage = JSON.parse(message.toString());

        if (topic === "alerte_batteries") {
          // Ajout de l'alerte à la liste des alertes reçues
          alertes.value.push(parsedMessage);
          show.showAlertBatterie=true
          show.showAlertBatType = parsedMessage.graviter
          show.showAlertBatterieMessage = parsedMessage.message
          show.competerAlerteBatterieUnRead = show.competerAlerteBatterieUnRead + 1

          setTimeout(() => {
            show.showAlertBatterie=true
          }, 3000);

          // Affichage des alertes dans la console
          console.log("Alerte reçue :", parsedMessage);
          console.log("Alerte reçue nombre :", show.competerAlerteBatterieUnRead);
        }
      } catch (error) {
        console.error("Erreur lors du traitement du message MQTT :", error);
      }
    });

    client.on("error", (err) => {
      console.error("Erreur MQTT :", err);
    });
  };

  // Appel de la méthode `initializeMqtt` lors de la montée
  onMounted(() => {
    console.log("Store monté, initialisation MQTT...");
    initializeMqtt();
  });

  return {
    dataReceived,
    alertes,
    initializeMqtt,
  };
});
