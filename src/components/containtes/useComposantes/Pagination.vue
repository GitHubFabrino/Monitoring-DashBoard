<template>
    <div class="pagination flex justify-center items-center mt-1">
      <div class="inline-flex items-center justify-center gap-3">
        <a @click="prevPageRead" href="#" class="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
          <span class="sr-only">Prev Page</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
  
        <p class="text-xs text-gray-900">
          {{ currentPageRead }}
          <span class="mx-0.25">/</span>
          {{ totalPagesRead }}
        </p>
  
        <a @click="nextPageRead" href="#" class="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
          <span class="sr-only">Next Page</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="size-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    currentPageRead: {
      type: Number,
      required: true
    },
    totalPagesRead: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['update:currentPageRead']);
  
  const prevPageRead = () => {
    if (props.currentPageRead > 1) {
      emit('update:currentPageRead', props.currentPageRead - 1);
    }
  };
  
  const nextPageRead = () => {
    if (props.currentPageRead < props.totalPagesRead) {
      emit('update:currentPageRead', props.currentPageRead + 1);
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez ici vos styles spécifiques si nécessaire */
  </style>
  