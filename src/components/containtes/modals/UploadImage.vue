<script setup>
import "primeicons/primeicons.css";
import { ref, watch, onMounted } from "vue";
import { useShow } from "@/stores/show";
import { useUser } from "@/stores/user";
import { parcStore } from "@/stores/parcStore";
import axios from "axios";
import { personnelStore } from "@/stores/personnel";

const personnel = personnelStore();
const show = useShow();
const user = useUser();
const useParc = parcStore();

const onFileChange = async (event, idUser) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      
      `http://localhost:8000/api/user/${idUser}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );


    await personnel.getUsersByParc(); 
    
 
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
  }
};
</script>

<template>
  <Transition>
    <div @click="show.personelAddImage= !show.personelAddImage"
      
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] z-50"
      v-if="show.personelAddImage"
    >
      <div class="formModal flex flex-col justify-center items-center" @click.stop>
        <h1 class="containerDesc w-full text-[#2d4051] font-nunito ">Ajouter Une Image</h1>

        <div class="w-[250px] h-[250px] bg-red-400 my-2 flex justify-center items-center">



          <div class="file-input-container " >
            <input
              type="file"
              @change="(event) => onFileChange(event, show.newpersonnelId)"
              id="file-upload"
            />
            <label for="file-upload" class="file-input-label">
              <i class="pi pi-camera"></i>
            </label>
          </div>
        </div>

        <div class="containerBtn">
          <button class="btn enregistrer shadow-lg  hover:scale-105 hover:shadow-xl" >
            Parcourir un fichier
            <input
              type="file"
              @change="(event) => onFileChange(event, show.newpersonnelId)"
              id="file-upload"
            />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.formModal {
  width: 30%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.containerDesc {
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 5px;
  border-bottom: 5px solid rgb(160, 160, 160);
}


.containerBtn {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.btn {
  border: none;
  width: 45%;
  padding: 10px;
  border-radius: 4px;
  font-weight: 600;
}

.enregistrer {
  background-color: #2d4051;
  color: #fff;
}



input[type="file"] {
  display: block;
  margin-top: 10px;
}

.file-input-container {
  position: relative;
  width: 50px;
  height: 50px;
  /* background-color: #f5572c; */
}

.file-input-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #e1dada;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
}

.file-input-label i {
  color: #555;
}

input[type="file"] {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
