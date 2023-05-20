import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Common/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthProvider>
            <Routes>
                <Route path="/*" element={<App />}></Route>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
    // </React.StrictMode>
);
