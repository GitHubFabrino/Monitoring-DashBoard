<template>
  <div class="activite">
    <div class="title">
      <div class="infoCall">
        <h3>Fabrino</h3>
        <h4>+261 34 05 854 28</h4>
      </div>
      <div class="timeCall">
        <h4>00:50</h4>
      </div>
      <div
        class="btnCutCall"
        v-if="show.hiddenCall"
        @click="show.showCallFunc()"
      >
        <i class="pi pi-phone" style="font-size: 18px; color: #fff"></i>
      </div>
      <div
        class="btnTakeCall"
        v-if="show.showCall"
        @click="show.showCallFunc()"
      >
        <i class="pi pi-phone" style="font-size: 18px; color: #fff"></i>
      </div>
    </div>

    <div class="conatiner">
      <label for="">Notes</label>
      <div class="contenu">
        <input type="textArea" name="" id="" />
      </div>
    </div>
    <div class="btnContainer">
      <div class="btn Annuler" @click="show.hiddenAddFunc()">
        <h3>Fermer</h3>
        <i
          class="pi pi-unsave"
          style="font-size: 18px; color: #2d4051; padding-left: 20px"
        ></i>
      </div>
      <div class="btn Enregistre">
        <h3>Enregistrer</h3>
        <i
          class="pi pi-save"
          style="font-size: 18px; color: #fff; padding-left: 20px"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useShow } from "../stores/show";
const show = useShow();
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  background-color: #2d4051;
  align-items: center;
  padding: 10px;
}
.infoCall {
  width: 65%;
}
.infoCall h4 {
  color: #fb7a58;
  font-weight: 600;
}
.timeCall {
  color: #a9abac;
}
.btnCutCall {
  background-color: red;
  padding: 8px;
  width: 100px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btnTakeCall {
  background-color: rgb(11, 170, 11);
  padding: 8px;
  width: 100px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title h3 {
  color: #fff;
  font-weight: 700;
}
.text {
  padding: 10px 20px;
  margin-top: 20px;
}
.btnHidden {
  border: none;
  background-color: #2d4051;
  color: #fff;
  font-size: 15px;
}
.conatiner {
  padding: 5px 10px;
  margin-top: 5px;
}

label {
  width: 100%;
}
input {
  width: 100%;
  border-radius: 5px;
  border: none;
  background-color: #2d405123;
  padding: 10px;
}
.contenu input {
  height: 250px;
}
.btnContainer {
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 10px;
  padding: 10px;
  padding-top: 20px;
  justify-content: space-around;
  border-top: 2px solid #2d405145;
}
.btn {
  padding: 5px;
  width: 40%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 2px;
}
.Enregistre {
  background-color: #2d4051;
  color: #fff;
}
.Enregistre h3,
.Annuler h3 {
  font-size: 12px;
  font-weight: 700;
}
.Annuler {
  border: 2px solid #2d4051;
}

.destination {
  display: flex;
  padding: 10px;
}
.destination h3 {
  font-size: 12px;
  font-weight: 600;
  padding-right: 20px;
}
.objet {
  display: flex;
  padding: 10px;
  align-items: center;
}
.objet label {
  font-size: 12px;
  width: 100px;
}
.objet input {
  align-self: center;
}
</style>
