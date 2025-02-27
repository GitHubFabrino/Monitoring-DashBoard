<script setup>
import "primeicons/primeicons.css";
import { ref, watch, onMounted } from "vue";
import { useShow } from "@/stores/show";
import { useUser } from "@/stores/user";
import { parcStore } from "@/stores/parcStore";
import { personnelStore } from "@/stores/personnel";

const personnel = personnelStore();
const show = useShow();
const user = useUser();
const useParc = parcStore();
const transformName = () => {
  nameNew.value= nameNew.value.toUpperCase();
};

const nameNew = ref('')
const phoneNew = ref('')
const emailNew = ref('')
const adresseNew = ref('')



function Enregistrer() {

  const parcId = useParc?.parcSuperviser?.id;
      if (!parcId) {
        throw new Error("ID du parc non trouvé");
      }

  let data= {
    name: nameNew.value,
    phone: phoneNew.value,
    email: emailNew.value,
    adresse: adresseNew.value,
    parc_id : parcId
  };

  personnel.registerUser(data)
}
</script>

<template>
  <Transition>
    <div 
    @click="show.showAddPersonnel = !show.showAddPersonnel"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50" v-if="show.showAddPersonnel">
      <div class="formModal" @click.stop>
        <div class="profilContainer">
          <div class="containerDesc">
            <h1 class="text-[#2d4051] font-nunito">Nouveau Technicien</h1>
            <p class="line-clamp-1 text-xs text-gray-500 pt-2">PARC 01</p>

            <div class="itemContainer">
              <h5  class="text-[#2d4051] font-nunito">Nom<span>*</span></h5>
              <input
                type="text"
                placeholder="NOM DU PARC"
                v-model="nameNew"
                class="input focus:outline-none"
                @input="transformName"
              />
            </div>

            <div class="itemContainer">
              <h5  class="text-[#2d4051] font-nunito">Email <span>*</span></h5>
              <input
                type="email"
                placeholder="Votre email"
                v-model="emailNew"
                class="input"
              />
            </div>           
           
            <div class="itemContainer">
              <h5  class="text-[#2d4051] font-nunito">Contact <span>*</span></h5>
              <input
                type="text"
                placeholder="Votre nombre des batteries"
                v-model="phoneNew"
                class="input"
              />
            </div>
         

            <div class="itemContainer">
              <h5  class="text-[#2d4051] font-nunito">Adresse <span>*</span></h5>
              <input
                type="text"
                placeholder="L'adresse du parc"
                v-model="adresseNew"
                class="input"
              />
            </div>

            <h6 class="obligatoire text-[#2d4051] font-nunito"><span>*</span> Champs Obligatoire</h6>
          </div>

          <div class="containerBtn">
            <button class="btn fermer" @click="show.showAddPersonnel = !show.showAddPersonnel">
              Annuler
            </button>
            <button class="btn enregistrer" @click="Enregistrer()">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.obligatoire {
  font-size: 10px;
  font-weight: 600;
}
span {
  color: red;
}
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

.containerDesc h1 {
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 5px solid rgb(160, 160, 160);
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
