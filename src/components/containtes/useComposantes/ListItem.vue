<template>
  <li>
    <a
      href="#"
      class="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
    >
      <div
        :class="['flex', 'items-center', 'justify-center', 'w-8', 'h-8', 'rounded-full', 'transition-transform', 'duration-300', 'hover:scale-105', 'shadow-lg', 'hover:shadow-xl', 'cursor-pointer']"
        :style="{ backgroundColor: bgColor }"
        @click="action"
      >
        <i :class="iconClass" class="text-white text-xs"></i>
      </div>
      <span
        class="invisible absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
      >
        {{ label }}
      </span>
    </a>
  </li>
</template>

<script setup>
defineProps({
  iconClass: String,
  label: String,
  action: Function,
  bgColor: {
    type: String,
    default: '#fb7b58d8', // Couleur orange par défaut
  },
});
</script>

<style scoped>
/* Aucun style personnalisé n'est nécessaire ici, tout est géré par Tailwind */
</style>
