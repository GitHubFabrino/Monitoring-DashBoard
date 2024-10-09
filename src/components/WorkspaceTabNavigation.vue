<template>
  <div class="tabsActivite">
    <div class="tab" v-if="show.actInactive" @click="show.activeActiviteFunc()">
      <h3>Activité</h3>
    </div>
    <div class="tab active" v-if="show.actActive"><h3>Activité</h3></div>

    <div class="tab" v-if="show.noteInactive" @click="show.activeNoteFunc()">
      <h3>Notes</h3>
    </div>
    <div class="tab active" v-if="show.noteActive"><h3>Notes</h3></div>

    <div class="tab" v-if="show.emailInactive" @click="show.activeEmailFunc()">
      <h3>E-mails</h3>
    </div>
    <div class="tab active" v-if="show.emailActive"><h3>E-mails</h3></div>

    <div class="tab" v-if="show.appelInactive" @click="show.activeAppelFunc()">
      <h3>Appels</h3>
    </div>
    <div class="tab active" v-if="show.appelActive"><h3>Appels</h3></div>

    <div class="tab" v-if="show.tacheInactive" @click="show.activeTacheFunc()">
      <h3>Tâches</h3>
    </div>
    <div class="tab active" v-if="show.tacheActive"><h3>Tâches</h3></div>
  </div>
</template>

<script setup>
import { useShow } from "../stores/show";

const show = useShow();
</script>

<style scoped>
.tab {
  padding: 10px 20px;
  cursor: pointer;
}
.tab h3 {
  font-size: 14px;
  font-weight: 600;
}
.active {
  border-bottom: 4px solid #2d4051;
}
</style>
