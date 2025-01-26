<script setup>
import { useShow } from "@/stores/show";
import { useUser } from "@/stores/user";
import { parcStore } from "@/stores/parcStore";
import { ref } from "vue";
import Datepicker from "vue3-datepicker";
import { useBatterie } from "@/stores/batterieStore";

const show = useShow();
const user = useUser();
const useParc = parcStore();
const batterieStore = useBatterie();
const selectedDate = ref(null);

const first = ref(false)

const registerBatterie = () => {
  batterieStore.registerBatterie();
};

function modifier() {
  batterieStore.updateBatterie(batterieStore.batterieModifier.id);
}

function next() {
  first.value = !first.value
}

function close() {
  show.showCreationParamBattFunc()
  batterieStore.ismodifier = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCreationParamBatt">
      <div class="formModal">
        <div class="titre">
          <h3>
            {{
              !batterieStore.ismodifier
                ? "Ajouter une nouvelle batterie pour votre parc"
                : "Modifier les paramètres de la batterie"
            }}
          </h3>
          <div class="closeForm" @click="close()">
            <i class="pi pi-times" style="font-size: 18px; color: #2d4051"></i>
          </div>
        </div>
        <div class="formulaire">
          <div class="itemContainer">
            <div class="flex">
              <div class="card" v-if="!first">
                <div class="itemInput">
                  <label for="nom">Nom de la batterie</label>
                  <input
                    id="nom"
                    type="text"
                    placeholder="Nom de la batterie"
                    v-model="batterieStore.nom"
                    class="input"
                  />
                </div>
                <div class="itemInput">
                  <label for="description">Description</label>
                  <input
                    id="description"
                    type="text"
                    placeholder="Description"
                    v-model="batterieStore.description"
                    class="input"
                  />
                </div>
                <div class="itemInput">
                  <label for="marque">Marque de la batterie</label>
                  <input
                    id="marque"
                    type="text"
                    placeholder="Marque de la batterie"
                    v-model="batterieStore.marque"
                    class="input"
                  />
                </div>
                <div class="itemInput">
                  <label for="tensionNominale">Tension Nominale en V</label>
                  <input
                    id="tensionNominale"
                    type="number"
                    placeholder="Tension Nominale"
                    v-model="batterieStore.tensionNominale"
                    class="input"
                  />
               
                </div>
                <div class="itemInput">
                  <label for="capacite">Capacité en Ah</label>
                  <input
                    id="capacite"
                    type="number"
                    placeholder="Capacité"
                    v-model="batterieStore.capacite"
                    class="input"
                  />
           
                </div>
        
                <div class="itemInput">
                  <label for="dodMax">DoD Max en %</label>
                  <input
                    id="dodMax"
                    type="number"
                    placeholder="DoD Max"
                    v-model="batterieStore.dodMax"
                    class="input"
                  />
             
                </div>
                <div class="next" @click="next()">
                  <i class="pi pi-arrow-circle-right" style="font-size: 18px; color: #fb7a58"></i>
                </div>
              </div>

              <div class="card"  v-if="first">
                <div class="itemInput">
                  <label for="utilisationVeille">Utilisation en veille en V</label>
                  <div class="max">
                    <input
                    id="utilisationVeille"
                    type="number"
                    placeholder="Utilisation en veille"
                    v-model="batterieStore.utilisationVeillemin"
                    class="input"
                  />
                  <input
                    id="utilisationVeille"
                    type="number"
                    placeholder="Utilisation en veille"
                    v-model="batterieStore.utilisationVeillemax"
                    class="input"
                  />
                  </div>
                 
                </div>
                <div class="itemInput">
                  <label for="utilisationCyclique">Utilisation cyclique en V</label>
                  <div class="max">
                    <input
                    id="utilisationCyclique"
                    type="number"
                    placeholder="Utilisation cyclique"
                    v-model="batterieStore.utilisationCycliquemin"
                    class="input"
                  />
                  <input
                    id="utilisationCyclique"
                    type="number"
                    placeholder="Utilisation cyclique"
                    v-model="batterieStore.utilisationCycliquemax"
                    class="input"
                  />
                  </div>
                
                </div>
                <div class="itemInput">
                  <label for="courant">Courant en A</label>
                 <div class="max">
                  <input
                    id="courant"
                    type="number"
                    placeholder="Courant"
                    v-model="batterieStore.courant"
                    class="input"
                  />
                 </div>
                  
                </div>
                <div class="itemInput">
                  <label for="temperature">Température en °C</label>
                  <input
                    id="temperature"
                    type="number"
                    placeholder="Température"
                    v-model="batterieStore.temperature"
                    class="input"
                  />
            
                </div>
                <div class="itemInput">
                  <label for="technologie">Technologie</label>
                  <input
                    id="technologie"
                    type="text"
                    placeholder="Technologie"
                    v-model="batterieStore.technologie"
                    class="input"
                  />
                </div>
                <div class="itemInput">
                  <label for="dateInstallation">Date d'installation</label>
                  <Datepicker
                    id="dateInstallation"
                    placeholder="Sélectionner une date"
                    v-model="batterieStore.dateInstallation"
                    format="yyyy-MM-dd"
                  />
                </div>
              <div class="btns">
                <div class="next1" @click="next()">
                  <i class="pi pi-arrow-circle-left" style="font-size: 18px; color: #fb7a58"></i>
                </div>
                <div class="containerBtn">
                  <div class="btn1" @click="!batterieStore.ismodifier ? registerBatterie() : modifier()">
                  <h4>
                    {{ !batterieStore.ismodifier ? "Enregistrer" : "Modifier" }}
                  </h4>
                </div>
                </div>
               
              </div>
              </div>
           
           
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.btns{
  display: flex;
  justify-content: space-between;
}
.next1{
  width: 5%;
  padding: 5px;
  position: absolute;
  bottom: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.next1:hover{
  background-color: #007bff;
  border-radius: 5px;
}
.btn1{
  width: 50%;
  background-color: #328ca8;
  padding: 10px;
  margin: 0 auto;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.containerBtn{
  width: 90%;
  margin: 0 auto;
}
.dod {
  width: 100px !important;
}

.date {
  padding: 5px;
  background-color: rebeccapurple;
}

.closeForm {
  background-color: rgb(231, 230, 230);
  width: 40px;
  height: 40px;
  border-radius: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.closeForm:hover {
  background-color: rgb(200, 200, 200);
}

.titre {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 10px; */
  /* border-bottom: 2px solid rgb(232, 230, 230); */
  /* background-color: red; */
}
.titre h3{
  font-size: 12px;
}

.showModal {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(92, 90, 90, 0.927);
  z-index: 2;
  height: 100%;
  display: flex;
  background: rgba(43, 38, 38, 0.801);
  justify-content: center;
  align-items: center;
}

.formModal {
  width: 35%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  height: 85vh;
}

.formModal h3 {
  font-size: 15px;
  font-weight: 600;
  /* margin-bottom: 20px; */
  padding: 10px;
  /* border-bottom: 2px solid rgb(232, 230, 230); */
}

.itemContainer {
  width: 100%;
  margin: 10px 2px;
}

.card {
  width: 90%;

}

.flex {
  display: flex;
  justify-content: center;

}

.itemInput {
  margin-bottom: 10px;
}

.max{
  display: flex;
}
.itemInput h5 {
  display: block;
  width: 50px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-weight: 600;
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

label{
  font-size: 14px;
  font-weight: 600;
}

.input {
  padding: 5px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #a2a2a9;
  color: #012248;
  margin:0px 5px 5px 0px;
  transition: background-color 0.3s;
  font-size: 12px;
}

.input:hover {
  background-color: #eaeaea;
}

.btn {
  padding: 10px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #328ca8;
  padding: 10px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.next{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #328ca8;
  padding: 5px;
  width: 30%;
  margin: 0 auto;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #2a7ca0;
}

.custom-date-picker {
  margin-bottom: 10px;
  border: 1px solid #a2a2a9;
  border-radius: 5px;
  padding: 10px;
  font-family: Arial, sans-serif;
  color: #333;
}

.custom-date-picker input {
  width: 100%;
  padding: 5px;
  border: none;
}

.custom-date-picker input:focus {
  outline: none;
  box-shadow: 0 0 5px #007bff;
}

.btn h4 {
  font-weight: 600;
  color: #fff;
}

/* Transition classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
