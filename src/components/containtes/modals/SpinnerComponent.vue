<template>
  <Transition>
    <div class="showModal" v-if="show.showSpinner">
      <div class="spinner-6"></div>
    </div>
  </Transition>
</template>

<script setup>
import { useShow } from "@/stores/show";
import { colors } from "@/service/color";
const show = useShow();
</script>

<style scoped>
.showModal {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(216, 213, 213, 0.326);
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(43, 38, 38, 0.801);
  justify-content: center;
  align-items: center;
}

.spinner-6 {
  width: 80px;
  aspect-ratio: 1;
  display: grid;
  -webkit-mask: conic-gradient(from 15deg, #0000, #000);
  -moz-mask: conic-gradient(from 15deg, #0000, #000);
  mask: conic-gradient(from 15deg, #0000, #000); /* Standard property */
  animation: s6 1s infinite steps(12);
}

.spinner-6,
.spinner-6:before,
.spinner-6:after {
  background:
    radial-gradient(closest-side at 50% 12.5%, #fb7a58 96%, #0000) 50% 0/20% 80% repeat-y,
    radial-gradient(closest-side at 12.5% 50%, #fb7a58 96%, #0000) 0 50%/80% 20% repeat-x;
}
.spinner-6:before,
.spinner-6:after {
  content: "";
  grid-area: 1/1;
  transform: rotate(30deg);
}
.spinner-6:after {
  transform: rotate(60deg);
}

@keyframes s6 {
  100% { transform: rotate(1turn); }
}


</style>
