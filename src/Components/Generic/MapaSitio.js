import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Generic/Header';
import Footer from '../Generic/Footer';
import './MapaSitio.css';

const MapaSitio = () => {
    return (
        <>
            <Header />
            <h1>Mapa de Sitio <i className="bi bi-map-fill"></i></h1>
            <div className='MapaSitio container'>
                

                <div className='card'>
                    <div className='card-body'>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
                            <li><Link to="/servicios">Servicios</Link></li>
                            <li><Link to="/contactenos">Contáctanos</Link></li>
                            <li><Link to="/ingresar">Ingresar</Link></li>         
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MapaSitio;
