import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api/index'
import Cookies from 'universal-cookie'

export const useAuthStore = defineStore('auth', () => {
  const authData = ref(null)
  const cookies = new Cookies()

  async function register(fullName, email, password, role) {
    try {
      await api.post('/auth/register', { fullName, email, password, role })
    } catch (err) {
      throw new Error('Ошибка регистрации')
    }
  }

  async function login(email, password) {
    try {
      const token = (await api.post('/auth/login', { email, password })).data.token
      saveAuthData({ token })
    } catch (err) {
      throw new Error('Ошибка входа')
    }
  }

  function logout() {
    if (authData.value) {
      authData.value.token = null
    }
    removeAuthData()
  }

  function saveAuthData(data) {
    authData.value = data
    cookies.set('authData', data, { path: '/', secure: true, sameSite: 'Strict' })
  }

  function removeAuthData() {
    authData.value = null
    cookies.remove('authData', { path: '/' })
  }

  function readAuthData() {
    const storedAuthData = cookies.get('authData')
    if (storedAuthData) authData.value = storedAuthData
  }
  readAuthData()

  return { authData, register, login, logout }
})
