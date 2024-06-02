import React from 'react';
import { Outlet } from "react-router-dom"
import Header from "./pages/header"
export default Layout
function Layout() {
    return (<div className="py-4 px-5 flex flex-col min-h-screen">
        <Header />
        <Outlet />
    </div>)
}