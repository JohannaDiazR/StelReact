import React from 'react'
import Header from '../Generic/Header';
import Footer from '../Generic/Footer';
import './css/SobreNosotros.css'
import imagen from './Imagenes/casas.PNG'
import image from './Imagenes/casas2.PNG'
import imagene from './Imagenes/parque.PNG'
import imagenes from './Imagenes/gimnasio.PNG'

 const SobreNosotros = () => {
  return (
    <>  
        <Header />
        <div className='SobreNosotros'>
            
            <div className="card">
                <div className="card-header">
                    <h1>Sobre Nosotros <i class="bi bi-houses-fill"></i></h1>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0" style={{ textAlign: 'justify' }}>
                        <h2>Conjunto Residencial Quintas del Recreo Primera Etapa</h2>

                        Quintas del Recreo primera etapa, es un Cojunto de Propiedad Horizontal, 
                        entregado a los copropietarios en el año 2001. 
                        Consta de 240 inmuebles distribuidos en 10 andenes.
                        En las zonas comunes la copropiedad cuenta con: 
                        Parqueadero comunal con capacidad de 41 espacios para motos y 55 espacios para vehículos.
                        Además cuenta con un parque infantil para el aprovechamiento de los niños que integran el conjunto.
                        Dispone de un salón comunal social.
                    </blockquote> 
                </div>
            </div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button> {/* Agregamos este botón */}
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={imagen} className="d-block w-100" alt="casas" />
                        </div>
                        <div className="carousel-item">
                            <img src={image} className="d-block w-100" alt="casas2" />
                        </div>
                        <div className="carousel-item">
                            <img src={imagene} className="d-block w-100" alt="parque" />
                        </div>
                        <div className="carousel-item">
                            <img src={imagenes} className="d-block w-100" alt="gimnasio" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>



            

        </div>
        <Footer />
    </>
    
  )
}
export default SobreNosotros;
