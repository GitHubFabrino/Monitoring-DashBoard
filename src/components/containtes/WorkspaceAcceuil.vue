<template>
  <div class="container">
    <div class="item">
      <div class="titre">
        <h3>Batterie 01</h3>
        <v-progress-circular
          model-value="20"
          :size="86"
          :width="10"
        ></v-progress-circular>
      </div>
      <div class="charge"></div>
      <div class="courbe"></div>
    </div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  /* background-color: #1c3c5b; */
  width: 99%;
  height: 76vh;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  align-content: center;
}
.item {
  background-color: #f6f8fa;
  width: 32%;
  height: 76vh;
  box-shadow: 0px 0px 2px rgb(212, 211, 211);
}
.titre {
  padding: 5px 20px;
  background-color: #dddddd78;
}
.titre h3 {
  font-weight: 600;
}
.charge {
  width: 100%;
  height: 35vh;
  background-color: aqua;
}
.courbe {
  width: 100%;
  height: 35vh;
  background-color: rgb(0, 136, 255);
}
</style>
