<template>
  <div ref="chart" :style="{ width: chartWidth, height: chartHeight }"></div>
</template>

<script>
import { ref, onMounted, defineExpose } from 'vue';
import * as echarts from 'echarts';
import mqtt from 'mqtt';

export default {
  name: 'RealTimeCurrentTensionChart',
  props: {
    batteryId: {
      type: Number,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    colorTension: {
      type: String,
      required: true
    },
    colorCourant: {
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

    onMounted(() => {
      chartInstance = echarts.init(chart.value);
      const courantData = [];
      const tensionData = [];
      const MAX_DATA_POINTS = 10;

      const option = {
        title: {
          text: props.showTitle ? `Batterie ${props.batteryId} - Courant et Tension` : ''
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLabel: {
            show: props.showTime
          }
        },
        yAxis: [
          {
            type: 'value',
            name: 'Tension',
            position: 'left',
            axisLine: {
              lineStyle: {
                color: props.colorTension
              }
            },
          },
          {
            type: 'value',
            name: 'Courant',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: props.colorCourant
              }
            },
          },
        ],
        series: [
          {
            name: 'Tension',
            type: 'line',
            smooth: true,
            showSymbol: false,
            yAxisIndex: 0,
            data: []
          },
          {
            name: 'Courant',
            type: 'line',
            smooth: true,
            showSymbol: false,
            yAxisIndex: 1,
            data: []
          }
        ]
      };

      chartInstance.setOption(option);

      const client = mqtt.connect('ws://localhost:9001');

      client.on('connect', () => {
        client.subscribe(props.topic, (err) => {
          if (!err) {
            console.log(`Abonné au topic ${props.topic}`);
          }
        });
      });

      client.on('message', (topic, message) => {
        const batteriesData = JSON.parse(message.toString());

        const now = new Date();
        courantData.push([now, batteriesData[props.batteryId - 1].courant]);
        tensionData.push([now, batteriesData[props.batteryId - 1].tension]);

        if (courantData.length > MAX_DATA_POINTS) {
          courantData.shift();
        }
        if (tensionData.length > MAX_DATA_POINTS) {
          tensionData.shift();
        }

        chartInstance.setOption({
          series: [
            {
              name: 'Tension',
              data: tensionData
            },
            {
              name: 'Courant',
              data: courantData
            }
          ]
        });
      });
    });

    // Expose the resize method to allow the parent component to call it
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
