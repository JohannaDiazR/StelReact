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
            userName: '',
            userCedula: ''
        },
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(4);
    const [errors, setErrors] = useState({});

    // Fetch all properties
    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/property/all');
            setProperties(response.data.data);
            console.log('Fetched Properties:', response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching properties:', error);
            setMessage('Error al listar los inmuebles');
        }
    };

    // Fetch all residents
    const fetchResidents = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/resident/all');
            setResidents(response.data.data);
            console.log('Fetched Residents:', response.data.data);
        } catch (error) {
            console.error('Error fetching residents:', error);
        }
    };

    useEffect(() => {
        fetchProperties();
        fetchResidents();
    }, []);

    // Handle input changes in the form
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'andInmueble' || name === 'numInmueble') {
            updatedValue = parseInt(value, 10) || ''; // Convertir a número o dejar vacío
        }


        // Si se selecciona un residente en el formulario
        if (name === 'resident.id') {
            const selectedResident = residents.find(resident => resident.id === parseInt(value));
            if (selectedResident && selectedResident.user) {
                setProperty(prevState => ({
                    ...prevState,
                    resident: {
                        ...prevState.resident,
                        id: value,
                        userName: selectedResident.userName,
                        userCedula: selectedResident.userCedula,
                    }
                }));
                console.log('Selected Resident with User:', selectedResident);
            } else {
                setProperty(prevState => ({
                    ...prevState,
                    resident: {
                        ...prevState.resident,
                        id: value,
                        userName: 'N/A',
                        userCedula: 'N/A',
                    }
                }));
                console.log('Selected Resident without User:', selectedResident);
            }
        } else {
            setProperty({ ...property, [name]: value });
        }
        if (name === 'numInmueble' || name === 'andInmueble') {
            validateNumInmueble(name === 'numInmueble' ? updatedValue : property.numInmueble, name === 'andInmueble' ? updatedValue : property.andInmueble);
        }
    };
    const validateNumInmueble = (numInmueble, andInmueble) => {
        let isValid = true;
        const newErrors = {};

        // Rango permitido para cada andén
        const andInmuebleRanges = {
            1: { min: 1, max: 31 },
            2: { min: 32, max: 56 },
            3: { min: 64, max: 87 },
            4: { min: 88, max: 101 },
            5: { min: 102, max: 115 },
            6: { min: 116, max: 139 },
            7: { min: 140, max: 163 },
            8: { min: 164, max: 187 },
            9: { min: 188, max: 213 },
            10: { min: 214, max: 240 }
        };

        // Validar si `andInmueble` está en el rango 1-10
        if (andInmueble < 1 || andInmueble > 10) {
            newErrors.andInmueble = 'El Anden debe estar entre 1 y 10';
            isValid = false;
        }

        // Validar si `numInmueble` está en el rango específico del `andInmueble`
        if (andInmueble in andInmuebleRanges) {
            const range = andInmuebleRanges[andInmueble];
            if (numInmueble < range.min || numInmueble > range.max) {
                newErrors.numInmueble = `El número de inmueble para el Anden ${andInmueble} debe estar entre ${range.min} y ${range.max}`;
                isValid = false;
            }
        } else {
            newErrors.numInmueble = 'El número de inmueble debe estar en un rango válido';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const validateForm = () => {
        // Usar la validación de numInmueble para validar el formulario completo
        const isValid = validateNumInmueble(property.numInmueble, property.andInmueble);

        // Puedes agregar más validaciones si es necesario
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()){
            if (formType === 'create') {
                await createProperty();
            } else {
                await updateProperty();
            }
        }
    };

    // Create a new property
    const createProperty = async () => {
        try {
            await axios.post('http://localhost:8085/api/property/create', property);
            setShowForm(false);
            fetchProperties();
        } catch (error) {
            console.error('Error creating property:', error);
            setMessage('Error al crear el inmueble');
        }
    };

    // Update an existing property
    const updateProperty = async () => {
        try {
            await axios.put(`http://localhost:8085/api/property/update/${property.id}`, property);
            setShowForm(false);
            fetchProperties();
        } catch (error) {
            console.error('Error updating property:', error);
            setMessage('Error al actualizar el inmueble');
        }
    };

    // Delete a property
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

    // Show create form
    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setProperty({
            id: '',
            andInmueble: '',
            numInmueble: '',
            resident: {
                id: '',
                userName: '',
                userCedula: '',
            },
        });
    };

    // Show edit form
    const showEditForm = (selectedProperty) => {
        if (selectedProperty) {
            setShowForm(true);
            setFormType('edit');
            setProperty(selectedProperty);
            console.log('Editing Property:', selectedProperty);
        } else {
            console.error('Error: selectedProperty is null');
        }
    };

    // Handle search term change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Filter properties by search term
    const filteredProperties = properties.filter(property =>
        property.andInmueble.toString().includes(searchTerm)
    );

    // Pagination
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
                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft: '200px' }}
                    >
                        <i className="bi bi-person-plus"></i>
                        <span className="ms-2">Crear Inmueble</span>
                    </button>
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white' }}></i>
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar Anden"
                            onChange={handleSearchChange}
                            style={{ paddingLeft: '0.5rem', width: '250px', marginRight: '200px   ' }}
                        />
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
                                        min="1"
                                        max="10"
                                        required
                                    />
                                    {errors.andInmueble && <div className="text-danger">{errors.andInmueble}</div>}
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
                                        min="1"
                                        max="240"
                                        required
                                         
                                    />
                                    {errors.numInmueble && <div className="text-danger">{errors.numInmueble}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Residente</label>
                                    <select
                                        className='form-select'
                                        name='resident.id'
                                        value={property.resident.id}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value=''>Seleccione un residente</option>
                                        {residents.map((resident) => (
                                        <option key={resident.id} value={resident.id}>
                                            {resident.user? `${resident.user.nombre} (${resident.user.cedula})` : 'Sin nombre'}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type='submit' className='btn btn-success smaller-button sm-2' style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40',width: '160px', margin: 'auto' }}>
                                        <i className="bi bi-pencil"></i>
                                        {formType === 'create' ? 'Crear' : 'Editar'}
                                    </button>
                                    <button type='button' className='btn btn-secondary smaller-button sm-2' style={{ backgroundColor: '#a11129', borderColor: '#a11129',width: '160px', margin: 'auto'}} onClick={() => setShowForm(false)}>
                                        <i className="bi bi-x-circle-fill"></i>
                                        <span className='sm-2'>Cancelar</span>
                                    </button>
                                </div>
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
                            <th>Identificación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProperties.map((property) => (
                            <tr key={property.id}>
                                <td style={{ textAlign: 'center' }}>{property.id}</td>
                                <td style={{ textAlign: 'center' }}>{property.andInmueble}</td>
                                <td style={{ textAlign: 'center' }}>{property.numInmueble}</td>
                                <td style={{ textAlign: 'center' }}>{property.resident ? property.resident.userName : 'N/A'}</td>
                                <td style={{ textAlign: 'center' }}>{property.resident ? property.resident.userCedula : 'N/A'}</td>
                                <td className='text-center'>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            className='btn btn-primary btn-sm mx-1'
                                            onClick={() => showEditForm(property)}
                                            style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button
                                            className='btn btn-danger btn-sm mx-1'
                                            onClick={() => deleteProperty(property.id)}
                                            style={{ backgroundColor: '#a11129', borderColor: '#a11129' }}
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
