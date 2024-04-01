import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../Generic/Menu';
import './css/Visitante.css';
import Footer from '../../Generic/Footer';

const Visitante = () => {
    const [visitors, setVisitors] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create'); // 'create' o 'edit'
    const [visitor, setVisitor] = useState({
        id: '',
        nomVisitante: '',
        cedVisitante: '',
        nomResidente: '',
        carVisitante: false,
        ingrVisitante: false,
        fecVisitante: '',
        worker: {
            id: '',
            nomTrabajador: ''
        },
        property: {
            id: '',
            numInmueble: ''
        },
        parking: {
            id: '',
            cupParqueadero: ''
       }
    });

    const fetchVisitors = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/visitor/all');
            setVisitors(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching visitors:', error);
            setMessage('Error al listar los visitantes');
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
            console.error('Error fetching property:', error);
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
        fetchVisitors();
        fetchWorkers();
        fetchProperties();
        fetchParkings();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setVisitor({ ...visitor, [name]: checked });
        } else if (name === 'worker.id') {
            setVisitor({
                ...visitor,
                worker: {
                    ...visitor.worker,
                    id: value
                }
            });
        } else if (name === 'property.id') {
            setVisitor({
                ...visitor,
                property: {
                    ...visitor.property,
                    id: value
                }
            });
        } else if (name === 'parking.id'){
            setVisitor({
                ...visitor,
                parking: {
                    ...visitor.parking,
                    id: value
                }
            });
        } else {
            setVisitor({ ...visitor, [name]: value });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formType === 'create') {
            await createVisitor();
        } else {
            await updateVisitor();
        }
    };

    const createVisitor = async () => {
        try {
            await axios.post('http://localhost:8085/api/visitor/create', {
                nomVisitante: visitor.nomVisitante,
                cedVisitante: visitor.cedVisitante,
                nomResidente: visitor.nomResidente,
                carVisitante: visitor.carVisitante,
                ingrVisitante: visitor.ingrVisitante,
                fecVisitante: visitor.fecVisitante,
                worker: {
                    id: visitor.worker.id,
                    nomTrabajador: visitor.worker.nomTrabajador
                },
                property: {
                    id: visitor.property.id,
                    numInmueble: visitor.property.numInmueble
                },
                parking: {
                    id: visitor.parking.id,
                    cupParqueadero: visitor.parking.cupParqueadero
               }  
            });
            setShowForm(false);
            fetchVisitors();
        } catch (error) {    
            console.error('Error creating visitor:', error);
            setMessage('Error al crear el visitante');
        }
    };

    const updateVisitor = async () => {
        try {
            await axios.put(`http://localhost:8085/api/visitor/update/${visitor.id}`, {
                nomVisitante: visitor.nomVisitante,
                cedVisitante: visitor.cedVisitante,
                nomResidente: visitor.nomResidente,
                carVisitante: visitor.carVisitante,
                ingrVisitante: visitor.ingrVisitante,
                fecVisitante: visitor.fecVisitante,
                worker: {
                    id: visitor.worker.id,
                    nomTrabajador: visitor.worker.nomTrabajador
                },
                property: {
                    id: visitor.property.id,
                    numInmueble: visitor.property.numInmueble
                },
                parking: {
                    id: visitor.parking.id,
                    cupParqueadero: visitor.parking.cupParqueadero
               }  
            });
            setShowForm(false);
            fetchVisitors();
        } catch (error) {
            console.error('Error updating visitor:', error);
            setMessage('Error al actualizar el visitante');
        }
    };

    const deleteVisitor = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/api/visitor/delete/${id}`);
            fetchVisitors();
        } catch (error) {
            console.error('Error deleting visitor:', error);
            setMessage('Error al eliminar el visitante');
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setVisitor({
            id: '',
            nomVisitante: '',
            cedVisitante: '',
            nomResidente: '',
            carVisitante: false,
            ingrVisitante: false,
            fecVisitante: '',
            worker: {
                id: '',
                nomTrabajador: ''
            },
            property: {
                id: '',
                numInmueble: ''
            },
            parking: {
                id: '',
                cupParqueadero: ''
           }
        });
    };

    const showEditForm = (selectedVisitor) => {
        if (selectedVisitor) {
            setShowForm(true);
            setFormType('edit');
            setVisitor({
                id: selectedVisitor.id,
                nomVisitante: selectedVisitor.nomVisitante,
                cedVisitante: selectedVisitor.cedVisitante,
                nomResidente: selectedVisitor.nomResidente,
                carVisitante: selectedVisitor.carVisitante,
                ingrVisitante: selectedVisitor.ingrVisitante,
                fecVisitante: selectedVisitor.fecVisitante,
                worker: {
                    id: selectedVisitor.worker ? selectedVisitor.worker.id : '',
                    nomTrabajador: selectedVisitor.worker ? selectedVisitor.worker.nomTrabajador : ''
                },
                property: {
                    id: selectedVisitor.property ? selectedVisitor.property.id : '',
                    numInmueble: selectedVisitor.property ? selectedVisitor.property.numInmueble : ''
                },
                parking: {
                    id: selectedVisitor.parking ? selectedVisitor.parking.id : '',
                    cupParqueadero: selectedVisitor.parking? selectedVisitor.parking.cupParqueadero : ''
                }

            });
        }
        
    };

    return (
        <>
            <Menu />
            <div className='Visitantes'>
                <h2>Lista Visitantes <i class="bi bi-people-fill"></i></h2>
                <button 
                    className="btn btn-success mb-3" 
                    onClick={showCreateForm}
                    style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                >
                    <i className="bi bi-person-add"></i>
                    <span className="ms-2">Crear Visitante</span>
                </button>

                {showForm && (
                    <div className='card'>
                        <div className='card-header'>
                        <h3 className="card-title">
                            {formType === 'create' ? (
                                <>
                                    <i className="bi bi-person-add"></i>
                                    <span className="ms-2">Crear Visitante</span>
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-person-fill-exclamation"></i>
                                    <span className="ms-2">Editar Visitante</span>
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
                                        name="nomVisitante"
                                        value={visitor.nomVisitante}
                                        onChange={handleInputChange}
                                    />
                                </div>   
                                <div className="mb-3">
                                    <label className="form-label">Cedula</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Cedula"
                                        name="cedVisitante"
                                        value={visitor.cedVisitante}
                                        onChange={handleInputChange}
                                    />
                                </div>   
                                <div className="mb-3">
                                    <label className="form-label">Nombre Residente</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        name="nomResidente"
                                        value={visitor.nomResidente}
                                        onChange={handleInputChange}
                                    />
                                </div>   
                                <div className="mb-3">
                                    <label className="form-label">Vehículo</label>
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            id="carVisitante" 
                                            name="carVisitante" 
                                            checked={visitor.carVisitante} 
                                            onChange={handleInputChange} 
                                        />
                                        <label htmlFor="carVisitante">¿Tiene vehículo?</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ingreso</label>
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            id="ingrVisitante" 
                                            name="ingrVisitante" 
                                            checked={visitor.ingrVisitante} 
                                            onChange={handleInputChange} 
                                        />
                                        <label htmlFor="ingrVisitante">¿Autoriza el ingreso?</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Fecha</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Fecha de visita"
                                        name="fecVisitante"
                                        value={visitor.fecVisitante}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Worker</label>
                                    <select
                                        className='form-select'
                                        name='worker.id'
                                        value={visitor.worker.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un trabajador</option>
                                        {workers.map((worker) => (
                                            <option key={worker.id} value={worker.id}>
                                                {worker.nomTrabajador}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Property</label>
                                    <select
                                        className='form-select'
                                        name='property.id'
                                        value={visitor.property.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un inmueble</option>
                                        {properties.map((property) => (
                                            <option key={property.id} value={property.id}>
                                                {property.numInmueble}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Parking</label>
                                    <select
                                        className='form-select'
                                        name='parking.id'
                                        value={visitor.parking.id}
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
                                    <i className="bi bi-person-fill-exclamation"></i>
                                    {formType === 'create' ? 'Crear' : 'Editar'}
                                </button>
                                <button type="button" className="btn btn-secondary me-2" style={{ backgroundColor: '#a11129'}} onClick={() => setShowForm(false)}>
                                    <i className="bi bi-person-x"></i>
                                    <span className="ms-2">Cancelar</span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Identificación</th>
                            <th>Nombre Residente</th>
                            <th>¿Carro?</th>
                            <th>¿Ingreso?</th>
                            <th>Fecha Visita</th>
                            <th>Worker</th>
                            <th>Parking</th>        
                            <th>Property</th>
                            <th>Acciones</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map((visitor) => (
                            <tr key={visitor.id}>
                                <td>{visitor.id}</td>
                                <td>{visitor.nomVisitante}</td>
                                <td>{visitor.cedVisitante}</td>
                                <td>{visitor.nomResidente}</td>
                                <td>{visitor.carVisitante ? 'Sí' : 'No'}</td>
                                <td>{visitor.ingrVisitante ? 'Sí' : 'No'}</td>
                                <td>{visitor.fecVisitante}</td>
                                <td>{visitor.worker ? visitor.worker.nomTrabajador : 'N/A'}</td>
                                <td>{visitor.property ? visitor.property.numInmueble : 'N/A'}</td>
                                <td>{visitor.parking ? visitor.parking.cupParqueadero : 'N/A'}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary btn-sm me-2" 
                                        onClick={() => showEditForm(visitor)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        <i className="bi bi-person-fill-exclamation"></i>
                                        <span className="ms-2">Editar</span>
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => deleteVisitor(visitor.id)}
                                        style={{ backgroundColor: '#a11129', borderColor: '#a11129' }}
                                    >
                                        <i className="bi bi-person-x"></i>
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

export default Visitante;