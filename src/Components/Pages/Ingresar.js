import React, { useState } from 'react';
import Modal from 'react-modal';
import Header from '../Generic/Header';
import Footer from '../Generic/Footer';
import './css/Ingresar.css';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../Services/AuthService';
import imagen from '../Generic/imagen/login.PNG';

Modal.setAppElement('#root'); // Configurar el elemento raíz de la aplicación para react-modal

const Ingresar = () => {
    const [redirectTo, setRedirectTo] = useState(null);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
    const [isChecked, setIsChecked] = useState(false); // Estado para el checkbox de protección de datos
    const [showPolicyModal, setShowPolicyModal] = useState(false); // Estado para controlar la visibilidad del modal

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usuario = e.target.usuario.value;
        const contrasena = e.target.contrasena.value;

        try {
            if (!isChecked) {
                throw new Error('Por favor, lee y acepta la política de protección de datos.');
            }

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const openPolicyModal = () => {
        setShowPolicyModal(true);
    };

    const closePolicyModal = () => {
        setShowPolicyModal(false);
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
                                <label htmlFor="contrasena" className="form-label">
                                    Contraseña
                                    <button
                                        type="button"
                                        className={`password-toggle-button ${showPassword ? 'show' : 'hide'}`}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <i className="bi bi-eye-fill"></i> :<i className="bi bi-eye-slash"> </i>}
                                    </button>
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="contrasena"
                                    name="contrasena"
                                    required
                                />
                            </div>
                            <div className='form-group form-check'>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="proteccionDatos"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                
                                <button
                                    type="button"
                                    className="btn btn-link p-0 ml-2"
                                    onClick={openPolicyModal}
                                    style={{ textDecoration: 'none' }}
                                >
                                    Leer política de protección de datos
                                </button>
                            </div>

                            <button type="submit" className="btn btn-success">Ingresar</button>
                            {error && <p className="text-danger mt-2">{error}</p>}
                        </form>
                    </div>

                </div>
            </div>

            <Modal
                isOpen={showPolicyModal}
                onRequestClose={closePolicyModal}
                contentLabel="Política de Protección de Datos"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="modal-content">
                    <h2 style={{ textAlign: 'center' }}>Política de Protección de Datos</h2>
                    <p style={{ textAlign: 'justify' }}>
                        En el Conjunto Residencial Quintas del Recreo Primera Etapa, nos preocupamos por la protección de tus datos personales. 
                        Mantenemos tu información segura y privada en todo momento, cumpliendo con las normativas vigentes de protección de datos. 
                        Si tienes alguna pregunta sobre cómo gestionamos tu información, por favor contáctanos.
                    </p>
                    <button className="btn btn-primary smaller-button sm-2" onClick={closePolicyModal}
                    style={{ backgroundColor: '#a11129', borderColor: '#a11129' }}
                    >
                        <i className="bi bi-x-octagon-fill"></i>
                     Cerrar</button>
                </div>
            </Modal>

            <Footer />
        </>
    );
};

export default Ingresar;
