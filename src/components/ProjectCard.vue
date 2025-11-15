<template>
  <div class="project-card" @click="goToProject" style="cursor: pointer;">
    <div class="image-carousel" v-if="images.length > 0" @click.stop>
      <img :src="currentImage" :alt="project.alt" />
      <button 
        v-if="images.length > 1"
        class="carousel-btn carousel-btn-left" 
        @click.stop="previousImage"
        aria-label="Предыдущее изображение"
      >
        ‹
      </button>
      <button 
        v-if="images.length > 1"
        class="carousel-btn carousel-btn-right" 
        @click.stop="nextImage"
        aria-label="Следующее изображение"
      >
        ›
      </button>
      <div v-if="images.length > 1" class="carousel-indicators">
        <span 
          v-for="(img, index) in images" 
          :key="index"
          class="indicator"
          :class="{ active: currentImageIndex === index }"
          @click.stop="goToImage(index)"
        ></span>
      </div>
    </div>
    <div v-else class="no-image" @click.stop>
      <p>Изображения отсутствуют</p>
    </div>
    <div class="card-content">
      <p class="category-tag">{{ categoryDisplay }}</p>
      <h4 class="project-title">{{ project.title }}</h4>
      <p class="project-description">{{ project.description }}</p>
      <div class="card-progress">
        <div class="progress-text">
          <span class="current-amount">{{ formatKZT(project.collectedAmount) }}</span>
          <span class="target-amount">{{ formatKZT(project.targetAmount) }}</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
        </div>
      </div>
      <a 
         href="#" 
         style="background-color: #ff6600; color: white; padding: 10px; display: block; text-align: center; border-radius: 4px; margin-top: 10px; text-decoration: none;"
         @click.stop.prevent="goToProject">
        Помочь
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const router = useRouter()

defineEmits(['donate'])

function goToProject() {
  router.push(`/projects/${props.project.id}`)
}

const currentImageIndex = ref(0)

const images = computed(() => {
  let imageList = []
  
  if (props.project.images && Array.isArray(props.project.images) && props.project.images.length > 0) {
    imageList = props.project.images
  } else if (props.project.image) {
    imageList = [props.project.image]
  }
  
  // Фильтруем пустые строки, null, undefined и placeholder
  return imageList.filter(img => {
    return img && 
           img !== '' && 
           img !== '/placeholder.jpg' && 
           img !== 'placeholder.jpg' &&
           typeof img === 'string'
  })
})

const currentImage = computed(() => {
  if (images.value.length === 0) return ''
  return images.value[currentImageIndex.value]
})

function nextImage() {
  if (images.value.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length
  }
}

function previousImage() {
  if (images.value.length > 1) {
    currentImageIndex.value = currentImageIndex.value === 0 
      ? images.value.length - 1 
      : currentImageIndex.value - 1
  }
}

function goToImage(index) {
  currentImageIndex.value = index
}

const formatKZT = (amount) => {
  const value = amount || 0
  return `${value.toLocaleString('ru-RU')} KZT`
}

const categoryDisplay = computed(() => {
  if (props.project.category) {
    if (typeof props.project.category === 'string') {
      return props.project.category
    }
    if (props.project.category.name) {
      return `#${props.project.category.name}`
    }
  }
  return '#Без категории'
})

const progressPercentage = computed(() => {
  const targetAmount = props.project.targetAmount || 0
  const collectedAmount = props.project.collectedAmount || 0
  if (!targetAmount || targetAmount === 0) {
    return 0
  }
  const percentage = (collectedAmount / targetAmount) * 100
  return Math.min(percentage, 100)
})
</script>

<style scoped>
.project-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.image-carousel {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  z-index: 2;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.carousel-btn-left {
  left: 10px;
}

.carousel-btn-right {
  right: 10px;
}

.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: white;
}

.indicator:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.no-image {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  color: #666;
}

.no-image p {
  margin: 0;
  font-size: 14px;
}

.card-content {
  padding: 15px;
}

.category-tag {
  color: #ff6600;
  font-size: 12px;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.project-title {
  color: #222;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 15px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-progress {
  margin-top: 10px;
}

.progress-bar-container {
  background-color: #eee;
  height: 10px;
  border-radius: 5px;
  margin: 5px 0;
}

.progress-bar {
  height: 100%;
  background-color: #ff6600;
  width: 0;
  border-radius: 5px;
  transition: width 0.5s;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.current-amount {
  font-weight: bold;
  color: #ff6600;
}
</style>

