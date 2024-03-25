import React from 'react'
import Header from '../Generic/Header'
import Footer from '../Generic/Footer'
import './css/Contactanos.css'
const Contactanos = () => {
  return (
    <>
        <Header />
        <h1>Contáctanos <i className="bi bi-chat-right-text-fill"></i></h1>
        <div className='Contactanos container'>
                <div className='row pt-5'>
                    <div className='col-lg-4 contact-info'>
                        <div className='row'>
                            <div className='col-2 icon'>
                                <i className="bi bi-geo-alt"></i>
                            </div>
                            <div className='col-10 info'>
                                <h5>Dirección</h5>
                                <p>Carrera 93D #71-49 sur, Bogotá-Colombia</p>
                            </div>
                            <div className='col-2 icon'>
                                <i className="bi bi-envelope"></i>
                            </div>
                            <div className='col-10 info'>
                                <h5>Correo</h5>
                                <p>cquintasdelrecreo@gmail.com</p>
                            </div>
                            <div className='col-2 icon'>
                                <i className="bi bi-telephone-forward"></i>
                            </div>
                            <div className='col-10 info'>
                                <h5>Número Telefónico</h5>
                                <p>3134948212</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-8'>
                        <form className='contact-form'>
                            <div className='form-row'>
                                <div className='form-group col-md-6'>
                                    <input type="text" maxLength={30} className='form-control' name='nombre' placeholder='Nombre' required />
                                </div>
                                <div className='form-group col-md-6'>
                                    <input type="email" maxLength={100} className='form-control' name='email' placeholder='Correo electrónico' required />
                                </div>
                            </div>
                            <div className='form-group'>
                                <input type="text" maxLength={100} className='form-control' name='asunto' placeholder='Asunto' required />
                            </div>
                            <div className='form-group'>
                                <textarea className='form-control' maxLength={300} name='mensaje' placeholder='Mensaje' required></textarea>
                            </div>
                            <div className='form-group mt-2'>
                                <input type='submit' className="btn btn-success" value='Enviar' />
                            </div>
                        </form>
                    </div>
                </div>
                
                    <div className='card' style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className='card-body'>
                            <h5 className='card-title'>Ubicación</h5>
                            <iframe
                                title='Ubicación'
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.805038259461!2d-74.2034172241482!3d4.628844642274496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9e09fb7b90c5%3A0x3a8f5f7057dc2a3c!2sCra.%2093d%20%2371%2C%20Bosa%2C%20Bogot%C3%A1%2C%20Cundinamarca!5e0!3m2!1ses!2sco!4v1682635253698!5m2!1ses!2sco'>
                                
                            </iframe>
                        </div>
                    </div>
            </div>
        <Footer />
    </>
  )
}

export default Contactanos