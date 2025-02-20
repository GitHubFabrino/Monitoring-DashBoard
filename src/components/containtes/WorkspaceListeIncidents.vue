<template>
  <div class="w-full h-full shadow-sm rounded-sm p-10 bg-[#f6f8fa]">
    <div class="titre">
      <h3>Liste des incidents</h3>
      <div class="search">
        <input
          type="search"
          v-model="search"
          placeholder="Recherche"
          class="searchInput focus:outline-none"
        />
        <i class="pi pi-search" style="font-size: 18px; color: #2d4051"></i>
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
        <template v-if="filteredItemsNoRead.length > 0">
          <div class="h-[47vh] overflow-scroll">
            <div v-for="item in filteredItemsNoRead" :key="item.id">
              <div v-if="item.read === 0" class="item">
                <div
                  class="bg-[#feffff] w-10 h-10 flex justify-center items-center rounded-full"
                >
                  <label>
                    <input
                      @click="checked(item)"
                      type="checkbox"
                      :checked="item.read === 0 ? false : true"
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
                  <h4>{{ item.message }} {{ item.batterie.nom }}</h4>
                </div>
                <div class="date">
                  <h5>{{ formatDateTime(item.created_at) }}</h5>
                </div>
                <div class="action">
                  <div class="icon orange" @click="voir(item)">
                    <i
                      class="pi pi-eye"
                      style="font-size: 12px; color: #fff"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Pagination :currentPageRead.sync="currentPageNoRead" :totalPagesRead="totalPagesNoRead" @update:currentPageRead="currentPageNoRead = $event" />

        </template>
        <div v-else>
          <div class="w-full flex items-center justify-center h-[50vh]">
            <CardNoData message="Aucun incident répertorié pour le moment" />
          </div>
        </div>
      </div>

      <div class="historique" v-if="show.showHistoriqueCale">
        <template v-if="filteredItemsRead.length > 0">
          <div class="h-[47vh] overflow-scroll">
            <div v-for="item in filteredItemsRead" :key="item.id">
              <div class="item" v-if="item.read !== 0">
                <div
                  class="bg-[#feffff] w-10 h-10 flex justify-center items-center rounded-full"
                >
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
                  <h4>{{ item.message }} {{ item.batterie.nom }}</h4>
                </div>
                <div class="date">
                  <h5>{{ formatDateTime(item.created_at) }}</h5>
                </div>
                <div class="action"></div>
              </div>
            </div>
          </div>

          <Pagination :currentPageRead.sync="currentPageRead" :totalPagesRead="totalPagesRead" @update:currentPageRead="currentPageRead = $event" />
        </template>
        <div v-else>
          <div class="w-full flex items-center justify-center h-[50vh]">
            <CardNoData message="Aucun incident répertorié pour le moment" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { onMounted, ref, computed } from "vue";
import { useShow } from "@/stores/show";
import { useBatterie } from "@/stores/batterieStore";
import { parcStore } from "@/stores/parcStore";
import { useAlerteBatterieStore } from "@/stores/alerteBatterie";
import CardNoData from "@/components/containtes/cards/CardNoData.vue";
import Pagination from "@/components/containtes/useComposantes/Pagination.vue";

const show = useShow();
const batterie = useBatterie();
const useParc = parcStore();
const alerteBatterieStore = useAlerteBatterieStore();
const search = ref("");

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

const itemsPerPageRead = 10; // Nombre d'éléments par page
const currentPageRead = ref(1); // Page actuelle
const itemsPerPageNoRead = 10; // Nombre d'éléments par page
const currentPageNoRead = ref(1); // Page actuelle

const filterNoRead = computed(() => {
  return alerteBatterieStore.allAllerteDataByParc.filter(
    (alert) => alert.read == 0
  );
});

const filterRead = computed(() => {
  return alerteBatterieStore.allAllerteDataByParc.filter(
    (alert) => alert.read == 1
  );
});

const filteredItemsNoRead = computed(() => {
  return paginatedItemsNoRead.value.filter((item) =>
    item.message.toLowerCase().includes(search.value.toLowerCase())
  ).sort((a, b) => b.id - a.id);;
});

const paginatedItemsNoRead = computed(() => {
  const start = (currentPageNoRead.value - 1) * itemsPerPageNoRead;
  const end = start + itemsPerPageNoRead;
  return filterNoRead.value.slice(start, end);
});

const filteredItemsRead = computed(() => {
  return paginatedItemsRead.value.filter((item) =>
    item.message.toLowerCase().includes(search.value.toLowerCase())
  ).sort((a, b) => b.id - a.id);;
});

const paginatedItemsRead = computed(() => {
  const start = (currentPageRead.value - 1) * itemsPerPageRead;
  const end = start + itemsPerPageRead;
  return filterRead.value.slice(start, end);
});

const totalPagesNoRead = computed(() => {
  return Math.ceil(filterNoRead.value.length / itemsPerPageNoRead);
});

const totalPagesRead = computed(() => {
  return Math.ceil(filterRead.value.length / itemsPerPageRead);
});

// function nextPageNoRead() {
//   if (currentPageNoRead.value < totalPagesNoRead.value) {
//     currentPageNoRead.value++;
//   }
// }

// function prevPageNoRead() {
//   if (currentPageNoRead.value > 1) {
//     currentPageNoRead.value--;
//   }
// }

// function nextPageRead() {
//   if (currentPageRead.value < totalPagesRead.value) {
//     currentPageRead.value++;
//   }
// }

// function prevPageRead() {
//   if (currentPageRead.value > 1) {
//     currentPageRead.value--;
//   }
// }

function voir(item) {
  alerteBatterieStore.voirAlerteData = item;
  show.showVoirAlerteData = true;
  let data = {
    valeur_alerte: item.valeur_alerte,
    valeur_seuil: item.valeur_seuil,
    message: item.message,
    read: 1,
    type: item.type,
    graviter: item.graviter,
    contact_id: item.contact_id,
    batterie_id: item.batterie_id,
  };
  console.log("data", data);
  alerteBatterieStore.updateAlerte(item.id, data);
}

function checked(item) {
  console.log("itzm", item.id);

  let data = {
    valeur_alerte: item.valeur_alerte,
    valeur_seuil: item.valeur_seuil,
    message: item.message,
    read: 1,
    type: item.type,
    graviter: item.graviter,
    contact_id: item.contact_id,
    batterie_id: item.batterie_id,
  };
  console.log("data", data);
  alerteBatterieStore.updateAlerte(item.id, data);
}

onMounted(() => {
  try {
    let parcid = useParc.parcSuperviser.id;
    alerteBatterieStore.getAlerteByParcId(parcid);
    console.log("aaaaaa", paginatedItems.value[0]);
    console.log("read", filterRead.value);
    console.log("noread", filterNoRead.value);
  } catch (error) {}
});
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

.btnCreer {
  background-color: #fb7a58;
}
.btnCreer:hover {
  background-color: #f5572c;
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
  color: #2d4051;
  cursor: pointer;
}
.containerEmptyParc {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50vh;
}
.containerEmptyParc h2 {
  color: rgb(121, 125, 129) !important;
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

.recent {
  /* background-color: red; */
  height: 53vh;
  /* overflow-y: scroll; */
}
.historique {
  height: 53vh;
  overflow-y: scroll;
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

<!-- 
<template>
  <div class="bg-[#f6f8fa] w-full h-[76vh] shadow-[0px_0px_5px_rgb(189,189,189)] rounded-md p-5">
    <div class="titre">
      <h3>Liste des incidents</h3>
      <div class="search">
        <input
          type="search"
          v-model="search"
          placeholder="Recherche"
          class="searchInput focus:outline-none"
        />
        <i class="pi pi-search" style="font-size: 18px; color: #2d4051"></i>
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
        <template v-if="paginatedItems.length > 0">
          <div v-for="item in paginatedItems" :key="item.id">
            <div v-if="item.read === 0" class="item">
              <div class="bg-[#feffff] w-10 h-10 flex justify-center items-center rounded-full">
                <label>
                  <input
                    @click="checked(item)"
                    type="checkbox"
                    :checked="item.read === 0 ? false : true"
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
                <h4>{{ item.message }} {{ item.batterie.nom }}</h4>
              </div>
              <div class="date">
                <h5>{{ formatDateTime(item.created_at) }}</h5>
              </div>
              <div class="action">
                <div class="icon orange" @click="voir(item)">
                  <i class="pi pi-eye" style="font-size: 12px; color: #fff"></i>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div v-else>
          <div class="w-full flex items-center justify-center h-[50vh]">
            <CardNoData message="Aucun incident répertorié pour le moment"/>
          </div>
        </div>
      </div>

      <div class="historique" v-if="show.showHistoriqueCale">
        <template v-if="paginatedItems.length > 0">
          <div v-for="item in paginatedItems" :key="item.id">
            <div class="item" v-if="item.read !== 0">
              <div class="bg-[#feffff] w-10 h-10 flex justify-center items-center rounded-full">
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
                <h4>{{ item.message }} {{ item.batterie.nom }}</h4>
              </div>
              <div class="date">
                <h5>{{ formatDateTime(item.created_at) }}</h5>
              </div>
              <div class="action"></div>
            </div>
          </div>
        </template>
        <div v-else>
          <div class="w-full flex items-center justify-center h-[50vh]">
            <CardNoData message="Aucun incident répertorié pour le moment"/>
          </div>
        </div>
      </div>

      
      <div class="pagination flex justify-center items-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 mx-1 bg-gray-300 rounded">
          Précédent
        </button>
        <span class="mx-2">Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 mx-1 bg-gray-300 rounded">
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import "primeicons/primeicons.css";
import { onMounted, ref, computed } from "vue";
import { useShow } from "@/stores/show";
import { useBatterie } from "@/stores/batterieStore";
import { parcStore } from "@/stores/parcStore";
import { useAlerteBatterieStore } from "@/stores/alerteBatterie";
import CardNoData from "@/components/containtes/cards/CardNoData.vue";

const show = useShow();
const batterie = useBatterie();
const useParc = parcStore();
const alerteBatterieStore = useAlerteBatterieStore();
const search = ref("");
const itemsPerPage = 10; // Nombre d'éléments par page
const currentPage = ref(1); // Page actuelle

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

const filteredItems = computed(() => {
  return alerteBatterieStore.allAllerteDataByParc.filter((item) =>
    item.message.toLowerCase().includes(search.value.toLowerCase())
  );
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function voir(item) {
  alerteBatterieStore.voirAlerteData = item;
  show.showVoirAlerteData = true;
  let data = {
    valeur_alerte: item.valeur_alerte,
    valeur_seuil: item.valeur_seuil,
    message: item.message,
    read: 1,
    type: item.type,
    graviter: item.graviter,
    contact_id: item.contact_id,
    batterie_id: item.batterie_id,
  };
  console.log("data", data);
  alerteBatterieStore.updateAlerte(item.id, data);
}

function checked(item) {
  console.log("itzm", item.id);

  let data = {
    valeur_alerte: item.valeur_alerte,
    valeur_seuil: item.valeur_seuil,
    message: item.message,
    read: 1,
    type: item.type,
    graviter: item.graviter,
    contact_id: item.contact_id,
    batterie_id: item.batterie_id,
  };
  console.log("data", data);
  alerteBatterieStore.updateAlerte(item.id, data);
}

onMounted(() => {
  try {
    let parcid = useParc.parcSuperviser.id;
    alerteBatterieStore.getAlerteByParcId(parcid);
  } catch (error) {}
});
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

.btnCreer {
  background-color: #fb7a58;
}
.btnCreer:hover {
  background-color: #f5572c;
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
  color: #2d4051;
  cursor: pointer;
}
.containerEmptyParc {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50vh;
}
.containerEmptyParc h2 {
  color: rgb(121, 125, 129) !important;
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

.recent {
  /* background-color: red; */
  height: 53vh;
  overflow-y: scroll;
}
.historique {
  height: 53vh;
  overflow-y: scroll;
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

.pagination button {
  background-color: #f6f8fa;
  border: 1px solid #d3d3d3;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}

</style> -->
