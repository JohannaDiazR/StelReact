import React, { useState } from 'react';
import Header from '../Generic/Header';
import Footer from '../Generic/Footer';
import './css/Ingresar.css';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../Services/AuthService';
import imagen from '../Generic/imagen/login.PNG';

const Ingresar = () => {
    const [redirectTo, setRedirectTo] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usuario = e.target.usuario.value;
        const contrasena = e.target.contrasena.value;

        try {
            const role = await login(usuario, contrasena);
            console.log('Rol recibido:', role);

            

            switch (role) {
                case 'Administrador':
                    setRedirectTo('/Dashboard');
                    break;
                case 'Vigilante':
                    setRedirectTo('/DashboardGuarda');
                    break;
                case 'Residente':
                    setRedirectTo('/DashboardResidente');
                    break;
                default:
                    throw new Error('Rol de usuario no válido');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    if (redirectTo) {
        return <Navigate to={redirectTo} />;
    }

    return (
        <>
            <Header />
            
            
            <div className='InicioSesion-container'>
                <h1>Inicio de Sesión <i className="bi bi-building-fill"></i></h1>
                <div className='card-container'>
                    
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor="usuario" className="form-label">Usuario <i className="bi bi-person-bounding-box"></i></label>
                                    <input type="text" className="form-control" id="usuario" name="usuario" required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="contrasena" className="form-label">Contraseña <i className="bi bi-lock-fill"></i></label>
                                    <input type="password" className="form-control" id="contrasena" name="contrasena" required />
                                </div>
                                <button type="submit" className="btn btn-success">Ingresar</button>
                                {error && <p className="text-danger mt-2">{error}</p>}
                            </form>
                        </div>
                    
                </div>
            </div>
            
            <Footer />
        </>
    );
};

export default Ingresar;