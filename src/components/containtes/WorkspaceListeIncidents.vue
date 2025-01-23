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
        <template v-if="filteredItems.length > 0">
          <div v-for="item in filteredItems" :key="item.id">
            <div v-if="!item.read === 0 ? false : true" class="item">
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
        </template>
        <div v-else>
          <div class="containerEmptyParc">
            <div
              class="w-full flex items-center flex-wrap justify-center gap-10"
            >
              <div class="grid gap-4 w-60">
                <svg
                  class="mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="125"
                  height="131"
                  viewBox="0 0 125 131"
                  fill="none"
                >
                  <path
                    d="M0.420654 68.7842C0.420654 34.3298 28.349 6.55554 62.6493 6.55554C96.8982 6.55554 124.865 34.3169 124.865 68.7842C124.865 83.4036 119.829 96.8539 111.376 107.465C99.7244 122.174 81.9191 131 62.6493 131C43.251 131 25.5485 122.11 13.9095 107.465C5.4565 96.8539 0.420654 83.4036 0.420654 68.7842Z"
                    fill="#f6b4a274"
                  />
                  <path
                    d="M79.0504 0.608781L79.0504 0.608667L79.0398 0.607237C78.5451 0.540687 78.045 0.5 77.5408 0.5H24.2077C18.772 0.5 14.3651 4.88403 14.3651 10.3009V116.144C14.3651 121.56 18.772 125.944 24.2077 125.944H101.078C106.527 125.944 110.921 121.56 110.921 116.144V31.8189C110.921 31.0754 110.839 30.3445 110.676 29.6268L110.676 29.6266C110.241 27.7171 109.221 25.9432 107.737 24.6014C107.737 24.6012 107.737 24.601 107.736 24.6008L84.1766 3.0858C84.1765 3.08565 84.1763 3.08551 84.1762 3.08537C82.7355 1.75954 80.9542 0.906612 79.0504 0.608781Z"
                    fill="white"
                    stroke="#f49d85"
                  />
                  <ellipse
                    cx="65.4207"
                    cy="65.9999"
                    rx="22.7778"
                    ry="22.7778"
                    fill="#fcd7cd"
                  />
                  <path
                    d="M81.0688 49.9324L81.0686 49.9321C72.3048 41.1815 58.1172 41.1811 49.3659 49.9324C40.602 58.6834 40.6019 72.8839 49.3656 81.6351C58.117 90.3995 72.305 90.3991 81.0688 81.6353C89.82 72.8842 89.82 58.6835 81.0688 49.9324ZM86.3177 44.6839C97.9698 56.3362 97.9698 75.2316 86.3177 86.8839C74.6526 98.5364 55.7695 98.5364 44.1044 86.884C32.452 75.2317 32.452 56.336 44.1044 44.6837C55.7695 33.0313 74.6526 33.0314 86.3177 44.6839Z"
                    stroke="#f0b9aa"
                  />
                  <path
                    d="M90.3809 96.9595L83.3998 89.9712C85.6764 88.1961 87.7307 86.1207 89.3998 83.9797L96.3803 90.9673L90.3809 96.9595Z"
                    stroke="#fcd7cd"
                  />
                  <path
                    d="M113.474 102.318L113.473 102.318L100.63 89.4866C100.629 89.4861 100.629 89.4856 100.628 89.4852C99.5215 88.3644 97.7182 88.3685 96.6026 89.4841L88.9049 97.1818C87.7989 98.2878 87.8024 100.088 88.9024 101.204L88.9049 101.206L101.752 114.053C104.982 117.284 110.243 117.284 113.474 114.053C116.717 110.809 116.717 105.562 113.474 102.318Z"
                    fill="#f4ab97"
                    stroke="#f67a57"
                  />
                  <path
                    d="M67.9584 71.0607C67.4332 71.0607 66.9977 70.6252 66.9977 70.0873C66.9977 67.9355 63.7445 67.9355 63.7445 70.0873C63.7445 70.6252 63.309 71.0607 62.771 71.0607C62.2459 71.0607 61.8104 70.6252 61.8104 70.0873C61.8104 65.3739 68.9318 65.3867 68.9318 70.0873C68.9318 70.6252 68.4963 71.0607 67.9584 71.0607Z"
                    fill="#f67d5c"
                  />
                  <path
                    d="M76.2197 62.8253H72.1979C71.66 62.8253 71.2245 62.3898 71.2245 61.8519C71.2245 61.3267 71.66 60.8912 72.1979 60.8912H76.2197C76.7576 60.8912 77.1931 61.3267 77.1931 61.8519C77.1931 62.3898 76.7576 62.8253 76.2197 62.8253Z"
                    fill="#f67d5c"
                  />
                  <path
                    d="M58.5445 62.8252H54.5227C53.9848 62.8252 53.5493 62.3897 53.5493 61.8517C53.5493 61.3266 53.9848 60.8911 54.5227 60.8911H58.5445C59.0696 60.8911 59.5051 61.3266 59.5051 61.8517C59.5051 62.3897 59.0696 62.8252 58.5445 62.8252Z"
                    fill="#f67d5c"
                  />
                  <rect
                    x="31.5317"
                    y="17.6666"
                    width="33.3333"
                    height="2.22222"
                    rx="1.11111"
                    fill="#f67d5c"
                  />
                  <rect
                    x="31.5317"
                    y="108.778"
                    width="44.4444"
                    height="4.44444"
                    rx="2.22222"
                    fill="#f67d5c"
                  />
                  <rect
                    x="31.5317"
                    y="24.3334"
                    width="11.1111"
                    height="2.22222"
                    rx="1.11111"
                    fill="#f67d5c"
                  />
                  <ellipse
                    cx="45.9762"
                    cy="25.4445"
                    rx="1.11111"
                    ry="1.11111"
                    fill="#f67d5c"
                  />
                  <ellipse
                    cx="50.4207"
                    cy="25.4445"
                    rx="1.11111"
                    ry="1.11111"
                    fill="#f67d5c"
                  />
                  <ellipse
                    cx="54.8651"
                    cy="25.4445"
                    rx="1.11111"
                    ry="1.11111"
                    fill="#f67d5c"
                  />
                </svg>
                <div>
                  <h2
                    class="text-center text-black text-lg font-semibold leading-7 pb-1"
                  >
                    Aucun incident répertorié pour le moment
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="historique" v-if="show.showHistoriqueCale">
        <template v-if="filteredItems.length > 0">
          <div v-for="item in filteredItems" :key="item.id">
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
        </template>
        <div v-else>
          <div class="containerEmptyParc">
            <div
              class="w-full flex items-center flex-wrap justify-center gap-10"
            >
              <div class="grid gap-4 w-60">
                <svg
                  class="mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="125"
                  height="131"
                  viewBox="0 0 125 131"
                  fill="none"
                >
                  <path
                    d="M0.420654 68.7842C0.420654 34.3298 28.349 6.55554 62.6493 6.55554C96.8982 6.55554 124.865 34.3169 124.865 68.7842C124.865 83.4036 119.829 96.8539 111.376 107.465C99.7244 122.174 81.9191 131 62.6493 131C43.251 131 25.5485 122.11 13.9095 107.465C5.4565 96.8539 0.420654 83.4036 0.420654 68.7842Z"
                    fill="#f6b4a274"
                  />
                  <path
                    d="M79.0504 0.608781L79.0504 0.608667L79.0398 0.607237C78.5451 0.540687 78.045 0.5 77.5408 0.5H24.2077C18.772 0.5 14.3651 4.88403 14.3651 10.3009V116.144C14.3651 121.56 18.772 125.944 24.2077 125.944H101.078C106.527 125.944 110.921 121.56 110.921 116.144V31.8189C110.921 31.0754 110.839 30.3445 110.676 29.6268L110.676 29.6266C110.241 27.7171 109.221 25.9432 107.737 24.6014C107.737 24.6012 107.737 24.601 107.736 24.6008L84.1766 3.0858C84.1765 3.08565 84.1763 3.08551 84.1762 3.08537C82.7355 1.75954 80.9542 0.906612 79.0504 0.608781Z"
                    fill="white"
                    stroke="#f49d85"
                  />
                  <ellipse
                    cx="65.4207"
                    cy="65.9999"
                    rx="22.7778"
                    ry="22.7778"
                    fill="#fcd7cd"
                  />
                  <path
                    d="M81.0688 49.9324L81.0686 49.9321C72.3048 41.1815 58.1172 41.1811 49.3659 49.9324C40.602 58.6834 40.6019 72.8839 49.3656 81.6351C58.117 90.3995 72.305 90.3991 81.0688 81.6353C89.82 72.8842 89.82 58.6835 81.0688 49.9324ZM86.3177 44.6839C97.9698 56.3362 97.9698 75.2316 86.3177 86.8839C74.6526 98.5364 55.7695 98.5364 44.1044 86.884C32.452 75.2317 32.452 56.336 44.1044 44.6837C55.7695 33.0313 74.6526 33.0314 86.3177 44.6839Z"
                    stroke="#f0b9aa"
                  />
                  <path
                    d="M90.3809 96.9595L83.3998 89.9712C85.6764 88.1961 87.7307 86.1207 89.3998 83.9797L96.3803 90.9673L90.3809 96.9595Z"
                    stroke="#fcd7cd"
                  />
                  <path
                    d="M113.474 102.318L113.473 102.318L100.63 89.4866C100.629 89.4861 100.629 89.4856 100.628 89.4852C99.5215 88.3644 97.7182 88.3685 96.6026 89.4841L88.9049 97.1818C87.7989 98.2878 87.8024 100.088 88.9024 101.204L88.9049 101.206L101.752 114.053C104.982 117.284 110.243 117.284 113.474 114.053C116.717 110.809 116.717 105.562 113.474 102.318Z"
                    fill="#f4ab97"
                    stroke="#f67a57"
                  />
                  <path
                    d="M67.9584 71.0607C67.4332 71.0607 66.9977 70.6252 66.9977 70.0873C66.9977 67.9355 63.7445 67.9355 63.7445 70.0873C63.7445 70.6252 63.309 71.0607 62.771 71.0607C62.2459 71.0607 61.8104 70.6252 61.8104 70.0873C61.8104 65.3739 68.9318 65.3867 68.9318 70.0873C68.9318 70.6252 68.4963 71.0607 67.9584 71.0607Z"
                    fill="#f67d5c"
                  />
                  <path
                    d="M76.2197 62.8253H72.1979C71.66 62.8253 71.2245 62.3898 71.2245 61.8519C71.2245 61.3267 71.66 60.8912 72.1979 60.8912H76.2197C76.7576 60.8912 77.1931 61.3267 77.1931 61.8519C77.1931 62.3898 76.7576 62.8253 76.2197 62.8253Z"
                    fill="#f67d5c"
                  />
                  <path
                    d="M58.5445 62.8252H54.5227C53.9848 62.8252 53.5493 62.3897 53.5493 61.8517C53.5493 61.3266 53.9848 60.8911 54.5227 60.8911H58.5445C59.0696 60.8911 59.5051 61.3266 59.5051 61.8517C59.5051 62.3897 59.0696 62.8252 58.5445 62.8252Z"
                    fill="#f67d5c"
                  />
                  <rect
                    x="31.5317"
                    y="17.6666"
                    width="33.3333"
                    height="2.22222"
                    rx="1.11111"
                    fill="#f67d5c"
                  />
                  <rect
                    x="31.5317"
                    y="108.778"
                    width="44.4444"
                    height="4.44444"
                    rx="2.22222"
                    fill="#f67d5c"
                  />
                  <rect
                    x="31.5317"
                    y="24.3334"
                    width="11.1111"
                    height="2.22222"
                    rx="1.11111"
                    fill="#f67d5c"
                  />
                  <ellipse
                    cx="45.9762"
                    cy="25.4445"
                    rx="1.11111"
                    ry="1.11111"
                    fill="#f67d5c"
                  />
                  <ellipse
                    cx="50.4207"
                    cy="25.4445"
                    rx="1.11111"
                    ry="1.11111"
                    fill="#f67d5c"
                  />
                  <ellipse
                    cx="54.8651"
                    cy="25.4445"
                    rx="1.11111"
                    ry="1.11111"
                    fill="#f67d5c"
                  />
                </svg>
                <div>
                  <h2
                    class="text-center text-black text-lg font-semibold leading-7 pb-1"
                  >
                    Aucun incident répertorié pour le moment
                  </h2>
                </div>
              </div>
            </div>
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
}
.containerEmptyParc {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50vh;
  /* background-color: #fb7a58; */
  /* color: red!important;; */
}
.containerEmptyParc h2{
  color: rgb(121, 125, 129)!important;;
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
