<script setup>
import { useShow } from "../stores/show";
import { useUtilisateur } from "../stores/utilisateur";
import { ref } from "vue";
const utilisateur = useUtilisateur();
const show = useShow();

const prenomMd = ref(utilisateur.prenomUtilisateur);

console.log(utilisateur.nomUtilisateur);

const nom = ref("");
const prenom = ref("");
const email = ref("");
const telephone = ref("");
const poste = ref("");

function enregistrer() {
  let requestData = {
    nom: utilisateur.nomUtilisateur,
    prenom: utilisateur.prenomUtilisateur,
    email: utilisateur.emailUtilisateur,
    telephone: utilisateur.telephoneUtilisateur,
    poste: utilisateur.posteUtilisateur,
  };

  console.log("request Data", requestData);
  utilisateur.modifierUtilisateur(requestData);
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCompteModifier">
      <div class="formModal">
        <div class="profilContainer">
          <div class="containerProfil">
            <div class="imageProfil">
              <img
                src="http://localhost:8081/api/utilisateurs/image/fileSystem/apirest-gestionContact-dependence.png"
                alt=""
                srcset=""
                class="image"
              />
              <button class="modifierImage">
                <i
                  class="pi pi-camera"
                  style="font-size: 20px; color: #2d4051"
                ></i>
              </button>
            </div>
            <div class="descriptionProfil">
              <!-- <h3>RAKOTOHARILALAINA modifier</h3>
              <h4>Pierret Fabrino</h4> -->
              <div class="itemContainer">
                <label for="">Nom</label>
                <input
                  type="text"
                  placeholder="Votre email"
                  v-model="utilisateur.nomUtilisateur"
                />
              </div>
              <div class="itemContainer">
                <label for="">Prénom</label>
                <input
                  type="text"
                  placeholder="Votre numéro"
                  v-model="utilisateur.prenomUtilisateur"
                />
              </div>
            </div>
          </div>
          <div class="containerDesc">
            <div class="itemContainer">
              <label for="">Email</label>
              <input
                type="text"
                placeholder="Votre email"
                v-model="utilisateur.emailUtilisateur"
              />
            </div>
            <div class="itemContainer">
              <label for="">Numéro Téléphone</label>
              <input
                type="text"
                placeholder="Votre numéro"
                v-model="utilisateur.telephoneUtilisateur"
              />
            </div>
            <div class="itemContainer">
              <label for="">Poste</label>
              <input
                type="text"
                placeholder="Votre Poste"
                v-model="utilisateur.posteUtilisateur"
              />
            </div>
            <h4 class="modifieMdp" @click="show.showModifierMdpFunc()">
              Modifier le mot de passe

              <i
                class="pi pi-angle-down"
                v-if="show.showIconDown"
                style="font-size: 1rem; color: #2d4051; padding-left: 10px"
              ></i>
              <i
                class="pi pi-angle-up"
                v-if="show.showIconUp"
                style="font-size: 1rem; color: #2d4051; padding-left: 10px"
              ></i>
            </h4>
            <div class="containerFlex" v-if="show.showModifierMdp">
              <div class="itemContainer">
                <label for="">Ancien Mot de passe</label>
                <input type="text" placeholder="Votre numéro" />
              </div>
              <div class="itemContainer">
                <label for="">Nouveaux</label>
                <input type="text" placeholder="Votre Poste" />
              </div>
            </div>
          </div>

          <div class="containerBtn">
            <button class="btn fermer" @click="show.hiddenCompteModifierFunc()">
              Fermer
            </button>
            <button class="btn enregistrer" @click="enregistrer">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
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
  width: 40%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  /* height: 580px; */
}
.descriptionProfil {
  width: 70%;
  margin-right: 10px;
}

.containerFlex {
  display: flex;
}
.modifierImage {
  position: relative;
  top: -30px;

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
  justify-content: space-between;
}

.imageProfil {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-right: 50px;
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

.itemContainer {
  width: 100%;
  margin: 10px 2px;
}
label {
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
.modifieMdp {
  padding: 10px;
  background-color: #e9f0f6;
  width: 40%;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
}
.modifieMdp:hover {
  background-color: #2d405171;
  transition: 0.5s;
}
</style>
