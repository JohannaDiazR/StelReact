import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../Generic/Menu';
import './css/Residente.css';
import Footer from '../../Generic/Footer';

const Residente = () => {
    const [residents, setResidents] = useState([]);
    const [roles, setRoles] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [message, setMessage] = useState('');
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
        if (name === 'role.id'){
            setResident({
                ...resident,
                role: {
                    ...resident.role,
                    id: value
                }
            });
        } else if (name === 'parking.id'){
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
                    cupParqueadero: selectedResident.parking? selectedResident.parking.cupParqueadero : ''
                }
            });
        } else {
            console.error('Error: selectedResident is null');
        } 
    };

    return (
        <>
            <Menu />
            <div className='Residente'>
                <h2>Lista Residentes <i className="bi bi-person-bounding-box"></i></h2>

                <button 
                    className="btn btn-success mb-3" 
                    onClick={showCreateForm}
                    style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                >
                    <i className="bi bi-person-square"></i>
                    <span className="ms-2">Crear Residente</span>
                </button>

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
                                    <label className='form-label'>Role</label>
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
                                    <label className="form-label">Parking</label>
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
                                <button type="button" className="btn btn-secondary me-2" style={{ backgroundColor: '#a11129'}} onClick={() => setShowForm(false)}>
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
                            <th>Role</th>
                            <th>Parking</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((resident) => (
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {message && <p>{message}</p>}
            </div>
            <Footer />
        </>
    );
}

export default Residente;
