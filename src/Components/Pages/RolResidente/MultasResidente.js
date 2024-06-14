import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import MenuResidente from '../../Generic/MenuResidente';
import '../CrudComponents/css/Multas.css';

const MultasResidente = () => {
    const [multas, setMultas] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
   
    
    const [currentPage, setCurrentPage] = useState(1);
    const [multasPerPage] = useState(5);
    
    const fetchMultas = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/fine/all');
            setMultas(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching multas:', error);
            setMessage('Error al listar las multas');
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
        fetchMultas();
        fetchWorkers();
        fetchProperties();
    }, []);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredMultas = multas.filter((multa) =>
        multa.property && multa.property.numInmueble &&
        multa.property.numInmueble.toString().includes(searchTerm)
    );

    const indexOfLastMulta = currentPage * multasPerPage;
    const indexOfFirstMulta = indexOfLastMulta - multasPerPage;
    const currentMultas = filteredMultas.slice(indexOfFirstMulta, indexOfLastMulta);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

        return (
            <>
                <MenuResidente />
                <div className='Multas'>
                    <h2>Lista de Multas <i className="bi bi-cash-coin"></i></h2>
                    <div className="d-flex justify-content-end align-items-center">
                        
                        <div className="input-group" style={{ width: '36%' }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                    <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar Inmueble"
                                    onChange={handleSearchChange}
                                    style={{ paddingLeft: '0.5rem', width:'350px' }}
                                />
                            </div>
                        </div>
                    
                    </div>
                    

                
                    <table className='table mt-4'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tipo de Multa</th>
                                <th>Fecha de Multa</th>
                                <th>Valor de Multa</th>
                                <th>Fecha de Pago</th>
                                <th>Inmueble</th>
                                <th>Nombre Trabajador</th>
                                
                               
                            </tr>
                        </thead>
                        <tbody>
                            {currentMultas.map((multa) => (
                                <tr key={multa.id}>
                                    <td style={{textAlign: 'center'}}>{multa.id}</td>
                                    <td style={{textAlign: 'center'}}>{multa.tipoMulta}</td>
                                    <td style={{textAlign: 'center'}}>{multa.fecMulta}</td>
                                    <td style={{textAlign: 'center'}}>{multa.valMulta}</td>
                                    <td style={{textAlign: 'center'}}>{multa.fpagMulta}</td>
                                    <td style={{textAlign: 'center'}}>{multa.property && multa.property.numInmueble ? multa.property.numInmueble : 'N/A'}</td>

                                    <td style={{textAlign: 'center'}}>{multa.worker ? multa.worker.userName : 'N/A'}</td>
                                    
                                
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        {filteredMultas.length > multasPerPage && (
                        <ul className="pagination-list">
                            {Array(Math.ceil(filteredMultas.length / multasPerPage)).fill().map((_, i) => (
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


export default MultasResidente;
