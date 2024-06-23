import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menuguarda from '../../Generic/Menuguarda';
import Footer from '../../Generic/Footer';
import '../CrudComponents/css/Correspondencia.css';


const CorrespondenciaGuarda = () => {
    const [correspondences, setCorrespondences] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [properties, setProperties] = useState([]);
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
            userName: ''
        },
        property: {
            id: '',
            numInmueble: ''

        }
    });
    const [errors, setErrors] = useState({});
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
    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/property/all');
            setProperties(response.data.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    useEffect(() => {
        fetchCorrespondences();
        fetchWorkers();
        fetchProperties();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'worker.id') {
            const selectedWorker = workers.find(worker => worker.id === parseInt(value));
            if (selectedWorker && selectedWorker.user) {
                setCorrespondence(prevState => ({
                    ...prevState,
                    worker: {
                        ...prevState.worker,
                        id: value,
                        userName: selectedWorker.user.nombre,
                    }
                }));
            } else {
                setCorrespondence(prevState => ({
                    ...prevState,
                    worker: {
                        ...prevState.worker,
                        id: value,
                        userName: 'N/A'
                    }
                }));
            }
        } else if (name === 'property.id') {
            setCorrespondence(prevCorrespondence => ({
                ...prevCorrespondence,
                property: {
                    ...prevCorrespondence.property,
                    id: value
                }
            }));
        } else {
            setCorrespondence(prevCorrespondence => ({
                ...prevCorrespondence,
                [name]: value
            }));

            // Limpiar el campo de fecha de entrega si el estado es No Entregado
            if (name === 'estCorrespondencia' && value === 'No Entregado') {
                setCorrespondence(prevCorrespondence => ({
                    ...prevCorrespondence,
                    fentrCorrespondencia: '' // Limpiamos la fecha de entrega
                }));
            }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (formType === 'create') {
                await createCorrespondence();
            } else {
                await updateCorrespondence();
            }
        }
        
    };
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
    
        const today = new Date().toISOString().split('T')[0];
    
        if (!correspondence.tipoCorrespondencia) {
            newErrors.tipoCorrespondencia = 'Seleccione un tipo de correspondencia';
            isValid = false;
        }
        if (!correspondence.frecCorrespondencia) {
            newErrors.frecCorrespondencia = 'Seleccione la fecha actual';
            isValid = false;
        } else if (correspondence.frecCorrespondencia !== today) {
            newErrors.frecCorrespondencia = 'La fecha de correspondencia debe ser la fecha actual';
            isValid = false;
        }
        if (!correspondence.estCorrespondencia) {
            newErrors.estCorrespondencia = 'Seleccione un estado';
            isValid = false;
        }
        if (!correspondence.worker.id) {
            newErrors.worker = 'Seleccione un trabajador';
            isValid = false;
        }
        if (!correspondence.property.id) {
            newErrors.property = 'Seleccione un inmueble';
            isValid = false;
        }
        if (correspondence.estCorrespondencia === 'Entregado' && !correspondence.fentrCorrespondencia) {
            newErrors.fentrCorrespondencia = 'La fecha de entrega es obligatoria si el estado es Entregado';
            isValid = false;
        }
        if (correspondence.estCorrespondencia === 'Entregado' && correspondence.fentrCorrespondencia && correspondence.fentrCorrespondencia < correspondence.frecCorrespondencia) {
            newErrors.fentrCorrespondencia = 'La fecha de entrega debe ser igual o posterior a la fecha de correspondencia';
            isValid = false;
        }
        if (correspondence.estCorrespondencia === 'No Entregado' && correspondence.fentrCorrespondencia) {
            newErrors.fentrCorrespondencia = 'La fecha de entrega debe estar vacía si la correspondencia no ha sido entregada';
            isValid = false;
        }
        
        // Actualizar el estado de errores
        setErrors(newErrors);
    
        return isValid;
    };

    const createCorrespondence = async () => {
        try {
            await axios.post('http://localhost:8085/api/correspondence/create', correspondence);
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
            await axios.put(`http://localhost:8085/api/correspondence/update/${correspondence.id}`, correspondence);
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
                userName: ''
            },
            property: {
                id: '',
                numInmueble: ''
            }
        });
    };

    const showEditForm = (selectedCorrespondence) => {
        if (selectedCorrespondence) {
            setShowForm(true);
            setFormType('edit');
            // Inicializamos los campos worker.id y property.id solo si existen en la correspondencia seleccionada
            setCorrespondence({
                ...selectedCorrespondence,
                worker: selectedCorrespondence.worker ? { id: selectedCorrespondence.worker.id, userName: selectedCorrespondence.worker.userName } : { id: '', userName: '' },
                property: selectedCorrespondence.property ? { id: selectedCorrespondence.property.id, numInmueble: selectedCorrespondence.property.numInmueble } : { id: '', numInmueble: '' }
            });
        } else {
            console.error('Error: selectedCorrespondence is null');
        }
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
            <Menuguarda />
            <div className='Correspondence'>
                <h2>Correspondencias <i className="bi bi-universal-access-circle"></i></h2>
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
                            
                                {formType === 'create' ? (
                                    <>
                                        <i className="bi bi-person-lines-fill text-white"style={{ fontSize: '1.8rem' }}></i>
                                        <span className='ms-2 text-white'style={{ fontSize: '1.8rem' }}> Crear Correspondencia</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-wrench-adjustable text-white"style={{ fontSize: '1.8rem' }}></i>
                                        <span className='ms-2 text-white'style={{ fontSize: '1.8rem' }}> Editar Correspondencia</span>
                                    </>
                                )}
                           
                            
                        </div> 
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Tipo Correspondencia</label>
                                    <select
                                        className='form-select'
                                        name="tipoCorrespondencia"
                                        value={correspondence.tipoCorrespondencia}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option value="Paquete">Paquete</option>
                                        <option value="Caja">Caja</option>
                                        <option value="Recibo">Recibo</option>
                                        <option value="Documento">Documento</option>
                                    </select>
                                    {errors.tipoCorrespondencia && <div className="text-danger">{errors.tipoCorrespondencia}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Fecha Correspondencia</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        placeholder='FechaCorrespondencia'
                                        name='frecCorrespondencia'
                                        value={correspondence.frecCorrespondencia}
                                        onChange={handleInputChange}
                                    />
                                    {errors.frecCorrespondencia && <div className="text-danger">{errors.frecCorrespondencia}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Estado Correspondencia</label>
                                    <select
                                        className='form-select'
                                        name='estCorrespondencia'
                                        value={correspondence.estCorrespondencia}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona...</option>
                                        <option value="Entregado">Entregado</option>
                                        <option value="No Entregado">No Entregado</option>
                                    </select>
                                    {errors.estCorrespondencia && <div className="text-danger">{errors.estCorrespondencia}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Fecha de Entrega</label>
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
                                        <option value="">Selecciona...</option>
                                        {workers.map((worker) => (
                                            <option key={worker.id} value={worker.id}>
                                                {worker.user.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.worker && <div className="text-danger">{errors.worker}</div>}
                                </div>
                                <div className='mb-3'>
                                        <label className='form-label'>Inmueble</label>
                                        <select
                                            className='form-select'
                                            name='property.id'
                                            value={correspondence.property.id}
                                            onChange={handleInputChange}
                                        >
                                            {properties.map((property) => (
                                                <option key={property.id} value={property.id}>
                                                    {property.numInmueble}
                                                </option>
                                            ))}
                                        </select>    
                                        {errors.property && <div className="text-danger">{errors.property}</div>}
                                    </div>  
                                <button type="submit" className="btn btn-success smaller-button sm-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40',width: '160px', margin: 'auto' }}>
                                    <i className="bi bi-wallet"></i>
                                    {formType === 'create' ? ' Crear' : ' Editar'}
                                </button>
                                <button type="button" className="btn btn-secondary smaller-button sm-2" style={{ backgroundColor: '#a11129',width: '160px', margin: 'auto' }} onClick={() => setShowForm(false)}>
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
                            <th>Tipo Correspondencia</th>
                            <th>Fecha Correspondencia</th>
                            <th>Estado Correspondencia</th>
                            <th>Fecha Entrega</th>
                            <th>Trabajador</th>
                            <th>Inmueble</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentCorrespondences.map((correspondence) => {
                        const fecharecibido = new Date(correspondence.frecCorrespondencia);
                        const formattedFechaRecibido = fecharecibido.toLocaleString('es-ES', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });

                        let formattedFechaEntrega = '';
                        if (correspondence.fentrCorrespondencia) {
                            const fechaentrega = new Date(correspondence.fentrCorrespondencia);
                            formattedFechaEntrega = fechaentrega.toLocaleString('es-ES', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            });
                        }

                        return (
                            <tr key={correspondence.id}>
                                <td style={{ textAlign: 'center' }}>{correspondence.id}</td>
                                <td style={{ textAlign: 'center' }}>{correspondence.tipoCorrespondencia}</td>
                                <td style={{ textAlign: 'center' }}>{formattedFechaRecibido}</td>
                                <td style={{ textAlign: 'center' }}>{correspondence.estCorrespondencia}</td>
                                <td style={{ textAlign: 'center' }}>{formattedFechaEntrega}</td>
                                <td style={{ textAlign: 'center' }}>{correspondence.worker ? correspondence.worker.userName : 'N/A'}</td>
                                <td style={{ textAlign: 'center' }}>{correspondence.property ? correspondence.property.numInmueble : 'N/A'}</td>
                                <td className='text-center'>
                                    <div className='d-flex justify-content-center'>
                                        <button 
                                            className="btn btn-primary btn-sm mx-1" 
                                            onClick={() => showEditForm(correspondence)}
                                            style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                        >
                                            <i className="bi bi-wallet"></i>
                                        </button>
                                        
                                    </div>
                                    
                                </td>
                                    </tr>
                                ); 
                            })}
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

export default CorrespondenciaGuarda;
