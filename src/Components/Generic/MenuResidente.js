import React from 'react';
import './Menu.css'
import { Link, useNavigate } from 'react-router-dom';
import imagen from './imagen/logoblanco.PNG';
import { logout } from '../../Services/AuthService';

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/ingresar');
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className='logo'>
          <Link to="/DashboardResidente" className="d-flex align-items-center">
            <img src={imagen} alt="logoblanco" id='LogoSTEL' />
            
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item dropdown align-self-center">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Usuarios <i className="bi bi-people-fill"></i></a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item centered-text" to="/InmuebleResidente">Inmuebles</Link></li>
                <li><Link className="dropdown-item centered-text" to="/residente">Residentes</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown align-self-center">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Administración <i className="bi bi-house"></i></a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item centered-text" to="/multas">Multas</Link></li>
                <li><Link className="dropdown-item centered-text" to="/carteraResidente">Cartera</Link></li>
                <li><Link className="dropdown-item centered-text" to="/visitante">Visitantes</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown align-self-center">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Parqueadero<i className="bi bi-car-front-fill"></i></a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item centered-text" to="/parqueadero">Parqueadero</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown align-self-center">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Comunicación <i className="bi bi-chat-left-text"></i></a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item centered-text" to="/correspondencia">Correspondencia</Link></li>
                <li><Link className="dropdown-item centered-text" to="/novedades">Novedades</Link></li>
              </ul>
            </li>

            <li className="nav-item align-self-center">
              <Link className="nav-link active text-white d-flex justify-content-end" to="/" onClick={handleLogout}>
                Salir 
                <span className="ml-2"><i className="bi bi-door-closed"></i></span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Menu;
