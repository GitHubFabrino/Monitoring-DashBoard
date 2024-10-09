<template>
  <div class="contactTable">
    <div class="searchContainer">
      <input type="text" placeholder="Rechercher un nom d'entreprise" />
      <div class="searchIcon">
        <i class="pi pi-search" style="font-size: 20px; color: #2d4051"></i>
      </div>
      <div class="addContact" @click="show.showAddContactEntrepriseFunc()">
        <h4>Ajouter une Entreprise</h4>
        <i
          class="pi pi-user-plus"
          style="font-size: 18px; color: #fff; font-weight: 700"
        ></i>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th class="see"></th>
          <th>NOM D'ENTREPRISE</th>
          <th>RESPONSABLE</th>
          <th>E-MAIL</th>
          <th>NUMERO DE TELEPHONE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="see">
            <i class="pi pi-eye" style="font-size: 22px; color: #fb7a58"></i>
          </td>
          <td class="nameTd">
            <div class="name">A</div>
            <h4>Jean Dupont</h4>
          </td>
          <td>jean.dupont@example.com</td>
          <td>jean.dupont@example.com</td>
          <td>01 23 45 67 89</td>
          <td class="action">
            <div
              class="btn"
              @click="show.showModificationContactEntrepriseFunc()"
            >
              <i
                class="pi pi-user-edit"
                style="font-size: 22px; color: #328ca8"
              ></i>
            </div>
            <div class="btn" @click="show.showSupprimerContactFunc()">
              <i
                class="pi pi-trash"
                style="font-size: 22px; color: #da0d1e"
              ></i>
            </div>
          </td>
        </tr>
        <tr>
          <td class="see">
            <i class="pi pi-eye" style="font-size: 22px; color: #fb7a58"></i>
          </td>
          <td class="nameTd">
            <div class="name">A</div>
            <h4>Jean Dupont</h4>
          </td>
          <td>marie.curie@example.com</td>
          <td>jean.dupont@example.com</td>
          <td>01 98 76 54 32</td>
          <td class="action">
            <div
              class="btn"
              @click="show.showModificationContactEntrepriseFunc()"
            >
              <i
                class="pi pi-user-edit"
                style="font-size: 22px; color: #328ca8"
              ></i>
            </div>
            <div class="btn" @click="show.showSupprimerContactFunc()">
              <i
                class="pi pi-trash"
                style="font-size: 22px; color: #da0d1e"
              ></i>
            </div>
          </td>
        </tr>
        <tr>
          <td class="see">
            <i class="pi pi-eye" style="font-size: 22px; color: #fb7a58"></i>
          </td>
          <td class="nameTd">
            <div class="name">A</div>
            <h4>Jean Dupont</h4>
          </td>
          <td>paul.martin@example.com</td>
          <td>jean.dupont@example.com</td>
          <td>01 55 44 33 22</td>
          <td class="action">
            <div
              class="btn"
              @click="show.showModificationContactEntrepriseFunc()"
            >
              <i
                class="pi pi-user-edit"
                style="font-size: 22px; color: #328ca8"
              ></i>
            </div>
            <div class="btn" @click="show.showSupprimerContactFunc()">
              <i
                class="pi pi-trash"
                style="font-size: 22px; color: #da0d1e"
              ></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useShow } from "../stores/show";

const show = useShow();
</script>

<style scoped>
.contactTable {
  background-color: #e9f0f6;
  padding: 10px;
}
.searchContainer input {
  padding: 10px;
  width: 30%;
  border: none;
  box-shadow: 0px 0px 2px #2d4051;
  border-radius: 5px;
}
.searchContainer {
  display: flex;
  justify-content: space-between;
}
.searchIcon {
  /* background-color: red; */
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 225px;
  left: 410px;
}
.addContact {
  width: 18%;
  background-color: #328ca8;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 10px;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
}
.addContact:hover {
  background-color: #fb7a58;
}
.addContact h4 {
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th {
  border: 1px solid #ddd;
  padding: 8px;
  padding-left: 20px;
}

td {
  border: 1px solid #ddd;
  padding-left: 10px;
}
th {
  background-color: #f2f2f2;
  font-weight: 600;
  font-size: 12px;
  color: #2d4051;
  padding-left: 20px;
  text-align: left;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
tr:hover {
  background-color: #ddd;
}
.action {
  display: flex;
  justify-content: space-around;
  /* border: 1px solid #ddd; */
  border: none;
  padding: 8px;
}
.btn {
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 1px; */
  cursor: pointer;
}
.see {
  width: 40px;
  padding: 10px;
  align-items: center;
  /* background-color: red; */
}
.name {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #328ca8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ddd;
}
.nameTd {
  display: flex;
  align-items: center;
  padding: 10px;
}
td h4 {
  padding-left: 10px;
}
</style>
