import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">

                    
                    <div className="social-links">
                        <h2>Redes Sociales</h2>
                        <ul className="sci">
                            <li><a href="https://web.facebook.com/profile.php?id=100092684344485"><i className="bi bi-facebook"></i></a></li>
                            <li><a href="https://twitter.com/StelLinesw"><i className="bi bi-twitter"></i></a></li>
                            <li><a href="error404.html"><i className="bi bi-instagram"></i></a></li>
                            <li><a href="https://www.youtube.com/channel/UCVmFWIOd-M3doOMcZY0QUxA"><i className="bi bi-youtube"></i></a></li>
                        </ul>
                    </div>

                    <div className="quick-links">
                        <h2>Sitios de Interés</h2>
                        
                        <ul>
                            <li><Link to="/mapa-sitio">Mapa del Sitio</Link></li>
                        </ul>
                        
                        
                    </div>

                    
                    <div className="contact-info">
                        <h2>Horarios de Atención</h2>
                        <ul>
                            <li>
                                
                                <span><i className="bi bi-watch"></i></span><p>Martes y Jueves 06:00 pm - 08:00 pm</p>
                            </li>
                            <li>
                                <span><i className="bi bi-envelope-at"></i></span><p><a href="mailto:cquintasdelrecreo1@gmail.com">cquintasdelrecreo@gmail.com</a></p>
                            </li>
                        </ul>
                    </div>

                </div>

                
                <div className="copyrightText">
                    <p>© 2024 Stel Software - Todos los Derechos reservados.</p>
                </div>
            </footer>

        </>

    )
}
export default Footer;
