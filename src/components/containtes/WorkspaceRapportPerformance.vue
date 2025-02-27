<template>
  <div class="w-full h-full shadow-sm rounded-sm px-8 py-5 bg-[#f6f8fa]">
    <div
      class="flex justify-between items-center px-5 py-1 border-b border-gray-300"
    >
      <h3 class="font-semibold w-3/5 text-[#2d4051] font-nunito">
        Gérer les personnels
      </h3>
    </div>

    <template v-if="personnel.personnelDataSelect">
      <div class="w-full h-[90%] flex justify-between">
      <div class="w-[60%] h-full py-2 flex justify-around">
        <div
          class="w-[85%] h-full flex flex-wrap justify-center p-2 rounded-lg border my-2 cursor-pointer border-gray-200 shadow-lg"
        >
          <div class="w-[170px] h-[170px] bg-red-400 rounded-full">
            <img
              alt=""
              :src="personnel.personnelDataSelect?.file?.file_name"
              class="size-full rounded-full object-cover"
            />
          </div>
          <div class="w-[100%] h-[50%] px-4">
            <div class="w-full mt-4 flex justify-between">
              <div>
                <h3
                  class="font-semibold text-[#2d4051] font-nunito p-2 w-[95%]"
                  v-if="!isEditing"
                >
                  {{ personnel.personnelDataSelect?.name }}
                </h3>
                <input
                  v-else
                  type="text"
                  placeholder="Nom"
                  v-model="editedData.name"
                  class="p-2 rounded-sm border-gray-100 shadow-sm w-[95%] focus:outline-none"
                />
              </div>
              <div class="w-[50%]">
                <h3
                  class="text-sm text-[#646f78] font-nunito p-2 w-full"
                  v-if="!isEditing"
                >
                  {{ personnel.personnelDataSelect?.email }}
                </h3>
                <input
                  v-else
                  type="text"
                  placeholder="Email"
                  v-model="editedData.email"
                  class="p-2 rounded-sm border-gray-100 shadow-sm text-sm focus:outline-none w-full"
                />
                <h3
                  class="text-sm text-[#646f78] font-nunito p-2"
                  v-if="!isEditing"
                >
                  {{ personnel.personnelDataSelect?.phone }}
                </h3>
                <input
                  v-else
                  type="text"
                  placeholder="Téléphone"
                  v-model="editedData.phone"
                  class="p-2 rounded-sm border-gray-100 shadow-sm w-full text-sm focus:outline-none"
                />
              </div>
            </div>
            <h3
              v-if="!isEditing"
              class="font-semibold text-[#2d4051] font-nunito p-2 border-b border-gray-300 shadow-sm m-1"
            >
              {{ personnel.personnelDataSelect?.adresse }}
            </h3>
            <input
              v-else
              type="text"
              placeholder="Adresse"
              v-model="editedData.adresse"
              class="p-2 rounded-sm border-gray-100 shadow-sm w-[100%] focus:outline-none m-1"
            />
            <h3
              v-if="!isEditing"
              class="font-semibold text-[#2d4051] font-nunito p-2 border-b border-gray-300 shadow-sm m-1"
            >
              {{ personnel.personnelDataSelect?.roles[0].name }}
            </h3>
            <!-- <input
              v-else
              type="text"
              placeholder="Rôle"
              v-model="editedData.roles[0].name"
              class="p-2 rounded-sm border-gray-100 shadow-sm w-[100%] focus:outline-none m-1"
            /> -->
            <h3
              class="text-xs text-[#646f78] font-nunito pt-4 text-right"
              v-if="!isEditing"
            >
              {{ formatDateTime(personnel.personnelDataSelect?.created_at) }}
            </h3>
          </div>
        </div>
        <div class="w-[10%] h-full flex flex-col items-center">
          <div
            class="flex h-screen w-16 flex-col justify-between border-e border-gray-100 bg-white"
          >
            <div class="border-t border-gray-100">
              <div class="px-2">
                <ul class="space-y-1 border-t border-gray-100 pt-4">
                  <ListItem
                    iconClass="pi pi-image"
                    label="Modifier Photo"
                    :action="() => modifiePhoto(personnel.personnelDataSelect)"
                    bgColor="#ff9800"
                  />
                  <ListItem
                    iconClass="pi pi-pen-to-square"
                    label="Modifier Info"
                    :action="() => modifieInfo(personnel.personnelDataSelect)"
                    bgColor="#2196f3"
                  />
                  <ListItem
                    iconClass="pi pi-trash"
                    label="Supprimer"
                    :action="() => supprimer(personnel.personnelDataSelect)"
                    bgColor="#f44336"
                  />
                  <ListItem
                    iconClass="pi pi-plus"
                    label="Ajouter"
                    :action="
                      () => (show.showAddPersonnel = !show.showAddPersonnel)
                    "
                  />
                  <ListItem
                    iconClass="pi pi-check"
                    label="Enregistrer"
                    :action="saveChanges"
                    bgColor="#4caf50"
                    v-if="isEditing"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[35%] h-full py-2 overflow-y max-h-screen overflow-y-scroll flex flex-col items-center">
        <UserCard
          v-for="user in personnel.personnelData"
          :key="user.id"
          :data="user"
          :toggle="handleToggle"
        />
      </div>
    </div>
    </template>
    <template v-else>
      <CardNoData message="Aucune technicien  disponible." />
    </template>

  
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useShow } from "@/stores/show";
import { useMaintenanceStore } from "@/stores/maintenanceStore";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";
import { useUrl } from "@/stores/url";
import UserCard from "./useComposantes/UserCard.vue";
import ListItem from "@/components/containtes/useComposantes/ListItem.vue";
import { personnelStore } from "@/stores/personnel";
import CardNoData from "./cards/CardNoData.vue";

const personnel = personnelStore();
const show = useShow();
const maintenanceStore = useMaintenanceStore();
const useParc = parcStore();
const batterie = useBatterie();
const URL = useUrl().url;
const search = ref("");
const batteries = ref([]);
const maintenanceArray = ref([]);
const isEditing = ref(false);
const editedData = ref({});

function modifiePhoto(data) {
  console.log("Modification de la photo pour :", data.id);
  show.personelAddImage = true;
  // Logique pour modifier la photo
  show.newpersonnelId = data.id

}

function modifieInfo(data) {
  console.log("Modification des informations pour :", data);
  isEditing.value = !isEditing.value;
  editedData.value = { ...data };

  // Logique pour modifier les informations
}

function saveChanges() {
  console.log("Modifications enregistrées :", editedData.value);
  // Logique pour enregistrer les modifications
  isEditing.value = false;
  console.log("name", editedData.value.name);
  console.log("phone", editedData.value.phone);
  console.log("email", editedData.value.email);
  console.log("adres", editedData.value.adresse);
  let dataModifier = {
    name: editedData.value.name,
    phone: editedData.value.phone,
    email: editedData.value.email,
    adresse: editedData.value.adresse,
  };

  personnel.updateUser(dataModifier , editedData.value.id)



}

function supprimer(data) {
  console.log("Suppression de :", data);
  show.showDelete = true;
  show.showDeleteNamePersonnel = data.name;
  show.showDeleteIdPersonnel = data.id;
  // Logique pour supprimer
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const mois = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const jour = date.getDate();
  const moisNom = mois[date.getMonth()];
  const annee = date.getFullYear();
  const heures = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${jour} ${moisNom} ${annee} à ${heures}h${minutes}`;
}

watch(
  () => useParc?.parcSuperviser?.id,
  (newId, oldId) => {
    console.log("niova", newId, oldId);
    if (newId) {
      personnel.getUsersByParc();
    }
  }
);

onMounted(() => {
  if (useParc?.parcSuperviser?.id) {
    personnel.getUsersByParc();
  }
});

function handleToggle(data) {
  console.log("Card clicked!", data);
  personnel.personnelDataSelect = data;
}
</script>

<style scoped></style>
