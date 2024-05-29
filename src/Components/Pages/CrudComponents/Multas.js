import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import Menu from '../../Generic/Menu';
import './css/Multas.css';

const Multas = () => {
    const [multas, setMultas] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [multa, setMulta] = useState({
        id: '',
        tipoMulta: '',
        fecMulta: '',
        valMulta: '',
        fpagMulta: '',
        worker: {
            id: '',
            nomTrabajador: ''
        },
        property: {
            id: '',
            numInmueble: ''
        }
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [multasPerPage] = useState(5);

    // Definición de los posibles tipos de multas
    const tiposMulta = [
        { id: 1, nombre: 'Ruido Excesivo' },
        { id: 2, nombre: 'Estacionamiento Indebido' },
        { id: 3, nombre: 'Mascota Sin Correa' },
        { id: 4, nombre: 'Problemas Con Los Vecinos' },
        { id: 5, nombre: 'Daños Al Conjunto' },
        { id: 6, nombre: 'Problemas Con la Mascota' },
        
    ];

    const fetchMultas = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/fine/all');
            setMultas(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching multas:', error);
            setMessage('Error al listar las multas');
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
        fetchMultas();
        fetchWorkers();
        fetchProperties();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'worker.id') {
            setMulta({
                ...multa,
                worker: {
                    ...multa.worker,
                    id: value
                }
            });
        } else if (name === 'property.id') {
            setMulta({
                ...multa,
                property: {
                    ...multa.property,
                    id: value
                }
            });
        } else {
            setMulta({ ...multa, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formType === 'create') {
            await createMulta();
        } else {
            await updateMulta();
        }
    };

    const createMulta = async () => {
        try {
            await axios.post('http://localhost:8085/api/fine/create', {
                tipoMulta: multa.tipoMulta,
                fecMulta: multa.fecMulta,
                valMulta: multa.valMulta,
                fpagMulta: multa.fpagMulta,
                worker: {
                    id: multa.worker.id,
                    cargTrabajador: multa.worker.nomTrabajador
                },
                property: {
                    id: multa.property.id,
                    numInmueble: multa.property.numInmueble
                }
            });
            setShowForm(false);
            fetchMultas();
            setMessage('Multa creada correctamente');
        } catch (error) {
            console.error('Error creating Multa', error);
            setMessage('Error al crear la multa');
        }
    };

    const updateMulta = async () => {
        try {
            await axios.put(`http://localhost:8085/api/fine/update/${multa.id}`, {
                tipoMulta: multa.tipoMulta,
                fecMulta: multa.fecMulta,
                valMulta: multa.valMulta,
                fpagMulta: multa.fpagMulta,
                worker: {
                    id: multa.worker.id,
                    cargTrabajador: multa.worker.nomTrabajador
                },
                property: {
                    id: multa.property.id,
                    numInmueble: multa.property.numInmueble
                }
            });
            setShowForm(false);
            fetchMultas();
            setMessage('Multa Actualizada Correctamente');
        } catch (error) {
            console.error('Error updating multa:', error);
            setMessage('Error al actualizar la multa');
        }
    };

    const deleteMulta = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta multa?')) {
            try {
                await axios.delete(`http://localhost:8085/api/fine/delete/${id}`);
                fetchMultas();
                setMessage('Multa eliminada correctamente');
            } catch (error) {
                console.error('Error deleting multa:', error);
                setMessage('Error al eliminar la multa');
            }
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setMulta({
            id: '',
            tipoMulta: '',
            fecMulta: '',
            valMulta: '',
            fpagMulta: '',
            worker: {
                id: '',
                nomTrabajador: ''
            },
            property: {
                id: '',
                numInmueble: ''
            }
        });
    };

    const showEditForm = (multa) => {
        setShowForm(true);
        setFormType('edit');
        setMulta(multa);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredMultas = multas.filter(multa =>
        multa.property.numInmueble.toString().includes(searchTerm)
    );
    const indexOfLastMulta = currentPage * multasPerPage;
    const indexOfFirstMulta = indexOfLastMulta - multasPerPage;
    const currentMultas = filteredMultas.slice(indexOfFirstMulta, indexOfLastMulta);
    
    const paginate = pageNumber => setCurrentPage(pageNumber);
    

    return (
        <>
            <Menu />
            <div className='Multas'>
                <h2>Lista de Multas <i className="bi bi-cash-coin"></i></h2>
                <div className="d-flex justify-content-between align-items-center">
                    <button
                        className="btn btn-success mb-3 smaller-button"
                        onClick={showCreateForm}
                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft:'150px' }}
                    >
                        <i className="bi bi-cash-coin"></i>
                        <span className='ms-2'>Crear Multa</span>
                    </button>
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar Inmueble"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.5rem', width:'350px' }}
                            />
                        </div>
                    </div>
                
                </div>
                {/* Formulario */}
                {showForm && (
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title'>
                                {formType === 'create' ? (
                                    <>
                                        <i className="bi bi-plus-circle-fill"></i>
                                        <span className='ms-2'>Crear Multa</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-pencil-square"></i>
                                        <span className='ms-2'>Editar Multa</span>
                                    </>
                                )}
                            </h3>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Tipo de Multa</label>
                                    <select
                                        className='form-select'
                                        name='tipoMulta'
                                        value={multa.tipoMulta}
                                        onChange={handleInputChange}
                                    >
                                        <option value=''>Seleccionar tipo de multa</option>
                                        {tiposMulta.map(tipo => (
                                            <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Fecha de Multa</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        placeholder='Fecha de Multa'
                                        name='fecMulta'
                                        value={multa.fecMulta}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Valor de Multa</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Valor de Multa'
                                        
                                        name='valMulta'
                                        value={multa.valMulta}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Fecha de Pago</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        placeholder='Fecha de Pago'
                                        name='fpagMulta'
                                        value={multa.fpagMulta}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Trabajador</label>
                                    <select
                                        className='form-select'
                                        name='worker.id'
                                        value={multa.worker.id}
                                        onChange={handleInputChange}
                                    >
                                        {workers.map((worker) => (
                                            <option key={worker.id} value={worker.id}>
                                                {worker.nomTrabajador}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Inmueble</label>
                                    <select
                                        className='form-select'
                                        name='property.id'
                                        value={multa.property.id}
                                        onChange={handleInputChange}
                                    >
                                        {properties.map((property) => (
                                            <option key={property.id} value={property.id}>
                                                {property.numInmueble}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                    <i className="bi bi-check-circle-fill"></i>
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

                {/* Tabla de multas */}
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tipo de Multa</th>
                            <th>Fecha de Multa</th>
                            <th>Valor de Multa</th>
                            <th>Fecha de Pago</th>
                            <th>Trabajador</th>
                            <th>Inmueble</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMultas.map((multa) => (
                            <tr key={multa.id}>
                                <td>{multa.id}</td>
                                <td>{multa.tipoMulta}</td>
                                <td>{multa.fecMulta}</td>
                                <td>{multa.valMulta}</td>
                                <td>{multa.fpagMulta}</td>
                                <td>{multa.worker ? multa.worker.nomTrabajador : 'N/A'}</td>
                                <td>{multa.property ? multa.property.numInmueble : 'N/A'}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => showEditForm(multa)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        <i className="bi bi-pencil"></i>
                                        <span className="ms-2">Editar</span>
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => deleteMulta(multa.id)}
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

                <div className="pagination">
                    {filteredMultas.length > multasPerPage && (
                    <ul className="pagination-list">
                        {Array(Math.ceil(filteredMultas.length / multasPerPage)).fill().map((_, i) => (
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

export default Multas;
