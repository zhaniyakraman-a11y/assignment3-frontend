# Быстрый старт деплоя на Netlify

## Настройки деплоя

Ваши настройки выглядят правильно:

✅ **Branch to deploy:** `main`  
✅ **Base directory:** (пусто - правильно, проект в корне)  
✅ **Build command:** `npm run build`  
✅ **Publish directory:** `dist`  
✅ **Functions directory:** `netlify/functions` (опционально)

## ⚠️ ВАЖНО: Добавьте Environment Variables!

Перед деплоем обязательно добавьте переменные окружения:

1. Перейдите в **Site settings** → **Environment variables**
2. Нажмите **"Add a variable"**
3. Добавьте две переменные:

```
VITE_API_BASE_URL=https://assignment-3-momx.onrender.com/api/v1
VITE_BACKEND_URL=https://assignment-3-momx.onrender.com
```

Или скопируйте из файла `env-for-netlify.txt` и вставьте через "Add from .env"

## После деплоя

1. Проверьте, что сайт открывается: https://assignment3-vue.netlify.app
2. Откройте DevTools (F12) → Console
3. Проверьте, что нет ошибок CORS
4. Проверьте Network tab, что запросы идут на правильный API URL

## Обновление CORS на бэкенде

Убедитесь, что на Render.com в `SecurityConfig.java` добавлен ваш Netlify домен:

```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",
    "https://assignment3-vue.netlify.app"
));
```

## Готово! 🚀

После добавления переменных окружения нажмите **"Deploy site"** или **"Save & deploy"**.

