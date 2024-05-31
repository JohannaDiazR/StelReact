import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuResidente from './MenuResidente'
import Footer from './Footer'
import imagen from './imagen/paquetes.PNG'
import imagenes from './imagen/parquear.PNG'
import imag from './imagen/novedades.jpg'
import './Dashboard.css'

const DashboardResidente = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token){
            navigate('/ingresar');
        }
    }, [navigate]);
  
    return (
    <>
        <MenuResidente />
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
                            <img src={imag} alt="novedad"></img>
                            <div className="card-body">
                                <h5 className="card-title">Novedades <i className="bi bi-bell"></i></h5>
                                <p className="card-text">Aquellos posibles incidentes que se puedan presentar en la copropiedad.</p>
                            </div>
                        </div>
                    </div>
                </div>        

            </div>
        <Footer />
    </>

  )
}

export default DashboardResidente