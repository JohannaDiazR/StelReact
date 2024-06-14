import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import Menu from '../../Generic/Menu';
import './css/Residente.css';

const Residente = () => {
    const [residents, setResidents] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [resident, setResident] = useState({
        id: '',
        numIntegrantes: '',
        role: {
            id: '',
            nombreRol: ''
        },
        parking: {
            id: '',
            cupParqueadero: ''
        },
        user: {
            id: '',
            nombre: '',
            cedula: ''
        }
    });
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

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'parking.id') {
            setResident(prevResident => ({
                ...prevResident,
                parking: {
                    ...prevResident.parking,
                    id: value
                }
            }));
        } else if (name === 'role.id') {
            setResident(prevResident => ({
                ...prevResident,
                role: {
                    ...prevResident.role,
                    id: value
                }
            }));
        } else if (name === 'user.id') {
            setResident(prevResident => ({
                ...prevResident,
                user: {
                    ...prevResident.user,
                    id: value
                }
            }));
        } else {
            setResident({ ...resident, [name]: value });
        }
    };

    // Validate form
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate numIntegrantes
        const numIntegrantes = parseInt(resident.numIntegrantes);
        if (isNaN(numIntegrantes) || numIntegrantes < 1 || numIntegrantes > 10) {
            newErrors.numIntegrantes = 'El número de integrantes debe ser un número entre 1 y 10';
            isValid = false;
        }

        // Validate parking
        if (!resident.parking.id) {
            newErrors.parking = 'Seleccione un cupo de parqueadero';
            isValid = false;
        }

        // Validate role
        if (!resident.role.id) {
            newErrors.role = 'Seleccione un rol';
            isValid = false;
        }

        // Validate user
        if (!resident.user.id) {
            newErrors.user = 'Seleccione un usuario';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (formType === 'create') {
                await createResident();
            } else {
                await updateResident();
            }
        }
    };

    // Create resident
    const createResident = async () => {
        try {
            await axios.post('http://localhost:8085/api/resident/create', {
                numIntegrantes: resident.numIntegrantes,
                parking: {
                    id: resident.parking.id,
                    cupParqueadero: resident.parking.cupParqueadero
                },
                role: {
                    id: resident.role.id,
                    nombreRol: resident.role.nombreRol
                },
                user: {
                    id: resident.user.id,
                    nombre: resident.user.nombre,
                    cedula: resident.user.cedula
                }
            });
            setShowForm(false);
            fetchResidents();
            setMessage('Residente creado correctamente');
        } catch (error) {
            console.error('Error creating resident:', error);
            setMessage('Error al crear el residente');
        }
    };

    // Update resident
    const updateResident = async () => {
        try {
            await axios.put(`http://localhost:8085/api/resident/update/${resident.id}`, {
                numIntegrantes: resident.numIntegrantes,
                parking: {
                    id: resident.parking.id,
                    cupParqueadero: resident.parking.cupParqueadero
                },
                role: {
                    id: resident.role.id,
                    nombreRol: resident.role.nombreRol
                },
                user: {
                    id: resident.user.id,
                    nombre: resident.user.nombre,
                    cedula: resident.user.cedula
                }
            });
            setShowForm(false);
            fetchResidents();
            setMessage('Residente actualizado correctamente');
        } catch (error) {
            console.error('Error updating resident:', error);
            setMessage('Error al actualizar el residente');
        }
    };

    // Delete resident
    const deleteResident = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/api/resident/delete/${id}`);
            fetchResidents();
            setMessage('Residente eliminado correctamente');
        } catch (error) {
            console.error('Error deleting resident:', error);
            setMessage('Error al eliminar el residente');
        }
    };

    // Show create form
    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setResident({
            id: '',
            numIntegrantes: '',
            parking: {
                id: ''
            },
            role: {
                id: ''
            },
            user: {
                id: ''
            }
        });
    };

    // Show edit form
    const showEditForm = (selectedResident) => {
        console.log('selectedResident:', selectedResident);
        if (selectedResident) {
            console.log('selectedResident.user:', selectedResident.user);
            console.log('selectedResident.parking:', selectedResident.parking);
            console.log('selectedResident.role:', selectedResident.role);
            setShowForm(true);
            setFormType('edit');
            setResident(selectedResident);
        } else {
            console.error('Error: selectedResident is null');
        }
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Filter residents based on search term
    const filteredResidents = residents.filter(resident =>
        resident.user && resident.user.cedula && resident.user.cedula.toString().includes(searchTerm)
    );

    // Pagination logic
    const indexOfLastResident = currentPage * residentsPerPage;
    const indexOfFirstResident = indexOfLastResident - residentsPerPage;
    const currentResidents = filteredResidents.slice(indexOfFirstResident, indexOfLastResident);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <Menu />
            <div className='Residente'>
                <h2>Lista Residentes <i className="bi bi-person-bounding-box"></i></h2>
                <div className='d-flex justify-content-between align-items-center'>
                    <button
                        className="btn btn-success smaller-button" 
                        onClick={showCreateForm}
                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft:'150px' }}
                    >
                        <i className="bi bi-person-square"></i>
                        <span className="ms-2">Crear Residente</span>
                    </button>
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar identificacion"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.8rem', width:'350px' }}
                            />
                        </div>
                    </div>
                </div>

                {showForm && (
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className="card-title">
                                {formType === 'create' ? (
                                    <>
                                        <i className="bi bi-person-square"></i>
                                        <span className="ms-2">Crear Residente</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-person-fill-exclamation"></i>
                                        <span className="ms-2">Editar Residente</span>
                                    </>
                                )}
                            </h3>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Número de integrantes</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Número de integrantes en el inmueble"
                                        name="numIntegrantes"
                                        value={resident.numIntegrantes}
                                        onChange={handleInputChange}
                                    />
                                    {errors.numIntegrantes && <div className="text-danger">{errors.numIntegrantes}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Parqueadero</label>
                                    <select
                                        className='form-select'
                                        name='parking.id'
                                        value={resident.parking.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un cupo de parqueadero</option>
                                        {parkings.map((parking) => (
                                            <option key={parking.id} value={parking.id}>
                                                {parking.cupParqueadero}
                                            </option>
                                        ))}
                                        <option value="null">Sin carro</option>
                                    </select>
                                    {errors.parking && <div className="text-danger">{errors.parking}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Rol</label>
                                    <select
                                        className='form-select'
                                        name='role.id'
                                        value={resident.role.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un rol</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.nombreRol}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.role && <div className="text-danger">{errors.role}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Usuario</label>
                                    <select
                                        className='form-select'
                                        name='user.id'
                                        value={resident.user.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un usuario</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.nombre} ({user.cedula})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user && <div className="text-danger">{errors.user}</div>}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success smaller-button sm-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40',width: '160px', margin: 'auto' }}>
                                        <i className="bi bi-person-square"></i>
                                        {formType === 'create' ? 'Crear' : 'Editar'}
                                    </button>
                                    <button type="button" className="btn btn-secondary smaller-button sm-2" style={{ backgroundColor: '#a11129',width: '160px', margin: 'auto' }} onClick={() => setShowForm(false)}>
                                        <i className="bi bi-person-fill-x"></i>
                                        <span className="sm-2">Cancelar</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Número de integrantes</th>
                            <th>Parqueadero</th>
                            <th>Rol</th>
                            <th>Nombre</th>
                            <th>Cedula</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentResidents.map((resident) => (
                            <tr key={resident.id}>
                                <td style={{textAlign: 'center'}}>{resident.id}</td>
                                <td style={{textAlign: 'center'}}>{resident.numIntegrantes}</td>
                                <td style={{textAlign: 'center'}}>{resident.parking ? resident.parking.cupParqueadero : 'N/A'}</td>
                                <td style={{textAlign: 'center'}}>{resident.role ? resident.role.nombreRol : 'N/A'}</td>
                                <td style={{textAlign: 'center'}}>{resident.user ? resident.user.nombre : 'N/A'}</td>
                                <td style={{textAlign: 'center'}}>{resident.user ? resident.user.cedula : 'N/A'}</td>
                                <td className='text-center'>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-primary btn-sm mx-1"
                                            onClick={() => showEditForm(resident)}
                                            style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                        >
                                            <i className="bi bi-person-square"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm mx-1"
                                            onClick={() => deleteResident(resident.id)}
                                            style={{ backgroundColor: '#a11129', borderColor: '#a11129', marginLeft: '5px' }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                    
                                </td>
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

