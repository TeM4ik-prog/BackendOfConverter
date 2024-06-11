import axios from "axios";
import { useContext, useState } from "react";
import localSitePath from "../../../localSitePath";
import "./userentry.scss";

import { BsEye } from 'react-icons/bs'
import { BsEyeSlash } from 'react-icons/bs'
import Header from "../../components/particals/header/header";
import { PopupContext } from "../../App";


let NotSeePath = "./imgs/userentry/notsee_password.png"
let SeePath = "./imgs/userentry/see_password.png"


export default function UserEntry() {
    const [isRegisterMode, setIsRegisterMode] = useState(false)
    const [name, setName] = useState('1')
    const [password, setPassword] = useState('1')

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)


    let { showMessage } = useContext(PopupContext)

    let changeVisible = () => {
        setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)
    }

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
                    showMessage({ message: response.data.massage, bad: false });
                    if (response.status === 200) {

                        window.location = "/"

                    }
                })
                .catch((error) => {
                    showMessage({ message: error.response.data.message, bad: true });
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
                    showMessage({ message: response.data.massage, bad: false });

                    if (response.status === 200) {
                        window.location = "/"
                    }
                })
                .catch((error) => {
                    showMessage({ message: error.response.data.message, bad: true });
                });

        }

    }




    return (
        <>
            {/* <Header /> */}






            <div className="container">
                <div className="info-container">
                    <p className="title-entry">
                        {isRegisterMode ? 'Регистрация' : 'Авторизация'}
                    </p>

                    <div className="text-info-entry">
                        {isRegisterMode ? (
                            <p>Придумайте логин и пароль для публикаций</p>
                        ) : <p>Напишите логин и пароль для входа в свой профиль</p>}

                    </div>



                    <div className="block">
                        <input type="text" placeholder="Ваше имя"
                            onChange={(e) => setName(e.target.value)} value={name} />
                    </div>

                    <div className="block" style={{ flexDirection: "row" }}>
                        <input type={isPasswordVisible ? "password" : "text"} placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} value={password}></input>

                        <button className="eye" onClick={changeVisible}>
                            {isPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                        </button>

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


        </>
    )
}

