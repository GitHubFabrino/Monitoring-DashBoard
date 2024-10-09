<template>
  <div class="nav">
    <div class="logo">
      <img src="" alt="" />
    </div>
    <div class="navLink">
      <RouterLink to="/" class="router-link">Contact </RouterLink>
      <RouterLink to="/conversation" class="router-link"
        >Conversation</RouterLink
      >
    </div>
    <div class="itemSup">
      <div class="item">
        <i class="pi pi-search" style="font-size: 18px; color: #fff"></i>
      </div>
      <div class="item">
        <i class="pi pi-cog" style="font-size: 18px; color: #fff"></i>
      </div>
      <div class="item">
        <i class="pi pi-phone" style="font-size: 18px; color: #fff"></i>
      </div>
      <div class="item">
        <i class="pi pi-bell" style="font-size: 18px; color: #fff"></i>
      </div>
    </div>
    <div class="userProfil">
      <div class="profilImage">
        <img
          src="http://localhost:8081/api/utilisateurs/image/fileSystem/apirest-gestionContact-dependence.png"
          alt=""
          srcset=""
          class="image"
        />
      </div>
      <button class="btn" @click="show.showProfilFunc()">
        <i
          class="pi pi-angle-down"
          v-if="show.hidenProfil"
          style="font-size: 1rem; color: #fff"
        ></i>
        <i
          class="pi pi-angle-up"
          v-if="show.showProfil"
          style="font-size: 1rem; color: #fff"
        ></i>
      </button>
    </div>
  </div>
  <div class="contenuUserProfil" v-if="show.showProfil">
    <div class="name">
      <h3>{{ utilisateur.nomUtilisateur }}</h3>
      <h4>{{ utilisateur.prenomUtilisateur }}</h4>
    </div>
    <div class="myProfil" @click="show.showCompteFunc()">
      <i class="pi pi-user" style="font-size: 18px; color: #2d4051"></i>
      <h4>Mon Profil</h4>
    </div>
    <div class="myProfil" @click="show.showDeconnexionFunc()">
      <i class="pi pi-sign-out" style="font-size: 18px; color: #2d4051"></i>
      <h4>Déconnecté</h4>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useShow } from "../stores/show";
import "primeicons/primeicons.css";
import { useUtilisateur } from "../stores/utilisateur";
import { onBeforeMount } from "vue";
import { Cookies } from "@/plugins/cookies";

const show = useShow();
const cookies = new Cookies();
const utilisateur = useUtilisateur();
onBeforeMount(() => {
  console.log(cookies.get("idPersonne"));
  utilisateur.getOneUtilisateur(cookies.get("idPersonne"));
});
</script>

<style scoped>
.nav {
  display: flex;
  background-color: #2d4051;
  padding: 0px 10px 0px 40px;
  justify-content: space-around;
}
.logo {
  width: 60px;
  height: 60px;
  background-color: red;
  padding: 5px;
}
.navLink {
  width: 65%;
  display: flex;
  align-items: center;
}

.router-link {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  margin: 0px 20px;
  cursor: pointer;
}
.router-link-active {
  color: #fb7a58;
}

.itemSup {
  width: 12%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.item {
  width: 30px;
  height: 30px;
  background-color: #2d4051;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.userProfil {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.profilImage {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: black;
  margin-right: 5px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  border: none;
  background-color: #2d4051;
}
.image {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: black;
}

.contenuUserProfil {
  position: absolute;
  top: 70px;
  right: 10px;
  background-color: #fff;
  width: 300px;
  text-align: center;
  padding: 10px 10px 0px 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #2d4051ae;
}
.name {
  margin-bottom: 10px;
}
.name h3 {
  font-weight: 600;
}
.myProfil {
  display: flex;
  padding: 10px;
  border-top: 1px solid #2d40516c;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
}

.myProfil:hover {
  background-color: #2d405115;
}
.myProfil h4 {
  display: block;
  width: 80%;
}
</style>
