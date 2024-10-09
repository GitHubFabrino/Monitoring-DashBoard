<script setup>
import { useShow } from "../stores/show";

const show = useShow();
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showModifierContact">
      <div class="formModal">
        <div class="title">
          <h3>Modifier un contact</h3>
        </div>
        <div class="containerDesc">
          <div class="containerFlex">
            <div class="item1">
              <div class="itemContainer">
                <label for="">Email <span>*</span></label>
                <input type="text" placeholder="Votre email" />
              </div>
              <div class="itemContainer">
                <label for="">Prénom <span>*</span></label>
                <input type="text" placeholder="Votre Prénom" />
              </div>
              <div class="itemContainer">
                <label for="">Nom <span>*</span></label>
                <input type="text" placeholder="Votre nom" />
              </div>
            </div>
            <div class="item2">
              <div class="imageProfil">
                <img
                  src="../../public/hackingImage.png"
                  alt=""
                  srcset=""
                  class="image"
                />
              </div>
              <div class="btn modifier">
                <h4>Changer</h4>
              </div>
            </div>
          </div>
          <div class="itemContainer">
            <label for="">Numéro Téléphone <span>*</span></label>
            <input type="text" placeholder="Votre numéro" />
          </div>
          <div class="company">
            <div class="itemContainer">
              <label for="">Company</label>
              <input type="text" placeholder="Votre Company" />
            </div>
            <div class="itemContainer margin">
              <label for="">Poste</label>
              <input type="text" placeholder="Votre Poste" />
            </div>
          </div>
        </div>
        <div class="btnContainer">
          <div class="btn creer">
            <h4>Enrégistrer</h4>
          </div>
          <div
            class="btn annuler"
            @click="show.hiddenModificationContactFunc()"
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

.imageProfil {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: auto;
}
.image {
  width: 100%;
  height: 100%;
  border: 2px solid #2d405121;
  border-radius: 100%;
}
.formModal {
  width: 40%;
  background-color: #fff;
  border-radius: 2px;
  padding: 20px;
}

.containerDesc {
  padding: 10px;
}

.itemContainer {
  width: 100%;
  margin: 10px 0px;
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
  margin-left: 10px;
}
.btnContainer {
  /* background-color: red; */
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
  width: 30%;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #fff;
}
.creer h4 {
  font-weight: 600;
}

.creerEtAjouter h4,
.annuler h4 {
  font-weight: 600;
}
.annuler {
  background-color: #fb7a58;
  /* border: 2px solid #fb7a58; */
  padding: 0px 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
}

.btn:hover {
  opacity: 0.75;
}
.title h3 {
  color: #328ca8;
  /* font-weight: 800; */
}
span {
  color: #fb7a58;
}

.containerFlex {
  display: flex;
  justify-content: space-between;
}
.item1 {
  width: 70%;
}
.item2 {
  width: 30%;
}
.modifier {
  /* background-color: #fb7a58; */
  border: 2px solid #fb7a58;
  border-radius: 5px;
  margin: 20px 10px;
  text-align: center;
  color: #fb7a58;
  font-weight: 600;
}
</style>
