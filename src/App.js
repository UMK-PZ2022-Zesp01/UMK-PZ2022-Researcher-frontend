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
import { ResearchPage } from './Components/ResearchPage/ResearchPage';
import OtherUserPage from './Components/UserPage/OtherUserPage';

import ErrorPage from './Components/Error/ErrorPage';

import RequireNoAuth from './Common/RequireNoAuth';
import { ResetPasswordPage } from './Components/ResetPasswordPage/ResetPasswordPage';
import AdditionalPage from './Components/LoginRegisterPage/AdditionalInfo/AdditionalPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route element={<PersistLogin />}>
                    <Route path="/" index element={<MainPage />} />
                    <Route path="/research/:researchCode" element={<ResearchPage />} />
                    <Route path="/profile/:username" element={<OtherUserPage />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/profile" element={<UserPage />} />
                        <Route path="/research/create" element={<CreateResearchPage />} />
                    </Route>

                    <Route element={<RequireNoAuth />}>
                        <Route path="/login" element={<LoginRegisterPage />} />
                        <Route path="/register" element={<LoginRegisterPage />} />
                        <Route
                            path={'/registeredSuccessfully'}
                            element={<RegisteredSuccessfullyPage />}
                        ></Route>

                        <Route path={'/confirmEmail/:token'} element={<ConfirmEmailPage />}></Route>
                        <Route path={'/resetPwd'} element={<ResetPasswordPage />}></Route>
                        <Route path={'/user/fill'} element={<AdditionalPage />}></Route>
                    </Route>

                    <Route path="*" element={<ErrorPage />} />
                </Route>
                {/*<Route path="*" element={<Missing/>}></Route>*/}
            </Route>
        </Routes>
    );
}

export { App };
