# Backend Of Converter


Это мини веб-приложение на nodejs и react, c помощью которого можно конвертирвать стикеры из Telegramm(.tgs) в gif


ДЛЯ ЗАПУСКА ПРОЕКТА ВАМ ПОНАДОБИТСЯ:

1.установить Docker(https://docs.docker.com/engine/install/)

2. скачать и настроить mssql


2.откройте папку

```cd converter\server```

3.Сделайте сборку проекта

```docker build -t stickers-converter .```


4.Запуститу сборку.  
Тут порт 3000. Чтобы все запросы с клиента корректно работали измените файл converter\client\localSitePath.js на тот торт, который вы захотите поставить

```docker run -v ${PWD}:/app -p 3000:3000 stickers-converter```



