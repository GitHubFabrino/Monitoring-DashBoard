<template>
  <div class="container">
    <div class="info">
      <div class="itemInfo">
        <h3 class="linkContact">
          <i
            class="pi pi-angle-double-left"
            style="font-size: 14px; color: #328ca8; padding: 5px"
          ></i
          >Contacts
        </h3>
        <div class="conatinerAbout">
          <div class="logo">
            <img src="../../public/hackingImage.png" alt="" srcset="" />
          </div>
          <div class="about">
            <h4 class="nom">NOM ENTREPRISE</h4>
            <h5 class="prenom">PRENOM</h5>

            <h5 class="emailInfo">
              rakotoharilalainafabrino@gmail.com
              <i
                class="pi pi-send"
                style="
                  font-size: 10px;
                  color: #328ca8;
                  padding-left: 20px;
                  cursor: pointer;
                "
              ></i>
            </h5>
            <h5 class="tel">+261 34 05 845 28</h5>
          </div>
        </div>
        <div class="containerIcon">
          <div class="icon" @click="show.showAddNoteFunc()">
            <div class="iconImage">
              <i
                class="pi pi-clipboard"
                style="font-size: 18px; color: #fff"
              ></i>
            </div>
            <h6>Note</h6>
          </div>
          <div class="icon" @click="show.showAddActiviteFunc()">
            <div class="iconImage">
              <i
                class="pi pi-calendar-clock"
                style="font-size: 18px; color: #fff"
              ></i>
            </div>
            <h6>Activité</h6>
          </div>
          <div class="icon" @click="show.showAddAEmailFunc()">
            <div class="iconImage">
              <i
                class="pi pi-envelope"
                style="font-size: 18px; color: #fff"
              ></i>
            </div>
            <h6>E-mail</h6>
          </div>
          <div class="icon" @click="show.showAddAppelFunc()">
            <div class="iconImage">
              <i class="pi pi-phone" style="font-size: 18px; color: #fff"></i>
            </div>
            <h6>Appel</h6>
          </div>
          <div class="icon" @click="show.showAddTacheFunc()">
            <div class="iconImage">
              <i
                class="pi pi-calendar"
                style="font-size: 18px; color: #fff"
              ></i>
            </div>
            <h6>Tâche</h6>
          </div>
        </div>
      </div>
      <div class="apropos">
        <div class="iconArrow">
          <i
            class="pi pi-angle-double-up"
            style="font-size: 14px; color: #328ca8; margin-right: 10px"
            v-if="false"
          ></i>
          <i
            class="pi pi-angle-double-down"
            style="font-size: 14px; color: #328ca8; margin-right: 10px"
          ></i>
        </div>
        <h3>A propos</h3>
      </div>
      <div class="infoApropos">
        <h5>Propriétaire</h5>
        <h4>Pierret Fabrino</h4>

        <h5>Responsable</h5>
        <h4>Fabrino</h4>

        <h5>Nom de domaine</h5>
        <h4>dev.fabrino.com</h4>

        <h5>Numéro téléphone</h5>
        <h4>+261 34 05 854 28</h4>

        <h5>Secteur d'activité</h5>
        <h4>Vente</h4>

        <h5>Ville</h5>
        <h4>Paris</h4>
      </div>
      <div class="activityInfo">
        <h5></h5>
      </div>
    </div>

    <div class="activity">
      <div class="selectContact">
        <div
          class="client"
          v-if="show.vueEnsembleActive"
          @click="show.activeVue()"
        >
          <h4>Vue d'ensemble</h4>
        </div>
        <div
          class="client color"
          v-if="show.vueEnsembleInactive"
          @click="show.activeVue()"
        >
          <h4>Vue d'ensemble</h4>
        </div>
        <div
          class="entreprise"
          v-if="show.activiteActive"
          @click="show.activeVue()"
        >
          <h4>Activités</h4>
        </div>
        <div
          class="entreprise color"
          @click="show.activeVue()"
          v-if="show.activiteInactive"
        >
          <h4>Activités</h4>
        </div>
      </div>
      <div class="vueContainer" v-if="show.vueEnsembleActive">
        <div class="vueInfo">
          <div class="item">
            <h4 class="itemTitle">DATE DE CREATION</h4>
            <h5 class="itemValue">25/10/2022 GMT+1</h5>
          </div>
          <div class="item">
            <h4 class="itemTitle">PHASE DU CYCLE DE VIE</h4>
            <h5 class="itemValue">Client</h5>
          </div>
          <div class="item">
            <h4 class="itemTitle">DATE DE LA DERNIERE ACTIVITE</h4>
            <h5 class="itemValue">27/02/2023</h5>
          </div>
          <div class="item">
            <h4 class="itemTitle">NOMBRE DE TRANSACTIONS</h4>
            <h5 class="itemValue">3</h5>
          </div>
        </div>
        <div class="conatinerCom">
          <h3 class="comm">
            Communications récentes
            <i
              class="pi pi-info-circle"
              style="font-size: 18px; color: #2d4051; padding-left: 20px"
            ></i>
          </h3>
          <div class="itemComm">
            <div class="iconComm">
              <i
                class="pi pi-calendar-clock"
                style="font-size: 18px; color: #2d4051"
              ></i>
            </div>
            <h4 class="commentaire">
              Fabrino a consigné une <span>rendez-vous</span> avec
              <span> Lass Cafe</span>
            </h4>
            <h4 class="date">31 mai 2023</h4>
          </div>
          <div class="itemComm">
            <div class="iconComm">
              <i
                class="pi pi-calendar-clock"
                style="font-size: 18px; color: #2d4051"
              ></i>
            </div>
            <h4 class="commentaire">
              Fabrino a consigné une <span>rendez-vous</span> avec
              <span> Lass Cafe</span>
            </h4>
            <h4 class="date">31 mai 2023</h4>
          </div>
          <div class="itemComm">
            <div class="iconComm">
              <i
                class="pi pi-calendar-clock"
                style="font-size: 18px; color: #2d4051"
              ></i>
            </div>
            <h4 class="commentaire">
              Fabrino a consigné une <span>rendez-vous</span> avec
              <span> Lass Cafe</span>
            </h4>
            <h4 class="date">31 mai 2023</h4>
          </div>
        </div>
      </div>
      <div class="activiteContainer" v-if="show.activiteActive">
        <WorkspaceTabNavigation />
        <WorkspaceActivite v-if="show.actActive" />
        <WorkspaceNote v-if="show.noteActive" />
        <WorkspaceEmail v-if="show.emailActive" />
        <WorkspaceAppel v-if="show.appelActive" />
        <WorkspaceTache v-if="show.tacheActive" />
      </div>
    </div>

    <div
      class="add"
      v-if="
        show.showAddActivite ||
        show.showAddNote ||
        show.showAddEmail ||
        show.showAddAppel ||
        show.showAddTache
      "
    >
      <WorkspaceAddActivite v-if="show.showAddActivite" />
      <WorkspaceAddNote v-if="show.showAddNote" />
      <WorkspaceAddEmail v-if="show.showAddEmail" />
      <WorkspaceAddAppel v-if="show.showAddAppel" />
      <WorkspaceAddTache v-if="show.showAddTache" />
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useShow } from "../stores/show";
import WorkspaceTabNavigation from "../components/WorkspaceTabNavigation.vue";
import WorkspaceActivite from "../components/WorkspaceActivite.vue";
import WorkspaceNote from "../components/WorkspaceNote.vue";
import WorkspaceEmail from "../components/workspaceEmail.vue";
import WorkspaceAppel from "../components/WorkspaceAppel.vue";
import WorkspaceTache from "../components/workspaceTache.vue";

import WorkspaceAddActivite from "../components/WorkspaceAddActivite.vue";
import WorkspaceAddNote from "../components/WorkspaceAddNote.vue";
import WorkspaceAddEmail from "../components/WorkspaceAddEmail.vue";
import WorkspaceAddAppel from "../components/WorkspaceAddAppel.vue";
import WorkspaceAddTache from "../components/WorkspaceAddTache.vue";

const show = useShow();
</script>

<style scoped>
.container {
  display: flex;
}
.info {
  width: 30%;
  height: 90vh;
  /* background-color: red; */
  border-right: 1px solid #2d405137;
}

.itemInfo {
  /* background-color: white; */
  border-bottom: 1px solid #2d405137;
  text-align: center;
}
.linkContact {
  padding: 20px 20px 10px 40px;
  font-size: 14px;
  font-weight: 800;
  color: #328ca8;
  text-align: left !important;
  display: flex;
  align-items: center;
}
.conatinerAbout {
  display: flex;
  /* background-color: blue; */
}
.logo {
  width: 100px;
  height: 100px;
  margin-left: 20px;
  /* background-color: rgb(53, 106, 152); */
}
img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
.about {
  text-align: left;
  padding-left: 20px;
}
.nom {
  font-weight: 700;
  margin-bottom: 5px;
}
.prenom {
  color: rgba(84, 84, 84, 0.764);
  font-weight: 500;
  margin-bottom: 5px;
}
.emailInfo {
  color: #328ca8;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.tel {
  font-weight: 600;
}

.containerIcon {
  width: 100%;
  display: flex;
  /* background-color: red; */
  justify-content: space-around;
  padding: 0px 50px;
  margin: 10px 0px;
}

.iconImage {
  width: 35px;
  height: 35px;
  background-color: #fb7a58;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
.apropos {
  padding: 15px;
  display: flex;
  align-items: center;
}
.apropos h3 {
  font-size: 15px;
  font-weight: 700;
}
.infoApropos {
  padding-left: 50px;
}
.infoApropos h5 {
  color: #959595;
  font-weight: 500;
  font-size: 10px;
}
.infoApropos h4 {
  /* color: #959595; */
  font-weight: 600;
  margin-bottom: 5px;
}
/* Activity */
.activity {
  width: 70%;
  height: 90vh;
  background-color: #e9f0f6;
  padding: 20px;
}

.selectContact {
  display: flex;
  justify-content: space-between;
  width: 40%;
  /* background-color: #fb7a58; */
}
.client {
  width: 200px;
  /* background-color: rebeccapurple; */
  padding: 10px 20px;
  text-align: center;
  background-color: #e9f0f6;
  border: 1px solid #2d405137;
  border-bottom: 1px solid #e9f0f6;
  cursor: pointer;
}
.client h4,
.entreprise h4 {
  font-weight: 600;
}
.entreprise {
  width: 200px;
  /* background-color: rebeccapurple; */
  padding: 8px;
  text-align: center;
  background-color: #e9f0f6;
  border: 1px solid #2d405137;
  border-bottom: 1px solid #e9f0f6;
  cursor: pointer;
}
.color {
  border: 1px solid #fff;
  background-color: #fff;
}
.vueContainer,
.activiteContainer {
  padding-top: 20px;
  background-color: #e9f0f6;
}
.vueInfo {
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 120px;
}
.item {
  text-align: center;
}
.itemTitle {
  font-weight: 600;
  font-size: 12px;
}
.itemValue {
  font-size: 11px;
}
.conatinerCom {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  height: 320px;
}
.comm {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.itemComm {
  display: flex;
  align-items: center;
  padding: 5px;
  border-bottom: 2px solid #9595955d;
  justify-content: space-around;
}
.iconComm {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(211, 209, 209, 0.389);
  border-radius: 100%;
  /* margin-right: 20px; */
}
.commentaire {
  font-size: 13px;
  font-weight: 500;
  width: 85%;
}
.date {
  font-size: 12px;
  font-weight: 500;
}
span {
  color: #328ca8;
  font-weight: 700;
}
.tabsActivite {
  display: flex;
  /* background-color: red; */
}

.add {
  width: 500px;
  height: 500px;
  background-color: #fff;
  position: absolute;
  right: 10px;
  bottom: 10px;
  border: 1px solid #959595;
  border-radius: 5px;
}
</style>
