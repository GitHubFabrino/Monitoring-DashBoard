<template>
    <div
      @click="toggle(data)"
      class="relative rounded-lg border my-2 cursor-pointer border-gray-200 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div class="flex items-center gap-4 p-1">
        <img
          :alt="data.name"
          :src="imageSrc"
          class="size-12 rounded-lg object-cover"
        />
  
        <div>
          <p class="text-sm text-[#2d4051] font-bold">{{ data.name }}</p>
          <p class="line-clamp-1 text-xs text-gray-500">{{ data.roles[0]?.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  // Définir les props
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    toggle: {
      type: Function,
      required: true,
    },
  });
  
  // Calculer l'URL de l'image à partir des données
  const imageSrc = computed(() => {
    return props.data.file ? props.data.file.file_name : 'default-image-url.jpg';
  });
  </script>
  
  <style scoped>
  /* Ajoutez ici tout style spécifique au composant */
  </style>
  