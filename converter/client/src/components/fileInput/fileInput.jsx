import axios from "axios";

import { useState } from "react";
import localSitePath from "../../../localSitePath";
import "./fileInput.css";
import Sticker from "../sticker/stickerOne/stickerOne";
import AddStickerWindow from "../addStickerWindow/addStickerWindow";
import { StickersStatusContext } from "../../App";



export default function FileInput() {
    const [stickersPaths, setStickersPaths] = useState([])
    const [waitingStatus, setWaitingStatus] = useState(false)

    const [showDialog, setShowDialog] = useState(false)



    let onSendStickers = async (e) => {
        e.preventDefault()

        let formStickersData = new FormData(e.target)

        setWaitingStatus(true)
        axios.post(
            `${localSitePath}/private/convertStickers`,
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

                setShowDialog(true)
            })
            .catch((error) => {
                console.log(error)
            });
    }


    return (
        <StickersStatusContext.Provider value={null}>
            <div className="container-convert-page" encType="multipart/form-data">

                <fieldset className="field-file-form">
                    <legend>Выберете файл/файлы</legend>
                    <form className="stickers-send-form" onSubmit={onSendStickers}>
                        <input type="file" name="images" accept=".tgs" multiple required></input>

                        <button type="submit">конвертировать</button>
                    </form>

                </fieldset>



                <div className="stickers-container">
                    {!waitingStatus ? (
                        <> {stickersPaths && stickersPaths.length > 0 ? (
                            <>
                                {stickersPaths.map((path) => (
                                    <Sticker info={path} />
                                    // <img className="sticker" src={path.url}></img>
                                ))}

                            </>
                        ) : <h3>Здесь и в вашем профиле появятся ковертированные стикеры</h3>}
                        </>
                    ) : <h3>Ожидайте...</h3>}

                </div>



                {
                    showDialog ? (
                        <AddStickerWindow
                            onSetShowDialog={setShowDialog}
                            showDialog={showDialog}
                            stickersData={stickersPaths}
                            setStickersData={setStickersPaths}
                        // setIsPasswordConfirmed={setIsPasswordConfirmed}
                        />
                    ) : null
                }
            </div>
        </StickersStatusContext.Provider>
    )
}