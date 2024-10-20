<template>
  <div class="chart-container" :style="{ height: height }">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";

export default {
  props: {
    timeData: Array, // Données pour l'axe du temps
    voltageData: Array, // Données pour la tension
    currentData: Array, // Données pour le courant
    temperatureData: Array, // Données pour la température
    height: String,
  },
  setup(props) {
    const chartCanvas = ref(null);
    const chart = ref(null);

    const createChart = () => {
      const ctx = chartCanvas.value.getContext("2d");

      chart.value = new Chart(ctx, {
        type: "line",
        data: {
          labels: props.timeData, // Données pour l'axe des X (temps)
          datasets: [
            {
              label: "Tension (V)",
              data: props.voltageData,
              borderColor: "#FF6384",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: true, // Remplissage sous la courbe
              tension: 0.3, // Lissage de la courbe
            },
            {
              label: "Courant (A)",
              data: props.currentData,
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true, // Remplissage sous la courbe
              tension: 0.3, // Lissage de la courbe
            },
            {
              label: "Température (°C)",
              data: props.temperatureData,
              borderColor: "#FFCE56",
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              fill: true, // Remplissage sous la courbe
              tension: 0.3, // Lissage de la courbe
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Temps (s)", // Label pour l'axe du temps
              },
            },
            y: {
              title: {
                display: true,
                text: "Valeurs mesurées", // Label pour l'axe Y
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
        },
      });
    };

    // Créer le graphique après le montage du composant
    onMounted(() => {
      createChart();
    });

    // Détruire le graphique avant le démontage du composant
    onBeforeUnmount(() => {
      if (chart.value) {
        chart.value.destroy();
      }
    });

    return {
      chartCanvas,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
}
canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>
