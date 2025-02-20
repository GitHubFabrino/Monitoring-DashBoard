<template>
  <div class="w-full h-full shadow-sm rounded-sm p-10 bg-[#f6f8fa]">
    <div class="titre">
      <h3>Calendrier de maintenance</h3>

      <div class="search">
        <input
          type="search"
          v-model="search"
          placeholder="Recherche"
          class="searchInput"
        />
        <i class="pi pi-search" style="font-size: 18px; color: #2d4051"></i>
      </div>
      <div class="btn" @click="show.showAddMaintenanceFunc()">
        <h4>Ajouter</h4>
      </div>
    </div>
    <div class="contenu">
      <div class="option">
        <h4
          @click="show.setShowOptionCal('recents')"
          :class="{
            select: show.showRecents == true,
          }"
        >
          Récents
        </h4>
        <h4
          @click="show.setShowOptionCal('historique')"
          :class="{
            select: show.showHistoriqueCale == true,
          }"
        >
          Historique
        </h4>
      </div>

      <div class="h-[52vh]" v-if="show.showRecents">
        <div class="h-[300px] overflow-scroll" v-if="filteredItemsRecent.length !== 0">
          <div v-for="maintenance in filteredItemsRecent" :key="maintenance.id">
            <div class="item">
              <div class="check">
                <label>
                  <input
                    @click="checked(maintenance)"
                    type="checkbox"
                    :checked="maintenance.maintenance.marque === 'oui'"
                  />
                </label>
              </div>

              <div class="text">
                <div class="icon">
                  <i
                    class="pi pi-calendar"
                    style="font-size: 12px; color: #2d4051"
                  ></i>
                </div>
                <div class="desc">
                  <h4 class="detail">
                    {{
                      maintenance.maintenance.details || "Détails indisponibles"
                    }}
                  </h4>
                  <h4 class="bat">
                    {{
                      maintenance.maintenance.batterie?.nom ||
                      "Batterie inconnue"
                    }}
                  </h4>
                  <h4 class="parc">
                    {{
                      useParc.parcSuperviser?.nom_parc || "Parc non spécifié"
                    }}
                  </h4>
                </div>
              </div>

              <div class="date">
                <h5>
                  {{
                    formatDateTime(
                      maintenance.maintenance.created_at || new Date()
                    )
                  }}
                </h5>
              </div>

              <div class="action">
                <div class="icon orange" @click="modifier(maintenance)">
                  <i
                    class="pi pi-pen-to-square"
                    style="font-size: 12px; color: #fff"
                  ></i>
                </div>
                <div class="icon red" @click="supprimer(maintenance)">
                  <i
                    class="pi pi-trash"
                    style="font-size: 12px; color: #fff"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <Pagination
            :currentPageRead.sync="currentPageRecent"
            :totalPagesRead="totalPagesRecent"
            @update:currentPageRead="currentPageRecent = $event"
          />
        </div>

        <div v-else class="flex justify-center items-center">
          <CardNoData message="Aucune maintenance trouvée" />
        </div>
      </div>

      <div class="h-[52vh]" v-if="show.showHistoriqueCale">
        <div class="h-[300px] overflow-scroll">
          <div v-for="item in filteredItemsHistory" :key="item.id">
            <div class="item">
              <div class="check">
                <i
                  class="pi pi-check"
                  style="font-size: 18px; color: #3af130"
                ></i>
              </div>

              <div class="text">
                <div class="icon">
                  <i
                    class="pi pi-calendar"
                    style="font-size: 12px; color: #2d4051"
                  ></i>
                </div>
                <div class="desc">
                  <h4 class="detail">
                    {{ item.maintenance.details || "Détails indisponibles" }}
                  </h4>
                  <h4 class="bat">
                    {{ item.maintenance.batterie?.nom || "Batterie inconnue" }}
                  </h4>
                  <h4 class="parc">
                    {{
                      useParc.parcSuperviser?.nom_parc || "Parc non spécifié"
                    }}
                  </h4>
                </div>
              </div>

              <div class="date">
                <h5>{{ formatDateTime(item.maintenance.created_at) }}</h5>
              </div>
              <div class="action"></div>
            </div>
          </div>
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
import CardNoData from "@/components/containtes/cards/CardNoData.vue";
import Pagination from "@/components/containtes/useComposantes/Pagination.vue";
const show = useShow();
const maintenanceStore = useMaintenanceStore();
const useParc = parcStore();
const batterie = useBatterie();
const URL = useUrl().url;
const search = ref("");
const batteries = ref([]);
const maintenanceArray = ref([]);

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
    (maintenance) => maintenance.maintenance.marque !== "oui"
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
    (maintenance) => maintenance.maintenance.marque !== "oui"
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

function modifier(item) {
  maintenanceStore.ismodifierMaintenance = true;
  maintenanceStore.detailsM = item.details;
  maintenanceStore.batterie_idM = item.batterie_id;
  maintenanceStore.idMataitenanceM = item.id;
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
</script>

<style scoped>
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
  /* background-color: #4caf50; */
  width: 30%;
  justify-content: space-around;
  display: flex;
  align-items: center;
}
.recent {
  /* background-color: rebeccapurple; */
  height: 52vh;
}

.historique {
  /* background-color: rebeccapurple; */
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
  /* background-color: #4caf50; */
  padding: 10px;
  width: 23%;
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
  /* background-color: #4caf50; */
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
  /* background-color: #f5572c; */
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
