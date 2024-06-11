import axios from "axios";

import { useEffect, useState } from "react";
import localSitePath from "../../../localSitePath";
import { StickersStatusContext } from "../../App";
import AddStickerWindow from "../addStickerWindow/addStickerWindow";
import "./fileInput.scss";
import { Link } from "react-router-dom";



export default function FileInput() {
    const [stickersPaths, setStickersPaths] = useState([])
    const [waitingStatus, setWaitingStatus] = useState(false)

    const [userStickersPacks, setUserStickersPacks] = useState()

    const [showDialog, setShowDialog] = useState(false)
    const [showGifDoneConvert, setShowGifDoneConvert] = useState(false)


    useEffect(() => {
        axios.post(
            `${localSitePath}/private/getUserPacks`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("Resp data", response.data)
                setUserStickersPacks(response.data)
            })
            .catch((error) => {
                console.log(error)
            });



    }, [])


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
                setTimeout(() => {
                    console.log(response.data.ar_paths)
                    setStickersPaths(response.data.ar_paths)
                    setShowGifDoneConvert(true)

                    setTimeout(() => {
                        setShowDialog(true)
                        setWaitingStatus(false)

                    }, 2500);

                }, 5000);
            })
            .catch((error) => {
                console.log(error)
            });
    }


    return (
        <>
            {userStickersPacks && userStickersPacks.length > 0 ? (
                <>
                    <StickersStatusContext.Provider value={null}>
                        <div className="container-convert-page" encType="multipart/form-data">
                            {!waitingStatus ? (
                                <>
                                    <fieldset>
                                        <legend>Выберете файл/файлы</legend>
                                        <form className="stickers-send-form" onSubmit={onSendStickers}>
                                            <input type="file" name="images" accept=".tgs" multiple required></input>

                                            <button type="submit">конвертировать</button>
                                        </form>

                                    </fieldset>
                                    <h3>Как только стикеры конвертируются вы их увидите</h3>
                                </>
                            ) : (
                                <div className="waiting-container">

                                    {!showGifDoneConvert ? (
                                        <>
                                            <p>Ожидайте...</p>
                                            <img src='../../gifs/waiting.gif' />
                                        </>

                                    ) : (
                                        <>
                                            <p>Конвертировано</p>
                                            <img src='../../gifs/done.gif' />
                                        </>
                                    )}



                                </div>)
                            }


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
                        </div >
                    </StickersStatusContext.Provider >

                </>
            ) : (
                <Link to={'/profile/myStickers'}>
                    <p className="text-info-error">Создайте хотя бы один стикерпак</p>
                </Link>
            )}

        </>
    )
}