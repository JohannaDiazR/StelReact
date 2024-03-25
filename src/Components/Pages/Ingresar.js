import React from 'react'
import Header from '../Generic/Header';
import Footer from '../Generic/Footer';
import './css/Ingresar.css'
import { Link } from 'react-router-dom';
 const Ingresar = () => {
  return (
    <>
        <Header />
        <h1>Inicio de Sesión <i className="bi bi-shield-lock"></i></h1>
        <div className='Ingresar-container'>
            <form>
                <div className='form-group'>
                    <label htmlFor="exampleInputEmail1" className="form-label">Usuario <i className="bi bi-person-bounding-box"></i></label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className='form-group'>
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña <i className="bi bi-lock-fill"></i></label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <Link to="/dashboard" className="btn btn-success">Ingresar</Link>
            </form>
        </div>
        
        <Footer />
    </>
  )
}
export default Ingresar;