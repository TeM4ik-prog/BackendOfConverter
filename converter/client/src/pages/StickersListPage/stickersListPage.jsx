import { useEffect, useState } from "react";
import StickersList from "../../components/sticker/StickersList/StickersList";
import axios from "axios";
import localSitePath from "../../../localSitePath";
import Header from "../../components/particals/header/header";
import { useParams } from "react-router-dom";

export default function StickersListPage() {
    const [stickersData, setStickersData] = useState([])

    let { category } = useParams()

    useEffect(() => {
        axios.post(
            `${localSitePath}/data/getStickers`,
            { categoryId: category, },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response.data)
                setStickersData(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [category])

    return (
        <>
            <Header />

            <p>{stickersData.categoryName}</p>



            <StickersList stickers={stickersData.stickers} />
        </>
    )
}