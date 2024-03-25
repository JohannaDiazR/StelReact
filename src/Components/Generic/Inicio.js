import React from 'react'
import Header from './Header';
import Footer from '../Generic/Footer';
import imagen from './imagen/bannerInicio.png';
import { Link } from 'react-router-dom';

import './Inicio.css';
const Inicio = () => {
    return (
        <>
            <Header />

            <div className="Inicio">

                <div className="llamadoAccion">
                    <div className="contenedorLlamadoAccion">
                        <div className="box">
                        <Link to="/servicios">
                            <img src={imagen} alt="bannerInicio" id='banner' />
                            <span className="conoceMas">Conoce más</span>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>


            < Footer />

        </>

    )
}
export default Inicio;