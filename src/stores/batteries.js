
import { defineStore } from "pinia";
import { ref } from "vue";

export const UseBatterieStore = defineStore("batterie", () => {
  // États pour trois batteries
  const batteries = ref({
    1: { tension: 0, courant: 0, temperature: 0, soc: 0, soh: 0 },
    2: { tension: 0, courant: 0, temperature: 0, soc: 0, soh: 0 },
    3: { tension: 0, courant: 0, temperature: 0, soc: 0, soh: 0 },
  });

  // Fonction pour mettre à jour les données d'une batterie
  const updateBatteryData = (batteryId, data) => {
    if (batteries.value[batteryId]) {
      batteries.value[batteryId] = { ...batteries.value[batteryId], ...data };
    }
  };

  // Getter pour accéder facilement aux données d'une batterie
  const getBatteryData = (batteryId) => batteries.value[batteryId];

  return {
    batteries,
    updateBatteryData,
    getBatteryData,
  };
});
