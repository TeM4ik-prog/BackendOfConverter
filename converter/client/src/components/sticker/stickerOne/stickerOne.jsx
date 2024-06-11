import { useContext } from "react"
import "./stickerOne.scss"
import { PopupContext, StickersStatusContext } from "../../../App"
import { Link } from "react-router-dom"
import axios from "axios"
import localSitePath from "../../../../localSitePath"
import { DownloadFile } from "../../../utils/UtilsFunctions"

export default function Sticker({ info }) {

    let status = useContext(StickersStatusContext)


    let { showMessage } = useContext(PopupContext)

    let OnAddStickerToFavorites = () => {
        axios.post(
            `${localSitePath}/private/addStickerToFavorites`,
            { stickerId: info.stickerId },

            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response.data.message)
                showMessage({ message: response.data.message, bad: false });
            })
            .catch((error) => {
                console.log(error.response.data.message)
                showMessage({ message: error.response.data.message, bad: true });
            });
    }

    let OnDeleteStickerFromFavorites = () => {
        axios.post(
            `${localSitePath}/private/deleteStickerFromFavorites`,
            { stickerId: info.stickerId },

            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response.data.massage)
                window.location.reload()
            })
            .catch((error) => {

                console.log(error)
            });


    }



    return (

        <div className="sticker-container-info">
            <div className="sticker-main-prevue">
                {info.url ? (
                    <img src={info.url}></img>
                ) : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ40trFX91lyL64uOy7r3fWv6cOdiRMEGr1BO2P-DfyQ&s"></img>}
            </div>

            {status ? (
                <button className="button-download" onClick={(e) => DownloadFile(e, info.url, info.title)}>
                    Скачать
                </button>

            ) : null}







            {status === "favorites" ? (
                <div className="butt-interact-container" onClick={OnDeleteStickerFromFavorites}>
                    <img src="/icons/close.png"></img>
                </div>

            ) : status === "myStickers" ? (
                <Link to={`/stickerPacks/change/${info.stickerId}`}>
                    <div className="butt-interact-container">
                        <img src="/icons/pencil.png"></img>
                    </div>

                </Link>

            ) : status === "main" ? (
                <div className="butt-interact-container" onClick={OnAddStickerToFavorites}>
                    <img src="/icons/love.png"></img>
                </div>

            ) : null
            }
        </div>

    )
}