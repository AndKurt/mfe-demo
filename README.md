# MFE-DEMO (Build-time связывание)

Демонстрационное приложение с микрофронтендами на основе Webpack 5 Module Federation, реализующее раздельную разработку и общее состояние через Redux.

Загрузка компонентов динамическая. `const LoginForm = lazy(() => import('auth/LoginForm'))`

## Архитектура

Приложение использует Webpack Module Federation для организации микрофронтендов:

Host - оркестратор, который загружает удаленные модули

Auth - экспортирует компоненты LoginForm и UserProfile

Dashboard - экспортирует компоненты Counter и Notifications

Shared-Redux - общее состояние для всех микрофронтов

## Приложения

Host: http://localhost:3001 (основное приложение)

Auth: http://localhost:3002 (микрофронт аутентификации)

Dashboard: http://localhost:3003 (микрофронт дашборда)

## Запуск

Из корня приложения

`yarn start` - запустится host (порт: 3001), auth (порт: 3002), dashboard (порт: 3003)

## Особенности Build-Time:

✅ Простая настройка

✅ Предсказуемое поведение

❌ Для смены адресов нужна пересборка

❌ Жесткая привязка к окружению

## В консоли DevTools для проверки скорости загрузки при отключении eager

`performance.getEntriesByType('resource')
.filter(r => r.name.includes('.js'))
.forEach(r => console.log(r.name, r.duration + 'ms'));`
