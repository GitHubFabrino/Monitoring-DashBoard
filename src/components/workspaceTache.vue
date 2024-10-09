<template>
  <div class="conatainerActivite">
    <input type="text" placeholder="Rechercher par année , mois" />
    <div class="searchIcon">
      <i class="pi pi-search" style="font-size: 20px; color: #2d4051"></i>
    </div>
    <div class="itemActivite">
      <h3 class="date">Decembre 2020</h3>
      <div class="item">
        <div class="itemTitle">
          <h4 class="title">Titre Tache</h4>
          <h4 class="dateItem">22 decembre 2020 à 11h 22</h4>
        </div>
        <h4 class="description">Une transaction de 200000Ar vers Antoine</h4>
      </div>
      <div class="item">
        <div class="itemTitle">
          <h4 class="title">Titre Tache</h4>
          <h4 class="dateItem">22 decembre 2020 à 11h 22</h4>
        </div>
        <h4 class="description">Une transaction de 200000Ar vers Antoine</h4>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.conatainerActivite {
  /* background-color: red; */
  margin-top: 20px;
}
.item {
  /* display: flex; */
  background-color: #fff;
  padding: 10px 20px;
  border: 2px solid #2d405137;
  border-radius: 5px;
  margin: 5px;
}
.itemTitle {
  display: flex;
  justify-content: space-between;
}
.title {
  padding-bottom: 10px;
  font-weight: 700;
}
.description {
  font-size: 12px;
}
.searchIcon {
  /* background-color: red; */
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 218px;
  left: 760px;
}
input {
  padding: 10px;
  width: 40%;
  border: none;
  box-shadow: 0px 0px 2px #2d4051;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
