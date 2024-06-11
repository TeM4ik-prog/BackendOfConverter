import { useContext, useEffect, useState } from "react"
import { PopupContext, StickersStatusContext } from "../../App"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./stickerpack.scss"
import localSitePath from "../../../localSitePath"
import StickersList from "../../components/sticker/StickersList/StickersList"

export default function StickerPackPage() {

    let { showMessage } = useContext(PopupContext)

    const [stickerPackInfo, setStickerPackInfo] = useState(null)
    const [isStickerPackBelongsToUser, setIsStickerPackBelongsToUser] = useState(false)



    let { stickerPackId } = useParams()

    useEffect(() => {

        axios.post(
            `${localSitePath}/private/getStickerPackDetailed`,
            { stickerPackId },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                // showMessage({ message: response.data.message, bad: false })

                console.log(response.data)
                setStickerPackInfo(response.data)
                setIsStickerPackBelongsToUser(true)
            })
            .catch((error) => {
                showMessage({ message: error.response.data.message, bad: true })
            });

    }, [stickerPackId])



    return (


        <>
            {/* {isStickerPackBelongsToUser ? ( */}
            <>
                {stickerPackInfo ? (
                    <StickersStatusContext.Provider value={stickerPackInfo.isBelongsToUser ? "myStickers" : "main"} >


                        <div className="change-info-container">
                            <p>Стикерпак {stickerPackInfo.packName}</p>



                            <StickersList stickers={stickerPackInfo.Stickers} />



                        </div>
                    </StickersStatusContext.Provider>
                ) : <h1>Данные не обнаружены</h1>}
            </>
            {/* ) : <p>Отказано в доступе</p>} */}
        </>


    )
}