import StickerPack from "../packOne/packOne";
import "./packsList.scss"

export default function StickerPacksList({ ar_packs }) {


    console.log(ar_packs)


    return (

        <div className="packs-container">
            {ar_packs && ar_packs.length > 0 ? (
                <>
                    {ar_packs.map((pack_data, index) => (
                        <StickerPack key={index} info={pack_data} />
                    ))}
                </>
            ) : <h2>Стикерпаки не найдены</h2>}
        </div >

    )
}