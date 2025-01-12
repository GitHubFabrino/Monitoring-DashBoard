<template>
  <div class="navBar">
    <div class="linka">
      <h3 class="liking" @click="show.setActiveItem('Acceuil')">Acceuil</h3>
      <!-- <RouterLink to="" class="liking">Contact </RouterLink> -->
      <h3 class="liking">Utilisateurs</h3>
      <!-- <h3 class="liking">Paramètres</h3> -->
    </div>
    <div class="profil">
      <div class="notif">
        <div class="notification show" @click="show.showNotificationFunc()">
          <span>6</span>
          <i class="pi pi-bell" style="font-size: 18px; color: #fff"></i>
          <h5 class="text">Notification</h5>
        </div>
        <div class="Mail show" @click="show.showEmailFunc()">
          <span>4</span>
          <i class="pi pi-envelope" style="font-size: 18px; color: #fff"></i>
          <h5 class="text">Mail</h5>
        </div>
      </div>
      <div class="photo" @click="show.showDescFunc()">
        <img
          class="photo"
          src="/admin.png"
          alt=""
          width="100%"
          height="100%"
        />
      </div>

      <div
        class="showProfil"
        v-if="show.showDesc"
        @click.self="show.closeProfile()"
      >
        <div class="section">
          <div class="sectionItem">
            <h4 class="textSection">Compte</h4>
          </div>

          <div class="container">
            <div class="imageProfil">
              <img
                class="photo"
                src="/admin.png"
                alt=""
                width="100%"
                height="100%"
              />
            </div>
            <div class="info">
              <h4>{{name}}</h4>
              <h5>{{ email }}</h5>
            </div>
          </div>

          <div class="items">
            <div class="option">
              <i
                class="pi pi-user-edit"
                style="font-size: 18px; color: #2d4051"
              ></i>
              <h5 class="item">Mon Profil</h5>
            </div>

            <div class="option">
              <i
                class="pi pi-sign-out"
                style="font-size: 14px; color: #2d4051"
              ></i>
              <h5 class="item">Déconnection</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="notificationContainer" v-if="show.showNotification">
        <div class="titre">
          <h4>Notification</h4>
          <div class="nb"><h5>3</h5></div>
        </div>
        <div class="itemNotif">
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 12px; color: #2d4051"></i>
          </div>
          <div class="textNotif">
            <h4>Batterie 01</h4>
            <h5>6h</h5>
          </div>
          <div class="icon">
            <i
              class="pi pi-ellipsis-v"
              style="font-size: 14px; color: #2d4051"
            ></i>
          </div>
        </div>

        <div class="itemNotif">
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 12px; color: #2d4051"></i>
          </div>
          <div class="textNotif">
            <h4>Batterie 01</h4>
            <h5>6h</h5>
          </div>
          <div class="icon">
            <i
              class="pi pi-ellipsis-v"
              style="font-size: 14px; color: #2d4051"
            ></i>
          </div>
        </div>

        <div class="itemNotif">
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 12px; color: #2d4051"></i>
          </div>
          <div class="textNotif">
            <h4>Batterie 01</h4>
            <h5>6h</h5>
          </div>
          <div class="icon">
            <i
              class="pi pi-ellipsis-v"
              style="font-size: 14px; color: #2d4051"
            ></i>
          </div>
        </div>
      </div>

      <div class="notificationContainer" v-if="show.showEmail">
        <div class="titre">
          <h4>Email</h4>
          <div class="nb"><h5>3</h5></div>
        </div>
        <div class="itemNotif">
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 12px; color: #2d4051"></i>
          </div>
          <div class="textNotif">
            <h4>Batterie 01</h4>
            <h5>6h</h5>
          </div>
          <div class="icon">
            <i
              class="pi pi-ellipsis-v"
              style="font-size: 14px; color: #2d4051"
            ></i>
          </div>
        </div>

        <div class="itemNotif">
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 12px; color: #2d4051"></i>
          </div>
          <div class="textNotif">
            <h4>Batterie 01</h4>
            <h5>6h</h5>
          </div>
          <div class="icon">
            <i
              class="pi pi-ellipsis-v"
              style="font-size: 14px; color: #2d4051"
            ></i>
          </div>
        </div>

        <div class="itemNotif">
          <div class="icon">
            <i class="pi pi-bolt" style="font-size: 12px; color: #2d4051"></i>
          </div>
          <div class="textNotif">
            <h4>Batterie 01</h4>
            <h5>6h</h5>
          </div>
          <div class="icon">
            <i
              class="pi pi-ellipsis-v"
              style="font-size: 14px; color: #2d4051"
            ></i>
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

import { ref } from "vue";


</script>

<style scoped>
.navBar {
  height: 10vh;
  background-color: #2d4051;
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
  color: #f6f8fa;
  font-weight: 500;
  font-size: 15px;
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
  background-color: #89bece;
  font-weight: 500;
}

.show:hover .text {
  display: block;
}

.showProfil {
  position: absolute;
  background-color: #f6f8fa;
  width: 22%;
  top: 70px;
  right: 12px;
  border-radius: 5px;
  text-align: left;
  /* padding-bottom: 20px; */
  box-shadow: 0px 0px 5px rgb(210, 208, 208);
  z-index: 10000;
}

.container {
  padding: 5px 5px;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  color: #b9b6b6;
  margin: 5px 0px;
}

.imageProfil {
  background-color: aqua;
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
.info {
  width: 70%;
  overflow: hidden;
  color: #2d4051;
}
.info h4 {
  font-weight: 600;
  color: #2d4051;
}

.info h5 {
  font-weight: 500;
  color: #b1b5ba;
}

.textSection {
  color: #b9b6b6;
  font-weight: 700;
}
.sectionItem {
  background-color: #2d4051;
  border-radius: 5px 5px 0px 0px;
  padding: 5px 20px;
}
.item {
  color: #2d4051;
  padding: 4px 20px;
  font-weight: 600;
}

.option {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 10px 10px;
  margin: 0px auto;
  border-top: 1px solid #56636e5e;
  width: 90%;
}

.option:hover {
  background-color: #c8c9ca2a;
}
span {
  width: 14px;
  height: 14px;
  background-color: #fb7a58;
  border-radius: 100%;
  position: relative;
  top: 10px;
  /* right: 100px; */
  left: 10px;
  font-size: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f6f8fa;
}

.notificationContainer {
  position: absolute;
  background-color: rgb(255, 255, 255);
  top: 65px;
  right: 60px;
  width: 20%;
  text-align: left !important;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 2px 10px rgb(222, 222, 222);
  z-index: 5000;
}
.titre {
  padding: 5px 10px;
  background-color: #89bece2d;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nb {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fb7a58;
  width: 25px;
  height: 25px;
  border-radius: 100%;
}
.nb h5 {
  color: #fff;
  font-weight: 600;
}
.titre h4 {
  color: #2d4051;
  font-weight: 700;
}

.itemNotif {
  display: flex;
  background-color: #dad8d890;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-top: 5px;
  border-radius: 2px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.textNotif {
  display: flex;
  width: 70%;
  justify-content: space-between;
  align-items: center;
  /* background-color: yellow; */
}

.textNotif h4,
.textNotif h5 {
  font-weight: 600;
}
</style>
