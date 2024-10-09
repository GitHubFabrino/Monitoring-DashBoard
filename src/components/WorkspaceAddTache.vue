<template>
  <div class="activite">
    <div class="title">
      <h3>Tâche</h3>
      <button class="btnHidden" @click="show.hiddenAddFunc()">X</button>
    </div>
    <div class="text"><h3>Ajouter une Tâche</h3></div>

    <div class="conatiner">
      <div class="containerItem">
        <label for="">Titre du Tâche</label>
        <input type="text" placeholder="Titre du Tâche" />
      </div>
      <div class="contenu">
        <label for="">Contenu </label>
        <input type="textArea" name="" id="" />
      </div>
    </div>
    <div class="btnContainer">
      <div class="btn Annuler" @click="show.hiddenAddFunc()">
        <h3>Annuler</h3>
      </div>
      <div class="btn Enregistre"><h3>Enregistré</h3></div>
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useShow } from "../stores/show";
const show = useShow();
</script>

<style scoped>
/* .activite {
  padding: 10px;
} */
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
  padding: 10px;
  margin-top: 10px;
}

label {
  width: 100%;
  font-weight: 600;
  font-size: 13px;
}
input {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  margin-bottom: 10px;
  border: none;
  background-color: #2d405123;
  padding: 10px;
}
.contenu input {
  height: 150px;
}
.btnContainer {
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 10px;
  /* background-color: red; */
  padding: 10px;
  padding-top: 20px;
  justify-content: space-around;
  border-top: 2px solid #2d405145;
}
.btn {
  padding: 5px;
  /* background-color: aqua; */
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
</style>
