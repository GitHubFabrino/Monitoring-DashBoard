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
        <div v-for="maintenance in filteredMaintenances" :key="maintenance.id">
          <div class="item" v-if="maintenance.marque !== 'oui'">
            <div class="check">
              <label>
                <input
                  @click="checked(maintenance)"
                  type="checkbox"
                  :checked="maintenance.marque === 'oui'"
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
                  {{ maintenance.details || "Détails indisponibles" }}
                </h4>
                <h4 class="bat">
                  {{ maintenance.batterie?.nom || "Batterie inconnue" }}
                </h4>
                <h4 class="parc">
                  {{ useParc.parcSuperviser?.nom_parc || "Parc non spécifié" }}
                </h4>
              </div>
            </div>

            <div class="date">
              <h5>
                {{ formatDateTime(maintenance.created_at || new Date()) }}
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
                <i class="pi pi-trash" style="font-size: 12px; color: #fff"></i>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredMaintenances.length == 0">
          <div class="con">
            <div style="width: 100px">
              <svg
                viewBox="-9.1 -9.1 109.20 109.20"
                enable-background="new 0 0 91 91"
                id="Layer_1"
                version="1.1"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  stroke-width="0"
                  transform="translate(0,0), scale(1)"
                ></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.546"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path
                        d="M38.841,55.666l0.682-0.676l-0.02-0.016c-0.881-0.891,4.984-6.855,4.984-6.855l-8.119-8.118L8.663,66.904 c-1.973,1.977-2.92,4.705-2.658,7.686c0.242,2.793,1.533,5.49,3.813,7.771c2.43,2.424,5.553,3.66,8.533,3.66 c2.521,0,4.938-0.889,6.746-2.691l20.258-20.26l-5.111-5.17C39.604,57.252,39.151,56.488,38.841,55.666"
                        fill="#45596B"
                      ></path>
                      <path
                        d="M87.675,16.767l-1.621-3.891L75.616,23.317c-1.777,1.777-3.336,2.678-4.635,2.678 c-0.992,0-2.006-0.537-3.146-1.674l-0.188-0.184c-1.701-1.701-3.016-3.695,1.037-7.75L79.13,5.942l-3.893-1.621 C67.31,1.019,59.005-1.073,51.952,5.985l-6.457,6.451c-6.553,6.561-8.811,14.01-6.699,21.397l6.51,6.646l5.088-5.088 c0,0,3.248,1.688,5.568,3.182l13.875,14.061c3.398-1.033,6.664-3.059,9.732-6.129l6.441-6.452 C93.073,33.001,90.985,24.692,87.675,16.767"
                        fill="#45596B"
                      ></path>
                      <path
                        d="M80.097,69.682L54.472,43.714c-0.84-0.855-1.898-1.527-3.148-1.996l-1.51-0.568l-4.578,4.58L21.023,21.518 l2.235-2.237c0.602-0.6,0.9-1.439,0.813-2.283c-0.086-0.846-0.547-1.607-1.258-2.074L9.72,6.321 C8.601,5.587,7.118,5.739,6.169,6.687l-4.482,4.49c-0.945,0.947-1.096,2.428-0.361,3.545l8.6,13.094 c0.465,0.711,1.227,1.174,2.072,1.26c0.096,0.01,0.191,0.014,0.287,0.014c0.746,0,1.465-0.295,1.998-0.826l2.02-2.021 l24.211,24.211l-4.588,4.59l0.572,1.512c0.459,1.207,1.119,2.25,1.965,3.105l25.645,25.984c1.688,1.688,4.006,2.617,6.527,2.617 h0.002c2.994,0,6.018-1.309,8.334-3.627l0.133-0.139c2.057-2.051,3.318-4.678,3.553-7.396 C82.907,74.219,81.993,71.582,80.097,69.682z M75.522,80.99l-0.137,0.145c-1.344,1.344-3.076,2.117-4.75,2.117 c-0.838,0-2.039-0.201-2.979-1.139L42.026,56.141c-0.02-0.02-0.039-0.039-0.059-0.059l8.893-8.895 c0.012,0.014,0.023,0.027,0.035,0.039L76.54,73.211c0.844,0.848,1.246,2.076,1.125,3.455C77.53,78.211,76.784,79.73,75.522,80.99z "
                        fill="#f99b80"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <h1>Aucune maintenance trouvée</h1>
          </div>
        </div>
      </div>

      <div class="historique" v-if="show.showHistoriqueCale">
        <div v-for="item in filteredMaintenances" :key="item.id">
          <div class="item" v-if="item.marque === 'oui'">
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
                  {{ item.details || "Détails indisponibles" }}
                </h4>
                <h4 class="bat">
                  {{ item.batterie?.nom || "Batterie inconnue" }}
                </h4>
                <h4 class="parc">
                  {{ useParc.parcSuperviser?.nom_parc || "Parc non spécifié" }}
                </h4>
              </div>
            </div>


            <div class="date">
              <h5>{{ formatDateTime(item.created_at) }}</h5>
            </div>
            <div class="action"></div>
          </div>
        </div>
        <div v-if="filteredMaintenances.length == 0">
          <div class="con">
            <div style="width: 100px">
              <svg
                viewBox="-9.1 -9.1 109.20 109.20"
                enable-background="new 0 0 91 91"
                id="Layer_1"
                version="1.1"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g
                  id="SVGRepo_bgCarrier"
                  stroke-width="0"
                  transform="translate(0,0), scale(1)"
                ></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.546"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path
                        d="M38.841,55.666l0.682-0.676l-0.02-0.016c-0.881-0.891,4.984-6.855,4.984-6.855l-8.119-8.118L8.663,66.904 c-1.973,1.977-2.92,4.705-2.658,7.686c0.242,2.793,1.533,5.49,3.813,7.771c2.43,2.424,5.553,3.66,8.533,3.66 c2.521,0,4.938-0.889,6.746-2.691l20.258-20.26l-5.111-5.17C39.604,57.252,39.151,56.488,38.841,55.666"
                        fill="#45596B"
                      ></path>
                      <path
                        d="M87.675,16.767l-1.621-3.891L75.616,23.317c-1.777,1.777-3.336,2.678-4.635,2.678 c-0.992,0-2.006-0.537-3.146-1.674l-0.188-0.184c-1.701-1.701-3.016-3.695,1.037-7.75L79.13,5.942l-3.893-1.621 C67.31,1.019,59.005-1.073,51.952,5.985l-6.457,6.451c-6.553,6.561-8.811,14.01-6.699,21.397l6.51,6.646l5.088-5.088 c0,0,3.248,1.688,5.568,3.182l13.875,14.061c3.398-1.033,6.664-3.059,9.732-6.129l6.441-6.452 C93.073,33.001,90.985,24.692,87.675,16.767"
                        fill="#45596B"
                      ></path>
                      <path
                        d="M80.097,69.682L54.472,43.714c-0.84-0.855-1.898-1.527-3.148-1.996l-1.51-0.568l-4.578,4.58L21.023,21.518 l2.235-2.237c0.602-0.6,0.9-1.439,0.813-2.283c-0.086-0.846-0.547-1.607-1.258-2.074L9.72,6.321 C8.601,5.587,7.118,5.739,6.169,6.687l-4.482,4.49c-0.945,0.947-1.096,2.428-0.361,3.545l8.6,13.094 c0.465,0.711,1.227,1.174,2.072,1.26c0.096,0.01,0.191,0.014,0.287,0.014c0.746,0,1.465-0.295,1.998-0.826l2.02-2.021 l24.211,24.211l-4.588,4.59l0.572,1.512c0.459,1.207,1.119,2.25,1.965,3.105l25.645,25.984c1.688,1.688,4.006,2.617,6.527,2.617 h0.002c2.994,0,6.018-1.309,8.334-3.627l0.133-0.139c2.057-2.051,3.318-4.678,3.553-7.396 C82.907,74.219,81.993,71.582,80.097,69.682z M75.522,80.99l-0.137,0.145c-1.344,1.344-3.076,2.117-4.75,2.117 c-0.838,0-2.039-0.201-2.979-1.139L42.026,56.141c-0.02-0.02-0.039-0.039-0.059-0.059l8.893-8.895 c0.012,0.014,0.023,0.027,0.035,0.039L76.54,73.211c0.844,0.848,1.246,2.076,1.125,3.455C77.53,78.211,76.784,79.73,75.522,80.99z "
                        fill="#f99b80"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <h1>Aucune maintenance trouvée</h1>
          </div>
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
  return maintenanceStore.maintenances
    .map((item) => {
      // Vérifiez si la clé `maintenance` est présente et extrayez-la si nécessaire
      return item.maintenance ? item.maintenance : item;
    })
    .filter((maintenance) => {
      // Vérifiez que `details` existe avant de filtrer
      return maintenance.details
        ?.toLowerCase()
        .includes(search.value.toLowerCase());
    })
    .sort((a, b) => b.id - a.id); // Trier par ID décroissant
});

watchEffect(() => {
  console.log("Maintenances:", maintenanceStore.maintenances);
});

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
  color: #2d4051;
  font-family: 'Nunito', sans-serif;
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
  overflow-y: scroll;
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
.detail{
display: block;
font-size: 14px;
padding: 10px;
font-family: 'Nunito', sans-serif;
  font-weight: 600;
}
.parc{
font-size: 12px;
color: #2d4051;
font-weight: 600;
font-family: 'Nunito', sans-serif;
  font-weight: 600;
}
.bat{
  color: #5f7485;
font-weight: 600;
font-family: 'Nunito', sans-serif;
  font-weight: 600;
}
.text h4 {
  font-weight: 500;
  padding-left: 10px;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  color: #44525e;
}
</style>
