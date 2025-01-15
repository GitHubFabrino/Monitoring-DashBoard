<script setup>
import "primeicons/primeicons.css";
import { ref, watch, onMounted } from "vue";
import { useShow } from "@/stores/show";
import { useUser } from "@/stores/user";
import { parcStore } from "@/stores/parcStore";

const show = useShow();
const user = useUser();
const useParc = parcStore();
const transformName = () => {
  useParc.parc = useParc.parc.toUpperCase();
};
function Enregistrer() {
  useParc.register();
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showNewParc">
      <div class="formModal">
        <div class="profilContainer">
          <div class="containerDesc">
            <h1>Création d'un parc</h1>
            <div class="itemContainer">
              <h5>Nom du parc <span>*</span></h5>
              <input
                type="text"
                placeholder="NOM DU PARC"
                v-model="useParc.parc"
                class="input"
                @input="transformName"
              />
            </div>

            <div class="itemContainer">
              <h5>Description <span>*</span></h5>
              <input
                type="text"
                placeholder="La déscription du parc"
                v-model="useParc.description"
                class="input"
              />
            </div>

            <div class="itemContainer">
              <h5>Adresse <span>*</span></h5>
              <input
                type="text"
                placeholder="L'adresse du parc"
                v-model="useParc.adresse"
                class="input"
              />
            </div>
            <div class="itemContainer">
              <h5>Nombre de batterie <span>*</span></h5>
              <input
                type="number"
                min="1"
                placeholder="Votre nombre des batteries"
                v-model="useParc.nombreBat"
                class="input"
              />
            </div>
            <div class="itemContainer">
              <h5>Contact <span>*</span></h5>
              <input
                type="text"
                placeholder="Votre nombre des batteries"
                v-model="useParc.phone"
                class="input"
              />
            </div>
            <div class="itemContainer">
              <h5>Email <span>*</span></h5>
              <input
                type="email"
                placeholder="Votre email"
                v-model="useParc.email"
                class="input"
              />
            </div>

            <h6 class="obligatoire"><span>*</span> Champs Obligatoire</h6>
          </div>

          <div class="containerBtn">
            <button class="btn fermer" @click="show.showNewParcFunc()">
              Annuler
            </button>
            <button class="btn enregistrer" @click="Enregistrer()">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.obligatoire {
  font-size: 10px;
  font-weight: 600;
}
span {
  color: red;
}
.showModal {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(92, 90, 90, 0.927);
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(43, 38, 38, 0.801);
  justify-content: center;
  align-items: center;
}

.formModal {
  width: 30%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.modifierImage {
  position: absolute;
  top: 200px;
  left: 570px;
  border: 1px solid #2d405124;
  border-radius: 100%;
  background-color: #fff;

  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.containerProfil {
  width: 100%;
  display: flex;
  align-items: center;
}

.imageProfil {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-right: 50px;
}
.descriptionProfil h3 {
  display: block;
  font-weight: 600;
  width: 100%;
  font-size: 20px;
}
.image {
  width: 100%;
  height: 100%;
  border: 2px solid #2d405121;
  border-radius: 100%;
}

.containerDesc {
  padding: 10px;
}

.containerDesc h1 {
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 5px solid rgb(160, 160, 160);
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
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.btn {
  border: none;
  width: 35%;
  padding: 10px;
  border-radius: 4px;
  font-weight: 600;
}
.fermer {
  color: #2d4051;
  border: 1px solid #2d4051;
}
.enregistrer {
  background-color: #2d4051;
  color: #fff;
}
</style>
