import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DocCartera from './DocCartera';
import Footer from '../../Generic/Footer';
import Menu from '../../Generic/Menu';
import './css/Cartera.css';

const Cartera = () => {
    const [wallets, setWallets] = useState([]);
    const [properties, setProperties] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [walletStatus, setWalletStatus] = useState({
        id: '',
        estcartera: '',
        fecestcartera: '',
        notiestcartera: '',
        property: {
            id: '',
            numInmueble: '',
        },
        worker: {
            id: '',
            userName: '',
            userCedula: ''
        }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [walletsPerPage] = useState(13);

    const [errors, setErrors] = useState({});

    const estadosCartera = [
        { id: 1, nombre: 'Mora' },
        { id: 2, nombre: 'Paz y Salvo' },
        { id: 3, nombre: 'Proceso Jurídico' }
    ];

    const opcionesNotificar = [
        { id: 1, nombre: 'Notificar residente' },
        { id: 2, nombre: 'Enviar certificado' },
        { id: 3, nombre: 'Enviar proceso' }
    ];

    const fetchWallets = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/walletStatus/all');
            setWallets(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching wallets:', error);
            setMessage('Error al listar los estados de cartera');
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

    const fetchWorkers = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/worker/all');
            //const filteredWorkers = response.data.data.filter(worker => worker.nomTrabajador === 'Alba Amaya');
            //setWorkers(filteredWorkers);
            setWorkers(response.data.data);
        } catch (error) {
            console.error('Error fetching workers:', error);
        }
    };
    useEffect(() => {
        fetchWallets();
        fetchProperties();
        fetchWorkers();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'property.id') {
            setWalletStatus(prevWalletStatus => ({
                ...prevWalletStatus,
                property: {
                    ...prevWalletStatus.property,
                    id: value
                }
            }));
        } else if (name === 'worker.id') {
            const selectedWorker = workers.find(worker => worker.id === parseInt(value));
            if (selectedWorker && selectedWorker.user) {
                setWalletStatus(prevState => ({
                    ...prevState,
                    worker: {
                        ...prevState.worker,
                        id: value,
                        userName: selectedWorker.user.nombre,
                        userCedula: selectedWorker.user.cedula,
                    }
                }));
            } else {
                setWalletStatus(prevState => ({
                    ...prevState,
                    worker: {
                        ...prevState.worker,
                        id: value,
                        userName: 'N/A',
                        userCedula: 'N/A',
                    }
                }));
            }    
        } else {
            setWalletStatus({...walletStatus, [name]: value});
        }     
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = {};
        const today = new Date().toISOString().split('T')[0];
        
    
        if (!walletStatus.estcartera) {
            validationErrors.estcartera = 'El estado es requerido';
        }

        if (!walletStatus.fecestcartera){
            validationErrors.fecestcartera = 'La fecha es obligatoria';
        } else if (walletStatus.fecestcartera !== today) {
            validationErrors.fecestcartera = 'La fecha del estado debe ser la actual';  
        };
        

        if (!walletStatus.notiestcartera) {
            validationErrors.notiestcartera = 'La opción de notificación es requerida';
        }

        if (!walletStatus.property.id) {
            validationErrors.property = 'El inmueble es requerido';
        }

        if (!walletStatus.worker.id) {
            validationErrors.worker = 'El trabajador es requerido';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        if (formType === 'create'){
            await createWalletStatus();
    
        } else {
            await updateWalletStatus();
        }
    };
    

    const createWalletStatus = async () => {
        try {
            await axios.post('http://localhost:8085/api/walletStatus/create', walletStatus); 
            setShowForm(false);
            fetchWallets();
            setMessage('Estado de cartera creado correctamente');
            
        } catch (error) {
            console.error('Error creating Wallet', error);
            setMessage('Error al crear el estado de cartera');
        }
    };

    const updateWalletStatus = async () => {
        try {
            await axios.put(`http://localhost:8085/api/walletStatus/update/${walletStatus.id}`, walletStatus);
            setShowForm(false);
            fetchWallets();
            setMessage('Estado de cartera actualizado correctamente');
        } catch (error) {
            console.error('Error updating wallet:', error);
            setMessage('Error al actualizar el estado de cartera');
        }
    };

    const deleteWalletStatus = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta cartera?')) {
            try {
                await axios.delete(`http://localhost:8085/api/walletStatus/delete/${id}`);
                fetchWallets();
                setMessage('Estado de cartera eliminado correctamente');
            } catch (error) {
                console.error('Error deleting wallet:', error);
                setMessage('Error al eliminar el estado de cartera');
            }
        }    
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setWalletStatus({
            id: '',
            estcartera: '',
            fecestcartera: '',
            notiestcartera: '',
            property: {
                id: '',
                numInmueble: '',
            },
            worker: {
                id: '',
                userName: '',
                userCedula: ''
            }
        });
    };

    const showEditForm = (selectedWalletStatus) => {
        if (selectedWalletStatus) {
            setShowForm(true);
            setFormType('edit');
            setWalletStatus(selectedWalletStatus);
        } else {
            console.error('Error: selectedWalletStatus is null');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    const filteredWallets = wallets.filter(wallet =>
        wallet.estcartera.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastWallet = currentPage * walletsPerPage;
    const indexOfFirstWallets = indexOfLastWallet - walletsPerPage;
    const currentWallets = filteredWallets.slice(indexOfFirstWallets, indexOfLastWallet);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <Menu />
            <div className='Wallet'>
                <h2>Lista Cartera <i className="bi bi-wallet"></i></h2>

                <div className="d-flex justify-content-between align-items-center">
                    <button
                        className="btn btn-success smaller-button" 
                        onClick={showCreateForm}
                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft:'200px'}}
                    >
                        <i className="bi bi-wallet-fill"></i>
                        <span className='ms-2'>Crear Cartera</span>
                    </button>
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar estado de cartera"
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
                                        <i className="bi bi-wallet-fill"></i>
                                        <span className='ms-2'>Crear Cartera</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-wallet2"></i>
                                        <span className='ms-2'>Editar Cartera</span>
                                    </>
                                )}
                            </h3>
                            
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Estado</label>
                                    <select
                                        className={`form-select ${errors.estcartera ? 'is-invalid' : ''}`}
                                        name='estcartera'
                                        value={walletStatus.estcartera}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar estado</option>
                                        {estadosCartera.map((estado) => (
                                            <option key={estado.id} value={estado.nombre}>
                                                {estado.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.estcartera && <div className="text-danger">{errors.estcartera}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Fecha</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        placeholder='Fecha de Estado'
                                        name='fecestcartera'
                                        value={walletStatus.fecestcartera}
                                        onChange={handleInputChange}
                                    />
                                    {errors.fecestcartera && <div className="text-danger">{errors.fecestcartera}</div>}
                                    
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Notificar</label>
                                    <select
                                        className={`form-select ${errors.notiestcartera ? 'is-invalid' : ''}`}
                                        name='notiestcartera'
                                        value={walletStatus.notiestcartera}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar opción de notificación</option>
                                        {opcionesNotificar.map((opcion) => (
                                            <option key={opcion.id} value={opcion.nombre}>
                                                {opcion.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.notiestcartera && <div className="invalid-feedback">{errors.notiestcartera}</div>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Inmueble</label>
                                    <select
                                        className='form-select' 
                                        name='property.id'
                                        value={walletStatus.property.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un inmueble</option>
                                        {properties.map((property) => (
                                            <option key={property.id} value={property.id}>
                                                {property.numInmueble}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.property && <div className="text-danger">{errors.property}</div>}
                                </div>
                                <div className='mb-3'>
                                <label className='form-label'>Trabajador</label>
                                    <select
                                        className='form-select'
                                        name='worker.id'
                                        value={walletStatus.worker.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value=''>Seleccione un Trabajador</option>
                                        {workers.map((worker) => (
                                            worker.user.nombre === 'Alba Amaya' && (
                                                <option key={worker.id} value={worker.id}>
                                                    {worker.user.nombre} ({worker.user.cedula})
                                                </option>
                                            )
                                        ))}
                                    </select>
                                    {errors.worker && <div className="text-danger">{errors.worker}</div>}
                                </div>
                                <button type="submit" className="btn btn-success smaller-button sm-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40',width: '160px', margin: 'auto'}}>
                                    <i className="bi bi-wallet"></i>
                                    {formType === 'create' ? 'Crear' : 'Editar'}
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
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Notificar</th>
                            <th>Inmueble</th>
                            <th>Trabajador</th>
                            <th>Cedula</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentWallets.map((walletStatus) => {
                            const fecestcarteraFormatted = new Date(walletStatus.fecestcartera).toLocaleDateString('es-ES');
                            return (
                                <tr key={walletStatus.id}>
                                <td style={{textAlign: 'center'}}>{walletStatus.id}</td>
                                <td style={{textAlign: 'center'}}>{walletStatus.estcartera}</td>
                                <td style={{textAlign: 'center'}}>{fecestcarteraFormatted}</td>
                                <td style={{textAlign: 'center'}}>{walletStatus.notiestcartera}</td>
                                <td style={{textAlign: 'center'}}>{walletStatus.property ? walletStatus.property.numInmueble : 'N/A'}</td>
                                <td style={{textAlign: 'center'}}>{walletStatus.worker ? walletStatus.worker.userName : 'N/A'}</td>
                                <td style={{textAlign: 'center'}}>{walletStatus.worker ? walletStatus.worker.userCedula : 'N/A'}</td>
                                <td className='text-center'>
                                    <div className='d-flex justify-content-center'>
                                        <button 
                                            className="btn btn-primary btn-sm mx-1" 
                                            onClick={() => showEditForm(walletStatus)}
                                            style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                        >
                                            <i className="bi bi-wallet"></i>
                                        </button>
                                        <button 
                                            className="btn btn-danger btn-sm mx-1" 
                                            onClick={() => deleteWalletStatus(walletStatus.id)}
                                            style={{ backgroundColor: '#a11129', borderColor: '#a11129' }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <DocCartera walletStatus={walletStatus} /> {/* Añadimos el componente PDFGenerator */}
                                    </div>   
                                </td>
                            </tr>
                            );
                        })}
                            
                    </tbody>      
                </table>

                <div className="pagination">
                    {filteredWallets.length > walletsPerPage && (
                        <ul className="pagination-list">
                            {Array(Math.ceil(filteredWallets.length / walletsPerPage)).fill().map((_, i) => (
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
};

export default Cartera;