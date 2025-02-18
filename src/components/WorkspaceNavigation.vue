<template>
  <div class="navBar">
    <div class="linka">
      <h3 class="liking" @click="show.setActiveItem('Acceuil')">Accueil</h3>
      <!-- <RouterLink to="" class="liking">Contact </RouterLink> -->
      <!-- <h3 class="liking">Utilisateurs</h3> -->
      <!-- <h3 class="liking">Paramètres</h3> -->
    </div>
    <div class="parc" @click="toggleDropdown()">
      <div>
        <h1>
          {{
            useParc?.parcSuperviser?.nom_parc ||
            parcSuperviserLocal?.nom_parc ||
            ""
          }}
        </h1>
        <h6>
          {{
            useParc?.parcSuperviser?.adresse ||
            parcSuperviserLocal?.adresse ||
            ""
          }}
        </h6>
      </div>
      <div class="drop">
        <svg
          class="dropdown-open:rotate-180 w-2.5 h-2.5 text-white"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          ></path>
        </svg>
      </div>
    </div>

    <div class="dropdown absolute inline-flex position">
      <div
        id="dropdown-with-radiobutton"
        class="dropdown-menu rounded-xl shadow-lg bg-white absolute w-60 p-6"
        v-if="dropdownOpen"
      >
        <div class="relative mb-4">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.75 15.75L14.25 14.25M15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25Z"
                stroke="#6B7280"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-search"
            class="block w-full py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-full focus:outline-none"
            placeholder="Recherche.."
            v-model="searchQuery"
            @input="filterParcs"
          />
        </div>
        <ul class="space-y-4">
          <li
            v-for="parcItem in filteredParcs"
            :key="parcItem.id"
            class="list"
            @click="fermer(parcItem)"
          >
            <div class="items-center">
              <label
                for="radio-group-1"
                class="items-center cursor-pointer text-gray-600 text-sm font-medium p-2 parcs"
              >
                {{ parcItem.nom_parc }}
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="profil">
      <div class="notif">
        <div class="notification show" @click="show.showNotificationDetailFunc()">
          <span>{{ show.competerAlerteBatterieUnRead }}</span>
          <i class="pi pi-bell" style="font-size: 18px; color: #fff"></i>
          <h5 class="text">Notification</h5>
        </div>
        <!-- <div class="Mail show" @click="show.showEmailFunc()">
          <span>4</span>
          <i class="pi pi-envelope" style="font-size: 18px; color: #fff"></i>
          <h5 class="text">Mail</h5>
        </div> -->
      </div>

      <div class="photo" @click="show.showDescFunc()">
        <img class="photo" src="/admin.png" alt="" width="100%" height="100%" />
      </div>

      <div
        class="showProfil"
        v-if="show.showDesc"
        @click.self="show.closeProfile()"
      >
        <div class="section">
          <div class="sectionItem">
            <h4 class="textSection">Compte</h4>
          </div>

          <div class="container">
            <div class="imageProfil">
              <img
                class="photo"
                src="/admin.png"
                alt=""
                width="100%"
                height="100%"
              />
            </div>
            <div class="info">
              <h4>{{ user.userName || user.userInfo.name }}</h4>
              <h5>{{ user.userEmail || user.userInfo.eamil }}</h5>
            </div>
          </div>

          <div class="items">
            <div class="option" @click="show.showProfilDetailFunc()">
              <i
                class="pi pi-user-edit"
                style="font-size: 18px; color: #2d4051"
              ></i>
              <h5 class="item">Mon Profil</h5>
            </div>

            <div class="option" @click="show.showLogoutFunc()">
              <i
                class="pi pi-sign-out"
                style="font-size: 14px; color: #2d4051"
              ></i>
              <h5 class="item">Déconnection</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="notificationContainer" v-if="show.showNotification">
        <div class="titre">
          <h4>Notification</h4>
          <div class="nb"><h5>3</h5></div>
        </div>
        <div
          class="itemNotif"
          @click="show.showNotificationDetail = !show.showNotificationDetail"
       
        
        >
        <!-- :key="item.id" -->
        <!-- v-for="item in alerteBatterieStore.allAllerteDataByParc" -->
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 12px; color: #2d4051"></i>
          </div>
          <div class="textNotif">
            <!-- <h4>{{ item.batterie.nom }}sss</h4>
            <h5 class="date">{{ formatDateTime(item.created_at) }}</h5> -->
            <h1>z</h1>
          </div>
          <div class="icon">
            <i
              class="pi pi-ellipsis-v"
              style="font-size: 14px; color: #2d4051"
            ></i>
          </div>
        </div>
      </div>

      <div class="notificationContainer" v-if="show.showEmail">
        <div class="titre">
          <h4>Email</h4>
          <div class="nb"><h5>3</h5></div>
        </div>
        <div class="itemNotif">
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 12px; color: #2d4051"></i>
          </div>
          <div class="textNotif">
            <h4>Batterie 01</h4>
            <h5>6h</h5>
          </div>
          <div class="icon">
            <i
              class="pi pi-ellipsis-v"
              style="font-size: 14px; color: #2d4051"
            ></i>
          </div>
        </div>

        <div class="itemNotif">
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 12px; color: #2d4051"></i>
          </div>
          <div class="textNotif">
            <h4>Batterie 01</h4>
            <h5>6h</h5>
          </div>
          <div class="icon">
            <i
              class="pi pi-ellipsis-v"
              style="font-size: 14px; color: #2d4051"
            ></i>
          </div>
        </div>

        <div class="itemNotif">
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 12px; color: #2d4051"></i>
          </div>
          <div class="textNotif">
            <h4>Batterie 01</h4>
            <h5>6h</h5>
          </div>
          <div class="icon">
            <i
              class="pi pi-ellipsis-v"
              style="font-size: 14px; color: #2d4051"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import "primeicons/primeicons.css";
import { useShow } from "@/stores/show";
import { useUser } from "@/stores/user";
import { parcStore } from "@/stores/parcStore";
import { useMqttAlerteStore } from "@/stores/mqttAlertStore";
import { ref, computed, onMounted, watch } from "vue";
const show = useShow();
const user = useUser();

const useParc = parcStore();
const mqttAlerteStore = useMqttAlerteStore();

import { useBatterie } from "@/stores/batterieStore";

import { useAlerteBatterieStore } from "@/stores/alerteBatterie";

const batterie = useBatterie();

const alerteBatterieStore = useAlerteBatterieStore();

user.userInfo = JSON.parse(localStorage.getItem("user")).user;
const parcSuperviserLocal = ref(
  JSON.parse(localStorage.getItem("parcSuperviser"))
);

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
const dropdownOpen = ref(false);
const searchQuery = ref("");
const filteredParcs = computed(() =>
  useParc.parcsData.filter((parc) =>
    parc.nom_parc.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}
function fermer(parc) {
  useParc.test = true;
  dropdownOpen.value = false;
  useParc.parcSuperviserFunc(parc);
  useParc.parcSuperviser = parc;
}

// Définir la variable à surveiller
const parcNom = computed(() => useParc?.parcSuperviser || parcSuperviserLocal);

// Utiliser un watcher pour surveiller les changements de cette variable
watch(parcNom, (newValue, oldValue) => {
  console.log(`La variable a changé de ${oldValue} à ${newValue}`);
  console.log(newValue);
  alerteBatterieStore.getAlerteByParcId(newValue.id, newValue)

});

onMounted(() => {
  console.log("Store monté, initialisation MQTT...");
  mqttAlerteStore.initializeMqtt();

  // if (useParc?.parcSuperviser?.nom_parc || parcSuperviserLocal?.nom_parc) {
  //   if (useParc?.parcSuperviser) {
  //     console.log('misy ayyy 1', useParc?.parcSuperviser);
  //   } else if (parcSuperviserLocal.value) {
  //     console.log('misy ayyy 2',parcSuperviserLocal.value);
  //   } else{
  //     console.log('tsisiii');
  //   }
  //   // alerteBatterieStore.getAlerteByParcId()
    
  // }













});
</script>

<style scoped>
.navBar {
  height: 10vh;
  background-color: #2d4051;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.linka {
  width: 60%;
  display: flex;
  margin-left: 20px;
}

.liking {
  padding: 0px 10px;
  color: #f6f8fa;
  font-weight: 700;
  font-size: 16px;
}

.liking:hover {
  border-radius: 2px;
  background-color: #1d222b;
}

.profil {
  width: 20%;
  text-align: right;
  display: flex;
  justify-content: space-between;
}

.position {
  position: relative;
  top: 30px;
  right: 250px;
  z-index: 10;
}

.parc h1 {
  color: #fb7a58;
  font-weight: 600;
}
.parc h6 {
  color: #d8d7d7;
  font-size: 12px;
}
.parc {
  width: 20%;
  /* background-color: #89bece; */
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: chartreuse;
  text-align: center;
  margin-right: 10px;
}

.list {
  padding: 5px;
  border-radius: 5px;
}
.list:hover {
  background-color: #fb7b587a !important;
}
.notif {
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.text {
  position: absolute;
  display: none;
  color: #ffffff;
  font: weight 700px;
  padding: 2px 5px;
  border-radius: 2px;
  background-color: #89bece;
  font-weight: 500;
}

.show:hover .text {
  display: block;
}
.parcs {
  padding: 15px;
}

.showProfil {
  position: absolute;
  background-color: #f6f8fa;
  width: 22%;
  top: 70px;
  right: 12px;
  border-radius: 5px;
  text-align: left;
  /* padding-bottom: 20px; */
  box-shadow: 0px 0px 5px rgb(210, 208, 208);
  z-index: 10000;
}

.container {
  padding: 5px 5px;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  color: #b9b6b6;
  margin: 5px 0px;
}

.imageProfil {
  background-color: aqua;
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
.info {
  width: 70%;
  overflow: hidden;
  color: #2d4051;
}
.info h4 {
  font-weight: 600;
  color: #2d4051;
}

.info h5 {
  font-weight: 500;
  color: #b1b5ba;
}

.textSection {
  color: #b9b6b6;
  font-weight: 700;
}
.sectionItem {
  background-color: #2d4051;
  border-radius: 5px 5px 0px 0px;
  padding: 5px 20px;
}
.item {
  color: #2d4051;
  padding: 4px 20px;
  font-weight: 600;
}

.option {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 10px 10px;
  margin: 0px auto;
  border-top: 1px solid #56636e5e;
  width: 90%;
}

.option:hover {
  background-color: #c8c9ca2a;
}
span {
  width: 14px;
  height: 14px;
  background-color: #fb7a58;
  border-radius: 100%;
  position: relative;
  top: 10px;
  /* right: 100px; */
  left: 10px;
  font-size: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f6f8fa;
}

.notificationContainer {
  position: absolute;
  background-color: rgb(255, 255, 255);
  top: 65px;
  right: 10px;
  width: 25%;
  height: 85vh;
  text-align: left !important;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 2px 10px rgb(222, 222, 222);
  z-index: 5000;
}
.titre {
  padding: 5px 10px;
  background-color: #89bece2d;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nb {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fb7a58;
  width: 25px;
  height: 25px;
  border-radius: 100%;
}
.nb h5 {
  color: #fff;
  font-weight: 600;
}
.titre h4 {
  color: #2d4051;
  font-weight: 700;
}

.itemNotif {
  display: flex;
  background-color: #dad8d890;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-top: 5px;
  border-radius: 2px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.textNotif {
  /* display: flex; */
  width: 80%;
  justify-content: space-between;
  align-items: center;
  /* background-color: yellow; */
}

.textNotif h4,
.textNotif h5 {
  font-weight: 600;
}
.date {
  font-size: 10px;
  font-weight: 300 !important;
}
</style>
