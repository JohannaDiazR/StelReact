import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../Generic/Menu';
import './css/Parqueadero.css';
import Footer from '../../Generic/Footer';
import TicketVisitante from '../../Pages/RolGuarda/TicketVisitante';

const Parqueadero = () => {

    const [parkings, setParkings] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    

    const [currentPage, setCurrentPage] = useState(1);
    const [parkingsPerPage] = useState(5);
  
    const fetchParkings = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/parking/all');
        setParkings(response.data.data);
        setMessage('');
      } catch (error) {
        console.error('Error fetching parkings:', error);
        setMessage('No se recibió respuesta del servidor');
      }
    };

    useEffect(() => {
        fetchParkings();
      }, []);

    const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetear a la primera página en cada búsqueda
    };  

    const filteredParkings = parkings.filter(parking =>
        parking.cupParqueadero.toString().includes(searchTerm)
    );
    const indexOfLastParking = currentPage * parkingsPerPage;
    const indexOfFirstParking = indexOfLastParking - parkingsPerPage;
    const currentParkings = filteredParkings.slice(indexOfFirstParking, indexOfLastParking);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
           <Menu />
           <div className='Parqueaderos'>
                <h2>Lista Parqueadero <i className="bi bi-car-front"></i></h2>
                <div className="d-flex justify-content-end align-items-center">
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                        <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                            <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar Cupo Parqueadero"
                            onChange={handleSearchChange}
                            style={{ paddingLeft: '0.5rem', width:'300px' }}
                        />
                            
                        </div>
                        
                    </div>
                </div>
               
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Datos Vehículo</th>
                            <th>Número Cupo</th>
                            <th>Hora Salida</th>
                            
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentParkings.map((parking) => {
                             const parkingDateTime = new Date(parking.fecParqueadero);
                             // Formatear la fecha y hora en formato local (español)
                             const formattedDateTime = parkingDateTime.toLocaleString('es-ES', {
                                 year: 'numeric',
                                 month: '2-digit',
                                 day: '2-digit',
                                 hour: '2-digit',
                                 minute: '2-digit',
                                 second: '2-digit'
                             });
                         
                             // Formatear la hora de salida (asumiendo que es un campo time o datetime)
                             const salidaDateTime = new Date(parking.horaSalida);
                             const formattedSalidaTime = salidaDateTime.toLocaleTimeString('es-ES', {
                                 hour: '2-digit',
                                 minute: '2-digit',
                                 second: '2-digit'
                             });
                         
                             return (
                                 <tr key={parking.id}>
                                     <td style={{textAlign: 'center'}}>{parking.id}</td>
                                     <td style={{textAlign: 'center'}}>{parking.tipoParqueadero}</td>
                                     <td style={{textAlign: 'center'}}>{parking.estadoParqueadero}</td>
                                     <td style={{textAlign: 'center'}}>{formattedDateTime}</td> {/* Mostrar fecha y hora formateada */}
                                     <td style={{textAlign: 'center'}}>{parking.dvteParqueadero}</td>
                                     <td style={{textAlign: 'center'}}>{parking.cupParqueadero}</td>
                                     <td style={{textAlign: 'center'}}>{formattedSalidaTime}</td> {/* Mostrar hora de salida formateada */}
                                 
                                     <td>
                                         <div className="d-flex justify-content-center">
                                             <TicketVisitante parking={parking} />
                                         </div>
                                     </td>
                                 </tr>
                             );
                         })}
                           
                      
                    </tbody>
                </table>

                <div className="pagination">
                    {filteredParkings.length > parkingsPerPage && (
                    <ul className="pagination-list">
                        {Array(Math.ceil(filteredParkings.length / parkingsPerPage)).fill().map((_, i) => (
                        <li key={i + 1} className={`pagination-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(i + 1)} className="pagination-link">{i + 1}</button>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>

                {message && <p>{message}</p>}
           </div>
           <Footer />         
        </>
    )
}
export default Parqueadero;