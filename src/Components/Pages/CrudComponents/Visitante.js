import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import Menu from '../../Generic/Menu';
import './css/Visitante.css';

const Visitante = () => {
    const [visitors, setVisitors] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [properties, setProperties] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create'); 
    
    const [currentPage, setCurrentPage] = useState(1);
    const [visitorsPerPage] = useState(8);

    function getCurrentDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    const fetchVisitors = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/visitor/all');
            setVisitors(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching visitors:', error);
            setMessage('Error al listar los visitantes');
        }
    };

    const fetchWorkers = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/worker/all');
            setWorkers(response.data.data);
        } catch (error) {
            console.error('Error fetching workers:', error);
        }
    };

    const fetchParkings = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/parking/all');
            setParkings(response.data.data);
        } catch (error) {
            console.error('Error fetching parkings:', error);
        }
    };

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/property/all');
            setProperties(response.data.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    useEffect(() => {
        fetchVisitors();
        fetchWorkers();
        fetchParkings();
        fetchProperties();
    }, []);

    

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredVisitors = visitors.filter(visitor =>
        visitor.property.numInmueble.toString().includes(searchTerm) 
    );

    const indexOfLastVisitor = currentPage * visitorsPerPage;
    const indexOfFirstVisitor = indexOfLastVisitor - visitorsPerPage;
    const currentVisitors = filteredVisitors.slice(indexOfFirstVisitor, indexOfLastVisitor);

    const totalPages = Math.ceil(filteredVisitors.length / visitorsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Menu />
            <div className='Visitantes'>
                <h2>Visitantes <i className="bi bi-people-fill"></i></h2>
                <div className="d-flex justify-content-end align-items-center">
                    
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar Número de Inmueble"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.5rem', width:'300px' }}
                            />
                        </div>
                    </div>
                </div>

                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Identificación</th>
                            <th>Nombre Residente</th>
                            <th>¿Carro?</th>
                            <th>¿Ingreso?</th>
                            <th>Fecha Visita</th>
                            <th>Trabajador</th>
                            <th>Parqueadero</th>        
                            <th>Inmueble</th>
                              
                        </tr>
                    </thead>
                    <tbody>
                    {currentVisitors.map((visitor) => {
                        console.log(visitor.carVisitante, visitor.property);  // Verifica los valores
                        return (
                            <tr key={visitor.id}>
                                <td style={{ textAlign: 'center' }}>{visitor.id}</td>
                                <td style={{ textAlign: 'center' }}>{visitor.nomVisitante}</td>
                                <td style={{ textAlign: 'center' }}>{visitor.cedula}</td>
                                <td style={{ textAlign: 'center' }}>{visitor.nomResidente}</td>
                                <td style={{ textAlign: 'center' }}>{visitor.carVisitante}</td>
                                <td style={{ textAlign: 'center' }}>{visitor.ingrVisitante}</td>
                                <td style={{ textAlign: 'center' }}>{visitor.fecVisitante}</td>
                                <td style={{ textAlign: 'center' }}>{visitor.worker ? visitor.worker.userName : 'N/A'}</td>
                                <td style={{ textAlign: 'center' }}>{visitor.parking ? visitor.parking.cupParqueadero : 'N/A'}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {['si', 'no'].includes(visitor.carVisitante.toLowerCase()) && visitor.property
                                        ? visitor.property.numInmueble
                                        : 'N/A'}
                                </td>
                                
                            </tr>
                        );
                    })}
                </tbody>
                </table>
                <div className="pagination">
                    {filteredVisitors.length > visitorsPerPage && (
                    <ul className="pagination-list">
                        {Array(Math.ceil(filteredVisitors.length / visitorsPerPage)).fill().map((_, i) => (
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
    );
}

export default Visitante;