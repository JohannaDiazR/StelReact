import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import Menuguarda from '../../Generic/Menuguarda';
import '../CrudComponents/css/Visitante.css';

const VisitanteGuarda = () => {
    const [visitors, setVisitors] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [properties, setProperties] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create'); 
    const [visitor, setVisitor] = useState({
        id: '',
        nomVisitante: '',
        cedula: '',
        nomResidente: '',
        carVisitante: '',
        ingrVisitante: '',
        fecVisitante: getCurrentDate(),
        worker: { id: '', userName: '' },
        parking: { id: '', cupParqueadero: '' },
        property: { id: '', numInmueble: '' }
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [visitorsPerPage] = useState(8);

    function getCurrentDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    // Fetching initial data for visitors, workers, parkings, and properties
    useEffect(() => {
        fetchVisitors();
        fetchWorkers();
        fetchParkings();
        fetchProperties();
    }, []);

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

    const fetchParkings = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/parking/all');
            setParkings(response.data.data);
        } catch (error) {
            console.error('Error fetching parkings:', error);
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

    // Handle input changes for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        if (name === 'worker.id' && visitor.worker) {
          setVisitor((prevVisitor) => ({
           ...prevVisitor,
            worker: {...prevVisitor.worker, id: value }
          }));
        } else if (name === 'parking.id') {
          if (value === 'N/A') {
            setVisitor((prevVisitor) => ({
             ...prevVisitor,
              parking: { id: 'N/A', cupParqueadero: '' }
            }));
          } else {
            setVisitor((prevVisitor) => ({
             ...prevVisitor,
              parking: { id: value, cupParqueadero: '' }
            }));
          }
        } else if (name === 'property.id' && visitor.property) {
          if (value === 'N/A') {
            setVisitor((prevVisitor) => ({
             ...prevVisitor,
              property: { id: 'N/A', numInmueble: '' }
            }));
          } else {
            setVisitor((prevVisitor) => ({
             ...prevVisitor,
              property: { id: value, numInmueble: '' }
            }));
          }
        } else {
          setVisitor((prevVisitor) => ({...prevVisitor, [name]: value }));
        }
      };    
    
    

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Add basic validation to ensure required fields are not empty
        if (!visitor.nomVisitante || !visitor.cedula) {
            setMessage('Por favor complete los campos requeridos.');
            return;
        }
    
        let updatedVisitor = { ...visitor }; // Crear una copia del visitante

        if (updatedVisitor.parking && updatedVisitor.parking.id === 'in-carro') {
            updatedVisitor.parking = { id: 'in-carro', cupParqueadero: 0 }; // Establecer cupParqueadero en 0 si es "sin carro"
          } else if (updatedVisitor.parking && updatedVisitor.parking.id === '') {
            updatedVisitor.parking = { id: '', cupParqueadero: '' }; // Limpiar cupParqueadero si es ''
          }
    
        try {
            if (formType === 'create') {
                const response = await axios.post('http://localhost:8085/api/visitor/create', updatedVisitor);
                console.log('Create Response:', response.data);
                setShowForm(false);
                fetchVisitors(); // Refresh the list after creation
                setMessage('Visitante creado correctamente');
            } else {
                const response = await axios.put(`http://localhost:8085/api/visitor/update/${updatedVisitor.id}`, updatedVisitor);
                console.log('Update Response:', response.data);
                setShowForm(false);
                fetchVisitors(); // Refresh the list after update
                setMessage('Visitante actualizado correctamente');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al procesar la solicitud');
        }
    };

    // Create a new visitor
    /*const createVisitor = async () => {
        try {
            const response = await axios.post('http://localhost:8085/api/visitor/create', visitor);
            console.log('Create Response:', response.data);
            setShowForm(false);
            fetchVisitors(); // Refresh the list after creation
            setMessage('Visitante creado correctamente');
        } catch (error) {
            console.error('Error creating visitor:', error);
            setMessage('Error al crear el visitante');
        }
    };

    // Update an existing visitor
    const updateVisitor = async () => {
        try {
            const response = await axios.put(`http://localhost:8085/api/visitor/update/${visitor.id}`, visitor);
            console.log('Update Response:', response.data);
            setShowForm(false);
            fetchVisitors(); // Refresh the list after update
            setMessage('Visitante actualizado correctamente');
        } catch (error) {
            console.error('Error updating visitor:', error);
            setMessage('Error al actualizar el visitante');
        }
    };*/

    

    // Filter visitors based on the search term
    const filteredVisitors = visitors.filter((visitor) =>
        visitor.property && visitor.property.numInmueble &&
        visitor.property.numInmueble.toString().includes(searchTerm)
    );

    // Pagination logic
    const indexOfLastVisitor = currentPage * visitorsPerPage;
    const indexOfFirstVisitor = indexOfLastVisitor - visitorsPerPage;
    const currentVisitors = filteredVisitors.slice(indexOfFirstVisitor, indexOfLastVisitor);
    const totalPages = Math.ceil(filteredVisitors.length / visitorsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Show the form for creating a new visitor
    const showCreateForm = () => {
        setVisitor({
            id: '',
            nomVisitante: '',
            cedula: '',
            nomResidente: '',
            carVisitante: '',
            ingrVisitante: '',
            fecVisitante: getCurrentDate(),
            worker: { id: '', userName: '' },
            parking: { id: '', cupParqueadero: '' },
            property: { id: '', numInmueble: '' }
        });
        setFormType('create');
        setShowForm(true);
    };

    // Show the form for editing an existing visitor
    const showEditForm = (visitor) => {
        setVisitor(visitor);
        setFormType('edit');
        setShowForm(true);
    };

    // Handle search term change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };    return (
        <>
            <Menuguarda />
            <div className='Visitantes'>
                <h2>Lista Visitantes <i className="bi bi-people-fill"></i></h2>
                <div className="d-flex justify-content-between align-items-center">
                    <button 
                        className="btn btn-success smaller-button" 
                        onClick={showCreateForm}
                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft:'200px' }}
                    >
                        <i className="bi bi-person-add"></i>
                        <span className="ms-2">Crear Visitante</span>
                    </button>
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar Identificación Visitante"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.5rem', width:'300px' }}
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
                                        name="cedula"
                                        value={visitor.cedula}
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
                                <div className='form-group'>
                                    <label htmlFor='carVisitante'>Carro Visitante</label>
                                    <select
                                        className='form-control'
                                        id='carVisitante'
                                        name='carVisitante'
                                        value={visitor.carVisitante}
                                        onChange={handleInputChange}
                                    >
                                        <option value=''>Seleccione...</option>
                                        <option value='si'>Si</option>
                                        <option value='no'>No</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='ingrVisitante'>Ingreso Permitido</label>
                                    <select
                                        className='form-control'
                                        id='ingrVisitante'
                                        name='ingrVisitante'
                                        value={visitor.ingrVisitante}
                                        onChange={handleInputChange}
                                    >
                                        <option value=''>Seleccione...</option>
                                        <option value='si'>Si</option>
                                        <option value='no'>No</option>
                                    </select>
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
                                    <label className="form-label">Trabajador</label>
                                    
                                    <select
                                        className='form-select'
                                        name='worker.id'
                                        value={visitor.worker.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un trabajador</option>
                                        {workers.map((worker) => (
                                            <option key={worker.id} value={worker.id}>
                                                {worker.user.nombre}  {/* Asegúrate que worker tiene userName */}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Parqueadero</label>
                                    <select
                                        className='form-select'
                                        name='parking.id'
                                        value={visitor.parking.id || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">N/A</option> {/* Agregar opción para "N/A" */}
                                        <option value="">0</option> 
                                        {parkings.map((parking) => (
                                            <option key={parking.id} value={parking.id}>
                                                {parking.cupParqueadero}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Inmueble</label>
                                    <select
                                        className='form-select'
                                        name='property.id'
                                        value={visitor.property.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un inmueble</option>
                                        {properties.map((property) => (
                                            <option key={property.id} value={property.id}>
                                                {property.numInmueble}  {/* Asegúrate que property tiene numInmueble */}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <button type="submit" className="btn btn-success smaller-button sm-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40',width: '160px', margin: 'auto' }}>
                                    <i className="bi bi-person-fill-exclamation"></i>
                                    {formType === 'create' ? 'Crear' : 'Editar'}
                                </button>
                                <button type="button" className="btn btn-secondary smaller-button sm-2" style={{ backgroundColor: '#a11129',width: '160px', margin: 'auto'}} onClick={() => setShowForm(false)}>
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
                            <th>Trabajador</th>
                            <th>Parqueadero</th>        
                            <th>Inmueble</th>
                            <th>Acciones</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {currentVisitors.map((visitor) => {
                            console.log(visitor.carVisitante, visitor.property);  // Verifica los valores
                            return (
                                <tr key={visitor.id}>
                                    <td style={{ textAlign: 'center' }}>{visitor.id}</td>
                                    <td style={{ textAlign: 'center' }}>{visitor.nomVisitante}</td>
                                    <td style={{ textAlign: 'center' }}>{visitor.cedula}</td>
                                    <td style={{ textAlign: 'center' }}>{visitor.nomResidente}</td>
                                    <td style={{ textAlign: 'center' }}>{visitor.carVisitante}</td>
                                    <td style={{ textAlign: 'center' }}>{visitor.ingrVisitante}</td>
                                    <td style={{ textAlign: 'center' }}>{visitor.fecVisitante}</td>
                                    <td style={{ textAlign: 'center' }}>{visitor.worker ? visitor.worker.userName : 'N/A'}</td>
                                    <td style={{ textAlign: 'center' }}>{visitor.parking ? visitor.parking.cupParqueadero : 'N/A'}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        {['si', 'no'].includes(visitor.carVisitante.toLowerCase()) && visitor.property
                                            ? visitor.property.numInmueble
                                            : 'N/A'}
                                    </td>
                                    <td className='text-center'>
                                        <div className="d-flex justify-content-center">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => showEditForm(visitor)}
                                                style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                            >
                                                <i className="bi bi-person-fill-exclamation"></i>
                                            </button>
                                            
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="pagination">
                    {filteredVisitors.length > visitorsPerPage && (
                    <ul className="pagination-list">
                        {Array(Math.ceil(filteredVisitors.length / visitorsPerPage)).fill().map((_, i) => (
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

export default VisitanteGuarda;