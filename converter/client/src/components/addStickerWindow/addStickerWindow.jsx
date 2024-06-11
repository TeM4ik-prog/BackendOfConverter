import { useContext, useEffect, useState } from "react";
import Sticker from "../sticker/stickerOne/stickerOne";
import "./addStickerWindow.scss"
import localSitePath from "../../../localSitePath";
import axios from "axios";
import { PopupContext } from "../../App";
import { Link } from "react-router-dom";

export default function AddStickerWindow({ stickersData, setStickersData, onSetShowDialog, showDialog }) {
    const [userStickersPacks, setUserStickersPacks] = useState()
    const [isAddingDone, setIsAddingDone] = useState(false)


    let { showMessage } = useContext(PopupContext)





    console.log(stickersData)

    let onAddSticker = (e, index) => {
        e.preventDefault()

        let formAddSticker = new FormData(e.target)

        console.log(index)
        axios.post(
            `${localSitePath}/private/addStickerToDb`,
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


                showMessage({ message: response.data.message, bad: false })

            })
            .catch((error) => {
                console.log(error)
                showMessage({ message: error.response.data.message, bad: false })

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

    useEffect(() => {
        setTimeout(() => {
        
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
        }, 500);
    }, [])



    return (
        <>

            {
                showDialog ? (
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
                                                        

                                                        <select className="input-parament" name="packId" required>
                                                            {userStickersPacks ? (
                                                                <>
                                                                    <option value="" disabled selected>↓ Выберите ваш стикерпак ↓</option>
                                                                    {
                                                                        userStickersPacks.map((pack, index) => (
                                                                            <option key={index} value={pack.id}>{pack.packName}</option>
                                                                        ))
                                                                    }
                                                                </>
                                                            ) : <option value="" disabled selected>Загрузка стикерпаков...</option>}
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

    )
}