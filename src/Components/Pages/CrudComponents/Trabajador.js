import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import Menu from '../../Generic/Menu';
import './css/Trabajador.css';

const Trabajador = () => {
    const [workers, setWorkers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [worker, setWorker] = useState({
        id: '',
        tpcoTrabajador: '',
        cargTrabajador: '',
        empTrabajador: '',
        role: {
            id: '',
            nombreRol: ''
        },
        user: {
            id: '',
            nombre: '',
            cedula: ''
        }
        
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [workersPerPage] = useState(2);
    const [errors, setErrors] = useState({});

    const tipoContratoOptions = [
        { id: 1, nombre: "Prestación de Servicios" },
        { id: 2, nombre: "Fijo" },
        { id: 3, nombre: "Indefinido" },
        { id: 4, nombre: "Obra labor" }
    ];

    const cargoOptions = [
        { id: 1, nombre: "Administrador" },
        { id: 2, nombre: "Vigilante" },
    ];
    const fetchWorkers = async () => {
        try {
            const response = await axios.get(`http://localhost:8085/api/worker/all`);
            setWorkers(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching workers:', error);
            setMessage('Error al listar los trabajadores');
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

    useEffect(() => {
        fetchWorkers();
        fetchRoles();
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role.id') {
            setWorker({
                ...worker,
                role: {
                    ...worker.role,
                    id: value
                }
            });
        } else if (name === 'user.id'){
            setWorker({
                ...worker,
                user: {
                    ...worker.user,
                    id: value
                }
            });
         
        } else {
            setWorker({ ...worker, [name]: value });
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        
        if (!worker.tpcoTrabajador){
            newErrors.tpcoTrabajador = "Seleccione un tipo de contrato"
            isValid = false;
        }
        
        if (!worker.cargTrabajador){
            newErrors.cargTrabajador = "Seleccione un cargo"
            isValid = false;
        }
        const empresaPattern = /^[a-zA-Z0-9\s]{1,30}$/;
        if (!empresaPattern.test(worker.empTrabajador)) {
            newErrors.empTrabajador = 'La empresa debe contener solo letras, números y espacios y tener como máximo 30 caracteres';
            isValid = false;
        }
        if (!worker.role.id) {
            newErrors.role = 'Seleccione un rol';
            isValid = false;
        }
        if (!worker.user.id) {
            newErrors.user = 'Seleccione un usuario';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (validateForm()){
                if (formType === 'create') {
                    await createWorker();
                } else {
                    await updateWorker();
                }
            }
            
        };
    
    const createWorker = async () => {
        try {
            await axios.post('http://localhost:8085/api/worker/create', {
                
                tpcoTrabajador: worker.tpcoTrabajador,
                cargTrabajador: worker.cargTrabajador,
                empTrabajador: worker.empTrabajador,
                role: {
                    id: worker.role.id,
                    nombreRol: worker.role.nombreRol
                },
                user: {
                    id: worker.user.id,
                    nombre: worker.user.nombre,
                    cedula: worker.user.cedula
                }
            });
            setShowForm(false);
            fetchWorkers();
            setMessage('Trabajador creado correctamente');
        } catch (error) {
            console.error('Error creating Worker', error);
            setMessage('Error al crear el trabajador');
        }
    };

    const updateWorker = async () => {
        try {
            await axios.put(`http://localhost:8085/api/worker/update/${worker.id}`, {
                tpcoTrabajador: worker.tpcoTrabajador,
                cargTrabajador: worker.cargTrabajador,
                empTrabajador: worker.empTrabajador,
                role: {
                    id: worker.role.id,
                    nombreRol: worker.role.nombreRol
                },
                user: {
                    id: worker.user.id,
                    nombre: worker.user.nombre,
                    cedula: worker.user.cedula
                }
            });
            setShowForm(false);
            fetchWorkers();
            setMessage('Trabajador actualizado correctamente');
        } catch (error) {
            console.error('Error updating worker:', error);
            setMessage('Error al actualizar el trabajador');
        }
    };

    const deleteWorker = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/api/worker/delete/${id}`);
            fetchWorkers();
            setMessage('Trabajador eliminado correctamente');
        } catch (error) {
            console.error('Error deleting worker:', error);
            setMessage('Error al eliminar el trabajador');
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setWorker({
            id: '',
            
            tpcoTrabajador: '',
            cargTrabajador: '',
            empTrabajador: '',
            role: {
                id: '',
                nombreRol: ''
            },
            user: {
                id: '',
                nombre: '',
                cedula: ''
            }
        });
    };

    const showEditForm = (selectedWorker) => {
        if (selectedWorker) {
            setShowForm(true);
            setFormType('edit');
            setWorker({
                id: selectedWorker.id,
                
                tpcoTrabajador: selectedWorker.tpcoTrabajador,
                cargTrabajador: selectedWorker.cargTrabajador,
                empTrabajador: selectedWorker.empTrabajador,
                role: {
                    id: selectedWorker.role ? selectedWorker.role.id : '',
                    nombreRol: selectedWorker.role ? selectedWorker.role.nombreRol : ''
                },
                user: {
                    id: selectedWorker.user ? selectedWorker.user.id : '',
                    nombre: selectedWorker.user ? selectedWorker.user.nombre : '',
                    cedula: selectedWorker.user ? selectedWorker.user.cedula : ''
                }
            });
        } else {
            console.error('Error: selectedWorker is null');
        }
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredWorkers = workers.filter(worker =>
        worker.user.cedula.toString().includes(searchTerm)
    );
    // Paginación
    const indexOfLastWorker = currentPage * workersPerPage;
    const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
    const currentWorkers = filteredWorkers.slice(indexOfFirstWorker, indexOfLastWorker);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    return (
        <>
            <Menu />
            <div className='Worker'>
                <h2>Lista Trabajadores <i className="bi bi-universal-access-circle"></i></h2>
                <div className="d-flex justify-content-between align-items-center"> 
                    <button
                        className="btn btn-success mb-3 smaller-button" 
                        onClick={showCreateForm}
                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft:'150px' }}
                    >
                        <i className="bi bi-universal-access-circle"></i>
                        <span className='ms-2'>Crear Trabajador</span>
                    </button>
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar Identificación Trabajador"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.5rem', width:'350px' }}
                            />  
                        </div>
                        
                    </div>
                </div>
                

                {showForm && (
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title'>
                                {formType === 'create' ? (
                                    <>
                                        <i className="bi bi-person-lines-fill"></i>
                                        <span className='ms-2'>Crear Trabajador</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-wrench-adjustable"></i>
                                        <span className='ms-2'>Editar Trabajador</span>
                                    </>
                                )}
                            </h3> 
                            
                        </div> 
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                    <label className="form-label">Usuario</label>
                                    <select
                                        className='form-select'
                                        name='user.id'
                                        value={worker.user.id}
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
                                <div className='mb-3'>
                                    <label className='form-label'>Tipo Contrato</label>
                                    <select
                                        className={`form-select ${errors.tpcoTrabajador ? 'is-invalid' : ''}`}
                                        name='tpcoTrabajador'
                                        value={worker.tpcoTrabajador}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar Tipo de Contrato</option>
                                        {tipoContratoOptions.map((option) => (
                                            <option key={option.id} value={option.nombre}>
                                                {option.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.tpcoTrabajador && <div className="text-danger">{errors.tpcoTrabajador}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Cargo</label>
                                    <select
                                        className={`form-select ${errors.cargTrabajador ? 'is-invalid' : ''}`}
                                        name='cargTrabajador'
                                        value={worker.cargTrabajador}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar Cargo</option>
                                        {cargoOptions.map((option) => (
                                            <option key={option.id} value={option.nombre}>
                                                {option.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.cargTrabajador && <div className="text-danger">{errors.cargTrabajador}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Empresa</label>
                                    <input
                                        type='text'
                                        className={`form-control ${errors.empTrabajador ? 'is-invalid' : ''}`}
                                        placeholder='Empresa'
                                        name='empTrabajador'
                                        value={worker.empTrabajador}
                                        onChange={handleInputChange}
                                    />
                                    {errors.empTrabajador && <div className="text-danger">{errors.empTrabajador}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Rol</label>
                                    <select
                                        className='form-select'
                                        name='role.id'
                                        value={worker.role.id}
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
                                
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success smaller-button sm-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', width: '160px', margin: 'auto' }}>
                                        <i className="bi bi-wallet"></i>
                                        {formType === 'create' ? 'Crear' : 'Editar'}
                                    </button>
                                    <button type="button" className="btn btn-secondary smaller-button sm-2" style={{ backgroundColor: '#a11129', width: '160px', margin: 'auto' }} onClick={() => setShowForm(false)}>
                                        <i className="bi bi-x-square-fill"></i>
                                        <span className="ms-2">Cancelar</span>
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
                            <th>Nombre</th>
                            <th>Identificación</th>
                            <th>Tipo de Contrato</th>
                            <th>Cargo</th>
                            <th>Empresa</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentWorkers.map((worker) => (
                            <tr key={worker.id}>
                                <td style={{textAlign: 'center'}}>{worker.id}</td>
                                <td style={{textAlign: 'center'}}>{worker.user ? worker.user.nombre : 'N/A'}</td>
                                <td style={{textAlign: 'center'}}>{worker.user ? worker.user.cedula : 'N/A'}</td>
                                <td style={{textAlign: 'center'}}>{worker.tpcoTrabajador}</td>
                                <td style={{textAlign: 'center'}}>{worker.cargTrabajador}</td>
                                <td style={{textAlign: 'center'}}>{worker.empTrabajador}</td>
                                <td style={{textAlign: 'center'}}>{worker.role ? worker.role.nombreRol : 'N/A'}</td>
                                <td className='text-center'>
                                    <div className="d-flex justify-content-center">
                                        <button 
                                            className="btn btn-primary btn-sm mx-1" 
                                            onClick={() => showEditForm(worker)}
                                            style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                        >
                                            <i className="bi bi-wallet"></i>
                                        </button>
                                        <button 
                                            className="btn btn-danger btn-sm mx-1" 
                                            onClick={() => deleteWorker(worker.id)}
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
                    {filteredWorkers.length > workersPerPage && (
                        <ul className="pagination-list">
                            {Array(Math.ceil(filteredWorkers.length / workersPerPage)).fill().map((_, i) => (
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

export default Trabajador;
