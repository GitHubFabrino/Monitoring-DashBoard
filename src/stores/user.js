import { defineStore } from 'pinia'
import { useShow } from '@/stores/show'
import { useUrl } from '@/stores/url'
import { ref } from 'vue'
import axios from 'axios'

export const useUser = defineStore('User', () => {
  const show = useShow()
  const URL = useUrl().url

  const email = ref('')
  const password = ref('')
  const name = ref('')
  const nom_photo_profile = ref('')
  const validation_compte = ref('')

  function register() {
    show.showSpinner = true
    let formData = new FormData()
    formData.append('email', email.value)
    formData.append('password', password.value || '')
    formData.append('name', name.value)
    formData.append('nom_photo_profile', nom_photo_profile.value || '')
    formData.append('validation_compte', validation_compte.value || '')

    show.showSpinner = true
    axios
      .post(`${URL}/api/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        if (response.status === 201) {
          show.showSingUp = false;
          show.showDashBoard = true;
          show.showAlert = true
          show.showAlertType = 'success'
          show.showAlertMessage = 'Enregistré'
          
        } else {
          show.showAlert = true
          show.showAlertType = 'danger'
          show.showAlertMessage = 'Échoué'
        }

        setTimeout(() => {
          show.showAlert = false
          show.showAlertType = ''
          show.showAlertMessage = ''
        }, 3000)
      })
      .catch((err) => {
        show.showSpinner = false
        show.showAlert = true
        show.showAlertType = 'warning'
        show.showAlertMessage = 'Nom ou email existe déjà'
        console.error(err)
        setTimeout(() => {
          show.showAlert = false
          show.showAlertType = ''
          show.showAlertMessage = ''
        }, 3000)
      })
      .finally(() => {
        show.showSpinner = false
      })
  }

  function login() {
    show.showSpinner = true
    let formData = new FormData()
    formData.append('email', email.value)
    formData.append('password', password.value)

    console.log('email' , email.value  );
    console.log('mdp' , password.value );
    axios
      .post(`${URL}/api/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log('response' , response.data);
        if (response.status === 200) {
          show.showLogin = false;
          show.showDashBoard = true;
          show.showAlert = true
          show.showAlertType = 'success'
          show.showAlertMessage = 'Enregistré'

          document.cookie = `access_token=${response.data.access_token};path=/;max-age=${response.data.expires_in}`
          localStorage.setItem('user', JSON.stringify(response.data))

        } else {
          show.showAlert = true
          show.showAlertType = 'danger'
          show.showAlertMessage = response.data.error
        }

        setTimeout(() => {
          show.showAlert = false
          show.showAlertType = ''
          show.showAlertMessage = ''
        }, 3000)
      })
      .catch((err) => {
        show.showSpinner = false
        show.showAlert = true
        show.showAlertType = 'warning'
        show.showAlertMessage = 'Mot de passe ou email incorrect'
        console.error(err)
        setTimeout(() => {
          show.showAlert = false
          show.showAlertType = ''
          show.showAlertMessage = ''
        }, 3000)
      })
      .finally(() => {
        show.showSpinner = false
      })
  }

  return {
    email,
    password,
    name,
    nom_photo_profile,
    validation_compte,
    register,
    login
  }
})
