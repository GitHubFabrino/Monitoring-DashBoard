<script setup>
import { useShow } from "../stores/show";
import { useUtilisateur } from "../stores/utilisateur";

const utilisateur = useUtilisateur();

const show = useShow();
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCompte">
      <div class="formModal">
        <div class="profilContainer">
          <!-- <button class="modifierImage">
            <i class="pi pi-camera" style="font-size: 20px; color: #2d4051"></i>
          </button> -->
          <div class="containerProfil">
            <div class="imageProfil">
              <img
                src="http://localhost:8081/api/utilisateurs/image/fileSystem/apirest-gestionContact-dependence.png"
                alt=""
                srcset=""
                class="image"
              />
            </div>
            <div class="descriptionProfil">
              <h3>{{ utilisateur.nomUtilisateur }}</h3>
              <h4>{{ utilisateur.prenomUtilisateur }}</h4>
            </div>
          </div>
          <div class="containerDesc">
            <div class="itemContainer">
              <h5>Email</h5>
              <h4>{{ utilisateur.emailUtilisateur }}</h4>
            </div>
            <div class="itemContainer">
              <h5>Numéro Téléphone</h5>
              <h4>{{ utilisateur.telephoneUtilisateur }}</h4>
            </div>
            <div class="itemContainer">
              <h5>Poste</h5>
              <h4>{{ utilisateur.posteUtilisateur }}</h4>
            </div>
          </div>

          <div class="containerBtn">
            <button class="btn fermer" @click="show.hiddenCompteFunc()">
              Fermer
            </button>
            <button
              class="btn enregistrer"
              @click="show.showCompteModifierFunc()"
            >
              Modifier
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
