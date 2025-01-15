<template>
  <div class="login">
    <div class="container">
      <div class="formulaire1">
        <div class="cont">
          <h5>Surveiller en temps réel l'état de vos batteries avec</h5>
          <h3 class="bienvenu">BATMONITOR</h3>
          <div class="btnInscrit" @click="show.showLoginFunc">
            <h3>Se connecter</h3>
          </div>
        </div>
      </div>
      <div class="formulaire">
        <div class="text">
          <h3 class="titre">Inscription</h3>
          <h4 class="subtext">Entrez votre information</h4>
        </div>

        <div class="inputForm">
          <div class="itemContainer">
            <input
              type="text"
              placeholder="Nom"
              v-model="name"
              class="input"
              @input="transformName"
            />
          </div>
          <div class="itemContainer">
            <input
              type="text"
              placeholder="Pseudo"
              v-model="pseudo"
              class="input"
              
            />
          </div>
          <div class="itemContainer">
            <input
              type="text"
              placeholder="Email"
              v-model="email"
              class="input"
            />
          </div>
          <div class="itemContainer">
            <input
              type="password"
              placeholder="Mot de passe"
              v-model="mdp"
              class="input"
            />
          </div>
         
          <div class="itemContainer">
            <input
              type="text"
              placeholder="Phone + 261 "
              v-model="phone"
              class="input"
            />
          </div>
          <div class="itemContainer">
            <input
              type="text"
              placeholder="Adresse"
              v-model="adresse"
              class="input"
            />
          </div>
        </div>

        <div class="btnlogin" @click="verify">
          <h3>S'inscrire</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useShow } from "@/stores/show";
import { useUser } from "@/stores/user";

const show = useShow();
const user = useUser();
const pseudo = ref('pierret1@gmail.com');
const email = ref('pierret1@gmail.com');
const mdp = ref('pierret1@gmail.com');
const name = ref('pierret1@gmail.com');
const phone = ref('+261 34 05 854 28');
const adresse = ref('Lazaret');

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

const transformName = () => {
  name.value = name.value.toUpperCase();
};

const verify = () => {
  if (!validateEmail(email.value)) {
    show.showAlert = true;
    show.showAlertType = 'danger';
    show.showAlertMessage = 'Email non valide';
    return;
  }

  if (mdp.value.length < 8) {
    show.showAlert = true;
    show.showAlertType = 'danger';
    show.showAlertMessage = 'Le mot de passe doit contenir au moins 8 caractères';
    return;
  }

  console.log('data', pseudo.value, email.value, mdp.value);
  user.email = email.value;
  user.password = mdp.value;
  user.name = name.value;
  user.userpseudo = pseudo.value;
  user.userphone = phone.value;
  user.useradresse = adresse.value;
  user.nom_photo_profile = `${pseudo.value}_profil.png`;
  user.validation_compte = '0';

  user.register();
};
</script>

<style scoped>
.login {
  background-color: #f6f8fa;
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
  border-radius: 10px;
  box-shadow: 0px 0px 5px #a2b5cb;
}

.text {
  font-weight: 700;
  margin-bottom: 20px;
}

.formulaire {
  width: 50%;
  height: 100%;
  background-color: #2d4051;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 0px 0px 5px #9d9ea041;
  padding: 5%;
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

.formulaire1 {
  width: 50%;
  height: 100%;
  background-color: #e9f0f6;
  border-radius: 10px 0px 0px 10px;
  box-shadow: 0px 0px 5px #9d9ea041;
  padding: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cont {
  text-align: center;
  font-weight: 700;
  color: #2d4051;
  display: block;
  width: 100%;
}
.titre {
  font-weight: 700;
  color: #e1e1e2;
  display: block;
  width: 100%;
  font-size: 30px;
}
.bienvenu {
  font-weight: 700;
  color: #2d4051;
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
  background-color: #2d4051;
  color: #e9f0f6;
}

.input:hover {
  background-color: #314658;
}
.btnlogin {
  padding: 10px;
  margin: 30px auto;
  background-color: #fb7a58;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 80%;
  text-align: center;
}

.btnInscrit {
  padding: 10px;
  margin: 50px auto;
  background-color: #2d4051;
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
