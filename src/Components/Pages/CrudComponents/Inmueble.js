import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import Menu from '../../Generic/Menu';
import './css/Inmueble.css';

const Inmueble = () => {
    const [properties, setProperties] = useState([]);
    const [residents, setResidents] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [property, setProperty] = useState({
        id: '',
        andInmueble: '',
        numInmueble: '',
        resident: {
            id: '',
            nomResidente: ''
        }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(13);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/property/all');
            setProperties(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching properties:', error);
            setMessage('Error al listar los inmuebles');
        }
    };

    const fetchResidents = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/resident/all');
            setResidents(response.data.data);
        } catch (error) {
            console.error('Error fetching residents:', error);
        }
    };

    useEffect(() => {
        fetchProperties();
        fetchResidents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'resident.id') {
            setProperty({
                ...property,
                resident: {
                    ...property.resident,
                    id: value
                }
            });
        } else {
            setProperty({ ...property, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formType === 'create') {
            await createProperty();
        } else {
            await updateProperty();
        }
    };

    const createProperty = async () => {
        try {
            await axios.post('http://localhost:8085/api/property/create', {
                andInmueble: property.andInmueble,
                numInmueble: property.numInmueble,
                resident: {
                    id: property.resident.id,
                    nomResidente: property.resident.nomResidente
                }
            });
            setShowForm(false);
            fetchProperties();
        } catch (error) {
            console.error('Error creating property:', error);
            setMessage('Error al crear el inmueble');
        }
    };

    const updateProperty = async () => {
        try {
            await axios.put(`http://localhost:8085/api/property/update/${property.id}`, {
                andInmueble: property.andInmueble,
                numInmueble: property.numInmueble,
                resident: {
                    id: property.resident.id,
                    nomResidente: property.resident.nomResidente
                }
            });
            setShowForm(false);
            fetchProperties();
        } catch (error) {
            console.error('Error updating property:', error);
            setMessage('Error al actualizar el inmueble');
        }
    };

    const deleteProperty = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/api/property/delete/${id}`);
            fetchProperties();
            setMessage('Inmueble eliminado correctamente');
        } catch (error) {
            console.error('Error deleting property:', error);
            setMessage('Error al eliminar el inmueble');
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setProperty({
            id: '',
            andInmueble: '',
            numInmueble: '',
            resident: {
                id: '',
                nomResidente: ''
            }
        });
    };

    const showEditForm = (selectedProperty) => {
        if (selectedProperty) {
            setShowForm(true);
            setFormType('edit');
            setProperty({
                id: selectedProperty.id,
                andInmueble: selectedProperty.andInmueble,
                numInmueble: selectedProperty.numInmueble,
                resident: {
                    id: selectedProperty.resident ? selectedProperty.resident.id : '',
                    nomResidente: selectedProperty.resident ? selectedProperty.resident.nomResidente : ''
                }
            });
        } else {
            console.error('Error: selectedProperty is null');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Resetear a la primera página en cada búsqueda
    };

    // Filtrar propiedades basadas en el término de búsqueda
    const filteredProperties = properties.filter(property =>
        property.andInmueble.toString().includes(searchTerm)
    );

    // Paginación - Calcula las propiedades a mostrar en la página actual
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <Menu />
            <div className='Usuarios'>
                <h2>Lista Inmuebles <i className="bi bi-people-fill"></i></h2>
                <div className="d-flex justify-content-between align-items-center">
                    <button 
                        className="btn btn-success smaller-button" 
                        onClick={showCreateForm}
                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft:'200px' }}
                    >
                        <i className="bi bi-person-plus"></i>
                        <span className="ms-2">Crear Inmueble</span>
                    </button>
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                        <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                            <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar Anden"
                            onChange={handleSearchChange}
                            style={{ paddingLeft: '0.5rem', width:'300px' }}
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
                                        <i className="bi bi-house-add"></i>
                                        <span className='ms-2'>Crear Inmueble</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-pencil"></i>
                                        <span className='ms-2'>Editar Inmueble</span>
                                    </>
                                )}
                            </h3>
                            <button
                                type='button'
                                className='btn-close'
                                aria-label='Close'
                                onClick={() => setShowForm(false)}
                            ></button>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Anden</label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Anden'
                                        name='andInmueble'
                                        value={property.andInmueble}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Inmueble</label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        placeholder='Número Inmueble'
                                        name='numInmueble'
                                        value={property.numInmueble}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Residente</label>
                                    <select
                                        className='form-select'
                                        name='resident.id'
                                        value={property.resident.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value=''>Seleccione un residente</option>
                                        {residents.map((resident) => (
                                            <option key={resident.id} value={resident.id}>
                                                {resident.nomResidente}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type='submit' className='btn btn-success me-2' style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                    <i className="bi bi-pencil"></i>
                                    {formType === 'create' ? 'Crear' : 'Editar'}
                                </button>
                                <button type='button' className='btn btn-secondary' onClick={() => setShowForm(false)}>
                                    <i className="bi bi-x-circle-fill"></i>
                                    <span className='ms-2'>Cancelar</span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Anden</th>
                            <th>Número de Inmueble</th>
                            <th>Residente</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProperties.map((property) => (
                            <tr key={property.id}>
                                <td>{property.id}</td>
                                <td>{property.andInmueble}</td>
                                <td>{property.numInmueble}</td>
                                <td>{property.resident ? property.resident.nomResidente : 'N/A'}</td>
                                <td>
                                    <button
                                        className='btn btn-primary btn-sm'
                                        onClick={() => showEditForm(property)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        <i className="bi bi-pencil"></i>
                                        <span className='ms-2'>Editar</span>
                                    </button>
                                    <button
                                        className='btn btn-danger btn-sm'
                                        onClick={() => deleteProperty(property.id)}
                                        style={{ backgroundColor: '#a11129', borderColor: '#a11129' }}
                                    >
                                        <i className="bi bi-trash"></i>
                                        <span className='ms-2'>Eliminar</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    {filteredProperties.length > propertiesPerPage && (
                        <ul className="pagination-list">
                            {Array(Math.ceil(filteredProperties.length / propertiesPerPage)).fill().map((_, i) => (
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

export default Inmueble;
