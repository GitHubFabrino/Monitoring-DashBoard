<template>
  <div ref="chart" :style="{ width: chartWidth, height: chartHeight }"></div>
</template>

<script>
import { ref, onMounted, defineExpose } from 'vue';
import * as echarts from 'echarts';
import mqtt from 'mqtt';
import { useLectureStore } from "@/stores/lectureStore";

export default {
  name: 'RealTimeChart',
  props: {
    batteryId: {
      type: Number,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    showTime: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      required: true,
      validator: value => ['tension', 'courant'].includes(value)
    },
    chartWidth: {
      type: String,
      default: '100%'
    },
    chartHeight: {
      type: String,
      default: '400px'
    }
  },
  setup(props, { expose }) {
    const chart = ref(null);
    let chartInstance = null;
    const data = ref([]); // Réactif pour stocker les données graphiques
    const MAX_DATA_POINTS = 10;

    const lectureStore = useLectureStore();
    let allId = JSON.parse(localStorage.getItem("idAssocier"));

    // Chargement initial des données depuis la base
    const loadInitialData = async () => {
      try {
        if (allId.includes(props.batteryId)) {
          const dataAll = await lectureStore.fetchAllLecture(props.batteryId);
          const lastTenData = dataAll.slice(-10); // Dernières 10 valeurs

          // Ajouter au tableau réactif `data`
          data.value = lastTenData.map(e => [
            new Date(e.created_at).getTime(),
            props.type === 'courant' ? e.courant : e.tension
          ]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    // Initialisation d'ECharts
    const initChart = () => {
      chartInstance = echarts.init(chart.value);

      const option = {
        title: {
          text: props.showTitle
            ? `Batterie ${props.batteryId} - ${props.type.charAt(0).toUpperCase() + props.type.slice(1)}`
            : ''
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLabel: { show: props.showTime }
        },
        yAxis: {
          type: 'value',
          name: props.type.charAt(0).toUpperCase() + props.type.slice(1),
          axisLine: { lineStyle: { color: props.color } }
        },
        series: [
          {
            name: props.type.charAt(0).toUpperCase() + props.type.slice(1),
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: data.value,
            itemStyle: { color: props.color },
            lineStyle: { color: props.color }
          }
        ]
      };

      chartInstance.setOption(option);
    };

    // Mise à jour des données en temps réel via MQTT
    const initMQTT = () => {
      const client = mqtt.connect('ws://localhost:9001');

      client.on('connect', () => {
        client.subscribe(props.topic, err => {
          if (!err) {
            console.log(`Abonné au topic ${props.topic}`);
          }
        });
      });

      client.on('message', (topic, message) => {
        const batteriesData = JSON.parse(message.toString());
        const now = new Date().getTime();

        const value = props.type === 'courant'
          ? batteriesData[props.batteryId - 1].courant
          : batteriesData[props.batteryId - 1].tension;

        data.value.push([now, value]);

        if (data.value.length > MAX_DATA_POINTS) {
          data.value.shift(); // Retirer les anciennes données
        }

        chartInstance.setOption({
          series: [
            {
              data: data.value
            }
          ]
        });
      });
    };

    onMounted(async () => {
      await loadInitialData();
      initChart();
      initMQTT();
    });

    // Expose resize pour la redimension
    expose({
      resize() {
        if (chartInstance) {
          chartInstance.resize();
        }
      }
    });

    return { chart };
  }
};
</script>
