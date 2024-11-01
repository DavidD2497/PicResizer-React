import React from "react";
import { Link } from 'react-router-dom';
import logo from "../img/logo.png";

const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <section className="logo">
                    <figure><img src={logo} alt="logo" /></figure>
                </section>
                <ul>
                    <li><Link to="/">INICIO</Link></li>
                    <li><Link to="/about">SOBRE NOSOTROS</Link></li>
                    <li><Link to="/contact">CONTACTO</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

