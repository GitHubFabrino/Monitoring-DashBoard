<template>
  <a
    href="#"
    class="block rounded-lg p-4 shadow-gray-400 shadow-blue-200 bg-[#e0e0e048] w-[30%] hover:bg-blue-100 mt-5 h-[350px]"
  >
    <img @click.stop
      alt=""
      v-if="image?.id"
      :src="image?.file_name"
      class="h-56 w-full rounded-md object-cover"
    />
    <!-- class="cardFile flex items-center justify-center w-full h-[350px] bg-[#b2b0b030]" -->
    <div v-else @click.stop
      class="cardFile flex items-center justify-center w-full !h-[220px] "
      
    >
      <div class="file-input-container relative w-12 h-12 ">
        <input
          type="file"
          @change="(event) => onFileChange(event,id)"
          id="file-upload"
          class="absolute inset-0 w-full h-[350px] opacity-0 cursor-pointer hover:bg-black-500"
        />
        <label
          for="file-upload"
          class=" file-input-label flex items-center justify-center w-full h-full bg-[#e1dada]
           rounded-full cursor-pointer text-xl text-gray-500  !hover:bg-red-500 "
        >
          <i class="pi pi-camera cursor-pointer"></i>
        </label>
      </div>
    </div>

    <div class="mt-2 h-[100px] ">
      <dl>
        <div>
          <dd class="text-sm text-gray-500">{{ parc }}</dd>
        </div>

        <div>
          <dd class="font-medium">{{ nomBatterie }}</dd>
        </div>
      </dl>

      <div class="mt-2 flex items-center gap-8 text-xs">
        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <svg
            class="size-4 text-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
            />
          </svg>

          <div class="mt-1.5 sm:mt-0">
            <p class="text-gray-500">Capacité</p>

            <p class="font-medium">{{ capacite }} Ah</p>
          </div>
        </div>

        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
          <svg
            class="size-4 text-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>

          <div class="mt-1.5 sm:mt-0">
            <p class="text-gray-500">Tension Nominal</p>

            <p class="font-medium">{{ tension }} V</p>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
import { ref , watchEffect } from "vue";
const props = defineProps({
  parc: {
    type: String,
    required: true,
  },
  nomBatterie: {
    type: String,
    required: true,
  },
  capacite: {
    type: String,
    required: true,
  },
  tension: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

import axios from "axios";
const image = ref(props.image || {});

const onFileChange = async (event, idBat) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  // ${"titre":"send.jpg","file_name…reated_at":"2025-02-18T16:28:14.000000Z","id":22}
  try {
    const response = await axios.post(
      `http://localhost:8000/api/files/batterie/upload/${idBat}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // image.file_name = response.data.url
    // image.id= response.data.id
    image.value = {
      file_name: response.data.url,
      id: response.data.id,
    };
    
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
  }
};

// watchEffect(()=>{
//   image.value = ref(props.image || {});
// })
</script>

<style scoped></style>
