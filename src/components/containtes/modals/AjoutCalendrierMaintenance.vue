<script setup>
import { useShow } from "@/stores/show";
import { useMaintenanceStore } from "@/stores/maintenanceStore";
import { ref, onMounted } from "vue";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";

const show = useShow();
const maintenanceStore = useMaintenanceStore();
const useParc = parcStore();
const batterie = useBatterie();

const details = ref("");
const batterie_id = ref("");
const marque = ref("");

// Charger les parcs au montage du composant
onMounted(() => {
  try {
    const parcid = useParc.parcSuperviser?.id;
    batterie.getBatteriesByParcId(parcid);
  } catch (error) {
    console.error(error);
  }
});

// Fonction pour ajouter une maintenance
const addMaintenance = () => {
  const maintenanceData = {
    details: details.value,
    batterie_id: batterie_id.value,
    marque: "non",
  };
  maintenanceStore.createMaintenance(maintenanceData);
};
</script>

<template>
  <Transition>
    <div @click="show.showAddMaintenanceFunc()"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50" v-if="show.showAddMaintenance">
      <div class="formModal" @click.stop>
        <div class="title">
          <h3>Planifier une maintenance</h3>
          <div class="closeForm" @click="show.showAddMaintenanceFunc()">
            <i class="pi pi-times" style="font-size: 18px; color: #2d4051"></i>
          </div>
        </div>
        <div class="formulaire">
          <div class="itemContainer">
            <h5>Détails de la maintenance <span>*</span></h5>
            <input
              type="text"
              placeholder="Détails de la maintenance"
              v-model="details"
              class="input"
            />
          </div>

          <div class="block w-full">
            <h5>Sélectionner la batterie <span>*</span></h5>
            <select
              v-model="batterie_id"
              id="countries"
              class="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
            >
              <option disabled value="">Sélectionnez une batterie</option>
              <option
                v-for="batterie in batterie.allBatteryData"
                :key="batterie.id"
                :value="batterie.id"
              >
                {{ batterie.nom }}
              </option>
            </select>
          </div>

          <div class="itemContainer">
            <button class="btn enregistrer" @click="addMaintenance">
              Ajouter Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.btn {
  border: none;
  width: 35%;
  padding: 10px;
  border-radius: 4px;
  font-weight: 600;
}
.enregistrer {
  background-color: #2d4051;
  color: #fff;
}
span {
  color: red;
}
.closeForm {
  background-color: rgb(231, 230, 230);
  width: 40px;
  height: 40px;
  border-radius: 100%;
  /* position: relative;
  right: 0px;
  top: 50px;
  right: 0px; */
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
  flex-direction: column;
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

.title {
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.itemContainer {
  width: 100%;
  margin: 10px 2px;
}

.input {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #a2a2a9;
  color: #6b6e72;
}

.input:hover {
  background-color: #eaeaea;
}
</style>
