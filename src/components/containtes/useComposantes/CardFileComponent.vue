<template>
    <div class="cardFile">
      <img
        v-if="fileUrl"
        :src="fileUrl"
        alt="File Preview"
        class="card-image object-containe"
      />
      <div class="absolute">
        <div class="file-input-container">
          <input
            type="file"
            @change="handleFileChange"
            id="file-upload"
          />
          <label for="file-upload" class="file-input-label">
            <i class="pi pi-camera"></i>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Props pour recevoir les données du parent
  const props = defineProps({
    fileUrl: {
      type: String,
      default: '',
    },
    parcId: {
      type: Number,
      required: true,
    },
  });
  
  // Événements pour communiquer avec le parent
  const emit = defineEmits(['file-change']);
  
  // Gestionnaire de changement de fichier
  const handleFileChange = (event) => {
    emit('file-change', event, props.parcId);
  };
  </script>
  
  <style scoped>
  .cardFile {
    position: relative;
    display: inline-block;
  }
  
  .card-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .absolute {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .file-input-container {
    display: inline-block;
  }
  
  .file-input-label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    transition: background-color 0.3s;
  }
  
  .file-input-label:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  
  .pi-camera {
    font-size: 18px;
    color: #333;
  }
  </style>
  