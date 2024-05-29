import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../Generic/Menu';
import Footer from '../../Generic/Footer';
import './css/Correspondencia.css';

const Correspondencia = () => {
    const [correspondences, setCorrespondences] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [correspondence, setCorrespondence] = useState({
        id: '',
        tipoCorrespondencia: '',
        frecCorrespondencia: '',
        estCorrespondencia: '',
        fentrCorrespondencia: '',
        worker: {
            id: '',
            cargTrabajador: ''
        }
    });
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

    useEffect(() => {
        fetchCorrespondences();
        fetchWorkers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'worker.id') {
            setCorrespondence({
                ...correspondence,
                worker: {
                    ...correspondence.worker,
                    id: value
                }
            });
        } else {
            setCorrespondence({ ...correspondence, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formType === 'create') {
            await createCorrespondence();
        } else {
            await updateCorrespondence();
        }
    };

    const createCorrespondence = async () => {
        try {
            await axios.post('http://localhost:8085/api/correspondence/create', {
                tipoCorrespondencia: correspondence.tipoCorrespondencia,
                frecCorrespondencia: correspondence.frecCorrespondencia,
                estCorrespondencia: correspondence.estCorrespondencia,
                fentrCorrespondencia: correspondence.fentrCorrespondencia,
                worker: {
                    id: correspondence.worker.id,
                    cargTrabajador: correspondence.worker.cargTrabajador
                }
            });
            setShowForm(false);
            fetchCorrespondences();
            setMessage('Correspondencia creada correctamente');
        } catch (error) {
            console.error('Error creating Correspondence', error);
            setMessage('Error al crear la correspondencia');
        }
    };

    const updateCorrespondence = async () => {
        try {
            await axios.put(`http://localhost:8085/api/correspondence/update/${correspondence.id}`, {
                tipoCorrespondencia: correspondence.tipoCorrespondencia,
                frecCorrespondencia: correspondence.frecCorrespondencia,
                estCorrespondencia: correspondence.estCorrespondencia,
                fentrCorrespondencia: correspondence.fentrCorrespondencia,
                worker: {
                    id: correspondence.worker.id,
                    cargTrabajador: correspondence.worker.cargTrabajador
                }
            });
            setShowForm(false);
            fetchCorrespondences();
            setMessage('Correspondencia Actualizada Correctamente');
        } catch (error) {
            console.error('Error updating correspondence:', error);
            setMessage('Error al actualizar la correspondencia');
        }
    };

    const deleteCorrespondence = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta correspondencia?')) {
            try {
                await axios.delete(`http://localhost:8085/api/correspondence/delete/${id}`);
                fetchCorrespondences();
                setMessage('Correspondencia eliminada correctamente');
            } catch (error) {
                console.error('Error deleting correspondence:', error);
                setMessage('Error al eliminar la correspondencia');
            }
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setCorrespondence({
            id: '',
            tipoCorrespondencia: '',
            frecCorrespondencia: '',
            estCorrespondencia: '',
            fentrCorrespondencia: '',
            worker: {
                id: '',
                cargTrabajador: ''
            }
        });
    };

    const showEditForm = (correspondence) => {
        setShowForm(true);
        setFormType('edit');
        setCorrespondence(correspondence);
    };

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
                <div className='d-flex justify-content-between align-items-center'>
                    <button
                        className="btn btn-success smaller-button"
                        onClick={showCreateForm}
                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft:'200px' }}
                    >
                        <i className="bi bi-universal-access-circle"></i>
                        <span className='ms-2'>Crear Correspondencia</span>
                    </button>
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
                                style={{ paddingLeft: '0.8rem', width:'302px' }}
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
                                        <span className='ms-2'>Crear Correspondencia</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-wrench-adjustable"></i>
                                        <span className='ms-2'>Editar Correspondencia</span>
                                    </>
                                )}
                            </h3> 
                            
                        </div> 
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>TipoCorrespondencias</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='TipoCorrespondencias'
                                        name='tipoCorrespondencia'
                                        value={correspondence.tipoCorrespondencia}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>FechaCorrespondencia</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        placeholder='FechaCorrespondencia'
                                        name='frecCorrespondencia'
                                        value={correspondence.frecCorrespondencia}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>EstadadoCorrespondencia</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Estado Correspondencia'
                                        name='estCorrespondencia'
                                        value={correspondence.estCorrespondencia}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>FechaEntrega</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        placeholder='FechaEntrega'
                                        name='fentrCorrespondencia'
                                        value={correspondence.fentrCorrespondencia}
                                        onChange={handleInputChange}
                                    />
                                
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Trabajador</label>
                                    <select
                                        className='form-select'
                                        name='worker.id'
                                        value={correspondence.worker.id}
                                        onChange={handleInputChange}
                                    >
                                        {workers.map((worker) => (
                                            <option key={worker.id} value={worker.id}>
                                                {worker.cargTrabajador}
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
                            <th>TipoCorrespondencias</th>
                            <th>FechaCorrespondencia</th>
                            <th>EstadadoCorrespondencia</th>
                            <th>FechaEntrega</th>
                            <th>Trabajador</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCorrespondences.map((correspondence) => (
                            <tr key={correspondence.id}>
                                <td>{correspondence.id}</td>
                                <td>{correspondence.tipoCorrespondencia}</td>
                                <td>{correspondence.frecCorrespondencia}</td>
                                <td>{correspondence.estCorrespondencia}</td>
                                <td>{correspondence.fentrCorrespondencia}</td>
                                <td>{correspondence.worker ? correspondence.worker.cargTrabajador : 'N/A'}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => showEditForm(correspondence)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        <i className="bi bi-wallet"></i>
                                        
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => deleteCorrespondence(correspondence.id)}
                                        style={{ backgroundColor: '#a11129', borderColor: '#a11129' }}
                                    >
                                        <i className="bi bi-trash"></i>
                                        
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>    
                </table>
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
