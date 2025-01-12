<template>
  <div class="container">
    <div class="titre">
      <h3>Plage de fonctionnement des batteries</h3>
      <div class="btn" @click="show.showCreationParamBattFunc()">
        <i class="pi pi-plus-circle" style="font-size: 16px; color: #fff"></i>
      </div>
    </div>
    <div class="contenu">
      <div class="item">
        <div class="name">
          <div class="titreName">
            <h3>Batterie 1</h3>
            <h5>Parc 01</h5>
          </div>
          <i
            class="pi pi-pen-to-square"
            style="font-size: 16px; color: #2d4051"
          ></i>
        </div>
        <h4>Decription</h4>
        <div class="detail">
          <div class="detailItem">
            <h4>Marque</h4>
            <h4>Tension Nominal</h4>
            <h4>Capacité</h4>
            <h4>utilisation en veille</h4>
            <h4>utilisation cyclique</h4>
            <h4>Courant</h4>
            <h4>Température</h4>
            <h4>DOD Max</h4>
          </div>
          <div class="valeur">
            <h4>BT</h4>
            <h4>12V</h4>
            <h4>100Ah</h4>
            <h4>13.5 - 13.8 V</h4>
            <h4>14.4 - 14.7V</h4>
            <h4>30A</h4>
            <h4>25°C</h4>
            <h4>20%</h4>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="name">
          <div class="titreName">
            <h3>Batterie 2</h3>
            <h5>Parc 01</h5>
          </div>
          <i
            class="pi pi-pen-to-square"
            style="font-size: 16px; color: #2d4051"
          ></i>
        </div>
        <h4>Decription</h4>
        <div class="detail">
          <div class="detailItem">
            <h4>Marque</h4>
            <h4>Tension Nominal</h4>
            <h4>Capacité</h4>
            <h4>utilisation en veille</h4>
            <h4>utilisation cyclique</h4>
            <h4>Courant</h4>
            <h4>Température</h4>
            <h4>DOD Max</h4>
          </div>
          <div class="valeur">
            <h4>BT</h4>
            <h4>12V</h4>
            <h4>100Ah</h4>
            <h4>13.5 - 13.8 V</h4>
            <h4>14.4 - 14.7V</h4>
            <h4>30A</h4>
            <h4>25°C</h4>
            <h4>20%</h4>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="name">
          <div class="titreName">
            <h3>Batterie 3</h3>
            <h5>Parc 01</h5>
          </div>
          <i
            class="pi pi-pen-to-square"
            style="font-size: 16px; color: #2d4051"
          ></i>
        </div>
        <h4>Decription</h4>
        <div class="detail">
          <div class="detailItem">
            <h4>Marque</h4>
            <h4>Tension Nominal</h4>
            <h4>Capacité</h4>
            <h4>utilisation en veille</h4>
            <h4>utilisation cyclique</h4>
            <h4>Courant</h4>
            <h4>Température</h4>
            <h4>DOD Max</h4>
          </div>
          <div class="valeur">
            <h4>BT</h4>
            <h4>12V</h4>
            <h4>100Ah</h4>
            <h4>13.5 - 13.8 V</h4>
            <h4>14.4 - 14.7V</h4>
            <h4>30A</h4>
            <h4>25°C</h4>
            <h4>20%</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import { useShow } from "@/stores/show";

const show = useShow();
</script>

<style scoped>
.container {
  background-color: #f6f8fa;
  width: 100%;
  height: 76vh;
  box-shadow: 0px 0px 5px rgb(189, 189, 189);
  border-radius: 5px;
  padding: 20px;
}

.titre h3 {
  font-weight: 600;
  width: 60%;
}
.titre {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #d3d3d3;
  align-items: center;
}
.btn {
  background-color: #fb7a58;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contenu {
  display: flex;
  justify-content: space-around;
}

.item {
  background-color: #8be2fc33;
  width: 30%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
}
.item h4 {
  padding: 5px;
}
.name {
  display: flex;
  /* background-color: red; */
  justify-content: space-between;
  border-bottom: 2px solid #328ca8;
  margin-bottom: 5px;
}
.name h3 {
  color: #328ca8;
  font-weight: 600;
}
.name h5 {
  font-weight: 600;
}

.detail {
  display: flex;
  justify-content: space-between;
}
.valeur h4 {
  font-weight: 600;
}
</style>
