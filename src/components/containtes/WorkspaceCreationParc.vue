<template>
  <template v-if="useParc.parcsData.length !== 0">
    <div class="flex justify-between w-full h-full">

      <div class="w-[60%] p-3 bg-[#f6f8fa] shadow-md rounded-xl" v-if="show.showParcDetail">
        <div class="title">
          <div>
            <h2>
              {{
                show.showParcDetailData.nom_parc ||
                show.showParcDetailData.value.nom_parc
              }}
            </h2>
            <h5 class="text-[#c6c6c6]  text-sm">
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
            <i
              class="pi pi-map-marker"
              style="font-size: 18px; color: #fff"
            ></i>
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

      <div class="bg-[#f6f8fa] w-[35%] h-full shadow-md rounded-xl p-3">


        <div class="titre">
          <div>
            <h4>Liste des Parcs</h4>
            <h5 class="text-sm">
              Nombre : <span>{{ useParc.parcsData.length }}</span>
            </h5>
          </div>
          <div class="btnAdd" @click="show.showNewParcFunc()">
            <i
              class="pi pi-plus-circle"
              style="font-size: 15px; color: #fff"
            ></i>
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
  <template v-else>
    <div class="container">
      <div class="containerEmptyParc">
        <div class="w-full flex items-center flex-wrap justify-center gap-10">
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
                Aucun parc à surveiller
              </h2>
              <p
                class="text-center text-black text-base font-normal leading-relaxed pb-4"
              >
                Créez un parc pour commencer
              </p>

              <div class="flex1 gap-3">
                <button
                  class="w-full px-3 py-2 rounded-full border border-gray-300 text-gray-900 text-xs font-semibold leading-4"
                >
                  Plus tard
                </button>
                <button
                  @click="show.showNewParc = !show.showNewParc"
                  class="w-full px-3 btnCreer py-2 transition-all duration-500 rounded-full text-white text-xs font-semibold leading-4"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useShow } from "@/stores/show";
import { useUser } from "@/stores/user";
import { parcStore } from "@/stores/parcStore";

const show = useShow();
const user = useUser();
const useParc = parcStore();

import { ref } from "vue";
import { formatDateAndTime } from "@/service/functionService";

function voir(parcItem) {
  show.showParcDetailFunc(parcItem);
  useParc.parcIdEdit = parcItem.id;

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
  useParc.update(useParc.parcIdEdit);
}
</script>

<style scoped>

.flex1 {
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

.containerEmptyParc {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 76vh;
  /* background-color: rebeccapurple; */
  /* background-color: #fb7a58; */
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


.titre {
  background-color: #2d4051;

  /* margin: 20px 10px; */
  border-radius: 5px;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btnCreer {
  background-color: #fb7a58;
}
.btnCreer:hover {
  background-color: #f5572c;
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
  width: 30px;
  height: 30px;
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
