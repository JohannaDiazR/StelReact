import React, { useState } from 'react';
import Header from '../Generic/Header';
import Footer from '../Generic/Footer';
import './css/Contactanos.css';
import emailjs from 'emailjs-com'; // Importa emailjs-com para usar Email.js

const Contactanos = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [errorNombre, setErrorNombre] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorAsunto, setErrorAsunto] = useState('');
    const [errorMensaje, setErrorMensaje] = useState('');

    const handleChangeNombre = (event) => {
        const valor = event.target.value;
        setNombre(valor);
        if (valor.length > 60) {
            setErrorNombre("El nombre no puede tener más de 60 caracteres");
        } else if (!/^[a-zA-Záéíóú\s]{3,60}$/.test(valor)) {
            setErrorNombre('Nombre inválido');
        } else {
            setErrorNombre('');
        }
    };

    const handleChangeCorreo = (event) => {
        const valor = event.target.value;
        setCorreo(valor);
        setErrorCorreo(!/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/.test(valor) ? 'Email inválido' : '');
    };

    const handleChangeAsunto = (event) => {
        const valor = event.target.value;
        setAsunto(valor);
        if (valor.length > 100) {
            setErrorAsunto('El asunto no puede tener más de 100 caracteres');
        } else {
            setErrorAsunto('');
        }
    };

    const handleChangeMensaje = (event) => {
        const valor = event.target.value;
        setMensaje(valor);
        if (valor.length > 200) {
            setErrorMensaje('El mensaje no puede tener más de 200 caracteres');
        } else {
            setErrorMensaje('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (errorNombre || errorCorreo || errorAsunto || errorMensaje) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        emailjs.send('service_2jlpl6d', 'template_72qpe2m', {
            from_name: nombre,
            from_email: correo,
            subject: asunto,
            message: mensaje,
        }, 'F6Rmn9qmjLpzJtl1L')
            .then((response) => {
                console.log('Correo enviado correctamente', response.status, response.text);
                alert('Correo electrónico enviado exitosamente');
                setNombre('');
                setCorreo('');
                setAsunto('');
                setMensaje('');
            })
            .catch((error) => {
                console.error("Error al enviar el correo", error);
                alert('Ocurrió un error al enviar el correo electrónico');
            });
    };

    return (
        <>
            <Header />
            <h1>
                Contáctanos <i className="bi bi-chat-right-text-fill"></i>
            </h1>
            <div className="Contactanos container">
                <div className="row pt-5">
                    <div className="col-lg-4 contact-info">
                        <div className="row">
                            <div className="col-2 icon">
                                <i className="bi bi-geo-alt"></i>
                            </div>
                            <div className="col-10 info">
                                <h5>Dirección</h5>
                                <p>Carrera 93D #71-49 sur, Bogotá-Colombia</p>
                            </div>
                            <div className="col-2 icon">
                                <i className="bi bi-envelope"></i>
                            </div>
                            <div className="col-10 info">
                                <h5>Correo</h5>
                                <p>cquintasdelrecreo@gmail.com</p>
                            </div>
                            <div className="col-2 icon">
                                <i className="bi bi-telephone-forward"></i>
                            </div>
                            <div className="col-10 info">
                                <h5>Número Telefónico</h5>
                                <p>3134948212</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        maxLength={60}
                                        
                                        name="nombre"
                                        placeholder="Nombre"
                                        value={nombre}
                                        onChange={handleChangeNombre}
                                        required
                                        className={`form-control ${errorNombre ? 'input-error' : ''}`}
                                    />
                                    {errorNombre && <span className="mensajeError">{errorNombre}</span>}
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        type="email"
                                        maxLength={100}
                                        name="email"
                                        placeholder="Correo electrónico"
                                        value={correo}
                                        onChange={handleChangeCorreo}
                                        required
                                        className={`form-control ${errorCorreo ? 'input-error' : ''}`}
                                    />
                                    {errorCorreo && <span className="mensajeError">{errorCorreo}</span>}
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    maxLength={100}
                                    name="asunto"
                                    placeholder="Asunto"
                                    value={asunto}
                                    onChange={handleChangeAsunto}
                                    required
                                    className={`form-control ${errorAsunto ? 'input-error' : ''}`}
                                />
                                {errorAsunto && <span className="mensajeError">{errorAsunto}</span>}
                            </div>
                            <div className="form-group">
                                <textarea
                                    maxLength={300}
                                    name="mensaje"
                                    placeholder="Mensaje"
                                    value={mensaje}
                                    onChange={handleChangeMensaje}
                                    required
                                    className={`form-control ${errorMensaje ? 'input-error' : ''}`}
                                />
                                {errorMensaje && <span className="mensajeError">{errorMensaje}</span>}
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" className="btn btn-success" value="Enviar" />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="card-body">
                        <h5 className="card-title">Ubicación</h5>
                        <iframe
                            title="Ubicación"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.805038259461!2d-74.2034172241482!3d4.628844642274496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9e09fb7b90c5%3A0x3a8f5f7057dc2a3c!2sCra.%2093d%20%2371%2C%20Bosa%2C%20Bogot%C3%A1%2C%20Cundinamarca!5e0!3m2!1ses!2sco!4v1682635253698!5m2!1ses!2sco"
                        ></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contactanos;
