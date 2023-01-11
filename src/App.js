import './App.css';
import {Routes, Route, Router, BrowserRouter} from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import LoginRegisterPage from "./Components/LoginRegisterPage/LoginRegisterPage";
import React from "react";




function App() {
  return (
    <div className="App">
        <BrowserRouter basename="/">
            <Routes>
                <Route index element={<MainPage/>}/>
                <Route path="login" element={<LoginRegisterPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
