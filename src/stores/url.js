import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUrl = defineStore('Url', () => {
  const url = ref('http://127.0.0.1:8000')

  return {
    url
  }
})