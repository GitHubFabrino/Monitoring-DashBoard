<template>
  <div class="sideBar">
    <div class="logo">
      <div class="imageLogo">
        <img
          src="/icon.png"
          alt="logo"
          width="100%"
          height="100%"
        />
      </div>
      <h4>BATMONITOR</h4>
    </div>
    <div class="menu">
      <div
        class="menuTitle"
        :class="{ active: show.activeMenu === 'Gestion du parc' }"
        @click="show.setActiveMenu('Gestion du parc')"
      >
        <h4 :class="{ activeText: show.activeMenu === 'Gestion du parc' }">
          Gestion du parc
        </h4>
      </div>

      <div v-if="show.showParc">
        <div
          class="menuItem"
          :class="{ bg: show.activeMenuItem === 'Création de parc' }"
          @click="show.setActiveItem('Création de parc')"
        >
          <i
            class="pi pi-building-columns"
            style="font-size: 18px; color: #2d4051"
            :class="{ color: show.activeMenuItem === 'Création de parc' }"
          ></i>

          <h5 :class="{ color: show.activeMenuItem === 'Création de parc' }">
            Création de parc
          </h5>
        </div>
        <div
          class="menuItem"
          :class="{ bg: show.activeMenuItem === 'Calendrier de maintenance' }"
          @click="show.setActiveItem('Calendrier de maintenance')"
        >
          <i
            class="pi pi-calendar"
            style="font-size: 18px; color: #2d4051"
            :class="{
              color: show.activeMenuItem === 'Calendrier de maintenance',
            }"
          ></i>

          <h5
            :class="{
              color: show.activeMenuItem === 'Calendrier de maintenance',
            }"
          >
            Calendrier de maintenance
          </h5>
        </div>
        <!-- <div
          class="menuItem"
          :class="{ bg: show.activeMenuItem === 'Rapports de performance' }"
          @click="show.setActiveItem('Rapports de performance')"
        >
          <i
            class="pi pi-bolt"
            style="font-size: 18px; color: #2d4051"
            :class="{
              color: show.activeMenuItem === 'Rapports de performance',
            }"
          ></i>

          <h5
            :class="{
              color: show.activeMenuItem === 'Rapports de performance',
            }"
          >
            Rapports de performance
          </h5>
        </div> -->
      </div>
    </div>

    <div class="menu">
      <div
        class="menuTitle"
        :class="{ active: show.activeMenu === 'Paramètres de la batterie' }"
        @click="show.setActiveMenu('Paramètres de la batterie')"
      >
        <h4
          :class="{
            activeText: show.activeMenu === 'Paramètres de la batterie',
          }"
        >
          Paramètres de la batterie
        </h4>
      </div>

      <div v-if="show.showBatterie">
        <div
          class="menuItem"
          :class="{ bg: show.activeMenuItem === 'Plages de fonctionnement' }"
          @click="show.setActiveItem('Plages de fonctionnement')"
        >
          <i
            class="pi pi-sliders-h"
            style="font-size: 18px; color: #2d4051"
            :class="{
              color: show.activeMenuItem === 'Plages de fonctionnement',
            }"
          ></i>

          <h5
            :class="{
              color: show.activeMenuItem === 'Plages de fonctionnement',
            }"
          >
            Plages de fonctionnement
          </h5>
        </div>
        <div
          class="menuItem"
          :class="{ bg: show.activeMenuItem === 'Seuils d\'alerte' }"
          @click="show.setActiveItem('Seuils d\'alerte')"
        >
          <i
            class="pi pi-sliders-v"
            style="font-size: 18px; color: #2d4051"
            :class="{ color: show.activeMenuItem === 'Seuils d\'alerte' }"
          ></i>

          <h5 :class="{ color: show.activeMenuItem === 'Seuils d\'alerte' }">
            Seuils d'alerte
          </h5>
        </div>
      </div>
    </div>

    <div class="menu">
      <div
        class="menuTitle"
        :class="{ active: show.activeMenu === 'Gestion des incidents' }"
        @click="show.setActiveMenu('Gestion des incidents')"
      >
        <h4
          :class="{ activeText: show.activeMenu === 'Gestion des incidents' }"
        >
          Gestion des incidents
        </h4>
      </div>
      <div v-if="show.showIncident">
        <div
          class="menuItem"
          :class="{ bg: show.activeMenuItem === 'Liste des incidents récents' }"
          @click="show.setActiveItem('Liste des incidents récents')"
        >
          <i
            class="pi pi-list"
            style="font-size: 18px; color: #2d4051"
            :class="{
              color: show.activeMenuItem === 'Liste des incidents récents',
            }"
          ></i>

          <h5
            :class="{
              color: show.activeMenuItem === 'Liste des incidents récents',
            }"
          >
            Liste des incidents récents et Historiques
          </h5>
        </div>
        <!-- <div
          class="menuItem"
          :class="{ bg: show.activeMenuItem === 'Historique des incidents' }"
          @click="show.setActiveItem('Historique des incidents')"
        >
          <i
            class="pi pi-clock"
            style="font-size: 18px; color: #2d4051"
            :class="{
              color: show.activeMenuItem === 'Historique des incidents',
            }"
          ></i>

          <h5
            :class="{
              color: show.activeMenuItem === 'Historique des incidents',
            }"
          >
            Historique des incidents
          </h5>
        </div> -->
      </div>
    </div>

    <div class="menu">
      <div
        class="menuTitle"
        :class="{ active: show.activeMenu === 'Historique des données' }"
        @click="show.setActiveMenu('Historique des données')"
      >
        <h4
          :class="{ activeText: show.activeMenu === 'Historique des données' }"
        >
          Historique des données
        </h4>
      </div>
      <div v-if="show.showHistorique">
        <div
          class="menuItem"
          :class="{ bg: show.activeMenuItem === 'Visualisation des données' }"
          @click="show.setActiveItem('Visualisation des données')"
        >
          <i
            class="pi pi-database"
            style="font-size: 18px; color: #2d4051"
            :class="{
              color: show.activeMenuItem === 'Visualisation des données',
            }"
          ></i>

          <h5
            :class="{
              color: show.activeMenuItem === 'Visualisation des données',
            }"
          >
            Visualisation des données
          </h5>
        </div>
      </div>
    </div>

    <div class="menu">
      <div
        class="menuTitle"
        :class="{ active: show.activeMenu === 'Performance' }"
        @click="show.setActiveMenu('Performance')"
      >
        <h4
          :class="{ activeText: show.activeMenu === 'Performance' }"
        >
          Performance des batteries
        </h4>
      </div>
      <div v-if="show.showPerformance">
        <div
          class="menuItem"
          :class="{ bg: show.activeMenuItem === 'Estimation' }"
          @click="show.setActiveItem('Estimation')"
        >
          <i
            class="pi pi-database"
            style="font-size: 18px; color: #2d4051"
            :class="{
              color: show.activeMenuItem === 'Estimation',
            }"
          ></i>

          <h5
            :class="{
              color: show.activeMenuItem === 'Estimation',
            }"
          >
            Estimation 
          </h5>
        </div>
      </div>
    </div>


 </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useShow } from "@/stores/show";
const show = useShow();
</script>

<style scoped>
.sideBar {
  width: 20% !important;
  background-color: #f6f8fa;
  padding: 0px 20px 20px 20px;
  border-right: 1px solid rgba(110, 110, 110, 0.235);
}
.logo {
  /* background-color: brown; */
  padding: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.logo h4 {
  color: #2d4051;
  font-weight: 900;
  padding-left: 20px;
}
.imageLogo {
  width: 50px;
  height: 50px;
}
.menu {
  /* background-color: red; */
  margin-top: 10px;
  box-shadow: 0px 0px 2px rgb(214, 214, 214);
}
.menuTitle {
  background-color: #e9f0f6;
  padding: 10px;
  border-left: 3px solid #328ca8;
  cursor: pointer;
}
.menuTitle h4 {
  color: #328ca8;
  font-weight: 600;
  cursor: pointer;
}
.menuItem {
  background-color: rgba(209, 211, 248, 0.209);
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 2px solid #f9f9f9;
}

.menuItem h5 {
  padding-left: 20px;
  color: #2d4051;
  font-weight: 600;
  cursor: pointer;             
}
.color {
  color: #328ca8 !important;
}

.bg {
  background-color: #fb7b5825 !important;
  border-bottom: 2px solid #328ca8 !important;
}

.menuItem:hover {
  background-color: #8aacb74c;
  border-bottom: 2px solid #7696a0;
}
.active {
  /* background-color: red; */
  border-left: 3px solid #fb7a58;
  color: #fb7a58;
}

.activeText {
  color: #fb7a58 !important;
}
</style>
