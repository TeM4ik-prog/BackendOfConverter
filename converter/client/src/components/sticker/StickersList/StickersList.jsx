import { useEffect, useState } from "react"
import "./stickersList.scss"

import localSitePath from "../../../../localSitePath"
import axios from "axios";
import Sticker from "../stickerOne/stickerOne";

export default function StickersList({ stickers }) {






    return (

        <div className="stickers-list-container-info">
            {stickers && stickers.length > 0 ? (
                <>
                    {stickers.map((stickerInfo) => (
                        <Sticker info={stickerInfo} />
                    ))}
                </>
            ) : <h1>Стикеры не найдены</h1>}




        </div >


    )
}