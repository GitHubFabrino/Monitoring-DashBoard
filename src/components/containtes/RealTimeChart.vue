<template>
  <div ref="chart" :style="{ width: chartWidth, height: chartHeight }"></div>
</template>

<script>
import { ref, onMounted, watch, defineExpose } from 'vue';
import * as echarts from 'echarts';
import mqtt from 'mqtt';

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

    onMounted(() => {
      chartInstance = echarts.init(chart.value);
      const data = [];
      const MAX_DATA_POINTS = 10;

      const option = {
        title: {
          text: props.showTitle ? `Batterie ${props.batteryId} - ${props.type.charAt(0).toUpperCase() + props.type.slice(1)}` : ''
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
        yAxis: {
          type: 'value',
          name: props.type.charAt(0).toUpperCase() + props.type.slice(1),
          axisLine: {
            lineStyle: {
              color: props.color
            }
          }
        },
        series: [
          {
            name: props.type.charAt(0).toUpperCase() + props.type.slice(1),
            type: 'line',
            smooth: true,
            showSymbol: false,
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
        const value = props.type === 'courant' ? batteriesData[props.batteryId - 1].courant : batteriesData[props.batteryId - 1].tension;
        data.push([now, value]);

        if (data.length > MAX_DATA_POINTS) {
          data.shift();
        }

        chartInstance.setOption({
          series: [
            {
              name: props.type.charAt(0).toUpperCase() + props.type.slice(1),
              data: data
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
