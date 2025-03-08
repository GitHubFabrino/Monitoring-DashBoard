<!-- <template>
  <div class="w-full h-full shadow-sm rounded-sm px-4 py-2 bg-[#f6f8fa]">
    <div class="titre" @click="toggleDropdownAll">
      <h3>Calendrier de maintenance</h3>

      <div class="search">
        <input
          type="search"
          v-model="search"
          placeholder="Recherche"
          class="searchInput focus:outline-none"
        />
        <i class="pi pi-search" style="font-size: 18px; color: #2d4051"></i>
      </div>
      <div
        class="btn shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        @click="show.showAddMaintenanceFunc()"
      >
        <h4>Ajouter</h4>
      </div>
    </div>
    <div class="contenu">
      <template v-if="!voirMaintenance">
        <div class="option">
          <h4
            @click="Afaire()"
            :class="[
              show.showRecents ? 'select' : '',
              'transition-transform',
              'duration-300',
              'hover:scale-105',
              'hover:shadow-xl',
              'cursor-pointer w-[45%]',
            ]"
          >
            À faire
          </h4>
          <h4
            @click="fait()"
            :class="[
              show.showHistoriqueCale ? 'select' : '',
              'transition-transform',
              'duration-300',
              'hover:scale-105',
              'hover:shadow-xl',
              'cursor-pointer w-[45%]',
            ]"
          >
            Fait
          </h4>
        </div>

        <div class="h-[52vh]" v-if="show.showRecents">
          <div v-if="filteredItemsRecent.length !== 0">
            <div class="h-[350px] overflow-y-auto">
              <div class="overflow-x-auto">
                <table
                  @click="toggleDropdownAll"
                  class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm"
                >
                  <tbody
                    class="divide-y divide-gray-200"
                    @click="toggleDropdownAll"
                  >
                    <tr
                      v-for="maintenance in filteredItemsRecent"
                      :key="maintenance.id"
                    >
                      <td
                        class="px-4 py-2 font-medium whitespace-nowrap text-gray-900   w-[22%]"
                      >
                        {{
                          maintenance.maintenance.batterie?.nom ||
                          "Batterie inconnue"
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700    w-[22%]"
                      >
                        Tache
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700   w-[22%]"
                      >
                        {{
                          maintenance.maintenance.details ||
                          "Détails indisponibles"
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700    w-[22%]"
                      >
                        {{
                          formatDateTime(
                            maintenance.maintenance.created_at || new Date()
                          )
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap flex justify-center items-center"
                      >
                        <div>
                          <div class="icon orange" @click.stop>
                            <button
                              @click.stop
                              @click="toggleDropdown"
                              class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                            >
                              <span class="sr-only">Menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="size-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          <div
                            v-if="isDropdownOpen"
                            class="absolute mt-2 end-20 rounded-md border border-gray-100 bg-white shadow-lg z-100"
                            ref="dropdownDiv"
                            @click.stop
                          >
                            <ListItem 
                              iconClass="pi pi-eye"
                              label="Voir"
                              :action="() => voir(maintenance , 'afaire')"
                            />
                            <ListItem
                              iconClass="pi pi-pen-to-square"
                              label="Modifier"
                              :action="() => modifier(maintenance , 'afaire')"
                              bgColor="#2196f3"
                            />
                            <ListItem
                              iconClass="pi pi-trash"
                              label="Supprimer"
                              :action="() => supprimer(maintenance)"
                              bgColor="#f44336"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination
              :currentPageRead.sync="currentPageRecent"
              :totalPagesRead="totalPagesRecent"
              @update:currentPageRead="currentPageRecent = $event"
              @click="toggleDropdownAll"
            />
          </div>

          <div v-else class="flex justify-center items-center">
            <CardNoData message="Aucune maintenance trouvée" />
          </div>
        </div>

        <div class="h-[52vh]" v-if="show.showHistoriqueCale">
          <div class="h-[350px] overflow-scroll">
            <table
                  @click="toggleDropdownAll"
                  class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm"
                >
                  <tbody
                    class="divide-y divide-gray-200"
                    @click="toggleDropdownAll"
                  >
                    <tr
                      v-for="maintenance in filteredItemsHistory"
                      :key="maintenance.id"
                    >
                      <td
                        class="px-4 py-2 font-medium whitespace-nowrap text-gray-900   w-[22%]"
                      >
                        {{
                          maintenance.maintenance.batterie?.nom ||
                          "Batterie inconnue"
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700    w-[22%]"
                      >
                        Tache
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700   w-[22%]"
                      >
                        {{
                          maintenance.maintenance.details ||
                          "Détails indisponibles"
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700    w-[22%]"
                      >
                        {{
                          formatDateTime(
                            maintenance.maintenance.created_at || new Date()
                          )
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap flex justify-center items-center"
                      >
                        <div>
                          <div class="icon orange" @click.stop>
                            <button
                              @click.stop
                              @click="toggleDropdown"
                              class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                            >
                              <span class="sr-only">Menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="size-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          <div
                            v-if="isDropdownOpen"
                            class="absolute mt-2 end-20 rounded-md border border-gray-100 bg-white shadow-lg z-100"
                            ref="dropdownDiv"
                            @click.stop
                          >
                            <ListItem
                              iconClass="pi pi-eye"
                              label="Voir"
                              :action="() => voir(maintenance)"
                            />
                            <ListItem
                              iconClass="pi pi-pen-to-square"
                              label="Modifier"
                              :action="() => modifier(maintenance)"
                              bgColor="#2196f3"
                            />
                            <ListItem
                              iconClass="pi pi-trash"
                              label="Supprimer"
                              :action="() => supprimer(maintenance)"
                              bgColor="#f44336"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
          </div>
          <Pagination
            :currentPageRead.sync="currentPageHistory"
            :totalPagesRead="totalPagesHistory"
            @update:currentPageRead="currentPageHistory = $event"
          />

          <div v-if="filteredItemsHistory.length == 0">
            <CardNoData message="Aucune maintenance trouvée" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="bg-white p-2 rounded-lg shadow-lg w-full h-[440px] " v-if="showNoDo">
          <div class="flex items-center justify-between">
            <div class="flex items-center mb-2">
              <div
                class="w-[40px] h-[40px] flex justify-center items-center"
                @click="retour()"
              >
                <a
                  class="inline-block rounded-full border border-indigo-500 bg-indigo-500 p-1 text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                  href="#"
                >
                  <svg
                    class="h-4 w-4 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </a>
              </div>

              
            </div>
            <div class="block text-gray-700 font-bold mb-2 mr-2 text-sm">
              Frequence : {{voirMaintenanceData.maintenance.frequence}}
            </div>
          </div>
          <div class="flex justify-between w-full px-4 text-sm">
            <div class="w-[45%]">
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Date : {{voirMaintenanceData.maintenance.date_execution}}</div>
              </div>
             
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Batterie :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{voirMaintenanceData.batterie.nom}}
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">
                  Type d'Intervention :
                </div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{voirMaintenanceData.maintenance.type_intervention}}
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Tâche :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{voirMaintenanceData.maintenance.tache}}
                </div>
              </div>
             
            </div>
            <div class="w-[45%] flex flex-col justify-center items-center">
              <div class="mb-4 w-full">
                <div class="block text-gray-700 font-bold mb-2">
                  Description
                </div>
                <div
                  class="shadow appearance-none border rounded w-full h-[100px] py-2 px-3 text-gray-700 leading-tight"
                >
                  <p>  {{voirMaintenanceData.maintenance.details}}</p>
                  
                </div>
              </div>

            

              <div @click="doingMaintenance(voirMaintenanceData)"
                class="w-[50%] bg-indigo-500 flex justify-center items-center py-2 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <h1>Faire</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white p-2 rounded-lg shadow-lg w-full h-[440px] " v-if="showDo">
          <div class="flex items-center justify-between">
            <div class="flex items-center mb-2">
              <div
                class="w-[40px] h-[40px] flex justify-center items-center"
                @click="retour()"
              >
                <a
                  class="inline-block rounded-full border border-indigo-500 bg-indigo-500 p-1 text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                  href="#"
                >
                  <svg
                    class="h-4 w-4 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </a>
              </div>

            
            </div>
            <div class="block text-gray-700 font-bold mb-2 mr-2 text-sm">
              Frequence : Hebdomadaire
            </div>
          </div>
          <div class="flex justify-between w-full px-4 text-sm">
            <div class="w-[45%]">
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Date d'execution :</div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">
                  Nom du Technicien :
                </div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  .....................
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Batterie :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  Préventive / Corrective
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">
                  Type d'Intervention :
                </div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  Préventive / Corrective
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Tâche :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  (Sélectionner la tâche réalisée)
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Description :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  <p>Nettoyage des bornes</p>
                  <p>Remplacement des câbles</p>
                  <p>Vérification des fixations</p>
                </div>
              </div>
            </div>
            <div class="w-[45%] flex flex-col justify-center items-center">
              <div class="mb-4 w-full">
                <div class="block text-gray-700 font-bold mb-2">
                  Travaux Réalisés :
                </div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  <p>Nettoyage des bornes</p>
                  <p>Remplacement des câbles</p>
                  <p>Vérification des fixations</p>
                  <p>Autre : .....................</p>
                </div>
              </div>

              <div class="mb-4 w-full">
                <div class="block text-gray-700 font-bold mb-2">Images :</div>
                <div
                  class="shadow appearance-none border rounded w-full p-1 text-gray-700 leading-tight flex"
                >
                  <div @click="show.showImageMaintenance = !show.showImageMaintenance"
                    class="w-[100px] h-[100px] bg-red-500 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  ></div>
                  <div
                    class="w-[100px] h-[100px] bg-red-500 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  ></div>
                  <div
                    class="w-[100px] h-[100px] bg-red-500 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  ></div>
                  <div
                    class="w-[100px] h-[100px] bg-red-500 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  ></div>
                </div>
              </div>

              <div
                class="w-[50%] bg-indigo-500 flex justify-center items-center py-2 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <h1>Exporter en PDF</h1>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {
  ref,
  onMounted,
  watch,
  computed,
  watchEffect,
  onBeforeUnmount,
} from "vue";
import { useShow } from "@/stores/show";
import { useMaintenanceStore } from "@/stores/maintenanceStore";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";
import { useUrl } from "@/stores/url";
import CardNoData from "@/components/containtes/cards/CardNoData.vue";
import Pagination from "@/components/containtes/useComposantes/Pagination.vue";
import ListItem from "./useComposantes/ListItem.vue";
const show = useShow();
const maintenanceStore = useMaintenanceStore();
const useParc = parcStore();
const batterie = useBatterie();
const URL = useUrl().url;
const search = ref("");
const batteries = ref([]);
const maintenanceArray = ref([]);
const isDropdownOpen = ref(false);

const voirMaintenance = ref(false);
const voirMaintenanceData = ref();

const dropdownDiv = ref(null);


function doingMaintenance(data) {
  show.showDoingMaintenance = true
  show.showDoingMaintenanceData = data
  console.log('faire' , data);
}





function Afaire() {
  show.setShowOptionCal("recents");
  voirMaintenance.value = false;
  toggleDropdownAll();
}

function fait() {
  show.setShowOptionCal("historique");
  voirMaintenance.value = false;
  toggleDropdownAll();
}
const showNoDo = ref(false)
const showDo = ref(false)
function voir(data , option) {
  console.log("voir data", data);
  voirMaintenance.value = true;
  voirMaintenanceData.value = data;
  toggleDropdownAll();
  showNoDo.value = false
  showDo.value = false

  if ('afaire' === option) {
    showNoDo.value = true
  }else{
    showDo.value = true
  }
}

function retour() {
  voirMaintenance.value = false;
  voirMaintenanceData.value = null;
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleDropdownAll = () => {
  isDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownDiv.value ) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

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

const itemsPerPageRecent = 10; // Nombre d'éléments par page
const currentPageRecent = ref(1); // Page actuelle

const itemsPerPageHistory = 10; // Nombre d'éléments par page
const currentPageHistory = ref(1); // Page actuelle

const filterRecent = computed(() => {
  return maintenanceStore.maintenances.filter(
    (maintenance) => maintenance.maintenance.complete == 0 
  );
});

const paginatedItemsRecent = computed(() => {
  const start = (currentPageRecent.value - 1) * itemsPerPageRecent;
  const end = start + itemsPerPageRecent;
  return filterRecent.value.slice(start, end);
});

const filteredItemsRecent = computed(() => {
  return paginatedItemsRecent.value
    .filter((item) =>
      item.maintenance.details
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
    .sort((a, b) => b.id - a.id);
});

const totalPagesRecent = computed(() => {
  return Math.ceil(filterRecent.value.length / itemsPerPageRecent);
});

const filterHistory = computed(() => {
  return maintenanceStore.maintenances.filter(
    (maintenance) => maintenance.maintenance.complete == 1
  );
});

const paginatedItemsHistory = computed(() => {
  const start = (currentPageHistory.value - 1) * itemsPerPageHistory;
  const end = start + itemsPerPageHistory;
  return filterHistory.value.slice(start, end);
});

const filteredItemsHistory = computed(() => {
  return paginatedItemsHistory.value
    .filter((item) =>
      item.maintenance.details
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
    .sort((a, b) => b.id - a.id);
});

const totalPagesHistory = computed(() => {
  return Math.ceil(filterHistory.value.length / itemsPerPageHistory);
});

watchEffect(() => {
  console.log("Maintenances:", maintenanceStore.maintenances);
  console.log("pi Recent non", totalPagesRecent.value);
});

const fetchMaintenances = async (batterieId) => {
  try {
    const response = await axios.get(
      `${URL}/api/maintenances/batterie/${batterieId}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

function checked(item) {
  let data = {
    details: item.details,
    batterie_id: item.batterie.id,
    marque: "oui",
  };
  maintenanceStore.updateMaintenance(item.id, data);
}

function modifier(item , option) {
  maintenanceStore.ismodifierMaintenance = false;
  show.showModifierMaintenanceAFaire = false
  maintenanceStore.detailsM = item.details;
  maintenanceStore.batterie_idM = item.batterie_id;
  maintenanceStore.idMataitenanceM = item.id;
  if ('afaire' === option) {
    show.showModifierMaintenanceAFaire = true
  }else{
    maintenanceStore.ismodifierMaintenance = true;
  }
}

function supprimer(item) {
  show.showDeleteMaintenance = true;
  show.showDeleteMaintenanceData = item;
}

onMounted(async () => {
  try {
    const parcid = useParc.parcSuperviser.id;
    await batterie.getBatteriesByParcId(parcid);
    batteries.value = batterie.allBatteryData;
    const maintenancePromises = batteries.value.map((batterie) =>
      fetchMaintenances(batterie.id)
    );
    const maintenanceResults = await Promise.all(maintenancePromises);
    maintenanceArray.value = maintenanceResults.flat();
    maintenanceStore.maintenances = maintenanceArray.value;
  } catch (error) {
    console.error(error);
  } finally {
    show.showSpinner = false;
  }
});
</script> -->

<template>
  <div class="w-full h-full shadow-sm rounded-sm px-4 py-2 bg-[#f6f8fa]">
    <div class="titre" @click="toggleDropdownAll">
      <h3>Calendrier de maintenance</h3>
      <div class="search">
        <input
          type="search"
          v-model="search"
          placeholder="Recherche"
          class="searchInput focus:outline-none"
        />
        <i class="pi pi-search" style="font-size: 18px; color: #2d4051"></i>
      </div>
      <div
        class="btn shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        @click="show.showAddMaintenanceFunc()"
      >
        <h4>Ajouter</h4>
      </div>
    </div>
    <div class="contenu">
      <template v-if="!voirMaintenance">
        <div class="option">
          <h4
            @click="Afaire()"
            :class="[
              show.showRecents ? 'select' : '',
              'transition-transform',
              'duration-300',
              'hover:scale-105',
              'hover:shadow-xl',
              'cursor-pointer w-[45%]',
            ]"
          >
            À faire
          </h4>
          <h4
            @click="fait()"
            :class="[
              show.showHistoriqueCale ? 'select' : '',
              'transition-transform',
              'duration-300',
              'hover:scale-105',
              'hover:shadow-xl',
              'cursor-pointer w-[45%]',
            ]"
          >
            Fait
          </h4>
        </div>

        <div class="h-[52vh]" v-if="show.showRecents">
          <div v-if="filteredItemsRecent.length !== 0">
            <div class="h-[350px] overflow-y-auto">
              <div class="overflow-x-auto">
                <table
                  @click="toggleDropdownAll"
                  class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm"
                >
                  <tbody
                    class="divide-y divide-gray-200"
                    @click="toggleDropdownAll"
                  >
                    <tr
                      v-for="(maintenance, index) in filteredItemsRecent"
                      :key="maintenance.id"
                    >
                      <td
                        class="px-4 py-2 font-medium whitespace-nowrap text-gray-900   w-[22%]"
                      >
                        {{
                          maintenance.maintenance.batterie?.nom ||
                          "Batterie inconnue"
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700    w-[22%]"
                      >
                        Tache
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700   w-[22%]"
                      >
                        {{
                          maintenance.maintenance.details ||
                          "Détails indisponibles"
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700    w-[22%]"
                      >
                        {{
                          formatDateTime(
                            maintenance.maintenance.created_at || new Date()
                          )
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap flex justify-center items-center"
                      >
                        <div>
                          <div class="icon orange" @click.stop>
                            <button
                              @click.stop="toggleDropdown(index)"
                              class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                            >
                              <span class="sr-only">Menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="size-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          <div
                            v-if="isDropdownOpen[index]"
                            class="absolute mt-2 end-20 rounded-md border border-gray-100 bg-white shadow-lg z-100"
                            @click.stop
                          >
                            <ListItem
                              iconClass="pi pi-eye"
                              label="Voir"
                              :action="() => voir(maintenance , 'afaire')"
                            />
                            <ListItem
                              iconClass="pi pi-pen-to-square"
                              label="Modifier"
                              :action="() => modifier(maintenance , 'afaire')"
                              bgColor="#2196f3"
                            />
                            <ListItem
                              iconClass="pi pi-trash"
                              label="Supprimer"
                              :action="() => supprimer(maintenance)"
                              bgColor="#f44336"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination
              :currentPageRead.sync="currentPageRecent"
              :totalPagesRead="totalPagesRecent"
              @update:currentPageRead="currentPageRecent = $event"
              @click="toggleDropdownAll"
            />
          </div>

          <div v-else class="flex justify-center items-center">
            <CardNoData message="Aucune maintenance trouvée" />
          </div>
        </div>

        <div class="h-[52vh]" v-if="show.showHistoriqueCale">
          <div class="h-[350px] overflow-scroll">
            <table
                  @click="toggleDropdownAll"
                  class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm"
                >
                  <tbody
                    class="divide-y divide-gray-200"
                    @click="toggleDropdownAll"
                  >
                    <tr
                      v-for="(maintenance, index) in filteredItemsHistory"
                      :key="maintenance.id"
                    >
                      <td
                        class="px-4 py-2 font-medium whitespace-nowrap text-gray-900   w-[22%]"
                      >
                        {{
                          maintenance.maintenance.batterie?.nom ||
                          "Batterie inconnue"
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700    w-[22%]"
                      >
                        Tache
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700   w-[22%]"
                      >
                        {{
                          maintenance.maintenance.details ||
                          "Détails indisponibles"
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap text-gray-700    w-[22%]"
                      >
                        {{
                          formatDateTime(
                            maintenance.maintenance.created_at || new Date()
                          )
                        }}
                      </td>
                      <td
                        class="px-4 py-2 whitespace-nowrap flex justify-center items-center"
                      >
                        <div>
                          <div class="icon orange" @click.stop>
                            <button
                              @click.stop="toggleDropdown(index)"
                              class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                            >
                              <span class="sr-only">Menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="size-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          <div
                            v-if="isDropdownOpen[index]"
                            class="absolute mt-2 end-20 rounded-md border border-gray-100 bg-white shadow-lg z-100"
                            @click.stop
                          >
                            <ListItem
                              iconClass="pi pi-eye"
                              label="Voir"
                              :action="() => voir(maintenance)"
                            />
                            <ListItem
                              iconClass="pi pi-pen-to-square"
                              label="Modifier"
                              :action="() => modifier(maintenance)"
                              bgColor="#2196f3"
                            />
                            <ListItem
                              iconClass="pi pi-trash"
                              label="Supprimer"
                              :action="() => supprimer(maintenance)"
                              bgColor="#f44336"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
          </div>
          <Pagination
            :currentPageRead.sync="currentPageHistory"
            :totalPagesRead="totalPagesHistory"
            @update:currentPageRead="currentPageHistory = $event"
          />

          <div v-if="filteredItemsHistory.length == 0">
            <CardNoData message="Aucune maintenance trouvée" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="bg-white p-2 rounded-lg shadow-lg w-full h-[440px] " v-if="showNoDo">
          <div class="flex items-center justify-between">
            <div class="flex items-center mb-2">
              <div
                class="w-[40px] h-[40px] flex justify-center items-center"
                @click="retour()"
              >
                <a
                  class="inline-block rounded-full border border-indigo-500 bg-indigo-500 p-1 text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                  href="#"
                >
                  <svg
                    class="h-4 w-4 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div class="block text-gray-700 font-bold mb-2 mr-2 text-sm">
              Frequence : {{voirMaintenanceData.maintenance.frequence}}
            </div>
          </div>
          <div class="flex justify-between w-full px-4 text-sm">
            <div class="w-[45%]">
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Date : {{voirMaintenanceData.maintenance.date_execution}}</div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Batterie :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{voirMaintenanceData.batterie.nom}}
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">
                  Type d'Intervention :
                </div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{voirMaintenanceData.maintenance.type_intervention}}
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Tâche :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                {{voirMaintenanceData.maintenance.tache}}
                </div>
              </div>
            </div>
            <div class="w-[45%] flex flex-col justify-center items-center">
              <div class="mb-4 w-full">
                <div class="block text-gray-700 font-bold mb-2">
                  Description
                </div>
                <div
                  class="shadow appearance-none border rounded w-full h-[100px] py-2 px-3 text-gray-700 leading-tight"
                >
                  <p>  {{voirMaintenanceData.maintenance.details}}</p>
                </div>
              </div>
              <div @click="doingMaintenance(voirMaintenanceData)"
                class="w-[50%] bg-indigo-500 flex justify-center items-center py-2 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <h1>Faire</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white p-2 rounded-lg shadow-lg w-full h-[440px] " v-if="showDo">
          <div class="flex items-center justify-between">
            <div class="flex items-center mb-2">
              <div
                class="w-[40px] h-[40px] flex justify-center items-center"
                @click="retour()"
              >
                <a
                  class="inline-block rounded-full border border-indigo-500 bg-indigo-500 p-1 text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
                  href="#"
                >
                  <svg
                    class="h-4 w-4 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div class="block text-gray-700 font-bold mb-2 mr-2 text-sm">
              Frequence : Hebdomadaire
            </div>
          </div>
          <div class="flex justify-between w-full px-4 text-sm">
            <div class="w-[45%]">
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Date d'execution :</div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">
                  Nom du Technicien :
                </div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  .....................
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Batterie :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  Préventive / Corrective
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">
                  Type d'Intervention :
                </div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  Préventive / Corrective
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Tâche :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  (Sélectionner la tâche réalisée)
                </div>
              </div>
              <div class="mb-2">
                <div class="block text-gray-700 font-bold">Description :</div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  <p>Nettoyage des bornes</p>
                  <p>Remplacement des câbles</p>
                  <p>Vérification des fixations</p>
                </div>
              </div>
            </div>
            <div class="w-[45%] flex flex-col justify-center items-center">
              <div class="mb-4 w-full">
                <div class="block text-gray-700 font-bold mb-2">
                  Travaux Réalisés :
                </div>
                <div
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                >
                  <p>Nettoyage des bornes</p>
                  <p>Remplacement des câbles</p>
                  <p>Vérification des fixations</p>
                  <p>Autre : .....................</p>
                </div>
              </div>
              <div class="mb-4 w-full">
                <div class="block text-gray-700 font-bold mb-2">Images :</div>
                <div
                  class="shadow appearance-none border rounded w-full p-1 text-gray-700 leading-tight flex"
                >
                  <div @click="show.showImageMaintenance = !show.showImageMaintenance"
                    class="w-[100px] h-[100px] bg-red-500 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  ></div>
                  <div
                    class="w-[100px] h-[100px] bg-red-500 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  ></div>
                  <div
                    class="w-[100px] h-[100px] bg-red-500 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  ></div>
                  <div
                    class="w-[100px] h-[100px] bg-red-500 m-1 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  ></div>
                </div>
              </div>
              <div
                class="w-[50%] bg-indigo-500 flex justify-center items-center py-2 text-white font-bold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <h1>Exporter en PDF</h1>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {
  ref,
  onMounted,
  watch,
  computed,
  watchEffect,
  onBeforeUnmount,
} from "vue";
import { useShow } from "@/stores/show";
import { useMaintenanceStore } from "@/stores/maintenanceStore";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";
import { useUrl } from "@/stores/url";
import CardNoData from "@/components/containtes/cards/CardNoData.vue";
import Pagination from "@/components/containtes/useComposantes/Pagination.vue";
import ListItem from "./useComposantes/ListItem.vue";
const show = useShow();
const maintenanceStore = useMaintenanceStore();
const useParc = parcStore();
const batterie = useBatterie();
const URL = useUrl().url;
const search = ref("");
const batteries = ref([]);
const maintenanceArray = ref([]);
const isDropdownOpen = ref([]);

const voirMaintenance = ref(false);
const voirMaintenanceData = ref();

const dropdownDiv = ref(null);

function doingMaintenance(data) {
  show.showDoingMaintenance = true
  show.showDoingMaintenanceData = data
  console.log('faire' , data);
}

function Afaire() {
  show.setShowOptionCal("recents");
  voirMaintenance.value = false;
  toggleDropdownAll();
}

function fait() {
  show.setShowOptionCal("historique");
  voirMaintenance.value = false;
  toggleDropdownAll();
}
const showNoDo = ref(false)
const showDo = ref(false)
function voir(data , option) {
  console.log("voir data", data);
  voirMaintenance.value = true;
  voirMaintenanceData.value = data;
  toggleDropdownAll();
  showNoDo.value = false
  showDo.value = false

  if ('afaire' === option) {
    showNoDo.value = true
  }else{
    showDo.value = true
  }
}

function retour() {
  voirMaintenance.value = false;
  voirMaintenanceData.value = null;
}

const toggleDropdown = (index) => {
  isDropdownOpen.value[index] = !isDropdownOpen.value[index];
};

const toggleDropdownAll = () => {
  isDropdownOpen.value = isDropdownOpen.value.map(() => false);
};

const handleClickOutside = (event) => {
  if (dropdownDiv.value && !dropdownDiv.value.contains(event.target)) {
    toggleDropdownAll();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

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

const itemsPerPageRecent = 10; // Nombre d'éléments par page
const currentPageRecent = ref(1); // Page actuelle

const itemsPerPageHistory = 10; // Nombre d'éléments par page
const currentPageHistory = ref(1); // Page actuelle

const filterRecent = computed(() => {
  return maintenanceStore.maintenances.filter(
    (maintenance) => maintenance.maintenance.complete == 0
  );
});

const paginatedItemsRecent = computed(() => {
  const start = (currentPageRecent.value - 1) * itemsPerPageRecent;
  const end = start + itemsPerPageRecent;
  return filterRecent.value.slice(start, end);
});

const filteredItemsRecent = computed(() => {
  return paginatedItemsRecent.value
    .filter((item) =>
      item.maintenance.details
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
    .sort((a, b) => b.id - a.id);
});

const totalPagesRecent = computed(() => {
  return Math.ceil(filterRecent.value.length / itemsPerPageRecent);
});

const filterHistory = computed(() => {
  return maintenanceStore.maintenances.filter(
    (maintenance) => maintenance.maintenance.complete == 1
  );
});

const paginatedItemsHistory = computed(() => {
  const start = (currentPageHistory.value - 1) * itemsPerPageHistory;
  const end = start + itemsPerPageHistory;
  return filterHistory.value.slice(start, end);
});

const filteredItemsHistory = computed(() => {
  return paginatedItemsHistory.value
    .filter((item) =>
      item.maintenance.details
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
    .sort((a, b) => b.id - a.id);
});

const totalPagesHistory = computed(() => {
  return Math.ceil(filterHistory.value.length / itemsPerPageHistory);
});

watchEffect(() => {
  console.log("Maintenances:", maintenanceStore.maintenances);
  console.log("pi Recent non", totalPagesRecent.value);
});

const fetchMaintenances = async (batterieId) => {
  try {
    const response = await axios.get(
      `${URL}/api/maintenances/batterie/${batterieId}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

function checked(item) {
  let data = {
    details: item.details,
    batterie_id: item.batterie.id,
    marque: "oui",
  };
  maintenanceStore.updateMaintenance(item.id, data);
}

function modifier(item , option) {
  maintenanceStore.ismodifierMaintenance = false;
  show.showModifierMaintenanceAFaire = false
  maintenanceStore.detailsM = item.details;
  maintenanceStore.batterie_idM = item.batterie_id;
  maintenanceStore.idMataitenanceM = item.id;
  maintenanceStore.maintenanceDataModifier = item


  console.log('modifier', item);

  if ('afaire' === option) {
    show.showModifierMaintenanceAFaire = true
  }else{
    maintenanceStore.ismodifierMaintenance = true;
  }
}

function supprimer(item) {
  show.showDeleteMaintenance = true;
  show.showDeleteMaintenanceData = item;
}

onMounted(async () => {
  try {
    const parcid = useParc.parcSuperviser.id;
    await batterie.getBatteriesByParcId(parcid);
    batteries.value = batterie.allBatteryData;
    const maintenancePromises = batteries.value.map((batterie) =>
      fetchMaintenances(batterie.id)
    );
    const maintenanceResults = await Promise.all(maintenancePromises);
    maintenanceArray.value = maintenanceResults.flat();
    maintenanceStore.maintenances = maintenanceArray.value;
    isDropdownOpen.value = new Array(maintenanceArray.value.length).fill(false);
  } catch (error) {
    console.error(error);
  } finally {
    show.showSpinner = false;
  }
});
</script>

<style scoped>
.zindex {
  z-index: 1000 !important;
}
.titre h3 {
  font-weight: 600;
  width: 60%;
  color: #2d4051;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
}
.titre {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #d3d3d3;
  align-items: center;
}
.search {
  width: 30%;
  justify-content: space-around;
  display: flex;
  align-items: center;
}
.recent {
  height: 52vh;
}

.historique {
  height: 52vh;
  overflow-y: scroll;
}

.searchInput {
  width: 86%;
  height: 30px;
  border: 2px solid #d5d6d5;
  padding: 5px;
  border-radius: 5px;
}
.btn {
  background-color: #4caf50;
  padding: 5px 10px;
  border-radius: 5px;
}
.btn h4 {
  font-weight: 600;
  color: #f6f8fa;
}

.icon {
  background-color: #e1e1e092;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.blue {
  background-color: #247bc8d2;
}
.orange {
  background-color: #fb7b58d8;
}
.red {
  background-color: rgb(255, 93, 93);
}

.option {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 20%;
}

.option h4 {
  font-weight: 600;
  border-bottom: 2px solid rgb(255, 255, 255);
  padding: 5px 10px;
  color: #2d4051;
}

.select {
  color: #328ca8 !important;
  border-bottom: 2px solid #328ca8 !important;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0px;
  border-bottom: 1px solid #d3d3d3;
}
.date h5 {
  font-weight: 500;
  font-size: 12px;
}
.action {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  width: 15%;
}
.con {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
  margin: auto 0px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.con h1 {
  font-size: 16px;
  font-weight: 600;
  color: #2d4051;
}
.check {
  background-color: #feffff;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
}
.text {
  display: flex;
  align-items: center;
  width: 60%;
}
.desc {
  font-size: 12px;
}
.detail {
  display: block;
  font-size: 14px;
  padding: 10px;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
}
.parc {
  font-size: 12px;
  color: #2d4051;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
}
.bat {
  color: #5f7485;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
}
.text h4 {
  font-weight: 500;
  padding-left: 10px;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  color: #44525e;
}
</style>
