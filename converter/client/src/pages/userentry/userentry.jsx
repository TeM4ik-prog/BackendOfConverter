import axios from "axios";
import { useContext, useState } from "react";
import localSitePath from "../../../localSitePath";
import { PopupContext } from "../../App";
import "./userentry.css";


let NotSeePath = "./imgs/userentry/notsee_password.png"
let SeePath = "./imgs/userentry/see_password.png"


export default function UserEntry() {
    const [isRegisterMode, setIsRegisterMode] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')



    let IsValidForm = () => {
        if (name != '' && password != '') {
            return true
        }
        return false
    }

    let UserEntry = () => {

        if (isRegisterMode) {
            console.log({ username: name, password: password })
            axios.post(
                `${localSitePath}/register`,
                { username: name, password: password },

                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.status === 200) {

                        window.location = "/"

                    }
                })
                .catch((error) => {
                    // showMessage({ message: error.response.data.errText, bad: true });
                });
        }

        else {
            axios.post(
                `${localSitePath}/login`,
                { username: name, password: password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    // showMessage({ message: response.data.massage, bad: false });

                    if (response.status === 200) {
                        window.location = "/"
                    }
                })
                .catch((error) => {
                    showMessage({ message: error.response.data.errText, bad: true });
                });

        }

    }





    return (

        <div className="container">
            <div className="info-container">
                <h1 className="title-entry">
                    {isRegisterMode ? 'Регистрация' : 'Авторизация'}
                </h1>


                <div className="block">
                    <input className="input-in-after" type="text" placeholder="Ваше имя"
                        onChange={(e) => setName(e.target.value)} value={name} />
                </div>

                <div className="block" style={{ flexDirection: "row" }}>
                    <input className="input-in-after" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                </div>




                <button className={`button-submit-entry ${IsValidForm() ? 'CanUserSubmit' : ''}`} onClick={() => {
                    if (IsValidForm()) {
                        UserEntry()
                    }
                }
                }>{isRegisterMode ? 'Зарегистрироваться' : 'Авторизироваться'}</button>

                <div className="bottom-change-entry">
                    {isRegisterMode ? (
                        <>
                            <p>Уже есть аккаунт?</p>
                            <p className="change-text" onClick={() => setIsRegisterMode(false)}>Войти</p>
                        </>
                    ) :
                        <>
                            <p>Еще нет аккаунта?</p>
                            <p className="change-text" onClick={() => setIsRegisterMode(true)}>Регистрация</p>
                        </>

                    }
                </div>

            </div>
        </div >



    )
}

