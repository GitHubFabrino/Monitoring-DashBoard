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

    <div v-if="batteries.length == 0">
      <div class="con">
        <div style="width: 100px">
         <svg fill="#2d4051" height="139px" width="139px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-5.79 -5.79 69.44 69.44" xml:space="preserve" stroke="#2d4051" stroke-width="0.00057857"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><path transform="translate(-5.79, -5.79), scale(2.17)" d="M16,31.802559104230667C18.625049790545244,31.410849919821157,17.9296096822142,26.66532941034102,20.020872634590063,25.031027800474412C21.45616648089285,23.90935965205752,24.32198024275458,25.93143204654148,25.395691005689034,24.459918180495244C26.534312689783004,22.89944430413579,23.876574479635167,20.587096122688042,24.577028069051188,18.786845354777224C25.3410063532797,16.82332840857067,28.325300649731155,16.51323980344837,29.228299228291448,14.609649725744891C30.16616779321459,12.632551049438957,30.980962867895474,9.852722642926228,29.632664206433716,8.129177650643722C28.193538096818713,6.289526933494143,25.033266928991544,7.44832112526084,22.89353953657718,6.511856813801938C21.268012378871738,5.800435267349359,20.464995632744426,3.3712246317448686,18.690872933690205,3.3404381753804664C16.797527075183808,3.3075828324626952,15.757352189052668,5.790798072240528,13.950245508528875,6.3566633023862344C12.359991610476989,6.85462471092378,10.304989689472334,5.3297560473792025,9.00570955618246,6.373185086605234C7.679780062595225,7.438015758703658,8.96381658278138,10.018254825728137,7.8217972108483345,11.278312418195931C6.246582385515151,13.016340204072469,2.827724378665648,12.464222378359722,1.647865678466987,14.491529897704993C0.6389591656922737,16.2250966030403,1.7362299413120557,18.534213142718894,2.5259402139102836,20.377987412720287C3.2921047563162227,22.166788342493874,4.490963024789555,23.824566848391452,6.108611533882005,24.906246178613642C7.644606725037183,25.933326066645293,9.89111458054068,25.259643922385017,11.40683759827282,26.316411662793435C13.38490291582104,27.695526178803973,13.615037477711923,32.1584425346393,16,31.802559104230667" fill="#e0f7ff" strokewidth="0"></path></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="4.397132"></g><g id="SVGRepo_iconCarrier"> <path d="M19.919,26.747l4.226,4.226h-4.226V26.747z M41.438,49.471c0,2.971-2.416,5.387-5.387,5.387H21.806 c-2.971,0-5.387-2.416-5.387-5.387V23.247l-3-3v29.223c0,4.624,3.763,8.387,8.387,8.387h14.246c4.065,0,7.461-2.908,8.224-6.752 l-2.838-2.837V49.471z M19.919,49.47c0,1.041,0.847,1.888,1.888,1.888h14.245c1.04,0,1.887-0.847,1.887-1.888v-4.703l-1.232-1.232 H19.919V49.47z M19.919,40.468h13.72l-6.427-6.427h-7.293V40.468z M55.105,55.106c-0.391,0.391-0.902,0.586-1.414,0.586 c-0.512,0-1.023-0.195-1.414-0.586L2.752,5.58c-0.781-0.781-0.781-2.047,0-2.828c0.781-0.781,2.047-0.781,2.828,0l8.838,8.838 c1.415-2.635,4.193-4.434,7.388-4.434h0.003V1.5c0-0.828,0.672-1.5,1.5-1.5h11.24c0.828,0,1.5,0.672,1.5,1.5v5.656h0.003 c4.624,0,8.387,3.763,8.387,8.387v26.068l10.667,10.667C55.887,53.06,55.887,54.325,55.105,55.106z M16.708,13.88l3.21,3.211v-1.549 c0-1.04,0.847-1.887,1.888-1.887h14.245c1.04,0,1.887,0.847,1.887,1.887v5.936H24.307l3.067,3.067h10.565v6.427h-4.138l3.067,3.067 h1.071v1.07l3.5,3.5V15.543c0-2.971-2.416-5.387-5.387-5.387H21.806C19.419,10.156,17.414,11.726,16.708,13.88z"></path> </g></svg>
        </div>
        <h1>Aucune batterie disponible</h1>
      </div>
    </div>

    <div class="chart-container" style="height: 330px">
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
      console.log(
        "Données filtrées et moyennes dans la courbe timeData.value:",
        timeData.value
      );
      console.log(
        "Données filtrées et moyennes dans la courbe voltageData.value:",
        voltageData.value
      );
      console.log(
        "Données filtrées et moyennes dans la courbe currentData.value:",
        currentData.value
      );
      console.log(
        "Données filtrées et moyennes dans la courbe temperatureData.value:",
        temperatureData.value
      );
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
  color: #2c3d5e;
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
  color: #2c3d5e;
}

.con {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
  /* background-color: #f5572c; */
  margin: auto 0px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.con h1 {
  font-size: 16px;
  font-weight: 600;
  color: #2d4051;
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
