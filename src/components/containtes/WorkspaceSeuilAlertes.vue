<template>
  <div class="container">
    <div class="titre">
      <h3>Seuil d'alerte des batteries</h3>
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
        <div class="detail">
          <div class="detailItem">
            <h4>Tension</h4>
            <h4>Courant</h4>
            <h4>Température</h4>
            <h4>DOD Max</h4>
          </div>
          <div class="valeur">
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
            <h3>Batterie 1</h3>
            <h5>Parc 01</h5>
          </div>
          <i
            class="pi pi-pen-to-square"
            style="font-size: 16px; color: #2d4051"
          ></i>
        </div>
        <div class="detail">
          <div class="detailItem">
            <h4>Tension</h4>
            <h4>Courant</h4>
            <h4>Température</h4>
            <h4>DOD Max</h4>
          </div>
          <div class="valeur">
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
            <h3>Batterie 1</h3>
            <h5>Parc 01</h5>
          </div>
          <i
            class="pi pi-pen-to-square"
            style="font-size: 16px; color: #2d4051"
          ></i>
        </div>
        <div class="detail">
          <div class="detailItem">
            <h4>Tension</h4>
            <h4>Courant</h4>
            <h4>Température</h4>
            <h4>DOD Max</h4>
          </div>
          <div class="valeur">
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
  background-color: #fb7b582d;
  width: 30%;
  padding: 10px;
  margin-top: 30px;
  border-radius: 5px;
}
.item h4 {
  padding: 5px;
}
.name {
  display: flex;
  /* background-color: red; */
  justify-content: space-between;
  border-bottom: 2px solid #fb7a58;
  margin-bottom: 5px;
}
.name h3 {
  color: #fb7a58;
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
