import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    );
};
export default Layout;
