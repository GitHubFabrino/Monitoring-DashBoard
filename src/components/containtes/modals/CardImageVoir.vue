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

const first = ref(false);

const registerBatterie = () => {
  batterieStore.registerBatterie();
};

function modifier() {
  batterieStore.updateBatterie(batterieStore.batterieModifier.id);
}

function next() {
  first.value = !first.value;
}

function close() {
  show.showImageMaintenance = false;
  show.urlImageVoir = null
}
</script>

<template>
  <Transition>
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50"
      v-if="show.showImageMaintenance"
      @click="close()"
    >
      <div class="formModal" @click.stop>
        <img :src="show.urlImageVoir" alt="" class="size-full" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.formModal {
  width: 550px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  height: 550px;
}

.formModal h3 {
  font-size: 15px;
  font-weight: 600;
  /* margin-bottom: 20px; */
  padding: 10px;
  /* border-bottom: 2px solid rgb(232, 230, 230); */
}
</style>
