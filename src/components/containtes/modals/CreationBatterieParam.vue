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

const registerBatterie = () => {
  batterieStore.registerBatterie();
};

function modifier() {
  batterieStore.updateBatterie(batterieStore.batterieModifier.id);
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
          <div class="closeForm" @click="show.showCreationParamBattFunc()">
            <i class="pi pi-times" style="font-size: 18px; color: #2d4051"></i>
          </div>
        </div>
        <div class="formulaire">
          <div class="itemContainer">
            <div class="flex">
              <div class="card">
                <input
                  type="text"
                  placeholder="Nom de la batterie"
                  v-model="batterieStore.nom"
                  class="input"
                />
                <input
                  type="text"
                  placeholder="Description"
                  v-model="batterieStore.description"
                  class="input"
                />
                <input
                  type="text"
                  placeholder="Marque de la batterie"
                  v-model="batterieStore.marque"
                  class="input"
                />
                <div class="flex">
                  <input
                    type="text"
                    placeholder="Tension Nominale"
                    v-model="batterieStore.tensionNominale"
                    class="input"
                  />
                  <h5>V</h5>
                </div>
                <div class="flex">
                  <input
                    type="text"
                    placeholder="Capacité"
                    v-model="batterieStore.capacite"
                    class="input"
                  />
                  <h5>Ah</h5>
                </div>
                <div class="flex">
                  <input
                    type="text"
                    placeholder="Capacité Nominale"
                    v-model="batterieStore.capaciteNominal"
                    class="input"
                  />
                  <h5>V</h5>
                </div>
                <div class="flex">
                  <input
                    type="text"
                    placeholder="DoD Max"
                    v-model="batterieStore.dodMax"
                    class="input"
                  />
                  <h5>%</h5>
                </div>
              </div>

              <div class="card">
                <div class="flex">
                  <input
                    type="text"
                    placeholder="Utilisation en veille"
                    v-model="batterieStore.utilisationVeille"
                    class="input"
                  />
                  <h5>V</h5>
                </div>
                <div class="flex">
                  <input
                    type="text"
                    placeholder="Utilisation cyclique"
                    v-model="batterieStore.utilisationCyclique"
                    class="input"
                  />
                  <h5>V</h5>
                </div>
                <div class="flex">
                  <input
                    type="text"
                    placeholder="Courant"
                    v-model="batterieStore.courant"
                    class="input"
                  />
                  <h5>A</h5>
                </div>
                <div class="flex">
                  <input
                    type="text"
                    placeholder="Température"
                    v-model="batterieStore.temperature"
                    class="input"
                  />
                  <h5>°C</h5>
                </div>
                <input
                  type="text"
                  placeholder="Technologie"
                  v-model="batterieStore.technologie"
                  class="input"
                />
                <div class="custom-date-picker">
                  <Datepicker
                    placeholder="Sélectionner une date"
                    v-model="batterieStore.dateInstallation"
                    format="yyyy-MM-dd"
                  />
                </div>
                <div
                  class="btn"
                  @click="
                    !batterieStore.ismodifier ? registerBatterie() : modifier()
                  "
                >
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
  </Transition>
</template>

<style scoped>
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
  /* position: absolute;
  right: 300px;
  top: 210px; */
  align-items: center;
  display: flex;
  justify-content: center;
}
.titre{
  display: flex;
  justify-content: space-between;
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
  width: 50%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.formModal h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 2px solid rgb(232, 230, 230);
}

.itemContainer {
  width: 100%;
  margin: 10px 2px;
}

.card {
  width: 45%;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.flex h5 {
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

.input {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #a2a2a9;
  color: #012248;
  margin-bottom: 5px;
}

.input:hover {
  background-color: #eaeaea;
}

.btn {
  background-color: #328ca8;
  padding: 10px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  border-radius: 5px;
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
</style>
