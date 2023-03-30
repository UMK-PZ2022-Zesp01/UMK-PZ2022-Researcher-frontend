import './App.module.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './Components/MainPage/MainPage';
import LoginRegisterPage from './Components/LoginRegisterPage/LoginRegisterPage';
import RequireAuth from './Common/RequireAuth';
import PersistLogin from './Common/PersistLogin';
import Layout from './Common/Layout';
import RegisteredSuccessfullyPage from './Components/RegisteredSuccessfulyPage/RegisteredSuccessfullyPage';
import ConfirmEmailPage from './Components/ConfirmEmailPage/ConfirmEmailPage';
import UserPage from './Components/UserPage/UserPage';
import { CreateResearchPage } from './Components/CreateResearchPage/CreateResearchPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/login" element={<LoginRegisterPage />} />
                <Route element={<PersistLogin />}>
                    <Route path="/" index element={<MainPage />} />
                    <Route path="/research/create" element={<CreateResearchPage />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/authTest" element={<MainPage />} />
                        <Route path="/profile" element={<UserPage />} />
                        {/*<Route path="/research/create" element={<CreateResearchPage />} />*/}
                    </Route>
                </Route>

                <Route
                    path={'/registeredSuccessfully'}
                    element={<RegisteredSuccessfullyPage />}
                ></Route>
                <Route path={'/confirmEmail/:token'} element={<ConfirmEmailPage />}></Route>
                {/*<Route path="*" element={<Missing/>}></Route>*/}
            </Route>
        </Routes>
    );
}

export { App };
