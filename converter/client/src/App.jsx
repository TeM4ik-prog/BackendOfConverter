import { createContext, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileInput from './components/fileInput/fileInput'
import Header from './components/particals/header/header'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ConvertPage from './pages/Convert/convert'
import MainPage from './pages/Main/main'
import StickersList from './components/sticker/StickersList/StickersList'
import StickersListPage from './pages/StickersListPage/stickersListPage'
import RegisterRedirect from './pages/RegisterRedirect/registerRedirect'
import UserEntry from './pages/userentry/userentry'
import axios from 'axios'
import localSitePath from '../localSitePath'
import UserProfile from './pages/UserProfile/userProfile'
import Footer from './components/particals/footer/footer'
import Popup from './components/particals/popup/popup'
import ChangeStickerInfo from './pages/ChangeStickerInfo/changeSticker'
import StickerPackPage from './pages/StickerPack/stickerpack'



let userDataContext = createContext(null)
let PopupContext = createContext(null)

let StickersStatusContext = createContext(null)
// main - добавление в избранные
// basket - удаление из избранных
// myStickers - удаление из моих стикеров







function App() {
  const [messages, setMessages] = useState([]);
  const timersRef = useRef({});

  const showMessage = ({ message, bad }) => {
    // console.log(m)
    const newMessage = { id: `${Date.now()}`, message, bad };

    setMessages([newMessage, ...messages]);

    const timerId = setTimeout(() => {
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== newMessage.id));
    }, 3000);

    console.log("Add")
    console.log(newMessage)

    timersRef.current[newMessage.id] = timerId;
  };

  const [userData, setUserData] = useState('');

  useEffect(() => {
    axios.post(
      `${localSitePath}/private/getUserData`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => response.data)
      .then(data => setUserData(data))
      .catch(error => console.log('Ошибка:' + error));
  }, []);

  return (
    <>
      <Popup messages={messages} />

      <userDataContext.Provider value={{ userData }}>
        <PopupContext.Provider value={{ showMessage }}>
          <StickersStatusContext.Provider value={"main"} >
            <Router>
              <Routes>
                <Route path='/' element={<MainPage />} />
                <Route exact path='/userentry' element={<UserEntry />} />


                <Route exact path='/stickerPacks/*' element={
                  <Routes>

                    <Route index element={
                      <>
                        <StickersListPage />
                      </>
                    } />

                    <Route path='/:category'
                      element={<StickersListPage />}
                    />

                    <Route path='/pack/:stickerPackId'
                      element={<StickerPackPage />}
                    />

                    <Route path='/change/:stickerId'
                      element={<ChangeStickerInfo />}
                    />

                  </Routes>
                } />


                {/* Пути для которых объязательна авторизация */}
                <Route exact path='/profile/*' element={userData ? <UserProfile /> : <RegisterRedirect />} />
                <Route path='/convert' element={userData ? <ConvertPage /> : <RegisterRedirect />} />

              </Routes>

              <Footer />
            </Router>


          </StickersStatusContext.Provider>
        </PopupContext.Provider>
      </userDataContext.Provider>



    </>
  )
}

export {
  App,
  userDataContext,
  StickersStatusContext,
  PopupContext
}
