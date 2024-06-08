import axios from "axios";
import { useEffect, useState } from "react";
import localSitePath from "../../../../../localSitePath";
import StickersList from "../../../../components/sticker/StickersList/StickersList";



export default function UserStickers() {
    const [userStickers, setUserStickers] = useState([])


    useEffect(() => {
        axios.post(
            `${localSitePath}/private/getUserStickers`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("Resp data", response.data)
                setUserStickers(response.data)
            })
            .catch((error) => {
                console.log(error)
            });

    }, [])


    return (
        <>
            <h2>My Stickers</h2>

            <StickersList stickers={userStickers} />
        </>
    )
}