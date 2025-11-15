# Деплой Vue приложения на Netlify

## Environment Variables для Netlify

Да, нужны две переменные окружения:

### Обязательные переменные:

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api/v1
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

**Замените `your-backend-url.onrender.com` на URL вашего бэкенда на Render.com**

Например, если ваш бэкенд доступен по адресу `https://assignment-3-momx.onrender.com`, то:

```
VITE_API_BASE_URL=https://assignment-3-momx.onrender.com/api/v1
VITE_BACKEND_URL=https://assignment-3-momx.onrender.com
```

**Примечание:** `VITE_BACKEND_URL` используется для изображений и файлов. Если не указан, будет автоматически извлечен из `VITE_API_BASE_URL`.

## Как добавить переменные окружения на Netlify:

1. Войдите в ваш проект на [Netlify](https://app.netlify.com)
2. Перейдите в **Site settings** → **Environment variables**
3. Нажмите **"Add a variable"**
4. Добавьте переменные:
   - **Key**: `VITE_API_BASE_URL`
     **Value**: `https://your-backend-url.onrender.com/api/v1`
   - **Key**: `VITE_BACKEND_URL`
     **Value**: `https://your-backend-url.onrender.com`
5. Нажмите **"Save"**

## Деплой через Netlify:

### Вариант 1: Через Netlify UI (Drag & Drop)

1. Соберите проект локально:
   ```bash
   npm install
   npm run build
   ```

2. Перейдите на [Netlify Drop](https://app.netlify.com/drop)
3. Перетащите папку `dist` в браузер
4. Добавьте переменные окружения (см. выше)

### Вариант 2: Через Git (рекомендуется)

1. Подключите ваш репозиторий к Netlify:
   - **Site settings** → **Build & deploy** → **Continuous Deployment**
   - Нажмите **"Link repository"**
   - Выберите ваш Git провайдер и репозиторий

2. Настройте сборку:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (оставьте пустым, если проект в корне)

3. Добавьте переменные окружения (см. выше)

4. Нажмите **"Deploy site"**

### Вариант 3: Через Netlify CLI

```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Войдите в Netlify
netlify login

# Инициализируйте проект
netlify init

# Установите переменные окружения
netlify env:set VITE_API_BASE_URL "https://your-backend-url.onrender.com/api/v1"
netlify env:set VITE_BACKEND_URL "https://your-backend-url.onrender.com"

# Деплой
netlify deploy --prod
```

## Важные замечания:

### 1. CORS настройки на бэкенде

Убедитесь, что на бэкенде (Render.com) разрешены запросы с вашего Netlify домена.

В `SecurityConfig.java` обновите CORS:

```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",
    "https://your-site.netlify.app",
    "https://www.your-site.netlify.app"
));
```

### 2. Изображения и файлы

✅ **Обновлено!** Теперь все URL бэкенда (изображения, аватары, документы) используют переменные окружения через утилиту `getFileUrl()`.

Код автоматически использует:
- `VITE_BACKEND_URL` (если указан)
- Или извлекает базовый URL из `VITE_API_BASE_URL` (убирая `/api/v1`)
- Fallback на `http://localhost:8080` для локальной разработки

### 3. Пересборка после изменения переменных

После добавления/изменения переменных окружения:
- Netlify автоматически пересоберет проект
- Или нажмите **"Trigger deploy"** → **"Clear cache and deploy site"**

## Проверка деплоя:

1. После деплоя откройте ваш сайт на Netlify
2. Откройте DevTools (F12) → Console
3. Проверьте, что запросы идут на правильный API URL
4. Проверьте Network tab, что нет ошибок CORS

## Troubleshooting:

### Ошибки CORS

Если видите ошибки CORS:
1. Проверьте, что `VITE_API_BASE_URL` правильно установлен
2. Обновите CORS настройки на бэкенде
3. Убедитесь, что бэкенд доступен по HTTPS

### Переменные окружения не работают

1. Убедитесь, что переменная начинается с `VITE_`
2. Пересоберите проект после добавления переменных
3. Проверьте, что переменная добавлена в правильный контекст (Production/Branch/Deploy Preview)

### Изображения не загружаются

Обновите код, чтобы использовать переменную окружения для базового URL изображений (см. ниже).

