<script setup>
import "primeicons/primeicons.css";
import { ref, watch, onMounted ,watchEffect} from "vue";
import { useShow } from "@/stores/show";
import { useUser } from "@/stores/user";

const show = useShow();
const user = useUser();

function modifier() {
  user.isEditing = !user.isEditing;
  user.OlduserName = user.userInfo.name;
  user.OlduserEmail = user.userInfo.email;

  user.Oldname = user.userInfo.name;
  user.Oldemail = user.userInfo.email;
  user.Oldpseudo = user.userInfo.username;
  user.Oldphone = user.userInfo.phone;
  user.Oldadresse = user.userInfo.adresse;

  user.userName = user.userInfo.name;
  user.userEmail = user.userInfo.email;

  user.userpseudo = user.userInfo.username;
  user.userphone = user.userInfo.phone;
  user.useradresse = user.userInfo.adresse;
}

function Enregistrer() {
  user.isEditing = !user.isEditing;
  user.updateProfile(user.userInfo.id);
}

import axios from "axios";
const image = ref(user.userInfo.file || {});
console.log(user.userInfo.file);

// watchEffect(() =>{
//   image.value = ref(user.userInfo.file || {});
// })

const onFileChange = async (event, idBat) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  // ${"titre":"send.jpg","file_name…reated_at":"2025-02-18T16:28:14.000000Z","id":22}
  try {
    const response = await axios.post(
      `http://localhost:8000/api/files/user/upload/${idBat}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // image.file_name = response.data.url
    // image.id= response.data.id
    image.value = {
      file_name: response.data.url,
      id: response.data.id,
    };

    let datalocal = JSON.parse(localStorage.getItem('user')) || {};
    datalocal.user = { ...datalocal.user, file: image.value };
    localStorage.setItem('user', JSON.stringify(datalocal));
    





  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
  }
};
</script>

<template>
  <Transition>
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50"
      v-if="show.showProfilDetail"
      @click="show.showProfilDetailFunc()"
    >
      <div class="formModal" @click.stop>
        <div class="profilContainer">
          <div class="containerProfil" v-if="!user.isEditing">
            <div class="imageProfil">
              <div class="file-input-container !absolute w-8 h-8  mt-0 cursor-pointer ">
                <input
                  type="file"
                  @change="(event) => onFileChange(event, user.userInfo.id)"
                  id="file-upload"
                  class="absolute inset-0 w-full h-[350px] opacity-0 cursor-pointer hover:bg-black-500"
                />
                <label
                  for="file-upload"
                  class="file-input-label flex items-center justify-center w-full h-full bg-[#e1dada] cursor-pointer rounded-full cursor-pointer text-xl text-gray-500 !hover:bg-red-500"
                >
                  <i class="pi pi-camera cursor-pointer"></i>
                </label>
              </div>
              <img
                @click.stop
                alt=""
                v-if="image?.id"
                :src="image?.file_name"
                class="h-56 w-full rounded-md object-cover image"
              />

             
            </div>
            <div class="descriptionProfil">
              <h3>{{ user.userName || user.userInfo.name }}</h3>
              <h4>{{ user.userpseudo || user.userInfo.username }}</h4>
            </div>
          </div>
          <div class="containerDesc">
         
            <div class="itemContainer" v-if="user.isEditing">
              <h5>Nom</h5>
              <input
                type="text"
                placeholder="Votre email"
                v-model="user.userName"
                class="input"
              />
            </div>

            <div class="itemContainer" v-if="user.isEditing">
              <h5>Pseudo</h5>
              <input
                type="text"
                placeholder="Votre email"
                v-model="user.userpseudo"
                class="input"
              />
            </div>

            <div class="itemContainer">
              <h5>Email</h5>
              <template v-if="!user.isEditing">
                <h4>{{ user.userEmail || user.userInfo.email }}</h4>
              </template>
              <template v-else>
                <input
                  type="text"
                  placeholder="Votre email"
                  v-model="user.userEmail"
                  class="input"
                />
              </template>
            </div>
            <div class="itemContainer">
              <h5>Numéro Téléphone</h5>

              <template v-if="!user.isEditing">
                <h4>{{ user.userphone || user.userInfo.phone }}</h4>
              </template>
              <template v-else>
                <input
                  type="text"
                  placeholder="Votre téléphone"
                  v-model="user.userphone"
                  class="input"
                />
              </template>
            </div>
            <div class="itemContainer">
              <h5>Adresse</h5>
              <template v-if="!user.isEditing">
                <h4>{{ user.useradresse || user.userInfo.adresse }}</h4>
              </template>
              <template v-else>
                <input
                  type="text"
                  placeholder="Votre Adresse"
                  v-model="user.useradresse"
                  class="input"
                />
              </template>
            </div>
            <div class="itemContainer">
              <h5>Poste</h5>
              <h4>Administrateur</h4>
            </div>
          </div>

          <div class="containerBtn">
            <button class="btn fermer" @click="show.showProfilDetailFunc()">
              Fermer
            </button>
            <button
              class="btn enregistrer"
              @click="user.isEditing ? Enregistrer() : modifier()"
            >
              {{ user.isEditing ? "Enregistrer" : "Modifier" }}
            </button>
          </div>
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
}
.deplace{
  position: relative;
  top: 0;
}
.modifierImage {
  position: absolute;
  top: 200px;
  left: 570px;
  border: 1px solid #2d405124;
  border-radius: 100%;
  background-color: #fff;

  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.containerProfil {
  width: 100%;
  display: flex;
  align-items: center;
}

.imageProfil {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-right: 50px;
}
.descriptionProfil h3 {
  display: block;
  font-weight: 600;
  width: 100%;
  font-size: 20px;
}
.image {
  width: 100%;
  height: 100%;
  border: 2px solid #2d405121;
  border-radius: 100%;
}

.containerDesc {
  padding: 10px;
}

.itemContainer {
  width: 100%;
  margin: 10px 0px;
}
.itemContainer h4 {
  background-color: #e9f0f6;
  padding: 10px;
  border-radius: 5px;
}
.itemContainer h5 {
  display: block;
  font-weight: 600;
  width: 100%;
}
input {
  padding: 10px;
  width: 100%;
  border-radius: 2px;
  border: none;
  background-color: #2d405121;
}

.containerBtn {
  width: 100%;
  display: flex;
  justify-content: space-around;
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
