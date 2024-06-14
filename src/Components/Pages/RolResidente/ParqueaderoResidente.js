import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuResidente from '../../Generic/MenuResidente';
import '../CrudComponents/css/Visitante.css';
import Footer from '../../Generic/Footer';
import TicketVisitante from '../../Pages/RolGuarda/TicketVisitante';

const ParqueaderoResidente = () => {
    const [parkings, setParkings] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showTicket, setShowTicket] = useState(false);
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
        setCurrentPage(1);
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return 'N/A';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleString('es-ES', options);
    };

    const calculateCost = (entrada, salida, tipoParqueadero) => {
        const entradaDate = new Date(entrada);
        const salidaDate = new Date(salida);
        const oneDay = 24 * 60 * 60 * 1000;
        let totalCost = 0;

        if (tipoParqueadero.toLowerCase().includes('visitante')) {
            let currentTime = entradaDate;

            while (currentTime < salidaDate) {
                const nextBoundary = new Date(currentTime);
                if (currentTime.getHours() >= 6 && currentTime.getHours() < 18) {
                    // Período de día
                    nextBoundary.setHours(18, 0, 0, 0);
                    totalCost += 4000;
                } else {
                    // Período de noche
                    nextBoundary.setHours(6, 0, 0, 0);
                    if (nextBoundary < currentTime) {
                        nextBoundary.setDate(nextBoundary.getDate() + 1);
                    }
                    totalCost += 6000;
                }

                currentTime = nextBoundary;
                if (currentTime > salidaDate) {
                    break;
                }
            }
        } else if (tipoParqueadero.toLowerCase().includes('carro-propietario')) {
            totalCost = 50000;
        } else if (tipoParqueadero.toLowerCase().includes('moto-propietario')) {
            totalCost = 36000;
        }

        return totalCost;
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
            <MenuResidente />
            <div className='Parqueaderos'>
                <h2>Lista Parqueadero <i className="bi bi-car-front"></i></h2>
                <div className="d-flex justify-content-end align-items-center">
                    
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white' }}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar Cupo Parqueadero"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.5rem', width: '300px' }}
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
                            <th>Fecha y Hora de Entrada</th>
                            <th>Datos Vehículo</th>
                            <th>Número Cupo</th>
                            <th>Hora de Salida</th>
                            <th>Costo Total</th>
                            <th>Acciones</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {currentParkings.map((parking) => (
                            <tr key={parking.id}>
                                <td style={{textAlign: 'center'}}>{parking.id}</td>
                                <td style={{textAlign: 'center'}}>{parking.tipoParqueadero}</td>
                                <td style={{textAlign: 'center'}}>{parking.estadoParqueadero}</td>
                                <td style={{textAlign: 'center'}}>{formatDateTime(parking.fecParqueadero)}</td>
                                <td style={{textAlign: 'center'}}>{parking.dvteParqueadero}</td>
                                <td style={{textAlign: 'center'}}>{parking.cupParqueadero}</td>
                                <td style={{textAlign: 'center'}}>{formatDateTime(parking.horaSalida)}</td>
                                <td style={{textAlign: 'center'}}>
                                    {['visitante', 'carro-propietario', 'moto-propietario'].some(type => parking.tipoParqueadero.toLowerCase().includes(type))
                                        ? calculateCost(parking.fecParqueadero, parking.horaSalida || new Date(), parking.tipoParqueadero).toFixed(2)
                                        : "N/A"}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                       
                                        <TicketVisitante parking={parking} />
                                        
                                    </div>
                                </td>
                            </tr>
                        ))}
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
            {showTicket && showTicket.id && (
                <TicketVisitante parking={showTicket} />
            )}
           <Footer />         
        </>
    );
}

export default ParqueaderoResidente;