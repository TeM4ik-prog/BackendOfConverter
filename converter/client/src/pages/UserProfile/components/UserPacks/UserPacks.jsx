import axios from "axios";
import { useContext, useEffect, useState } from "react";
import localSitePath from "../../../../../localSitePath";
import StickersList from "../../../../components/sticker/StickersList/StickersList";
import StickerPacksList from "../../../../components/stickerPack/packsList/packsList";

import "./UserPacks.scss"
import { PopupContext } from "../../../../App";

export default function UserStickers() {
    const [categories, setCategories] = useState()

    const [userStickersPacks, setUserStickersPacks] = useState([])
    const [packName, setPackName] = useState('')
    const [isCreating, setIsCreating] = useState(false);

    let { showMessage } = useContext(PopupContext)

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


        axios.post(
            `${localSitePath}/data/getCategories`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response.data)
                setCategories(response.data)
            })
            .catch((error) => {
                console.log(error)
            });

    }, [])






    let onCreateStickerPack = (e) => {
        e.preventDefault()

        let formStickerPack = new FormData(e.target)

        axios.post(
            `${localSitePath}/private/createStickerPack`,
            formStickerPack,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            .then((response) => {
                console.log("Resp data", response.data)

                showMessage({ message: response.data.massage, bad: false });
                // setUserStickersPacks(response.data)
            })
            .catch((error) => {
                console.log(error)
                showMessage({ message: ErrorEvent.response.data.massage, bad: true });
            });


    }



    return (

        <div className="user-packs-container-page">




            <button onClick={() => setIsCreating(!isCreating)}>
                {isCreating ? "Закрыть" : "Создать стикерпак"}
            </button>

            <div className={`creation-form ${isCreating ? 'expanded' : 'collapsed'}`}>
                <form onSubmit={onCreateStickerPack}>
                    <input
                        name="packName"
                        placeholder="название стикерпака"
                        value={packName}
                        onChange={(e) => setPackName(e.target.value)} required
                    />

                    <select className="input-parament" name="categoryId" required>
                        {categories ? (
                            <>
                                <option value="" disabled selected>↓ Выберите категорию ↓</option>
                                {
                                    categories.map((item, index) => (
                                        <option key={index} value={item.categoryId}>{item.name}</option>
                                    ))
                                }
                            </>
                        ) : <option value="" disabled selected>Загрузка категорий...</option>}
                    </select>

                    <button>Создать</button>
                </form>



            </div>


            {/* <div>
                <input placeholder="имя стикерпака" value={packName} onChange={(e) => (setPackName(e.target.value))}></input>

                <button onClick={onCreateStickerPack}>Создать</button>
            </div> */}


            <StickerPacksList ar_packs={userStickersPacks} />




        </div>
    )
}