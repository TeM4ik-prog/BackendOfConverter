echo "Script is running"

docker build -t stickers-converter .

    # Остановите все запущенные контейнеры
docker stop $(docker ps -a -q)
    # Удалите все контейнеры
docker rm $(docker ps -a -q)
    # Удалите все образы
docker rmi $(docker images -q)
    # Удалите висячие образы
docker image prune -f

docker run -v ${PWD}:/app -p 3000:3000 stickers-converter