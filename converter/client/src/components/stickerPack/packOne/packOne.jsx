import { Link } from "react-router-dom"
import "./packOne.scss"

export default function StickerPack({ info }) {



    return (
        <Link to={`/stickerPacks/pack/${info.id}`}>
            <div className="pack-container" >
                <p className="packName">{info.packName}</p>

                {info.Stickers[0] ? (
                    <img src={info.Stickers[0].url} />
                ) : <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ40trFX91lyL64uOy7r3fWv6cOdiRMEGr1BO2P-DfyQ&s'/>}

            </div>
        </Link>


    )
}