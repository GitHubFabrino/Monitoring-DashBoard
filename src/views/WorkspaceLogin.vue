<template>
  <div class="login">
    <div class="container">
      <div class="formulaire">
        <div class="text">
          <h3 class="bienvenu">Se connecté</h3>
          <h4 class="subtext">Entrez votre compte</h4>
        </div>

        <div class="inputForm">
          <div class="itemContainer">
            <!-- <InputIcon class="pi pi-search" /> -->
            <input
              type="text"
              placeholder="Votre email"
              v-model="pseudo"
              class="input"
            />
          </div>
          <div class="itemContainer">
            <input
              type="text"
              placeholder="Votre Mot de passe"
              v-model="mdp"
              class="input"
            />
          </div>
        </div>

        <div class="btnlogin" @click="show.showDashBoardFunc">
          <h3>Se connécter</h3>
        </div>
        <h5>
          <span @click="show.showSingUpFunc()" class="forgotPass"
            >Mots de passe oublié</span
          >
        </h5>
      </div>
      <div class="formulaire1">
        <div class="cont">
          <h3 class="bienvenu">Inscription</h3>
          <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
          <div class="btnInscrit" @click="show.showSingUpFunc">
            <h3>S'inscrire</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShow } from "@/stores/show";
const show = useShow();
</script>

<style scoped>
.login {
  background-color: #2a303e;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  width: 60%;
  height: 60vh;
  display: flex;
  position: absolute;
  background-color: #2a303e;
  border-radius: 10px;
  /* box-shadow: 0px 0px 5px #a2b5cb; */
}

.text {
  font-weight: 700;
  margin-bottom: 20px;
}

.formulaire {
  width: 50%;
  height: 100%;
  background-color: #222631;
  border-radius: 10px 0px 0px 10px;
  box-shadow: 0px 0px 5px #9d9ea041;
  padding: 5%;
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

.formulaire1 {
  width: 50%;
  height: 100%;
  background-color: #6260cb;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 0px 0px 5px #9d9ea041;
  padding: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cont {
  text-align: center;
  font-weight: 700;
  color: #e1e1e2;
  display: block;
  width: 100%;
}

.bienvenu {
  font-weight: 700;

  color: #e1e1e2;
  display: block;
  width: 100%;
  font-size: 30px;
}

.subtext {
  font-weight: 700;
  color: #e1e1e2;
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
  background-color: #222631;
  color: rgb(232, 227, 227);
}
.btnlogin {
  padding: 10px;
  margin: 30px auto;
  background-color: #6260cb;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 80%;
  text-align: center;
}

.btnInscrit {
  padding: 10px;
  margin: 50px auto;
  background-color: #4f50a2;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 80%;
  text-align: center;
}
.btnlogin:hover,
.btnInscrit:hover {
  opacity: 0.7;
  transition: 0.5s;
}

.btnlogin h3,
.btnInscrit h3 {
  font-weight: 700;
}

.forgotPass {
  color: #e1e1e2;
  display: block;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
}

label {
  display: block;
  font-weight: 600;
  width: 100%;
}
</style>
