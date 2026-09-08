import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";


function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Register */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Main application */}
                <Route
                    path="/*"
                    element={<MainLayout />}
                />

            </Routes>

        </BrowserRouter>
    );
}


function MainLayout() {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="app">

            <Navbar />

            <div className="main-container">

                <Sidebar />

                <Routes>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/students"
                        element={<Students />}
                    />

                </Routes>

            </div>

        </div>
    );
}


export default App;