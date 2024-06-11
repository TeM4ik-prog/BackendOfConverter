import { Link } from "react-router-dom";
import Header from "../../components/particals/header/header";

import "./main.scss"


export default function MainPage() {



    return (

        <>
            <Header />


            <div className="home-top">
                <div className="converter">
                    <div className="content">
                        <p><b>Бесплатный конвертер<br />стикеров из Telegram в gif</b></p>

                        <Link to={"/convert"}>
                            <button>
                                Попробовать
                            </button>
                        </Link>
                        {/* <Button variant="primary" className="goUse" onClick={handleScrollToConverter}>Попробовать</Button> */}
                    </div>
                </div>
            </div>



        </>
    )
}