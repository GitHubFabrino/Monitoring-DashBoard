<script setup>
import "primeicons/primeicons.css";
import { ref, watch, onMounted } from "vue";
import { useShow } from "@/stores/show";
import { useUser } from "@/stores/user";

const show = useShow();
const user = useUser();

function logoutFunc() {
  user.logout();
}
</script>

<template>
  <Transition>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50"
    v-if="show.showLogout" @click="show.showLogoutFunc()">
      <div class="formModal" @click.stop>
        <div class="profilContainer">
          <div class="containerProfil">
            <div class="descriptionProfil">
              <h3 class="text-gray-400">Voulez vous vraiment se déconnecté ?</h3>
            </div>
          </div>
          <div class="containerBtn">
            <button class="btn fermer" @click="show.showLogoutFunc()">
              Annuller
            </button>
            <button
              class="btn enregistrer"
              @click="logoutFunc"
            >
              Confirmé
            </button>
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
  z-index: 1005;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(43, 38, 38, 0.801);
  justify-content: center;
  align-items: center;
}

.formModal {
  width: 30%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.containerProfil {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.descriptionProfil h3 {
  display: block;
  font-weight: 600;
  width: 100%;
  font-size: 16px;
  padding: 10px;
}

.containerDesc {
  padding: 10px;
}

.itemContainer {
  width: 100%;
  margin: 10px 0px;
}
.itemContainer h4 {
  background-color: #e9f0f6;
  padding: 10px;
  border-radius: 5px;
}
.itemContainer h5 {
  display: block;
  font-weight: 600;
  width: 100%;
}

.containerBtn {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.btn {
  border: none;
  width: 35%;
  padding: 5px;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
}
.fermer {
  color: #2d4051;
  border: 1px solid #2d4051;
}
.fermer:hover {
  background-color: #2d4051;
  color: #fff;
}
.enregistrer {
  background-color: #2d4051;
  color: #fff;
}
.enregistrer:hover {
  background-color: #fff;
  color: #2d4051;
  border: 1px solid #2d4051;
}
</style>
