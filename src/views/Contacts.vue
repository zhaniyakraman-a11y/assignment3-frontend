<template>
  <div class="contacts-page">
    <section class="contacts-header">
      <h1>Контакты</h1>
      <p>Свяжитесь с нами - мы всегда рады помочь</p>
    </section>

    <section class="contacts-content">
      <div class="contact-info-section">
        <h2>Наши контакты</h2>
        <div class="contact-cards">
          <div class="contact-card">
            <div class="contact-icon">📍</div>
            <h3>Адрес</h3>
            <p>г. Алматы, ул. Абая, 150</p>
            <p>Казахстан, 050000</p>
          </div>

          <div class="contact-card">
            <div class="contact-icon">📞</div>
            <h3>Телефон</h3>
            <p>+7 (727) 123-45-67</p>
            <p>+7 (727) 123-45-68</p>
          </div>

          <div class="contact-card">
            <div class="contact-icon">✉️</div>
            <h3>Email</h3>
            <p>info@azharfund.kz</p>
            <p>support@azharfund.kz</p>
          </div>

          <div class="contact-card">
            <div class="contact-icon">🕒</div>
            <h3>Режим работы</h3>
            <p>Пн-Пт: 9:00 - 18:00</p>
            <p>Сб-Вс: 10:00 - 16:00</p>
          </div>
        </div>

        <div class="social-media">
          <h3>Мы в социальных сетях</h3>
          <div class="social-links">
            <a href="#" class="social-link">
              <span class="social-icon">📘</span>
              <span>Facebook</span>
            </a>
            <a href="#" class="social-link">
              <span class="social-icon">📷</span>
              <span>Instagram</span>
            </a>
            <a href="#" class="social-link">
              <span class="social-icon">💼</span>
              <span>LinkedIn</span>
            </a>
            <a href="#" class="social-link">
              <span class="social-icon">🐦</span>
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>

      <div class="map-section">
        <h2>Как нас найти</h2>
        <div class="map-placeholder">
          <p>📍 Карта будет здесь</p>
          <p style="font-size: 14px; color: #666; margin-top: 10px;">
            г. Алматы, ул. Абая, 150
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.contacts-page {
  min-height: 100vh;
  background-color: #f7f7f7;
}

.contacts-header {
  background-color: #222;
  color: white;
  text-align: center;
  padding: 80px 5%;
}

.contacts-header h1 {
  font-size: 48px;
  margin: 0 0 15px 0;
  color: white;
}

.contacts-header p {
  font-size: 20px;
  color: #ccc;
  margin: 0;
}

.contacts-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 5%;
}

.contact-info-section {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 0 auto 40px;
}

.contact-info-section h2 {
  font-size: 32px;
  color: #222;
  margin: 0 0 30px 0;
  text-align: center;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.contact-card {
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.contact-card h3 {
  font-size: 20px;
  color: #222;
  margin: 0 0 10px 0;
}

.contact-card p {
  font-size: 16px;
  color: #666;
  margin: 5px 0;
  line-height: 1.6;
}

.social-media {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.social-media h3 {
  font-size: 24px;
  color: #222;
  margin: 0 0 20px 0;
  text-align: center;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-decoration: none;
  color: #222;
  transition: all 0.3s;
}

.social-link:hover {
  background-color: #ff6600;
  color: white;
  transform: translateX(5px);
}

.social-icon {
  font-size: 24px;
}


.map-section {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.map-section h2 {
  font-size: 32px;
  color: #222;
  margin: 0 0 30px 0;
  text-align: center;
}

.map-placeholder {
  height: 400px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 18px;
}

@media (max-width: 1024px) {
  .contact-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contacts-header h1 {
    font-size: 36px;
  }

  .contacts-header p {
    font-size: 16px;
  }

  .contact-info-section {
    padding: 25px;
  }

  .contact-info-section h2 {
    font-size: 24px;
  }

  .social-links {
    grid-template-columns: 1fr;
  }

  .map-placeholder {
    height: 300px;
    font-size: 16px;
  }
}
</style>

