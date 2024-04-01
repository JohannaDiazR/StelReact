import React from 'react'
import Menu from './Menu'
import Footer from './Footer'
import imagen from './imagen/paquetes.PNG'
import imagenes from './imagen/parquear.PNG'
import image from './imagen/multa.PNG'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <>
        <Menu />
        <div className='Dashboard'>
                <h1>Dashboard <i class="bi bi-collection-fill"></i></h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card-Dashboard">
                            <img src={imagen} alt="paquetes" ></img>
                            <div className="card-body">
                                <h5 className="card-title">Correspondencia <i className="bi bi-bag-fill"></i></h5>
                                <p className="card-text">Incluyen paquetes, recibos, comunicados que ingresan a la copropiedad.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card-Dashboard">
                            <img src={imagenes} alt="parquear"></img>
                            <div className="card-body">
                                <h5 className="card-title">Parqueadero <i className="bi bi-p-square-fill"></i></h5>
                                <p className="card-text">Aquellos vehículos que se encuentran en el parqueadero comunal.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card-Dashboard">
                            <img src={image} alt="multa"></img>
                            <div className="card-body">
                                <h5 className="card-title">Multa <i className="bi bi-file-earmark-text-fill"></i></h5>
                                <p className="card-text">Infracciones impuestas a un inmueble, faltando al manual de convivencia.</p>
                            </div>
                        </div>
                    </div>
                </div>        

            </div>
        <Footer />
    </>

  )
}

export default Dashboard