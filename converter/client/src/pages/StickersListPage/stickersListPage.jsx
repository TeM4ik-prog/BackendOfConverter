import { useEffect, useState } from "react";
import StickersList from "../../components/sticker/StickersList/StickersList";
import axios from "axios";
import localSitePath from "../../../localSitePath";
import Header from "../../components/particals/header/header";
import { useParams, useSearchParams } from "react-router-dom";
import StickerPacksList from "../../components/stickerPack/packsList/packsList";

export default function StickersListPage() {
    const [stickersPacksData, setStickersPacksData] = useState([])

    const [searchParams] = useSearchParams();

    let { category } = useParams()

    useEffect(() => {
        const paramsMap = {
            stickersSearch: searchParams.get("search") || '',

        };
        console.log(paramsMap)


        axios.post(
            `${localSitePath}/data/getStickerPacks`,
            { categoryId: category, paramsMap },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response.data)
                setStickersPacksData(response.data)

                // setStickersData(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [category, searchParams, location.search])

    return (
        <>
            <Header />

            {/* <p>{stickersData.categoryName}</p> */}

            <StickerPacksList ar_packs={stickersPacksData.stickerPacks} />

            {/* <StickersList stickers={stickersData.stickers} /> */}
        </>
    )
}