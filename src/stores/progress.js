import { defineStore } from "pinia";
import { ref } from "vue";

export const useProgressStore = defineStore("progress", () => {
  // Deux valeurs de progression pour deux batteries différentes
  const progress1 = ref(90); // Valeur initiale de progression de la première batterie
  const progress2 = ref(75); // Valeur initiale de progression de la deuxième batterie
  const progress3 = ref(10);
  // Fonction pour mettre à jour la progression de la première batterie
  const setProgress1 = (newProgress) => {
    progress1.value = newProgress;
  };

  // Fonction pour mettre à jour la progression de la deuxième batterie
  const setProgress2 = (newProgress) => {
    progress2.value = newProgress;
  };
  const setProgress3 = (newProgress) => {
    progress3.value = newProgress;
  };

  const currentTemperature = ref(40);

  return {
    progress1,
    progress2,
    progress3,
    currentTemperature,
    setProgress1,
    setProgress2,
    setProgress3,
  };
});
