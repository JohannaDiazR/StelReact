import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import MenuResidente from '../../Generic/MenuResidente';
import '../CrudComponents/css/Inmueble.css';

const InmuebleResidente = () => {
    const [properties, setProperties] = useState([]);
    const [residents, setResidents] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(13);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/property/all');
            setProperties(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching properties:', error);
            setMessage('Error al listar los inmuebles');
        }
    };

    const fetchResidents = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/resident/all');
            setResidents(response.data.data);
        } catch (error) {
            console.error('Error fetching residents:', error);
        }
    };

    useEffect(() => {
        fetchProperties();
        fetchResidents();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Resetear a la primera página en cada búsqueda
    };

    // Filtrar propiedades basadas en el término de búsqueda
    const filteredProperties = properties.filter(property =>
        property.andInmueble.toString().includes(searchTerm)
    );

    // Paginación - Calcula las propiedades a mostrar en la página actual
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <MenuResidente />
            <div className='Usuarios'>
                <h2>Inmuebles <i className="bi bi-house-fill"></i></h2>
                <div className="d-flex justify-content-end align-items-center"> 
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar Anden"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.5rem', width:'300px' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="table-container"> 
                    <table className='table mt-4'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Anden</th>
                                <th>Número de Inmueble</th>
                                <th>Residente</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProperties.map((property) => (
                                <tr key={property.id}>
                                    <td style={{textAlign: 'center'}}>{property.id}</td>
                                    <td style={{textAlign: 'center'}}>{property.andInmueble}</td>
                                    <td style={{textAlign: 'center'}}>{property.numInmueble}</td>
                                    <td style={{ textAlign: 'center' }}>{property.resident ? property.resident.userName : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    {filteredProperties.length > propertiesPerPage && (
                        <ul className="pagination-list">
                            {Array(Math.ceil(filteredProperties.length / propertiesPerPage)).fill().map((_, i) => (
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

export default InmuebleResidente;
