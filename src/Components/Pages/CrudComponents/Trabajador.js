import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import Menu from '../../Generic/Menu';
import './css/Trabajador.css';

const Trabajador = () => {
    const [workers, setWorkers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [worker, setWorker] = useState({
        id: '',
        nomTrabajador: '',
        ccTrabajador: '',
        celTrabajador: '',
        emaTrabajador: '',
        tpcoTrabajador: '',
        cargTrabajador: '',
        empTrabajador: '',
        role: {
            id: '',
            nombreRol: ''
        }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [workersPerPage] = useState(8); // Cantidad de trabajadores por página

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

    useEffect(() => {
        fetchWorkers();
        fetchRoles();
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
        } else {
            setWorker({ ...worker, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formType === 'create') {
            await createWorker();
        } else {
            await updateWorker();
        }
    };

    const createWorker = async () => {
        try {
            await axios.post('http://localhost:8085/api/worker/create', {
                nomTrabajador: worker.nomTrabajador,
                ccTrabajador: worker.ccTrabajador,
                celTrabajador: worker.celTrabajador,
                emaTrabajador: worker.emaTrabajador,
                tpcoTrabajador: worker.tpcoTrabajador,
                cargTrabajador: worker.cargTrabajador,
                empTrabajador: worker.empTrabajador,
                role: {
                    id: worker.role.id,
                    nombreRol: worker.role.nombreRol
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
                ...worker,
                role: {
                    id: worker.role.id,
                    nombreRol: worker.role.nombreRol
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
            nomTrabajador: '',
            ccTrabajador: '',
            celTrabajador: '',
            emaTrabajador: '',
            tpcoTrabajador: '',
            cargTrabajador: '',
            empTrabajador: '',
            role: {
                id: '',
                nombreRol: ''
            }
        });
    };

    const showEditForm = (selectedWorker) => {
        if (selectedWorker) {
            setShowForm(true);
            setFormType('edit');
            setWorker({
                id: selectedWorker.id,
                nomTrabajador: selectedWorker.nomTrabajador,
                ccTrabajador: selectedWorker.ccTrabajador,
                celTrabajador: selectedWorker.celTrabajador,
                emaTrabajador: selectedWorker.emaTrabajador,
                tpcoTrabajador: selectedWorker.tpcoTrabajador,
                cargTrabajador: selectedWorker.cargTrabajador,
                empTrabajador: selectedWorker.empTrabajador,
                role: {
                    id: selectedWorker.role ? selectedWorker.role.id : '',
                    nombreRol: selectedWorker.role ? selectedWorker.role.nombreRol : ''
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
        worker.ccTrabajador.toString().includes(searchTerm)
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
                                <div className='mb-3'>
                                    <label className='form-label'>Nombre</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Nombre'
                                        name='nomTrabajador'
                                        value={worker.nomTrabajador}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Identificación</label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Identificación'
                                        name='ccTrabajador'
                                        value={worker.ccTrabajador}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Celular</label>
                                    <input
                                        type='tel'
                                        className='form-control'
                                        placeholder='Celular'
                                        name='celTrabajador'
                                        value={worker.celTrabajador}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Correo</label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        placeholder='Correo Electrónico'
                                        name='emaTrabajador'
                                        value={worker.emaTrabajador}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Tipo Contrato</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Tipo del contrato'
                                        name='tpcoTrabajador'
                                        value={worker.tpcoTrabajador}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Cargo</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Cargo'
                                        name='cargTrabajador'
                                        value={worker.cargTrabajador}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Empresa</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Empresa'
                                        name='empTrabajador'
                                        value={worker.empTrabajador}
                                        onChange={handleInputChange}
                                    />
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
                                </div>
                                <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                    <i className="bi bi-wallet"></i>
                                    {formType === 'create' ? 'Crear' : 'Editar'}
                                </button>
                                <button type="button" className="btn btn-secondary me-2" style={{ backgroundColor: '#a11129' }} onClick={() => setShowForm(false)}>
                                    <i className="bi bi-x-square-fill"></i>
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
                            <th>Celular</th>
                            <th>Correo</th>
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
                                <td style={{textAlign: 'center'}}>{worker.nomTrabajador}</td>
                                <td style={{textAlign: 'center'}}>{worker.ccTrabajador}</td>
                                <td style={{textAlign: 'center'}}>{worker.celTrabajador}</td>
                                <td style={{textAlign: 'center'}}>{worker.emaTrabajador}</td>
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
