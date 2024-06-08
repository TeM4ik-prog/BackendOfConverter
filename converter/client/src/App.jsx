import { createContext, useEffect, useState } from 'react'
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



let userDataContext = createContext(null)

let StickersStatusContext = createContext(null)
// main - добавление в избранные
// basket - удаление из избранных
// myЫешслукы - удаление из моих стикеров



function App() {

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
      <userDataContext.Provider value={{ userData }}>
        <StickersStatusContext.Provider value={"main"} >
          <Router>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route exact path='/userentry' element={<UserEntry />} />


              <Route exact path='/stickers/*' element={
                <Routes>

                  <Route index element={
                    <>
                      <StickersListPage />
                    </>
                  } />

                  <Route path='/:category'
                    element={<StickersListPage />}
                  />

                </Routes>
              } />


              {/* Пути для которых объязательна авторизация */}
              <Route exact path='/profile/*' element={userData ? <UserProfile /> : <RegisterRedirect />} />
              <Route path='/convert' element={userData ? <ConvertPage /> : <RegisterRedirect />} />

            </Routes>
          </Router>


        </StickersStatusContext.Provider>
      </userDataContext.Provider>



    </>
  )
}

export {
  App,
  userDataContext,
  StickersStatusContext
}
