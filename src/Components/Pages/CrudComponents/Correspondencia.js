import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../Generic/Menu';
import Footer from '../../Generic/Footer';
import './css/Correspondencia.css';

const Correspondencia = () => {
    const [correspondences, setCorrespondences] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    
    const [currentPage, setCurrentPage] = useState(1);
    const [correspondencesPerPage] = useState(7);

    const fetchCorrespondences = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/correspondence/all');
            setCorrespondences(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching correspondences:', error);
            setMessage('Error al listar las correspondencias');
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
    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/property/all');
            setProperties(response.data.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    useEffect(() => {
        fetchCorrespondences();
        fetchWorkers();
        fetchProperties();
    }, []);

    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredCorrespondences = correspondences.filter(correspondence =>
        correspondence.tipoCorrespondencia.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCorrespondence= currentPage * correspondencesPerPage;
    const indexOfFirstCorrespondence = indexOfLastCorrespondence - correspondencesPerPage;
    const currentCorrespondences = filteredCorrespondences.slice(indexOfFirstCorrespondence, indexOfLastCorrespondence);
    
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <Menu />
            <div className='Correspondence'>
                <h2>Lista correspondencias <i className="bi bi-universal-access-circle"></i></h2>
                <div className='d-flex justify-content-end align-items-center'>
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar tipo Correspondencia"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.5rem', width:'300px' }}
                            />
                            
                        </div>
                        
                    </div>

                </div >
                <div className="table-container">
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tipo Correspondencia</th>
                            <th>Fecha Correspondencia</th>
                            <th>Estado Correspondencia</th>
                            <th>Fecha Entrega</th>
                            <th>Trabajador</th>
                            <th>Inmueble</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {currentCorrespondences.map((correspondence) => (
                            <tr key={correspondence.id}>
                                <td style={{textAlign: 'center'}}>{correspondence.id}</td>
                                <td style={{textAlign: 'center'}}>{correspondence.tipoCorrespondencia}</td>
                                <td style={{textAlign: 'center'}}>{correspondence.frecCorrespondencia}</td>
                                <td style={{textAlign: 'center'}}>{correspondence.estCorrespondencia}</td>
                                <td style={{textAlign: 'center'}}>{correspondence.fentrCorrespondencia}</td>
                                <td style={{textAlign: 'center'}}>{correspondence.worker ? correspondence.worker.userName : 'N/A'}</td>
                                <td style={{textAlign: 'center'}}>{correspondence.property ? correspondence.property.numInmueble : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>    
                </table>
                </div>
                
                <div className="pagination">
                    {filteredCorrespondences.length > correspondencesPerPage && (
                    <ul className="pagination-list">
                        {Array(Math.ceil(filteredCorrespondences.length / correspondencesPerPage)).fill().map((_, i) => (
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

export default Correspondencia;