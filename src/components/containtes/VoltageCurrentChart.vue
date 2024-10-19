<template>
  <div class="chart-container" :style="{ height: height }">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler,
} from "chart.js";

// Enregistrer les composants nécessaires de Chart.js
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
);

export default {
  props: {
    timeData: {
      type: Array,
      required: true,
    },
    voltageData: {
      type: Array,
      required: false,
    },
    currentData: {
      type: Array,
      required: false,
    },
    height: {
      type: String,
      default: "200px", // Valeur par défaut si la hauteur n'est pas spécifiée
    },
    chartType: {
      type: String,
      default: "both", // 'voltage', 'current', or 'both'
    },
  },
  setup(props) {
    const chart = ref(null);
    const chartCanvas = ref(null);

    const createChart = () => {
      const ctx = chartCanvas.value.getContext("2d");

      const datasets = [];

      // Ajouter les données de tension si 'voltage' ou 'both' est sélectionné
      if (props.chartType === "voltage" || props.chartType === "both") {
        datasets.push({
          label: "Tension (V)",
          data: props.voltageData || [],
          borderColor: "#FB7A58",
          backgroundColor: "rgba(251, 122, 88, 0.2)",
          fill: true,
          tension: 0.1,
        });
      }

      // Ajouter les données de courant si 'current' ou 'both' est sélectionné
      if (props.chartType === "current" || props.chartType === "both") {
        datasets.push({
          label: "Courant (A)",
          data: props.currentData || [],
          borderColor: "#4BC0C0",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.1,
        });
      }

      chart.value = new Chart(ctx, {
        type: "line",
        data: {
          labels: props.timeData, // Labels for the x-axis
          datasets: datasets,
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "category", // Utiliser 'category' ici
              title: {
                display: true,
                text: "Temps (s)",
              },
            },
            y: {
              title: {
                display: true,
                text:
                  props.chartType === "voltage"
                    ? "Tension (V)"
                    : props.chartType === "current"
                    ? "Courant (A)"
                    : "Valeurs",
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

    const updateChart = () => {
      if (chart.value) {
        const datasets = [];

        // Mettre à jour les données de tension si 'voltage' ou 'both' est sélectionné
        if (props.chartType === "voltage" || props.chartType === "both") {
          datasets.push({
            label: "Tension (V)",
            data: props.voltageData || [],
            borderColor: "#FB7A58",
            backgroundColor: "rgba(251, 122, 88, 0.2)",
            fill: true,
            tension: 0.1,
          });
        }

        // Mettre à jour les données de courant si 'current' ou 'both' est sélectionné
        if (props.chartType === "current" || props.chartType === "both") {
          datasets.push({
            label: "Courant (A)",
            data: props.currentData || [],
            borderColor: "#4BC0C0",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.1,
          });
        }

        chart.value.data.labels = props.timeData;
        chart.value.data.datasets = datasets;
        chart.value.update();
      }
    };

    onMounted(() => {
      createChart();
    });

    watch(
      [
        () => props.timeData,
        () => props.voltageData,
        () => props.currentData,
        () => props.chartType,
      ],
      updateChart
    );

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
