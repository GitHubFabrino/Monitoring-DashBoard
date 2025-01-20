
<template>
  <div>
    <div class="entete">
      <div class="option">
        <div class="opt1" v-for="item in batteries" :key="item.id">
          <h4
            @click="selectBattery(item)"
            :class="{ select: isselectedBattery?.id === item.id }"
            :value="item.id"
          >
            Batterie {{ item.nom }}
          </h4>
          <div
            class="optionType"
            v-show="type && isselectedBattery?.id === item.id"
          >
            <h4 @click="selectTimeRange('Jour')">Jour</h4>
            <h4 @click="selectTimeRange('Semaine')">Semaine</h4>
            <h4 @click="selectTimeRange('Mois')">Mois</h4>
            <h4 @click="selectTimeRange('Année')">Année</h4>
            <h4 @click="selectTimeRange('Tous')">Tous</h4>
          </div>
        </div>
      </div>
      <h4>{{ selectedTimeRange }}</h4>
    </div>

    <div class="chart-container" style="height: 500px">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";
import { useBatterie } from "@/stores/batterieStore";
import { useLectureStore } from "@/stores/lectureStore";

export default {
  setup() {
    const chartCanvas = ref(null);
    const chart = ref(null);

    const voltageData = ref([]);
    const currentData = ref([]);
    const temperatureData = ref([]);
    const timeData = ref([]);
    const isselectedBattery = ref(null);
    const selectedBattery = ref(null);

    // Accès au store des batteries et des lectures
    const batterie = useBatterie();
    const lectureStore = useLectureStore();

    // Récupérer la liste des batteries
    const batteries = batterie.allBatteryData; // Supposons que ce store contient les batteries

    const selectedTimeRange = ref("");
    const type = ref(false);

    function selectBattery(item) {
      isselectedBattery.value = item;
      selectedBattery.value = item.id;
      type.value =
        isselectedBattery.value && isselectedBattery.value.id === item.id;
      updateChart();
    }

    function selectTimeRange(range) {
      selectedTimeRange.value = range;
      type.value = false;

      // Filtrer les données en fonction de la plage de temps
      filterDataByTimeRange(range);

      // Mettre à jour le graphique après le filtrage
      updateChartAgain();
    }

    function generateData(idBat) {
      voltageData.value = [];
      currentData.value = [];
      temperatureData.value = [];
      timeData.value = [];

      // Rechercher la batterie dans les données de lecture
      for (let index = 0; index < lectureStore.allLectureData.length; index++) {
        if (lectureStore.allLectureData[index].batterie_id === idBat) {
          const lectures = lectureStore.allLectureData[index].lectures;

          for (let i = 0; i < lectures.length; i++) {
            voltageData.value.push(Number(lectures[i].tension));
            currentData.value.push(Number(lectures[i].courant));
            temperatureData.value.push(Number(lectures[i].temperature));
            timeData.value.push(lectures[i].created_at);
          }
        }
      }
    }


    function filterDataByTimeRange(range) {
      const now = new Date();
      let filteredTimeData = [];
      let filteredVoltageData = [];
      let filteredCurrentData = [];
      let filteredTemperatureData = [];

      // Filtrage des données selon la période choisie
      for (let i = 0; i < timeData.value.length; i++) {
        const timestamp = new Date(timeData.value[i]);
        let includeData = false;

        switch (range) {
          case "Jour":
            includeData = timestamp >= new Date(now.setDate(now.getDate() - 1)); // Dernier jour
            break;
          case "Semaine":
            includeData = timestamp >= new Date(now.setDate(now.getDate() - 7)); // Dernière semaine
            break;
          case "Mois":
            includeData =
              timestamp >= new Date(now.setMonth(now.getMonth() - 1)); // Dernier mois
            break;
          case "Année":
            includeData =
              timestamp >= new Date(now.setFullYear(now.getFullYear() - 1)); // Dernière année
            break;
          default:
            includeData = true;
            break;
        }

        if (includeData) {
          filteredTimeData.push(timeData.value[i]);
          filteredVoltageData.push(voltageData.value[i]);
          filteredCurrentData.push(currentData.value[i]);
          filteredTemperatureData.push(temperatureData.value[i]);
        }
      }

      // Calcul des moyennes par segment (heure pour jour, jour pour semaine, etc.)
      let averagedData = [];

      switch (range) {
        case "Jour":
          averagedData = calculateHourlyAverages(
            filteredTimeData,
            filteredVoltageData,
            filteredCurrentData,
            filteredTemperatureData
          );
          break;
        case "Semaine":
          averagedData = calculateWeeklyAverages(
            filteredTimeData,
            filteredVoltageData,
            filteredCurrentData,
            filteredTemperatureData
          );
          break;
        case "Mois":
          averagedData = calculateMonthlyAverages(
            filteredTimeData,
            filteredVoltageData,
            filteredCurrentData,
            filteredTemperatureData
          );
          break;
        case "Année":
          averagedData = calculateYearlyAverages(
            filteredTimeData,
            filteredVoltageData,
            filteredCurrentData,
            filteredTemperatureData
          );
          break;
        default:
          averagedData = filteredTimeData.map((time, idx) => ({
            time: time,
            voltage: filteredVoltageData[idx],
            current: filteredCurrentData[idx],
            temperature: filteredTemperatureData[idx],
          }));
          break;
      }

      // Remplacer les données avec les moyennes calculées
      timeData.value = averagedData.map((item) => item.time);
      voltageData.value = averagedData.map((item) => item.voltage);
      currentData.value = averagedData.map((item) => item.current);
      temperatureData.value = averagedData.map((item) => item.temperature);

      console.log("Données filtrées et moyennes:", averagedData);
      console.log("Données filtrées et moyennes dans la courbe timeData.value:", timeData.value);
      console.log("Données filtrées et moyennes dans la courbe voltageData.value:", voltageData.value);
      console.log("Données filtrées et moyennes dans la courbe currentData.value:", currentData.value);
      console.log("Données filtrées et moyennes dans la courbe temperatureData.value:", temperatureData.value);
    }

    // Les fonctions de calcul des moyennes restent les mêmes, comme dans ton code :

    // Fonction pour calculer la moyenne horaire (24 heures)
    function calculateHourlyAverages(
      timeData,
      voltageData,
      currentData,
      temperatureData
    ) {


      console.log("day");
      let hourlyData = [];
      let currentHour = [];
      let currentVoltage = [];
      let currentCurrent = [];
      let currentTemperature = [];
      let startOfDay = new Date(timeData[0]);
      startOfDay.setHours(0, 0, 0, 0); // début de la journée

      timeData.forEach((time, idx) => {
        const currentDate = new Date(time);
        const hoursDiff = Math.floor(
          (currentDate - startOfDay) / (1000 * 60 * 60)
        ); // diff en heures

        if (hoursDiff < 24) {
          currentHour.push(time);
          currentVoltage.push(voltageData[idx]);
          currentCurrent.push(currentData[idx]);
          currentTemperature.push(temperatureData[idx]);
        } else {
          // Calculer la moyenne de l'heure passée
          hourlyData.push({
            time: startOfDay.toISOString(),
            voltage: calculateAverage(currentVoltage),
            current: calculateAverage(currentCurrent),
            temperature: calculateAverage(currentTemperature),
          });
          // Redémarrer l'heure suivante
          startOfDay.setHours(startOfDay.getHours() + 1);
          currentHour = [time];
          currentVoltage = [voltageData[idx]];
          currentCurrent = [currentData[idx]];
          currentTemperature = [temperatureData[idx]];
        }
      });

      // Dernière heure
      if (currentHour.length > 0) {
        hourlyData.push({
          time: startOfDay.toISOString(),
          voltage: calculateAverage(currentVoltage),
          current: calculateAverage(currentCurrent),
          temperature: calculateAverage(currentTemperature),
        });
      }

      return hourlyData;
    }

    // Fonction pour calculer la moyenne quotidienne (pour la semaine)
    function calculateWeeklyAverages(
      timeData,
      voltageData,
      currentData,
      temperatureData
    ) {
      let weeklyData = [];
      let currentDay = [];
      let currentVoltage = [];
      let currentCurrent = [];
      let currentTemperature = [];
      let startOfWeek = new Date(timeData[0]);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Premier jour de la semaine (dimanche)

      timeData.forEach((time, idx) => {
        const currentDate = new Date(time);
        const daysDiff = Math.floor(
          (currentDate - startOfWeek) / (1000 * 60 * 60 * 24)
        ); // diff en jours

        if (daysDiff < 7) {
          currentDay.push(time);
          currentVoltage.push(voltageData[idx]);
          currentCurrent.push(currentData[idx]);
          currentTemperature.push(temperatureData[idx]);
        } else {
          // Calculer la moyenne du jour passé
          weeklyData.push({
            time: startOfWeek.toISOString(),
            voltage: calculateAverage(currentVoltage),
            current: calculateAverage(currentCurrent),
            temperature: calculateAverage(currentTemperature),
          });
          // Redémarrer la semaine suivante
          startOfWeek.setDate(startOfWeek.getDate() + 7);
          currentDay = [time];
          currentVoltage = [voltageData[idx]];
          currentCurrent = [currentData[idx]];
          currentTemperature = [temperatureData[idx]];
        }
      });

      // Dernière semaine
      if (currentDay.length > 0) {
        weeklyData.push({
          time: startOfWeek.toISOString(),
          voltage: calculateAverage(currentVoltage),
          current: calculateAverage(currentCurrent),
          temperature: calculateAverage(currentTemperature),
        });
      }

      return weeklyData;
    }

    // Fonction pour calculer la moyenne mensuelle (pour le mois)
    function calculateMonthlyAverages(
      timeData,
      voltageData,
      currentData,
      temperatureData
    ) {
      let monthlyData = [];
      let currentWeek = [];
      let currentVoltage = [];
      let currentCurrent = [];
      let currentTemperature = [];
      let startOfMonth = new Date(timeData[0]);
      startOfMonth.setDate(1); // Premier jour du mois

      timeData.forEach((time, idx) => {
        const currentDate = new Date(time);
        const weeksDiff = Math.floor(
          (currentDate - startOfMonth) / (1000 * 60 * 60 * 24 * 7)
        ); // diff en semaines

        if (weeksDiff < 4) {
          currentWeek.push(time);
          currentVoltage.push(voltageData[idx]);
          currentCurrent.push(currentData[idx]);
          currentTemperature.push(temperatureData[idx]);
        } else {
          // Calculer la moyenne de la semaine passée
          monthlyData.push({
            time: startOfMonth.toISOString(),
            voltage: calculateAverage(currentVoltage),
            current: calculateAverage(currentCurrent),
            temperature: calculateAverage(currentTemperature),
          });
          // Redémarrer le mois suivant
          startOfMonth.setMonth(startOfMonth.getMonth() + 1);
          currentWeek = [time];
          currentVoltage = [voltageData[idx]];
          currentCurrent = [currentData[idx]];
          currentTemperature = [temperatureData[idx]];
        }
      });

      // Dernier mois
      if (currentWeek.length > 0) {
        monthlyData.push({
          time: startOfMonth.toISOString(),
          voltage: calculateAverage(currentVoltage),
          current: calculateAverage(currentCurrent),
          temperature: calculateAverage(currentTemperature),
        });
      }

      return monthlyData;
    }

    // Fonction pour calculer la moyenne annuelle (pour l'année)
    function calculateYearlyAverages(
      timeData,
      voltageData,
      currentData,
      temperatureData
    ) {
      let yearlyData = [];
      let currentMonth = [];
      let currentVoltage = [];
      let currentCurrent = [];
      let currentTemperature = [];
      let startOfYear = new Date(timeData[0]);
      startOfYear.setMonth(0, 1); // Premier jour de l'année

      timeData.forEach((time, idx) => {
        const currentDate = new Date(time);
        const monthsDiff = Math.floor(
          (currentDate - startOfYear) / (1000 * 60 * 60 * 24 * 30)
        ); // diff en mois

        if (monthsDiff < 12) {
          currentMonth.push(time);
          currentVoltage.push(voltageData[idx]);
          currentCurrent.push(currentData[idx]);
          currentTemperature.push(temperatureData[idx]);
        } else {
          // Calculer la moyenne du mois passé
          yearlyData.push({
            time: startOfYear.toISOString(),
            voltage: calculateAverage(currentVoltage),
            current: calculateAverage(currentCurrent),
            temperature: calculateAverage(currentTemperature),
          });
          // Redémarrer l'année suivante
          startOfYear.setFullYear(startOfYear.getFullYear() + 1);
          currentMonth = [time];
          currentVoltage = [voltageData[idx]];
          currentCurrent = [currentData[idx]];
          currentTemperature = [temperatureData[idx]];
        }
      });

      // Dernière année
      if (currentMonth.length > 0) {
        yearlyData.push({
          time: startOfYear.toISOString(),
          voltage: calculateAverage(currentVoltage),
          current: calculateAverage(currentCurrent),
          temperature: calculateAverage(currentTemperature),
        });
      }

      return yearlyData;
    }

    // Fonction pour calculer la moyenne d'un tableau
    function calculateAverage(data) {
      if (data.length === 0) return 0;
      const sum = data.reduce((acc, val) => acc + val, 0);
      return sum / data.length;
    }

    const updateChart = () => {
      if (chart.value) {
        chart.value.destroy();
      }

      // Vérifier si une batterie est sélectionnée
      if (selectedBattery.value) {
        generateData(selectedBattery.value); // Mettre à jour les données avec la batterie sélectionnée
        createChart(); // Créer le graphique avec les nouvelles données
      }
    };

    const updateChartAgain = () => {
      if (chart.value) {
        chart.value.destroy();
      }
      createChart();

      // // Vérifier si une batterie est sélectionnée
      // if (selectedBattery.value) {
      //   generateData(selectedBattery.value); // Mettre à jour les données avec la batterie sélectionnée
      //   createChart(); // Créer le graphique avec les nouvelles données
      // }
    };

    

    const createChart = () => {
      const ctx = chartCanvas.value.getContext("2d");

      chart.value = new Chart(ctx, {
        type: "line",
        data: {
          labels: timeData.value.map((timestamp) => {
            const date = new Date(timestamp);
            return date.toLocaleString("fr-FR", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
          }),
          datasets: [
            {
              label: "Tension (V)",
              data: voltageData.value,
              borderColor: "#FF6384",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: true,
              tension: 0.3,
            },
            {
              label: "Courant (A)",
              data: currentData.value,
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
              tension: 0.3,
            },
            {
              label: "Température (°C)",
              data: temperatureData.value,
              borderColor: "#FFCE56",
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              fill: true,
              tension: 0.3,
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
                text: "Temps (s)",
              },
              ticks: {
                maxRotation: 0, // Éviter la rotation des étiquettes
                autoSkip: true, // Skip automatiquement les étiquettes pour éviter la surcharge
                maxTicksLimit: 10, // Limiter le nombre d'étiquettes visibles
              },
            },
            y: {
              title: {
                display: true,
                text: "Valeurs mesurées",
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

    onMounted(() => {
      if (batteries.length > 0) {
        selectedBattery.value = batteries[0].id; // Par exemple, sélectionner la première batterie par défaut
        updateChart(); // Mettre à jour le graphique au montage
      }
    });

    onBeforeUnmount(() => {
      if (chart.value) {
        chart.value.destroy();
      }
    });

    return {
      chartCanvas,
      selectedBattery,
      batteries,
      updateChart,
      selectedTimeRange,
      selectBattery,
      selectTimeRange,
      isselectedBattery,
      type,
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
select {
  width: 100px;
}
option {
  width: 100px;
  color: rebeccapurple;
}

.entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entete h4 {
  font-weight: 600;
  margin-right: 20px;
}

.option {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 40%;
}

.option h4 {
  font-weight: 600;
  border-bottom: 2px solid #ebedee00;
  padding: 5px 10px;
}
.optionType {
  position: absolute;
  z-index: 100;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0px 2px 5px #d5d6d5;
}
.select {
  color: #328ca8 !important;
  border-bottom: 2px solid #328ca8 !important;
}
</style>
