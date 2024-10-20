<script setup>
import { useShow } from "@/stores/show";
const show = useShow();
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showAddMaintenance">
      <div class="formModal">
        <h3>Planifier une maitenance</h3>
        <div class="formulaire">
          <div class="itemContainer">
            <div class="lab">
              <i
                class="pi pi-times"
                style="font-size: 16px; color: #2d4051"
              ></i>
              <label for="date">Date de la maitenance</label>
            </div>
            <input
              type="text"
              placeholder="Nom"
              v-model="pseudo"
              class="input"
            />
          </div>
        </div>
      </div>
      <div class="closeForm" @click="show.showAddMaintenanceFunc()">
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
  right: 180px;
  top: 150px;
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
  width: 50%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
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
  color: #e9f0f6;
}

.input:hover {
  background-color: #eaeaea;
}
</style>
