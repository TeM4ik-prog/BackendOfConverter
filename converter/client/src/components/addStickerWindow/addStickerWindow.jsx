import { useEffect, useState } from "react";
import Sticker from "../sticker/stickerOne/stickerOne";
import "./addStickerWindow.css"
import localSitePath from "../../../localSitePath";
import axios from "axios";

export default function AddStickerWindow({ stickersData, setStickersData, onSetShowDialog, showDialog }) {

    const [categories, setCategories] = useState()

    const [isAddingDone, setIsAddingDone] = useState(false)

    useEffect(() => {
        setTimeout(() => {
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
        }, 500);
    }, [])

    console.log(stickersData)

    let onAddSticker = (e, index) => {
        e.preventDefault()

        let formAddSticker = new FormData(e.target)

        console.log(index)
        axios.post(
            `${localSitePath}/private/addStickerToBd`,
            formAddSticker,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            .then((response) => {
                const newStickersData = [...stickersData];
                newStickersData[index] = {
                    ...newStickersData[index],
                    confirmed: true
                };
                setStickersData(newStickersData)




            })
            .catch((error) => {
                console.log(error)
            });
    }


    useEffect(() => {
        let result = true
        stickersData.forEach((el) => {

            console.log(el)
            if (!el.confirmed) {
                result = false
                return
            }
        })

        console.log(result)
        return setIsAddingDone(result)
    }, [stickersData])




    return (

        <>
            {showDialog ? (
                <>
                    <div className="filter-block"></div>
                    <dialog className="dialog-sticker-container" style={{ filter: "none !important" }} open>

                        {!isAddingDone ? (
                            <div className="header-info-dialog">
                                <p className="text-title-dialog">Внесите данные стикеров</p>
                            </div>
                        ) : (
                            <div>
                                <h3>Вы молодец!</h3>
                                <a onClick={() => (onSetShowDialog(false))}>Закрыть окно</a>
                            </div>
                        )}



                        <div>
                            {stickersData && stickersData.length > 0 ? (
                                <>
                                    {stickersData.map((sticker, index) => (
                                        <>
                                            {!sticker.confirmed ? (
                                                < form key={index} onSubmit={(e) => onAddSticker(e, index)} className="params-sticker-container">
                                                    <Sticker info={sticker} />
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

                                                    <input type="hidden" name="path" value={sticker.url}></input>
                                                    <input placeholder="краткое описание" name='title' required></input>


                                                    {/* <img className="sticker" src={path.url}></img> */}

                                                    <button className="butt-confirm">Подтвертить</button>
                                                </form>
                                            ) : null
                                            }
                                        </>
                                    ))}

                                </>
                            ) : <h3>Здесь и в вашем профиле появятся ковертированные стикеры</h3>}
                        </div>



                    </dialog >
                </>
            ) : null
            }





        </>

        // <div className="sticker-window-container">


        // </div>


    )
}