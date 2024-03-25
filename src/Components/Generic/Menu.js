import React from 'react';
import './Menu.css'
import { Link } from 'react-router-dom';
import imagen from './imagen/logoblanco.png';

const Menu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className='logo'>
          <img src={imagen} alt="logoblanco" id='LogoSTEL' />
          <p className='stel'>STEL</p>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item dropdown align-self-center">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Usuarios <i className="bi bi-people-fill"></i></a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item centered-text" to="/usuarios-creacion">Crear Usuario</Link></li>
                <li><Link className="dropdown-item centered-text" to="/consultar-usuario">Consultar Usuario</Link></li>
                <li><Link className="dropdown-item centered-text" to="/consultar-inmueble">Consultar Inmueble</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown align-self-center">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Administración <i className="bi bi-house"></i></a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/administracion-documentacion">Documentación</Link></li>
                <li><Link className="dropdown-item" to="/multas">Multas</Link></li>
                <li><Link className="dropdown-item" to="/cartera">Cartera</Link></li>
                <li><Link className="dropdown-item" to="/visitantes">Visitantes</Link></li>
                <li><Link className="dropdown-item" to="/resumen-datos">Resumen de datos</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown align-self-center">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Alquiler Parqueaderos <i className="bi bi-car-front-fill"></i></a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/solicitudes-alquiler">Solicitudes alquiler</Link></li>
                <li><Link className="dropdown-item" to="/cupos-parqueadero">Cupos parqueadero</Link></li>
                <li><Link className="dropdown-item" to="/movimiento-vehiculo">Entrada y Salida</Link></li>
                <li><Link className="dropdown-item" to="/configuracion-alquiler">Configuración</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown align-self-center">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Comunicación <i className="bi bi-broadcast"></i></a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/correspondencia">Correspondencia</Link></li>
                <li><Link className="dropdown-item" to="/novedades">Novedades</Link></li>
              </ul>
            </li>

            <li className="nav-item align-self-center">
              <Link className="nav-link active text-white d-flex justify-content-end" to="/cerrar-sesion">Cerrar sesión</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Menu;
