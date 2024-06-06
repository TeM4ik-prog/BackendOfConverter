# BackendOfConverter


Это мини веб-приложение на nodejs и react, c помощью которого можно конвертирвать стикеры из Telegramm(.tgs) в gif


ДЛЯ ЗАПУСКА ПРОЕКТА ВАМ ПОНАДОБИТСЯ:

1.установить Docker(https://docs.docker.com/engine/install/)

2.```powershell
docker build -t stickers-converter .
```


Тут порт 3000
Чтобы все запросы с клиента корректно работали измените файл converter\client\localSitePath.js
3.```powershell
docker run -v ${PWD}:/app -p 3000:3000 stickers-converter
```



