import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import { useState } from 'react';
import { useEffect } from 'react';
// Impor komponen lain sesuai kebutuhan

function App() {
    const [navbar, setNavbar] = useState(null)

    const fetchNavbar = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/navbar`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:5173'
                }
            })
            const data = await response.json()

            if (response.ok) setDataNavbar(data)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        fetchNavbar()
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* Definisikan rute lainnya di sini */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
