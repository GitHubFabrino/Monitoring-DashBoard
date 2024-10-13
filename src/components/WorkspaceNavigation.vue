<template>
  <div class="navBar">
    <div class="linka">
      <h3 class="liking">Acceuil</h3>
      <h3 class="liking">Utilisateurs</h3>
      <h3 class="liking">Parametres</h3>
    </div>
    <div class="profil">
      <div class="notif">
        <div class="notification show">
          <i class="pi pi-bell" style="font-size: 18px; color: #fff"></i>
          <h4 class="text">Notification</h4>
        </div>
        <div class="Mail show">
          <i class="pi pi-envelope" style="font-size: 18px; color: #fff"></i>
          <h4 class="text">Mail</h4>
        </div>
      </div>
      <div class="photo" @click="show.showDescFunc()">P</div>

      <div class="showProfil" v-if="show.showDesc">
        <div class="section">
          <div class="sectionItem">
            <h3 class="textSection">Compte</h3>
          </div>
          <div class="items">
            <h3 class="item">Lorem</h3>
            <h3 class="item">Lorem</h3>
            <h3 class="item">Lorem</h3>
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
.navBar {
  height: 10vh;
  background-color: #2f333e;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.linka {
  width: 60%;
  display: flex;
  margin-left: 20px;
}

.liking {
  padding: 0px 10px;
  color: #d4d1d1;
}

.liking:hover {
  border-radius: 2px;
  background-color: #1d222b;
}
.profil {
  width: 20%;
  text-align: right;
  display: flex;
  justify-content: space-between;
}
.photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: chartreuse;
  text-align: center;
  margin-right: 10px;
}
.notif {
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.text {
  position: absolute;
  display: none;
  color: #ffffff;
  font: weight 700px;
  padding: 2px 5px;
  border-radius: 2px;
  background-color: rgb(167, 167, 167);
}

.show:hover .text {
  display: block;
}

.showProfil {
  position: absolute;
  background-color: #2f333e;
  width: 200px;
  top: 70px;
  border-radius: 10px;
  text-align: left;
}

.textSection {
  color: #b9b6b6;
}
.sectionItem {
  background-color: #545c73;
  border-radius: 10px 10px 0px 0px;
  padding: 5px;
}
.items {
}
.item {
  color: #fff;
  padding: 4px 10px;
}
.item:hover {
  background-color: #919294;
}
</style>
