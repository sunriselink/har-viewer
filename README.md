# Простейший просмотрщик HAR-ников

> Возможно будет дорабатываться если ну прям надо

## [Открыть](https://sunriselink.github.io/har-viewer)

## Запуск в Docker

Для сборки и запуска проекта выполнить команду:

```shell
docker compose up -d --build web
```

Проект будет доступен по адресу `http://localhost:8080`.

Если требуется проверить работу Service Worker'а, то надо подключиться к HTTPS туннелю. Для этого требуется запустить еще один контейнер:

```shell
docker compose up -d --build lt
```

Адрес туннеля можно достать из логов командой:

```shell
docker compose logs lt
```
