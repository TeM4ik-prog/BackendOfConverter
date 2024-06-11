import axios from "axios"
import { useEffect, useState } from "react"
import localSitePath from "../../../../../localSitePath"
import StickersList from "../../../../components/sticker/StickersList/StickersList"

export default function FavoritesStickers() {
    const [userFavorites, setUserFavorites] = useState([])

    useEffect(() => {
        axios.post(
            `${localSitePath}/private/getUserFavorites`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("Resp data", response.data)
                setUserFavorites(response.data)
            })
            .catch((error) => {
                console.log(error)
            });

    }, [])


    return (
        <>
            {/* <h2>Favorites</h2> */}

            <StickersList stickers={userFavorites} />


            {/* <h1>{userData.data.password}</h1> */}
        </>
    )
}