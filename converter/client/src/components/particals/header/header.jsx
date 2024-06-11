import { Link, NavLink, useLocation, useParams, useSearchParams } from "react-router-dom"
import "./header.scss"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import localSitePath from "../../../../localSitePath";
import { userDataContext } from "../../../App";

export default function Header() {
    let { userData } = useContext(userDataContext)

    const location = useLocation();
    const [searchParams] = useSearchParams();

    const [categories, setCategories] = useState(null)
    const [searchInput, setSearchInput] = useState(searchParams.get("search") || '')



    // let { category } = useParams()

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

        <>
            <div className="header">

                <div className="block-container">
                    <div className="block-container__nav" >
                        <NavLink to={"/"}>
                            <p>Главная</p>
                        </NavLink>

                        <NavLink to={"/stickerPacks"}>
                            <p>Cтикерпаки</p>
                        </NavLink>

                        <NavLink to={"/convert"}>
                            <p>Конвертировать</p>
                        </NavLink>

                    </div>


                    <div className="block-container__searchProfile">
                        <div className="input-container">
                            <input placeholder="Поиск" value={searchInput}
                                onChange={(e) => (setSearchInput(e.target.value))}
                            />


                            <button >
                                <Link to={`/stickerPacks?search=${searchInput}`}>
                                    <p>Поиск</p>
                                </Link>
                            </button>


                        </div>


                        <div className="block-container__searchProfile__profile">
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


                    </div>
                </div>

                {location.pathname.startsWith("/stickerPacks") ? (
                    <div className="categories">
                        <>
                            {
                                categories ? (
                                    <>
                                        {
                                            categories.map((item, index) => (
                                                <NavLink to={`/stickerPacks/${item.categoryId}`}>
                                                    <p className="category-text" key={index}>{item.name}</p>
                                                </NavLink>
                                            ))
                                        }
                                    </>
                                ) : <p className="category-text">загрузка категорий...</p>}
                        </>
                    </div>

                ) : null}



            </div >

        </>
    )
}