import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import Menu from '../../Generic/Menu';
import './css/Residente.css';

const Residente = () => {
    const [residents, setResidents] = useState([]);
    const [roles, setRoles] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [resident, setResident] = useState({
        id: '',
        nomResidente: '',
        cedResidente: '',
        emaResidente: '',
        celResidente: '',
        numIntegrantes: '',
        role: {
            id: '',
            nombreRol: ''
        },
        parking: {
            id: '',
            cupParqueadero: ''
        }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [residentsPerPage] = useState(8);

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

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/role/all');
            setRoles(response.data.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
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
    useEffect(() => {
        fetchResidents();
        fetchRoles();
        fetchParkings();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role.id') {
            setResident({
                ...resident,
                role: {
                    ...resident.role,
                    id: value
                }
            });
        } else if (name === 'parking.id') {
            setResident({
                ...resident,
                parking: {
                    ...resident.parking,
                    id: value
                }
            });
        } else {
            setResident({ ...resident, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formType === 'create') {
            await createResident();
        } else {
            await updateResident();
        }
    };

    const createResident = async () => {
        try {
            await axios.post('http://localhost:8085/api/resident/create', {
                nomResidente: resident.nomResidente,
                cedResidente: resident.cedResidente,
                emaResidente: resident.emaResidente,
                celResidente: resident.celResidente,
                numIntegrantes: resident.numIntegrantes,
                role: {
                    id: resident.role.id,
                    nombreRol: resident.role.nombreRol
                },
                parking: {
                    id: resident.parking.id,
                    cupParqueadero: resident.parking.cupParqueadero
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

    const updateResident = async () => {
        try {
            await axios.put(`http://localhost:8085/api/resident/update/${resident.id}`, {
                nomResidente: resident.nomResidente,
                cedResidente: resident.cedResidente,
                emaResidente: resident.emaResidente,
                celResidente: resident.celResidente,
                numIntegrantes: resident.numIntegrantes,
                role: {
                    id: resident.role.id,
                    nombreRol: resident.role.nombreRol
                },
                parking: {
                    id: resident.parking.id,
                    cupParqueadero: resident.parking.cupParqueadero
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

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setResident({
            id: '',
            nomResidente: '',
            cedResidente: '',
            emaResidente: '',
            celResidente: '',
            numIntegrantes: '',
            role: {
                id: '',
                nombreRol: ''
            },
            parking: {
                id: '',
                cupParqueadero: ''
            }
        });
    };

    const showEditForm = (selectedResident) => {
        if (selectedResident) {
            setShowForm(true);
            setFormType('edit');
            setResident({
                id: selectedResident.id,
                nomResidente: selectedResident.nomResidente,
                cedResidente: selectedResident.cedResidente,
                emaResidente: selectedResident.emaResidente,
                celResidente: selectedResident.celResidente,
                numIntegrantes: selectedResident.numIntegrantes,
                role: {
                    id: selectedResident.role ? selectedResident.role.id : '',
                    nombreRol: selectedResident.role ? selectedResident.role.nombreRol : ''
                },
                parking: {
                    id: selectedResident.parking ? selectedResident.parking.id : '',
                    cupParqueadero: selectedResident.parking ? selectedResident.parking.cupParqueadero : ''
                }
            });
        } else {
            console.error('Error: selectedResident is null');
        }
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredResidents = residents.filter(resident =>
        resident.cedResidente.toString().includes(searchTerm)
    );

    // Calcular los residentes a mostrar en la página actual
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
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => setShowForm(false)}
                            >
                            </button>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        name="nomResidente"
                                        value={resident.nomResidente}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Identificación</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="cedula"
                                        name="cedResidente"
                                        value={resident.cedResidente}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="correo"
                                        name="emaResidente"
                                        value={resident.emaResidente}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Celular</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="celular"
                                        name="celResidente"
                                        value={resident.celResidente}
                                        onChange={handleInputChange}
                                    />
                                </div>
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
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                    <i className="bi bi-person-square"></i>
                                    {formType === 'create' ? 'Crear' : 'Editar'}
                                </button>
                                <button type="button" className="btn btn-secondary me-2" style={{ backgroundColor: '#a11129' }} onClick={() => setShowForm(false)}>
                                    <i className="bi bi-person-fill-x"></i>
                                    <span className="ms-2">Cancelar</span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Identificación</th>
                            <th>Correo</th>
                            <th>Celular</th>
                            <th>Número de integrantes</th>
                            <th>Rol</th>
                            <th>Parqueadero</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentResidents.map((resident) => (
                            <tr key={resident.id}>
                                <td>{resident.id}</td>
                                <td>{resident.nomResidente}</td>
                                <td>{resident.cedResidente}</td>
                                <td>{resident.emaResidente}</td>
                                <td>{resident.celResidente}</td>
                                <td>{resident.numIntegrantes}</td>
                                <td>{resident.role ? resident.role.nombreRol : 'N/A'}</td>
                                <td>{resident.parking ? resident.parking.cupParqueadero : 'N/A'}</td>

                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => showEditForm(resident)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        <i className="bi bi-person-square"></i>
                                        <span className="ms-2">Editar</span>
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteResident(resident.id)}
                                        style={{ backgroundColor: '#a11129', borderColor: '#a11129', marginLeft: '5px' }}
                                    >
                                        <i className="bi bi-trash"></i>
                                        <span className="ms-2">Eliminar</span>
                                    </button>
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

