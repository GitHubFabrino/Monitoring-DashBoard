<template>
  <div class="chart-container">
    <canvas :id="chartId"></canvas>
    <div class="progress-text">{{ progress }}{{ unites }}</div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import mqtt from "mqtt";

// Enregistrement des composants nécessaires de Chart.js
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Filler);

export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    unites: {
      type: String,
      required: true,
    },
    batteryId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const chart = ref(null); // Référence pour stocker l'instance du graphique
    const chartId = `doughnutChart-${Math.random().toString(36).substr(2, 9)}`; // Générer un ID unique pour chaque canvas
    const progress = ref(0); // Initialiser la progression à 0

    // Fonction pour créer le graphique
    const createChart = () => {
      const canvas = document.getElementById(chartId);
      if (!canvas) {
        console.error("Canvas not found");
        return;
      }

      const ctx = canvas.getContext("2d");

      // Si le graphique existe déjà, le détruire avant de le recréer
      if (chart.value) {
        chart.value.destroy();
      }

      // Création du diagramme Doughnut
      chart.value = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [progress.value, 100 - progress.value],
              backgroundColor: [props.color, "#e6e6e6"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          rotation: -90, // Commence en haut
          circumference: 180, // Demi-cercle
          cutout: "70%", // Taille du trou intérieur (effet de cercle)
          responsive: true,
          plugins: {
            legend: {
              display: false, // Pas de légende
            },
            tooltip: {
              enabled: false, // Désactiver les infobulles
            },
          },
        },
      });

      console.log("Chart created", chart.value);
    };

    // Créer le graphique lorsque le composant est monté
    onMounted(() => {
      console.log("Composant monté");
      createChart();
      
      // Connexion au broker MQTT
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
          console.log("Message reçu :", message.toString()); // Vérifier la réception des messages
          const parsedMessage = JSON.parse(message.toString());

          if (parsedMessage.length > 0) {
            console.log("Données MQTT reçues :", parsedMessage);
            progress.value = parseFloat(parsedMessage[props.batteryId - 1].soc).toFixed(0);
            console.log("Progress value updated to:", progress.value); // Vérifier la mise à jour de `progress`

            // Recréer le graphique avec la nouvelle valeur de progression
            createChart();
          } else {
            console.warn("Le message reçu est vide ou mal formé");
          }

          console.log("Données reçues et mises à jour :", parsedMessage);
        } catch (error) {
          console.error("Erreur lors du traitement du message MQTT :", error);
        }
      });

      client.on("error", (err) => {
        console.error("Erreur MQTT :", err);
      });

      onBeforeUnmount(() => {
        client.end();
      });
    });

    return {
      chartId, // On retourne l'ID du canvas pour une gestion dans le template
      progress, // Ajouter progress pour le rendre accessible dans le template
    };
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

canvas {
  max-width: 100%;
  max-height: 100%;
}

.progress-text {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  /* color: black; */
}
</style>
