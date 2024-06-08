// const DownloadFile = ({ fileUrl, fileName }) => {

const DownloadFile = (e, fileUrl, fileName) => {
    e.preventDefault();

    // Создаем ссылку
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    // Программно инициируем клик
    document.body.appendChild(link);
    link.click();

    // Удаляем ссылку после скачивания
    document.body.removeChild(link);
};

//     return (
//         <button onClick={handleDownload}>
//             Скачать файл
//         </button>
//     );
// }

export {
    DownloadFile
}