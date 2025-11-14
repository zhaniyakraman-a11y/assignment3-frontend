<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useAuthStore } from './stores/useAuthStore'
import { useUserStore } from './stores/useUserStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()

const isAuthenticated = computed(() => !!authStore.authData?.token)
const showDropdown = ref(false)

const currentUser = computed(() => userStore.currentUser)

const isAdmin = computed(() => {
  return currentUser.value?.role === 'ADMIN'
})

const avatarUrl = computed(() => {
  if (!currentUser.value?.avatarPath) {
    return 'https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg'
  }
  if (currentUser.value.avatarPath.startsWith('/')) {
    return `http://localhost:8080${currentUser.value.avatarPath}`
  }
  return `http://localhost:8080/${currentUser.value.avatarPath}`
})

async function loadCurrentUser() {
  if (isAuthenticated.value) {
    try {
      await userStore.getCurrentUser()
    } catch (err) {
      console.error('Ошибка загрузки пользователя:', err)
    }
  }
}

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    loadCurrentUser()
  } else {
    userStore.currentUser = null
  }
})

function handleLogout() {
  authStore.logout()
  userStore.currentUser = null
  showDropdown.value = false
  router.push('/')
}

function goToProfile() {
  showDropdown.value = false
  router.push('/profile')
}

function goToVerification() {
  showDropdown.value = false
  router.push('/verification')
}

function goToCategories() {
  showDropdown.value = false
  router.push('/categories')
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function closeDropdown(e) {
  if (showDropdown.value && !e.target.closest('.user-menu')) {
    showDropdown.value = false
  }
}

function handleDocumentClick(e) {
  closeDropdown(e)
}

onMounted(() => {
  if (isAuthenticated.value) {
    loadCurrentUser()
  }
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="logo-container">
        <span class="logo-text">AZHAR DONATION FUND</span>
      </div>
      <nav class="nav-links">
        <router-link to="/">Главная</router-link>
        <router-link to="/projects">Проекты</router-link>
        <router-link to="/events">Волонтерство</router-link>
        <router-link to="/about">О нас</router-link>
        <router-link to="/contacts">Контакты</router-link>
        <router-link v-if="!isAuthenticated" to="/register" class="nav-donate">Пожертвовать</router-link>
        <router-link v-if="!isAuthenticated" to="/login">Войти</router-link>
        <div v-if="isAuthenticated" class="user-menu" @click.stop="toggleDropdown">
          <div class="user-info">
            <img :src="avatarUrl" :alt="currentUser?.fullName || 'User'" class="user-avatar" />
            <span class="user-name">{{ currentUser?.fullName || 'Загрузка...' }}</span>
          </div>
          <div v-if="showDropdown" class="dropdown-menu" @click.stop>
            <a href="#" @click.prevent="goToProfile" class="dropdown-item">Профиль</a>
            <a v-if="isAdmin" href="#" @click.prevent="goToVerification" class="dropdown-item">Верификация</a>
            <a v-if="isAdmin" href="#" @click.prevent="goToCategories" class="dropdown-item">Категории</a>
            <a href="#" @click.prevent="handleLogout" class="dropdown-item">Выйти</a>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-info">
          <p>AZHAR DONATION FUND - мы меняем мир к лучшему.</p>
        </div>
        <div class="footer-links">
          <a href="#">Навигация</a>
          <a href="#">Помощь</a>
          <a href="#">Следите за нами</a>
        </div>
      </div>
      <p style="text-align: center; margin-top: 20px;">&copy; 2025 AZHAR DONATION FUND. Все права защищены.</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.header {
  background-color: #222;
  color: white;
  padding: 15px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: white;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.8;
}

.nav-donate {
  background-color: #ff6600;
  padding: 10px 15px;
  border-radius: 4px;
}

.footer {
  background-color: #222;
  color: #ccc;
  padding: 40px 5%;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
}

.footer a {
  color: #aaa;
  margin-right: 15px;
  text-decoration: none;
}

.footer a:hover {
  color: #ff6600;
}

.footer p {
  font-size: 14px;
}

.user-menu {
  position: relative;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ff6600;
}

.user-name {
  color: white;
  font-size: 14px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  z-index: 1000;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  padding: 12px 16px;
  color: #222 !important;
  text-decoration: none;
  transition: background-color 0.2s;
  background-color: white;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
  color: #222 !important;
}

.dropdown-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.dropdown-item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
