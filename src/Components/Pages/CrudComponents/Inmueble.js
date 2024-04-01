import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Menu from '../../Generic/Menu';
import Footer from '../../Generic/Footer';
import './css/Inmueble.css'

const Inmueble = () => {
    const [properties, Setproperties] = useState([]);
    const [residents, setResidents] = useState([]);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [property, setProperty] = useState({
        id: '',
        andInmueble: '',
        numInmueble: '',
        resident : {
            id: '',
            nomResidente: ''
        }
    });

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/property/all');
            Setproperties(response.data.data);
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
            console.error('Error fetching roles:', error);
        }
    };
    useEffect(() => {
        fetchProperties();
        fetchResidents();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name === 'resident.id'){
            setProperty({
                ...property,
                resident: {
                    ...property.resident,
                    id: value
                }
            });
        } else {
            setProperty({...property, [name]: value });
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
        }catch (error) {
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

    return (
        <>
            <Menu />
            <div className='Property'>

                <h2>Lista Inmuebles <i className="bi bi-house-fill"></i></h2>

                <button
                    className="btn btn-success mb-3"
                    onClick={showCreateForm}
                    style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}} 
                >
                    <i class="bi bi-house-add"></i>
                    <span className='ms-2'>Crear Inmueble</span>
                </button>

                {showForm && (
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title'>
                                {formType === 'create' ? (
                                    <>
                                        <i class="bi bi-house-add"></i>
                                        <span className='ms-2'>Crear Inmueble</span>
                                    </>
                                ) : (
                                    <>
                                        <i class="bi bi-house-gear-fill"></i>
                                        <span className='ms-2'>Editar Inmueble</span>
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
                                    <label className='form-label'>Resident</label>
                                    <select
                                        className='form-select'
                                        name='resident.id'
                                        value={property.resident.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un resident</option>
                                        {residents.map((resident) => (
                                            <option key={resident.id} value={resident.id}>
                                                {resident.nomResidente}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                    <i class="bi bi-house-check-fill"></i>
                                    {formType === 'create' ? 'Crear' : 'Editar'}  
                                </button>
                                <button type="button" className="btn btn-secondary me-2"style={{ backgroundColor: '#a11129'}} onClick={() => setShowForm(false)}>
                                    <i class="bi bi-house-x-fill"></i>
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
                            <th>Anden</th>
                            <th> Número Inmueble</th>
                            <th>Resident</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property.id}>
                                <td>{property.id}</td>
                                <td>{property.andInmueble}</td>
                                <td>{property.numInmueble}</td>
                                <td>{property.resident ? property.resident.nomResidente : 'N/A'}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => showEditForm(property)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        <i class="bi bi-house-check-fill"></i>
                                        <span className="ms-2">Editar</span>
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

    )
}
export default Inmueble;