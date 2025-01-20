<template>
  <div class="container">
    <div class="titre">
      <h3>Liste des incidents</h3>

      <div class="search">
        <input
          type="search"
          v-model="search"
          placeholder="Recherche"
          class="searchInput"
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
        <div v-for="item in filteredItems">
          <div
            v-if="!item.read === 0 ? false : true"
            :key="item.id"
            class="item"
          >
            <div class="check">
              <label>
                <input
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
      </div>

      <div class="historique" v-if="show.showHistoriqueCale">
        <div v-for="item in filteredItems">
          <div class="item" v-if="item.read === 0 ? false : true">
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
              <h4>{{ item.message }} {{ item.batterie.nom }}</h4>
            </div>
            <div class="date">
              <h5>{{ formatDateTime(item.created_at) }}</h5>
            </div>
            <div class="action"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { onMounted, ref ,computed  } from "vue";
import { useShow } from "@/stores/show";
import { useBatterie } from "@/stores/batterieStore";
import { parcStore } from "@/stores/parcStore";
import { useAlerteBatterieStore } from "@/stores/alerteBatterie";
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
  ]; // Récupérer le jour, le mois et l'année
  const jour = date.getDate();
  const moisNom = mois[date.getMonth()];
  const annee = date.getFullYear();

  const heures = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Construire la chaîne de date et heure formatée
  return `${jour} ${moisNom} ${annee} à ${heures}h${minutes}`;
}
const filteredItems = computed(() => {
  return alerteBatterieStore.allAllerteDataByParc.filter((item) =>
    item.message.toLowerCase().includes(search.value.toLowerCase())
  );
});

function voir(item) {
  alerteBatterieStore.voirAlerteData = item;
  show.showVoirAlerteData = true;
}

onMounted(() => {
  try {
    let parcid = useParc.parcSuperviser.id;
    console.log("parc", parcid);
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
