<template>
  <div class="container">
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

      

      <div class="recent" v-if="show.showRecents">
        <div v-for="item in filteredMaintenances" :key="item.id">
          <div
            class="item"
            v-if="item.maintenance.marque === '0' ? true : false"
          >
            <!-- {{ item }} -->

            <div class="check">
              <label>
                <input
                  @click="checked(item)"
                  type="checkbox"
                  :checked="item.maintenance.marque === '0' ? false : true"
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
              <h4>
                {{ item.maintenance.details }}
                {{ item.maintenance.batterie.nom }}
                {{ useParc.parcSuperviser.nom_parc }}
              </h4>
            </div>
            <div class="date">
              <h5>{{ formatDateTime(item.maintenance.created_at) }}</h5>
            </div>
            <div class="action">
              <div class="icon orange" @click="modifier(item)">
                <i
                  class="pi pi-pen-to-square"
                  style="font-size: 12px; color: #fff"
                ></i>
              </div>
              <div class="icon red" @click="supprimer(item)">
                <i class="pi pi-trash" style="font-size: 12px; color: #fff"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div class="historique" v-if="show.showHistoriqueCale">
        <div v-for="item in filteredMaintenances" :key="item.id">
          <div
            class="item"
            v-if="item.maintenance.marque === '0' ? false : true"
          >
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
              <h4>
                {{ item.maintenance.details }}
                {{ item.maintenance.batterie.nom }}
                {{ useParc.parcSuperviser.nom_parc }}
              </h4>
            </div>
            <div class="date">
              <h5>{{ formatDateTime(item.maintenance.created_at) }}</h5>
            </div>
            <div class="action"></div>
          </div>
        </div>
      </div>





    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, watch,computed } from "vue";
import { useShow } from "@/stores/show";
import { useMaintenanceStore } from "@/stores/maintenanceStore";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";
import { useUrl } from "@/stores/url";
const show = useShow();
const maintenanceStore = useMaintenanceStore();
const useParc = parcStore();
const batterie = useBatterie();
const URL = useUrl().url;
const search = ref("");
const details = ref("");
const batterie_id = ref("");
const marque = ref("");
const batteries = ref([]);
const maintenanceArray = ref([]);
// Ajouté pour stocker les maintenances temporairement

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
  ]; // Récupérer le jour, le mois et l'année
  const jour = date.getDate();
  const moisNom = mois[date.getMonth()];
  const annee = date.getFullYear();

  const heures = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Construire la chaîne de date et heure formatée
  return `${jour} ${moisNom} ${annee} à ${heures}h${minutes}`;
}

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

// Propriété calculée pour filtrer les maintenances
const filteredMaintenances = computed(() => {
  return maintenanceStore.maintenances.filter((item) => {
    return item.maintenance.details
      .toLowerCase()
      .includes(search.value.toLowerCase());
  });
});

function checked(item) {
  let data = {
    details: item.maintenance.details,
    batterie_id: item.maintenance.batterie.id,
    marque: "oui",
  };
  console.log("data", data);
  maintenanceStore.updateMaintenance(item.maintenance.id, data);
}

function modifier(item) {
  console.log('item modif' , item.maintenance.batterie_id);
  maintenanceStore.ismodifierMaintenance = true;

  maintenanceStore.detailsM = item.maintenance.details;
  maintenanceStore.batterie_idM = item.maintenance.batterie_id;
maintenanceStore.idMataitenanceM = item.maintenance.id
  console.log("maintenanceStore.details", maintenanceStore.details);
  console.log("maintenanceStore.batterie_id", maintenanceStore.batterie_id);
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
    console.log("Maintenances:", maintenanceStore.maintenances);
  } catch (error) {
    console.error(error);
  } finally {
    show.showSpinner = false;
  }
});
const addMaintenance = () => {
  const maintenanceData = {
    details: details.value,
    batterie_id: batterie_id.value,
    marque: marque.value,
  };
  maintenanceStore.createMaintenance(maintenanceData);
};
</script>

<style scoped>
.container {
  background-color: #f6f8fa;
  width: 100%;
  height: 76vh;
  box-shadow: 0px 0px 5px rgb(189, 189, 189);
  border-radius: 5px;
  padding: 20px;
}
.titre h3 {
  font-weight: 600;
  width: 60%;
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
}
.action {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  width: 15%;
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
.text h4 {
  font-weight: 500;
  padding-left: 10px;
}
</style>
