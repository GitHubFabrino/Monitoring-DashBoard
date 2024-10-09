<script setup>
import { useShow } from "../stores/show";

const show = useShow();
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showAddContactEntreprise">
      <div class="formModal">
        <div class="title">
          <h3>Créer un contact d'une entreprise</h3>
        </div>
        <div class="containerDesc">
          <div class="itemContainer">
            <label for="">Nom de l'entreprise <span>*</span></label>
            <input type="text" placeholder="Votre email" />
          </div>
          <div class="company">
            <div class="itemContainer">
              <label for="">Propriétaire <span>*</span></label>
              <input type="text" placeholder="Votre Prénom" />
            </div>
            <div class="itemContainer">
              <label for="">Responsable <span>*</span></label>
              <input type="text" placeholder="Votre nom" />
            </div>
          </div>
          <div class="company">
            <div class="itemContainer">
              <label for="">Nom de domaine</label>
              <input type="text" placeholder="Votre numéro" />
            </div>
            <div class="itemContainer">
              <label for="">Numéro téléphone <span>*</span></label>
              <input type="text" placeholder="Votre numéro" />
            </div>
          </div>
          <div class="itemContainer">
            <label for="">Secteur d'activité<span>*</span></label>
            <input type="text" placeholder="Votre numéro" />
          </div>

          <div class="company">
            <div class="itemContainer">
              <label for="">Ville<span>*</span></label>
              <input type="text" placeholder="Votre Company" />
            </div>
            <div class="itemContainer margin">
              <label for="">Code Postale<span>*</span></label>
              <input type="text" placeholder="Votre Poste" />
            </div>
          </div>
          <div class="itemContainer">
            <label for="">Image profil ou logo<span>*</span></label>
            <input type="text" placeholder="Votre Poste" />
          </div>
        </div>
        <div class="btnContainer">
          <div class="btn creer">
            <h4>Créer</h4>
          </div>
          <div class="btn creerEtAjouter">
            <h4>Créer et Ajouter une autre</h4>
          </div>
          <div
            class="btn annuler"
            @click="show.hiddenAddContactEntrepriseFunc()"
          >
            <h4>Annuler</h4>
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
  width: 45%;
  background-color: #fff;
  border-radius: 2px;
  padding: 20px;
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
.company {
  display: flex;
  justify-content: space-between;
}
.margin {
  margin-left: 2px;
}
.btnContainer {
  display: flex;
  padding: 10px;
  justify-content: space-around;
}
.btn {
  padding: 5px;
  border-radius: 2px;
  cursor: pointer;
}
.creer {
  background-color: #2d4051;
  width: 100px;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #fff;
}
.creer h4 {
  font-weight: 600;
}
.creerEtAjouter {
  background-color: #328ca8;
  padding: 0px 10px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.creerEtAjouter h4,
.annuler h4 {
  font-weight: 600;
}
.annuler {
  background-color: #fb7a58;
  padding: 0px 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn:hover {
  opacity: 0.75;
}
.title h3 {
  color: #328ca8;
}
span {
  color: #fb7a58;
}
</style>
