<template>
  <div ref="chart" :style="{ width: chartWidth, height: chartHeight }"></div>
</template>

<script>

import { ref, onMounted, defineExpose } from "vue";
import * as echarts from "echarts";
import mqtt from "mqtt";
import "primeicons/primeicons.css";
import { useLectureStore } from "@/stores/lectureStore";

export default {
  name: "RealTimeCurrentTensionChart",
  props: {
    batteryId: {
      type: Number,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    colorTension: {
      type: String,
      required: true,
    },
    colorCourant: {
      type: String,
      required: true,
    },
    showTime: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    chartWidth: {
      type: String,
      default: "100%",
    },
    chartHeight: {
      type: String,
      default: "400px",
    },
  },
  setup(props, { expose }) {
    const chart = ref(null);
    let chartInstance = null;
    const courantData = ref([]);
    const tensionData = ref([]);
    const MAX_DATA_POINTS = 10;
    const lectureStore = useLectureStore();

    const initializeChart = () => {
      chartInstance = echarts.init(chart.value);

      const option = {
        title: {
          text: props.showTitle
            ? `Batterie ${props.batteryId} - Courant et Tension`
            : "",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "time",
          boundaryGap: false,
          axisLabel: {
            show: props.showTime,
          },
        },
        yAxis: [
          {
            type: "value",
            name: "Tension",
            position: "left",
            axisLine: {
              lineStyle: {
                color: props.colorTension,
              },
            },
          },
          {
            type: "value",
            name: "Courant",
            position: "right",
            axisLine: {
              lineStyle: {
                color: props.colorCourant,
              },
            },
          },
        ],
        series: [
          {
            name: "Tension",
            type: "line",
            smooth: true,
            showSymbol: false,
            yAxisIndex: 0,
            data: tensionData.value,
            itemStyle: { color: props.colorTension },
            lineStyle: { color: props.colorTension },
          },
          {
            name: "Courant",
            type: "line",
            smooth: true,
            showSymbol: false,
            yAxisIndex: 1,
            data: courantData.value,
            itemStyle: { color: props.colorCourant },
            lineStyle: { color: props.colorCourant },
          },
        ],
      };

      chartInstance.setOption(option);
    };

    const updateChart = () => {
      console.log("Updating chart with data:", {
        tensionData: tensionData.value,
        courantData: courantData.value,
      });

      if (chartInstance) {
        chartInstance.setOption({
          series: [
            {
              name: "Tension",
              data: tensionData.value,
            },
            {
              name: "Courant",
              data: courantData.value,
            },
          ],
        });
      }
    };

    onMounted(async () => {
      let allId = JSON.parse(localStorage.getItem("idAssocier"));

      for (const element of allId) {
        if (element === props.batteryId) {
          try {
            const data = await lectureStore.fetchAllLecture(element);
            const lastTenData = data.slice(-10);

            lastTenData.forEach((e) => {
              courantData.value.push([new Date(e.created_at), e.courant]);
              tensionData.value.push([new Date(e.created_at), e.tension]);
            });

            console.log("Initial data loaded:", {
              tensionData: tensionData.value,
              courantData: courantData.value,
            });
          } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
          }
        }
      }

      initializeChart();
      updateChart();

      const client = mqtt.connect("ws://localhost:9001");

      client.on("connect", () => {
        client.subscribe(props.topic, (err) => {
          if (!err) {
            console.log(`Abonné au topic ${props.topic}`);
          }
        });
      });

      client.on("message", (topic, message) => {
        const batteriesData = JSON.parse(message.toString());

        console.log("New MQTT data received:", batteriesData);

        const now = new Date();
        batteriesData.forEach((element) => {
          if (element.batterie_id === props.batteryId) {
            const courant = parseFloat(element.courant).toFixed(1);
            const tension = parseFloat(element.tension).toFixed(1);

            courantData.value.push([now, courant]);
            tensionData.value.push([now, tension]);

            if (courantData.value.length > MAX_DATA_POINTS) {
              courantData.value.shift();
            }
            if (tensionData.value.length > MAX_DATA_POINTS) {
              tensionData.value.shift();
            }
          }
        });

        console.log("Data after MQTT update:", {
          tensionData: tensionData.value,
          courantData: courantData.value,
        });

        updateChart();
      });
    });

    expose({
      resize() {
        if (chartInstance) {
          chartInstance.resize();
        }
      },
    });

    return { chart };
  },
};


</script>
