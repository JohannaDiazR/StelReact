import React from 'react'
import Header from '../Generic/Header';
import Footer from '../Generic/Footer';
import './css/Servicios.css'
import imagen from './Imagenes/administracion.PNG'
import imagenes from './Imagenes/parqueadero.PNG'
import image from './Imagenes/correspondencia.jpg'
const Servicios = () => {
    return (
        <>
            <Header />
            <div className='Servicios'>
                <h1>Servicios <i class="bi bi-signpost-2-fill"></i></h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card-Servicios">
                            <img src={imagen} alt="administracion" ></img>
                            <div className="card-body">
                                <h5 className="card-title">Administración <i class="bi bi-building-up"></i></h5>
                                <p className="card-text">Gestión integral de los recursos, transformando el conjunto en un lugar seguro para un entorno de calidez y armonía.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card-Servicios">
                            <img src={imagenes} alt="parqueadero"></img>
                            <div className="card-body">
                                <h5 className="card-title">Parqueadero <i class="bi bi-car-front"></i></h5>
                                <p className="card-text">Gestión de entrada y salida de vehículos. Podrás disfrutar de tu espacio asignado sin preocupaciones.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card-Servicios">
                            <img src={image} alt="correspondencia"></img>
                            <div className="card-body">
                                <h5 className="card-title">Comunicación <i class="bi bi-megaphone"></i></h5>
                                <p className="card-text">Gestión de la comunicación al interior del conjunto. Podrás estar al tanto de las novedades y correspondencia.</p>
                            </div>
                        </div>
                    </div>
                </div>        

            </div>
            <Footer />

        </>

    )
}
export default Servicios;