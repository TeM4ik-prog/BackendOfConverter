import { Link, NavLink, Route, Routes } from "react-router-dom"

import axios from "axios"
import { useContext } from "react"
import localSitePath from "../../../localSitePath"
import { StickersStatusContext, userDataContext } from "../../App"

import "./userProfile.scss"
import UserStickers from "./components/UserPacks/UserPacks"
import FavoritesStickers from "./components/favorites/favorites"
import FileInput from "../../components/fileInput/fileInput"


export default function UserProfile() {
    let { userData } = useContext(userDataContext)

    let onLogout = () => {
        axios.post(
            `${localSitePath}/private/logout`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => { window.location = "/" })
            .catch(error => ('Ошибка:' + error))
    }

    console.log(userData)

    return (
        <>
            <div className="profile-container">
                <div className="header-user-menu">
                    <div className="user-info">
                        {/* <img className="user-image" src={userData.avatar}></img> */}
                        {/* https://img.freepik.com/free-photo/bright-petals-gift-love-in-a-bouquet-generated-by-ai_188544-13370.jpg" */}

                        <div className="title-data-user">
                            <p className="username">{userData.username}</p>

                        </div>


                        <p onClick={onLogout} className="logout-text">Выйти</p>
                    </div>

                    <div className="user-interact">
                        <NavLink to={`/profile/favorites`} replace>
                            <p>Избранные</p>
                        </NavLink>

                        <NavLink to={`/profile/myStickers`} replace>
                            <p>Мои стикерпаки</p>
                        </NavLink>


                        <NavLink to={`/profile/convert`}>
                            <p>Конвертировать</p>
                        </NavLink>
                    </div>

                </div>
            </div>


            <Routes>
                <Route exact path="/favorites" element={
                    <StickersStatusContext.Provider value={"favorites"}>
                        <FavoritesStickers />
                    </StickersStatusContext.Provider>
                } />


                <Route exact path="/myStickers" element={
                    <StickersStatusContext.Provider value={"myStickers"}>
                        <UserStickers />
                    </StickersStatusContext.Provider>
                } />



                <Route exact path="convert" element={<FileInput />} />

            </Routes>
        </>
    )
}