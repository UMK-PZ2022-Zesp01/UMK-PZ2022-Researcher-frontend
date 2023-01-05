import './App.css';
import {  Routes, Route } from "react-router-dom";
import MainPage from "./Components/MainPage";
import LoginRegisterPage from "./Components/LoginRegisterPage";




function App() {
  return (
    <div className="App">
        <Routes>
            <Route index element={<MainPage/>}/>
            <Route path="login" element={<LoginRegisterPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
