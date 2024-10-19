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

// Enregistrement des composants nécessaires de Chart.js
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Filler);

export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    unites: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const chart = ref(null); // Référence pour stocker l'instance du graphique
    const chartId = `doughnutChart-${Math.random().toString(36).substr(2, 9)}`; // Générer un ID unique pour chaque canvas

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
              data: [props.progress, 100 - props.progress],
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

    // Fonction pour mettre à jour le graphique
    const updateChart = () => {
      if (chart.value) {
        chart.value.data.datasets[0].data = [
          props.progress,
          100 - props.progress,
        ];
        chart.value.update(); // Mettre à jour le graphique
        console.log("Chart updated", chart.value);
      }
    };

    // Créer le graphique lorsque le composant est monté
    onMounted(() => {
      createChart();
    });

    // Mettre à jour le graphique quand la prop `progress` change
    watch(
      () => props.progress,
      () => {
        updateChart();
      }
    );

    // Détruire le graphique avant que le composant soit démonté
    onBeforeUnmount(() => {
      if (chart.value) {
        chart.value.destroy();
      }
    });

    return {
      chartId, // On retourne l'ID du canvas pour une gestion dans le template
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
