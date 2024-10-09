<template>
  <div class="activite">
    <div class="title">
      <h3>E-mail</h3>
      <button class="btnHidden" @click="show.hiddenAddFunc()">X</button>
    </div>
    <div class="destination">
      <h3>A</h3>
      <h3 class="emaildestination">rakotoharilalainafabrinogmail.com</h3>
    </div>
    <div class="destination">
      <h3>De</h3>
      <h3 class="emailDe">rakotoharilalainafabrinogmail.com</h3>
    </div>

    <div class="objet">
      <label for="">Objet</label>
      <input type="text" class="contenuObjet" />
    </div>

    <div class="conatiner">
      <div class="contenu">
        <input type="textArea" name="" id="" />
      </div>
    </div>
    <div class="btnContainer">
      <div class="btn Annuler" @click="show.hiddenAddFunc()">
        <h3>Annuler</h3>
      </div>
      <div class="btn Enregistre">
        <h3>Envoyer</h3>
        <i
          class="pi pi-send"
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
  padding: 10px;
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
  height: 200px;
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
