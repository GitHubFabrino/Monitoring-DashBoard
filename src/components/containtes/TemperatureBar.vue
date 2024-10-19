<template>
  <div class="temperature-display">
    <i :class="iconClass" :style="{ fontSize: '40px', color: props.color }"></i>
    <span class="temperature-value">{{ temperature }}°C</span>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import "primeicons/primeicons.css";

// Définir les props
const props = defineProps({
  temperature: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

// Déterminez la classe de l'icône en fonction de la température
const iconClass = computed(() => {
  const temp = props.temperature; // Utilisez props.temperature ici
  if (temp < 15) {
    return "pi pi-cloud"; // Icône pour températures froides
  } else if (temp < 25) {
    return "pi pi-face-smile"; // Icône pour températures modérées
  } else {
    return "pi pi-sun"; // Icône pour températures chaudes
  }
});
</script>

<style scoped>
.temperature-display {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  font-size: 24px; /* Taille de l'icône et du texte */
}

.temperature-value {
  color: #2d4051;
  font-size: 30px;
  font-weight: 700;
}
</style>
