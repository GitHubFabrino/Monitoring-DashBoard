<template>
  <div class="container">
    <div class="desc" v-if="show.showParcDetail">
      <div class="title">
        <div>
          <h2>
            {{
              show.showParcDetailData.nom_parc ||
              show.showParcDetailData.value.nom_parc
            }}
          </h2>
          <h5>
            Création :
            {{
              formatDateAndTime(show.showParcDetailData.created_at) ||
              formatDateAndTime(show.showParcDetailData.value.created_at)
            }}
          </h5>
        </div>
        <div class="icon orange" @click="edit()">
          <i
            class="pi pi-pen-to-square"
            style="font-size: 12px; color: #fff"
          ></i>
        </div>
      </div>
      <div class="text">
        <div class="icon">
          <i class="pi pi-bookmark" style="font-size: 18px; color: #fff"></i>
        </div>

        <h4>
          {{
            show.showParcDetailData.description ||
            show.showParcDetailData.value.description
          }}
        </h4>
      </div>
      <div class="text">
        <div class="icon">
          <i class="pi pi-map-marker" style="font-size: 18px; color: #fff"></i>
        </div>
        <h4>
          {{
            show.showParcDetailData.adresse ||
            show.showParcDetailData.value.adresse
          }}
        </h4>
      </div>
      <div class="text">
        <div class="icon">
          <i class="pi pi-bolt" style="font-size: 18px; color: #fff"></i>
        </div>
        <h4>
          Nombre de batterie :
          {{
            show.showParcDetailData.nombre_batteries ||
            show.showParcDetailData.value.nombre_batteries
          }}
        </h4>
      </div>
      <div
        class="text"
        v-for="item in show.showParcDetailData.contacts ||
        show.showParcDetailData.value.contacts"
        :key="item.id"
      >
        <div class="icon">
          <i class="pi pi-phone" style="font-size: 18px; color: #fff"></i>
        </div>

        <h4>
          {{
            item.type === "email"
              ? `Email : ${item.valeur}`
              : `Contact : ${item.valeur}`
          }}
        </h4>
        <i
          class="pi pi-bell"
          style="font-size: 18px; color: #fb7b5892"
          v-if="item.choix === 'oui' ? true : false"
        ></i>
        <i
          class="pi pi-bell-slash"
          style="font-size: 18px; color: #fb7b5892"
          v-if="item.choix === 'non' ? true : false"
        ></i>
      </div>
    </div>
    <div class="desc" v-if="show.showEditParc">
      <div class="title">
        <h2>Modification</h2>
        <div class="containerBtn">
          <button class="btn1 enregistrer" @click="Enregistrer()">
            Enregistrer
          </button>
        </div>
      </div>

      <div class="containerDesc">
        <div class="itemContainer">
          <h5>Nom du parc <span>*</span></h5>
          <input
            type="text"
            placeholder="NOM DU PARC"
            v-model="useParc.nom_parcEdit"
            class="input"
            @input="transformName"
          />
        </div>

        <div class="itemContainer">
          <h5>Description <span>*</span></h5>
          <input
            type="text"
            placeholder="La déscription du parc"
            v-model="useParc.descriptionEdit"
            class="input"
          />
        </div>
        <div class="cardItem">
          <div class="itemSelect">
            <div class="itemContainer">
              <h5>Adresse <span>*</span></h5>
              <input
                type="text"
                placeholder="L'adresse du parc"
                v-model="useParc.adresseEdit"
                class="input"
              />
            </div>
          </div>
          <div class="itemSelect1">
            <div class="itemContainer">
              <h5>Nombre de batterie <span>*</span></h5>
              <input
                type="number"
                min="1"
                placeholder="Votre nombre des batteries"
                v-model="useParc.nombre_batteriesEdit"
                class="input"
              />
            </div>
          </div>
        </div>

        <!--  -->
        <div class="cardItem">
          <div class="itemSelect">
            <div class="itemContainer">
              <h5>Contact <span>*</span></h5>
              <input
                type="text"
                placeholder="Votre nombre des batteries"
                v-model="useParc.phoneEdit"
                class="input"
              />
            </div>
          </div>
          <div class="itemSelect1">
            <div class="itemContainer">
              <h5>Notifier <span>*</span></h5>
              <div class="select">
                <div
                  class="selectItem"
                  :class="useParc.choixPhoneEdit === 'oui' ? 'selected' : ''"
                  @click="selectedFunc('phone', 'oui')"
                >
                  <h3>OUI</h3>
                </div>
                <div
                  class="selectItem"
                  :class="useParc.choixPhoneEdit === 'non' ? 'selected' : ''"
                  @click="selectedFunc('phone', 'non')"
                >
                  <h3>NON</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cardItem">
          <div class="itemSelect">
            <div class="itemContainer">
              <h5>Email <span>*</span></h5>
              <input
                type="email"
                placeholder="Votre email"
                v-model="useParc.emailEdit"
                class="input"
              />
            </div>
          </div>
          <div class="itemSelect1">
            <div class="itemContainer">
              <h5>Notifier <span>*</span></h5>
              <div class="select">
                <div
                  class="selectItem"
                  :class="useParc.choixEmailEdit === 'oui' ? 'selected' : ''"
                  @click="selectedFunc('email', 'oui')"
                >
                  <h3>OUI</h3>
                </div>
                <div
                  class="selectItem"
                  :class="useParc.choixEmailEdit === 'non' ? 'selected' : ''"
                  @click="selectedFunc('email', 'non')"
                >
                  <h3>NON</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <h6 class="obligatoire"><span>*</span> Champs Obligatoire</h6> -->
      </div>
    </div>

    <div class="list">
      <div class="titre">
        <div>
          <h4>Liste des Parcs</h4>
          <h5>
            Nombre : <span>{{ useParc.parcsData.length }}</span>
          </h5>
        </div>
        <div class="btnAdd" @click="show.showNewParcFunc()">
          <i class="pi pi-plus-circle" style="font-size: 20px; color: #fff"></i>
        </div>
      </div>
      <div class="containerList">
        <div
          class="item"
          v-for="parcItem in useParc.parcsData"
          :key="parcItem.id"
        >
          <div class="cardTitre">
            <div class="icon">
              <i
                class="pi pi-building-columns"
                style="font-size: 18px; color: #2d4051"
              ></i>
            </div>

            <div>
              <h4>{{ parcItem.nom_parc }}</h4>
              <h6>{{ parcItem.adresse }}</h6>
            </div>
          </div>
          <div class="btn">
            <div class="icon blue" @click="voir(parcItem)">
              <i class="pi pi-eye" style="font-size: 12px; color: #fff"></i>
            </div>

            <div
              class="icon red"
              @click="show.showDeleteParcFunc(parcItem.nom_parc, parcItem.id)"
            >
              <i class="pi pi-trash" style="font-size: 12px; color: #fff"></i>
            </div>
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
import { ref } from "vue";
import { formatDateAndTime } from "@/service/functionService";
// import { formatDateAndTime } from "@/service/emoji";
const show = useShow();
const user = useUser();
const useParc = parcStore();



function voir(parcItem) {
  show.showParcDetailFunc(parcItem);
  useParc.parcIdEdit = parcItem.id;
  console.log("aaaaaaaa", parcItem.id);
  console.log("eeeeee", useParc.parcIdEdit);
  // id = idParc;
}

function edit() {
  show.showEditParcFunc();
  useParc.nom_parcEdit =
    show.showParcDetailData.nom_parc || show.showParcDetailData.value.nom_parc;

  useParc.descriptionEdit =
    show.showParcDetailData.description ||
    show.showParcDetailData.value.description;

  useParc.adresseEdit =
    show.showParcDetailData.adresse || show.showParcDetailData.value.adresse;
  useParc.nombre_batteriesEdit =
    show.showParcDetailData.nombre_batteries ||
    show.showParcDetailData.value.nombre_batteries;

  let contacts =
    show.showParcDetailData.contacts || show.showParcDetailData.value.contacts;

  for (let item = 0; item < contacts.length; item++) {
    console.log(contacts[item]);
    if (contacts[item].type === "email") {
      useParc.emailEdit = contacts[item].valeur;
      useParc.choixEmailEdit = contacts[item].choix;
      useParc.idContactEmailEdit = contacts[item].id;
    } else {
      useParc.phoneEdit = contacts[item].valeur;
      useParc.choixPhoneEdit = contacts[item].choix;
      useParc.idContactPhoneEdit = contacts[item].id;
    }
  }
}

function selectedFunc(type, option) {
  if (type === "email") {
    useParc.choixEmailEdit = option;
  } else {
    useParc.choixPhoneEdit = option;
  }
}

function Enregistrer() {
  console.log("idparcedit", useParc.parcIdEdit);
  useParc.update(useParc.parcIdEdit)
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.desc {
  background-color: #f6f8fa;
  width: 60%;
  /* height: 76vh; */
  box-shadow: 0px 0px 5px rgb(189, 189, 189);
  border-radius: 5px;
  padding: 20px;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.title {
  background-color: #2d4051;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
}
span {
  font-weight: 800;
  color: #fb7b58d8;
}

.title h2 {
  color: #f0f0f0;
  font-weight: 700;
}

.title h5 {
  color: #c6c6c6;
  font-weight: 700;
}

.text {
  display: flex;
  background-color: rgba(188, 219, 253, 0.156);
  width: 90%;
  padding: 15px 20px;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  border-bottom: 1px solid #2d40515d;
  margin-bottom: 5px;
}
.text h4 {
  /* background-color: red; */
  width: 90%;
}

.list {
  background-color: #f6f8fa;
  width: 35%;
  height: 76vh;
  box-shadow: 0px 0px 5px rgb(189, 189, 189);
  border-radius: 5px;
}

.titre {
  background-color: #2d4051;

  margin: 20px 10px;
  border-radius: 5px;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.titre h4 {
  color: #ededed;
  font-weight: 600;
}

.titre h5 {
  color: #a1a1a1;
  font-weight: 600;
}
.btnAdd {
  background-color: rgb(105, 249, 105);
  width: 50px;
  height: 50px;
  /* padding: 5px 10px; */
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnAdd h4 {
  font-weight: 600;
  color: #fff;
}
.containerList {
  width: 96%;
  height: 55vh;
  margin: 5px auto;
  padding: 2px;
  overflow-y: scroll;
}
.item {
  display: flex;
  padding: 10px 5px;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(224, 224, 224);
  margin-bottom: 5px;
  border-radius: 5px;
}
.cardTitre {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: 60%;
  /* background-color: rebeccapurple; */
}
.cardTitre h4 {
  color: #2d4051;
  font-weight: 600;
}

.cardTitre h6 {
  color: #9a9b9b;
  font-size: 12px;
  font-weight: 500;
}
.btn {
  /* background-color: #247bc8; */
  display: flex;
  width: 40%;
  justify-content: space-around;
}
.icon {
  background-color: #fb7b5892;
  width: 32px;
  height: 32px;
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

.containerDesc {
  padding: 5px 10px;
}
.itemSelect {
  width: 60%;
}
.itemSelect1 {
  width: 35%;
}
.cardItem {
  display: flex;
  justify-content: space-between;
}
.select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  /* background-color: yellow; */
}
.selectItem {
  width: 40%;
  text-align: center;
  background-color: rgb(241, 241, 241);
  padding: 5px;
  border-radius: 5px;
  font-weight: 600;
}
.selected {
  background-color: rgb(2, 183, 80);
}
.itemContainer {
  width: 100%;
  margin: 10px 0px;
}
.itemContainer h4 {
  background-color: #e9f0f6;
  padding: 10px;
  border-radius: 5px;
}
.itemContainer h5 {
  display: block;
  font-weight: 600;
  width: 100%;
}
input {
  padding: 10px;
  width: 100%;
  border-radius: 2px;
  border: none;
  background-color: #2d405121;
}

.containerBtn {
  width: 25%;
  display: flex;
  justify-content: space-around;
  /* background-color: red; */
}
.btn1 {
  border: none;
  width: 100%;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: 600;
}
.fermer {
  color: #2d4051;
  border: 1px solid #2d4051;
}
.enregistrer {
  background-color: #fb7b58d8;
  color: #fff;
}
</style>
