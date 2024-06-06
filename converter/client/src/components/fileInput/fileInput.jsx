import axios from "axios";

import { useState } from "react";
import localSitePath from "../../../localSitePath";
import "./fileInput.css";


export default function FileInput() {
    const [stickersPaths, setStickersPaths] = useState([])

    const [waitingStatus, setWaitingStatus] = useState(false)

    let onSendStickers = async (e) => {
        e.preventDefault()

        let formStickersData = new FormData(e.target)

        setWaitingStatus(true)
        axios.post(
            `${localSitePath}/converSrickers`,
            formStickersData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            .then((response) => {
                console.log(response.data.ar_paths)
                setWaitingStatus(false)
                setStickersPaths(response.data.ar_paths)
            })
            .catch((error) => {
                console.log(error)
            });
    }


    return (
        <div className="container-convert-page" encType="multipart/form-data">
            <div>
                <h1>Конвертер стикеров</h1>

                <form className="stickers-send-form" onSubmit={onSendStickers}>

                    <input type="file" name="images" accept=".tgs" multiple required></input>


                    <button type="submit">конвертировать</button>
                </form>

            </div>

            <div className="stickers-container">
                {!waitingStatus ? (
                    <> {stickersPaths && stickersPaths.length > 0 ? (
                        <>
                            {stickersPaths.map((path) => (

                                <img className="sticker" src={path}></img>
                            ))}

                        </>
                    ) : <h3>Здесь появятся ваши ковертированные стикеры</h3>}
                    </>
                ) : <h3>Ожидайте...</h3>}

            </div>
        </div>
    )
}