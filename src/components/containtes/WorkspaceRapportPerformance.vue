<template>
  <div class="w-full h-full shadow-sm rounded-sm px-8 py-5 bg-[#f6f8fa]">
    <div
      class="flex justify-between items-center px-5 py-1 border-b border-gray-300"
    >
      <h3 class="font-semibold w-3/5 text-[#2d4051] font-nunito">
        Gérer les personnels
      </h3>
    </div>

    <div class="w-full h-[90%] flex justify-between">
      <div class="w-[60%] h-full py-2 bg-blue-500"></div>
      <div class="w-[30%] h-full py-2 overflow-y max-h-screen">
        <UserCard
          v-for="user in personnel.personnelData"
          :key="user.id"
          :data="user"
          :toggle="handleToggle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, watch, computed, watchEffect } from "vue";
import { useShow } from "@/stores/show";
import { useMaintenanceStore } from "@/stores/maintenanceStore";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";
import { useUrl } from "@/stores/url";
import UserCard from "./useComposantes/UserCard.vue";
import { personnelStore } from "@/stores/personnel";

const personnel= personnelStore()


const show = useShow();
const maintenanceStore = useMaintenanceStore();
const useParc = parcStore();
const batterie = useBatterie();
const URL = useUrl().url;
const search = ref("");
const batteries = ref([]);
const maintenanceArray = ref([]);


watch(
  () =>  useParc?.parcSuperviser?.id,
  (newId, oldId) => {
    console.log('niova', newId, oldId);
    if (newId) {
      getUsersByParc();
    }
  }
);

onMounted(() => {
    if (useParc?.parcSuperviser?.id) {
      personnel.getUsersByParc();
      
    }
  });


const users = [
  {
    id: 4,
    name: "TECHNICIEN1",
    username: "Technicien1",
    phone: "+261 34 05 854 28",
    adresse: "Lazaret",
    email: "technicien1@gmail.com",
    email_verified_at: null,
    nom_photo_profile: "Technicien1_profil.png",
    file_id: 23,
    validation_compte: "0",
    created_at: "2025-02-25T19:49:24.000000Z",
    updated_at: "2025-02-25T19:49:24.000000Z",
    pivot: {
      parc_id: 22,
      user_id: 4,
    },
    roles: [
      {
        id: 2,
        name: "Technicien",
        created_at: "2025-02-01T20:00:16.000000Z",
        updated_at: "2025-02-01T20:00:16.000000Z",
        pivot: {
          user_id: 4,
          role_id: 2,
        },
      },
    ],
    file: {
      id: 23,
      titre: "result2.png",
      file_name: "result2.png",
      created_at: "2025-02-18T16:30:54.000000Z",
      updated_at: "2025-02-18T16:30:54.000000Z",
    },
  },
  {
    id: 4,
    name: "TECHNICIEN1",
    username: "Technicien1",
    phone: "+261 34 05 854 28",
    adresse: "Lazaret",
    email: "technicien1@gmail.com",
    email_verified_at: null,
    nom_photo_profile: "Technicien1_profil.png",
    file_id: 23,
    validation_compte: "0",
    created_at: "2025-02-25T19:49:24.000000Z",
    updated_at: "2025-02-25T19:49:24.000000Z",
    pivot: {
      parc_id: 22,
      user_id: 4,
    },
    roles: [
      {
        id: 2,
        name: "Technicien",
        created_at: "2025-02-01T20:00:16.000000Z",
        updated_at: "2025-02-01T20:00:16.000000Z",
        pivot: {
          user_id: 4,
          role_id: 2,
        },
      },
    ],
    file: {
      id: 23,
      titre: "result2.png",
      file_name: "result2.png",
      created_at: "2025-02-18T16:30:54.000000Z",
      updated_at: "2025-02-18T16:30:54.000000Z",
    },
  },
  {
    id: 4,
    name: "TECHNICIEN1",
    username: "Technicien1",
    phone: "+261 34 05 854 28",
    adresse: "Lazaret",
    email: "technicien1@gmail.com",
    email_verified_at: null,
    nom_photo_profile: "Technicien1_profil.png",
    file_id: 23,
    validation_compte: "0",
    created_at: "2025-02-25T19:49:24.000000Z",
    updated_at: "2025-02-25T19:49:24.000000Z",
    pivot: {
      parc_id: 22,
      user_id: 4,
    },
    roles: [
      {
        id: 2,
        name: "Technicien",
        created_at: "2025-02-01T20:00:16.000000Z",
        updated_at: "2025-02-01T20:00:16.000000Z",
        pivot: {
          user_id: 4,
          role_id: 2,
        },
      },
    ],
    file: {
      id: 23,
      titre: "result2.png",
      file_name: "result2.png",
      created_at: "2025-02-18T16:30:54.000000Z",
      updated_at: "2025-02-18T16:30:54.000000Z",
    },
  },
  // Ajoutez d'autres utilisateurs si nécessaire
];

function handleToggle(data) {
  console.log("Card clicked!", data);
}
</script>

<style scoped></style>
