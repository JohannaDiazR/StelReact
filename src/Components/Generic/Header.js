import React from 'react';
import imagen from './imagen/logoblanco.png'
import './Header.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const Header = () => {
    return (
        <>
            <div className='header'>

                <ul className="navbar">
                    <div className='logo'>
                        <img src={imagen} alt="logoblanco" id='LogoSTEL' />
                        <p>STEL</p>
                    </div>
                    <li><Link to="/" className="style-li">Inicio</Link></li>
                    <li><Link to="/sobre-nosotros" className='style-li'>Sobre nosotros</Link></li>
                    <li><Link to="/servicios" className='style-li'>Servicios</Link></li>
                    <li><Link to="/contactenos" className='style-li'>Contáctanos</Link></li>
                    <li><Link to="/ingresar" className='style-li'>Ingresar</Link></li>

                </ul>

            </div>

        </>
    )
}
export default Header;
