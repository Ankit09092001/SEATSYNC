import Card from './Card';
import Navbar from './navbar';
import React, { useState,useEffect } from 'react';
import './admin.css';
import { useNavigate, Link } from "react-router-dom";

export default function App() {
    const history = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    useEffect(() => {
        if (!isAuthenticated) {
          history("/signin"); // Redirect to the login page if not authenticated.
        }
      }, [isAuthenticated, history]);
    return(
        <div className='card'>
            <Navbar/>
            <Card/>
        </div>
    );
} 