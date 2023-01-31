import './App.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainPage from './Components/MainPage/MainPage';
import LoginRegisterPage from './Components/LoginRegisterPage/LoginRegisterPage';
import RequireAuth from './Common/RequireAuth';
import PersistLogin from './Common/PersistLogin';
import Layout from './Common/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route element={<PersistLogin />}>
          <Route path="/" element={<MainPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/authTest" element={<MainPage />} />
          </Route>
        </Route>
        {/*<Route path="*" element={<Missing/>}></Route>*/}
      </Route>
    </Routes>
  );
}

export default App;
