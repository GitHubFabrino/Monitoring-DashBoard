<script setup>
import { useShow } from "@/stores/show";
const show = useShow();
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCreationParamBatt">
      <div class="formModal">
        <h3>Parametre de fonctionnement</h3>
        <div class="formulaire">
          <div class="itemContainer">
            <input
              type="text"
              placeholder="Nom de la batterie"
              v-model="pseudo"
              class="input"
            />

            <input
              type="text"
              placeholder="Parc "
              v-model="pseudo"
              class="input"
            />
            <input
              type="text"
              placeholder="Déscription"
              v-model="pseudo"
              class="input"
            />

            <input
              type="text"
              placeholder="Marque de la batterie"
              v-model="pseudo"
              class="input"
            />
            <input
              type="text"
              placeholder="Tension Nominal"
              v-model="pseudo"
              class="input"
            />

            <input
              type="text"
              placeholder="Capacité"
              v-model="pseudo"
              class="input"
            />
            <input
              type="text"
              placeholder="Tension en veille"
              v-model="pseudo"
              class="input"
            />

            <input
              type="text"
              placeholder="Tension cyclique"
              v-model="pseudo"
              class="input"
            />
            <input
              type="text"
              placeholder="Courant "
              v-model="pseudo"
              class="input"
            />

            <input
              type="text"
              placeholder="Temperature "
              v-model="pseudo"
              class="input"
            />

            <div class="btn"><h4>Enregistré</h4></div>
          </div>
        </div>
      </div>
      <div class="closeForm" @click="show.showCreationParamBattFunc()">
        <i class="pi pi-times" style="font-size: 18px; color: #2d4051"></i>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.closeForm {
  background-color: rgb(231, 230, 230);
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: absolute;
  right: 450px;
  top: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
}
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

.formModal {
  width: 30%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.formModal h3 {
  font-weight: 600;
}

.itemContainer {
  width: 100%;
  margin: 10px 2px;
}
.lab {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.lab label {
  margin-left: 10px;
  font-size: 12px;
  font-weight: 600;
}

.input {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #a2a2a9;
  color: #e9f0f6;
  margin-bottom: 5px;
}

.input:hover {
  background-color: #eaeaea;
}

.btn {
  background-color: #328ca8;
  padding: 10px;
  width: 30%;
  margin: 0 auto;
  text-align: center;
  border-radius: 5px;
}
.btn h4 {
  font-weight: 600;
  color: #fff;
}
</style>
