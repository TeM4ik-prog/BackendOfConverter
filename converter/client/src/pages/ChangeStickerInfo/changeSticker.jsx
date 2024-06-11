import { useContext, useEffect, useState } from "react"
import { PopupContext } from "../../App"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./changeSticker.scss"
import localSitePath from "../../../localSitePath"
import Sticker from "../../components/sticker/stickerOne/stickerOne"



export default function ChangeStickerInfo() {
    let { showMessage } = useContext(PopupContext)

    const [changeStickerInfo, setChangeStickerInfo] = useState(null)
    const [isStickerBelongsToUser, setIsStickerBelongsToUser] = useState(false)




    let { stickerId } = useParams()

    console.log(stickerId)
    console.log(changeStickerInfo)


    useEffect(() => {

        axios.post(
            `${localSitePath}/private/checkIsStickerBelongsToUser`,
            { stickerId },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                showMessage({ message: response.data.message, bad: false })

                console.log(response.data)

                setChangeStickerInfo(response.data.sticker)
                setIsStickerBelongsToUser(true)
            })
            .catch((error) => {
                showMessage({ message: error.response.data.message, bad: true })
            });

    }, [stickerId])


    // const handleBlur = (e) => {
    //     const { name, textContent } = e.target;
    //     setDataChange(prev => ({ ...prev, [name]: textContent }));
    //     console.log(changeProdInfo)
    // };


    const OnChangeStickerInfo = (e) => {
        e.preventDefault()
        const formStickerData = new FormData(e.target);
        formStickerData.append('stickerId', stickerId)


        console.log(changeStickerInfo.title)
        axios.put(
            `${localSitePath}/private/changeStickerInfo`,
            formStickerData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            .then((response) => {
                console.log(response.data)
                showMessage({ message: response.data.massage, bad: false })
            })
            .catch((error) => {
                showMessage({ message: error.response.data.massage, bad: true })
                console.log(error)
            });
    }

    return (
        <>
            {isStickerBelongsToUser ? (
                <>
                    {changeStickerInfo ? (

                        <div className="change-info-container">
                            <p className="top-text">Изменение данных стикера</p>

                            <form onSubmit={OnChangeStickerInfo} className="form-change-prod" encType="multipart/form-data" >
                                <input type="hidden" name="title" value={changeStickerInfo.title} />


                                {/* <input type="hidden" name="detailedInfo" value={changeStickerInfo.detailedInfo} /> */}

                                <fieldset className="change-info-block">
                                    <legend>Название</legend>
                                    <p className="edit-info-text" contentEditable='true' onBlur={(e) => setChangeStickerInfo(prev => ({ ...prev, title: e.target.textContent }))}>
                                        {changeStickerInfo.title}
                                    </p>
                                </fieldset>

                                {/* <fieldset className="change-info-block">
                                    <option value=""></option>
                                </fieldset> */}



                                <button className="button-submit-change" type="submit">Сохранить изменения</button>
                            </form>





                        </div>
                    ) : <h1>Данные не обнаружены</h1>}
                </>
            ) : <p>Отказано в доступе</p>
            }

        </>

    )
}