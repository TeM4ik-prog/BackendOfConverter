import { Link } from "react-router-dom"
import "./header.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import localSitePath from "../../../../localSitePath";
import { userDataContext } from "../../../App";

export default function Header() {
    let { userData } = useContext(userDataContext)

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        axios.post(
            `${localSitePath}/data/getCategories`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                // console.log(response.data)
                setCategories(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])


    return (
        <div className="header-container">

            <div className="user-info-entry">
                {userData ?
                    (<Link to={`/profile`}>
                        <p>Профиль {userData.username}</p>
                    </Link>)
                    :
                    <Link to={'/userentry'}>
                        <p>Войти</p>
                    </Link>
                }

            </div>

            <div className="header-links">
                <Link to={"/"}>
                    <p>На главную</p>
                </Link>

                <Link to={"/stickers"}>
                    <p>Cтикеры</p>
                </Link>

                <Link to={"/convert"}>
                    <p>Конвертировать</p>
                </Link>
            </div>

            <div className="categories">
                <>
                    {
                        categories ? (
                            <>
                                {
                                    categories.map((item, index) => (
                                        <Link to={`/stickers/${item.categoryId}`}>
                                            <p className="category-text" key={index}>{item.name}</p>
                                        </Link>
                                    ))
                                }
                            </>
                        ) : <p className="category-text">загрузка категорий...</p>}
                </>
            </div>


        </div>
    )
}