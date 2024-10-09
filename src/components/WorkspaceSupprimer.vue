<script setup>
import { useShow } from "../stores/show";

const show = useShow();
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showSupprimer">
      <div class="formModal">
        <h3>Voulez-vous vraiment supprimer ?</h3>
        <div class="containerBtn">
          <button class="btn fermer" @click="show.hiddenSupprimerContactFunc()">
            Fermer
          </button>
          <button class="btn enregistrer">supprimer</button>
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
  text-align: center;
}

.containerBtn {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
h3 {
  margin-bottom: 10px;
}
.btn {
  border: none;
  width: 35%;
  padding: 10px;
  border-radius: 4px;
  font-weight: 600;
}
.fermer {
  color: #2d4051;
  border: 1px solid #2d4051;
}
.enregistrer {
  background-color: #2d4051;
  color: #fff;
}
</style>
