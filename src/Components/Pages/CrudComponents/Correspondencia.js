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

    return (
        <>
            <Menu />
            <div className='Correspondence'>
                <h2>Lista correspondencias <i className="bi bi-universal-access-circle"></i></h2>
                <button
                    className="btn btn-success mb-3"
                    onClick={showCreateForm}
                    style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                >
                    <i className="bi bi-universal-access-circle"></i>
                    <span className='ms-2'>Crear Correspondencia</span>
                </button>

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
                        {correspondences.map((correspondence) => (
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
                                        <span className="ms-2">Editar</span>
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm ms-2" 
                                        onClick={() => deleteCorrespondence(correspondence.id)}
                                        style={{ backgroundColor: '#a11129', borderColor: '#a11129' }}
                                    >
                                        <i className="bi bi-trash"></i>
                                        <span className="ms-2">Eliminar</span>
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

export default Correspondencia;
