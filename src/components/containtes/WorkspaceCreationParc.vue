<template>
  <div class="container">
    <div class="desc">
      <div class="title">
        <h2>NOM PARC</h2>
        <h5>Création : 22/22/22</h5>
      </div>
      <div class="text">
        <div class="icon">
          <i class="pi pi-bookmark" style="font-size: 18px; color: #fff"></i>
        </div>

        <h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
          pariatur!
        </h4>
      </div>
      <div class="text">
        <div class="icon">
          <i class="pi pi-map-marker" style="font-size: 18px; color: #fff"></i>
        </div>
        <h4>Lorem ipsum dolor sit amet.</h4>
      </div>
      <div class="text">
        <div class="icon">
          <i class="pi pi-bolt" style="font-size: 18px; color: #fff"></i>
        </div>
        <h4>Nombre de batailles : 10</h4>
      </div>
      <div class="text">
        <div class="icon">
          <i class="pi pi-phone" style="font-size: 18px; color: #fff"></i>
        </div>
        <h4>Contact : 123456789</h4>
      </div>
      <div class="text">
        <div class="icon">
          <i class="pi pi-at" style="font-size: 18px; color: #fff"></i>
        </div>
        <h4>Email : exemple@exemple.com</h4>
      </div>
    </div>
    <div class="list">
      <h4 class="titre">Liste des Parcs</h4>
      <div class="containerList">
        <div class="item">
          <div class="icon">
            <i
              class="pi pi-building-columns"
              style="font-size: 18px; color: #2d4051"
            ></i>
          </div>

          <h4>Lorem ipsum dolor</h4>
          <div class="btn">
            <div class="icon blue">
              <i class="pi pi-eye" style="font-size: 18px; color: #fff"></i>
            </div>
            <div class="icon orange">
              <i
                class="pi pi-pen-to-square"
                style="font-size: 18px; color: #fff"
              ></i>
            </div>
            <div class="icon red">
              <i class="pi pi-trash" style="font-size: 18px; color: #fff"></i>
            </div>
          </div>
        </div>

        <div class="item">
          <div class="icon">
            <i
              class="pi pi-building-columns"
              style="font-size: 18px; color: #2d4051"
            ></i>
          </div>

          <h4>Lorem ipsum dolor</h4>
          <div class="btn">
            <div class="icon blue">
              <i class="pi pi-eye" style="font-size: 18px; color: #fff"></i>
            </div>
            <div class="icon orange">
              <i
                class="pi pi-pen-to-square"
                style="font-size: 18px; color: #fff"
              ></i>
            </div>
            <div class="icon red">
              <i class="pi pi-trash" style="font-size: 18px; color: #fff"></i>
            </div>
          </div>
        </div>

        <div class="item">
          <div class="icon">
            <i
              class="pi pi-building-columns"
              style="font-size: 18px; color: #2d4051"
            ></i>
          </div>

          <h4>Lorem ipsum dolor</h4>
          <div class="btn">
            <div class="icon blue">
              <i class="pi pi-eye" style="font-size: 12px; color: #fff"></i>
            </div>
            <div class="icon orange">
              <i
                class="pi pi-pen-to-square"
                style="font-size: 12px; color: #fff"
              ></i>
            </div>
            <div class="icon red">
              <i class="pi pi-trash" style="font-size: 12px; color: #fff"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.desc {
  background-color: #f6f8fa;
  width: 60%;
  height: 76vh;
  box-shadow: 0px 0px 5px rgb(189, 189, 189);
  border-radius: 5px;
  padding: 20px;
}
.title {
  background-color: #2d4051;
  /* display: flex; */
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.title h2 {
  color: #f0f0f0;
  font-weight: 700;
}

.title h5 {
  color: #c6c6c6;
  font-weight: 700;
}

.text {
  display: flex;
  background-color: rgba(188, 219, 253, 0.156);
  width: 90%;
  padding: 15px 20px;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  border-bottom: 1px solid #2d40515d;
  margin-bottom: 5px;
}
.text h4 {
  /* background-color: red; */
  width: 90%;
}

.list {
  background-color: #f6f8fa;
  width: 35%;
  height: 76vh;
  box-shadow: 0px 0px 5px rgb(189, 189, 189);
  border-radius: 5px;
}

.titre {
  background-color: #2d4051;
  color: #ededed;
  margin: 20px 10px;
  border-radius: 5px;
  padding: 10px;
  font-weight: 600;
}
.containerList {
  width: 96%;
  margin: 5px auto;
  padding: 2px;
}
.item {
  display: flex;
  padding: 10px 5px;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(224, 224, 224);
  margin-bottom: 5px;
  border-radius: 5px;
}
.btn {
  /* background-color: #247bc8; */
  display: flex;
  width: 30%;
  justify-content: space-around;
}
.icon {
  background-color: #fb7b5892;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.blue {
  background-color: #247bc8d2;
}
.orange {
  background-color: #fb7b58d8;
}
.red {
  background-color: rgb(255, 93, 93);
}
</style>
