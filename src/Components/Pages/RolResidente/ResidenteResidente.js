import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import MenuResidente from '../../Generic/MenuResidente';
//import '../../css/Residente.css';

const Residente = () => {
    const [residents, setResidents] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [residentsPerPage] = useState(5);
    const [errors, setErrors] = useState({});

    // Fetch functions
    const fetchResidents = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/resident/all');
            setResidents(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching residents:', error);
            setMessage('Error al listar los residentes');
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

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/role/all');
            setRoles(response.data.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/user/all');
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchResidents();
        fetchParkings();
        fetchRoles();
        fetchUsers();
    }, []);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Resetear a la primera página en cada búsqueda
    };

    // Filter residents based on search term
    const filteredResidents = residents.filter(resident =>
        resident.user && resident.user.nombre && resident.user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastResident = currentPage * residentsPerPage;
    const indexOfFirstResident = indexOfLastResident - residentsPerPage;
    const currentResidents = filteredResidents.slice(indexOfFirstResident, indexOfLastResident);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <MenuResidente />
            <div className='Residente'>
                <h2>Residentes <i className="bi bi-person-bounding-box"></i></h2>
                <div className='d-flex justify-content-end align-items-center'>
                    
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar nombre"
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
                            <th>Nombre</th>
                            <th>Número de integrantes</th>
                            <th>Parqueadero</th>
                            <th>Rol</th>
                            
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {currentResidents.map((resident) => (
                            <tr key={resident.id}>
                                <td style={{textAlign: 'center'}}>{resident.id}</td>
                                <td style={{textAlign: 'center'}}>{resident.user ? resident.user.nombre : 'N/A'}</td>
                                <td style={{textAlign: 'center'}}>{resident.numIntegrantes}</td>
                                <td style={{textAlign: 'center'}}>{resident.parking ? resident.parking.cupParqueadero : 'N/A'}</td>
                                <td style={{textAlign: 'center'}}>{resident.role ? resident.role.nombreRol : 'N/A'}</td>
                               
                                
                                
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    {filteredResidents.length > residentsPerPage && (
                    <ul className="pagination-list">
                        {Array(Math.ceil(filteredResidents.length / residentsPerPage)).fill().map((_, i) => (
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

export default Residente;

