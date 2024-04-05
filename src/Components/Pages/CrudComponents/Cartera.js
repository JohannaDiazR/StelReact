import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import Menu from '../../Generic/Menu';
import './css/Cartera.css';

const Cartera = () => {
    const [wallets, setWallets] = useState([]);
    const [properties, setProperties] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [walletStatus, setWalletStatus] = useState({
        id: '',
        estcartera: '',
        taccestcartera: '',
        notiestcartera: '',
        property: {
            id: '',
            numInmueble: '',
        },
        worker: {
            id: '',
            nomTrabajador: ''
        }
    });

    const estadosCartera = [
        { id: 1, nombre: 'Mora' },
        { id: 2, nombre: 'Paz y Salvo' }
    ];

    const tiposAcceso = [
        { id: 1, nombre: 'Permitido' },
        { id: 2, nombre: 'Bloqueado' }
    ];

    const opcionesNotificar = [
        { id: 1, nombre: 'Notificar residente' },
        { id: 2, nombre: 'Enviar certificado' }
    ];

    useEffect(() => {
        fetchWallets();
        fetchProperties();
        fetchWorkers();
    }, []);

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
            setWorkers(response.data.data);
        } catch (error) {
            console.error('Error fetching workers:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'property.id' || name === 'property.numInmueble') {
            setWalletStatus({
                ...walletStatus,
                property: {
                    ...walletStatus.property,
                    [name.split('.')[1]]: value
                }
            });
        } else if (name === 'worker.id' || name === 'worker.nomTrabajador') {
            setWalletStatus({
                ...walletStatus,
                worker: {
                    ...walletStatus.worker,
                    [name.split('.')[1]]: value
                }
            });
        } else {
            setWalletStatus({ ...walletStatus, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formType === 'create') {
            await createWalletStatus();
        } else {
            await updateWalletStatus();
        }
    };

    const createWalletStatus = async () => {
        try {
            await axios.post('http://localhost:8085/api/walletStatus/create', {
                estcartera: walletStatus.estcartera,
                taccestcartera: walletStatus.taccestcartera,
                notiestcartera: walletStatus.notiestcartera,
                property: walletStatus.property,
                worker: walletStatus.worker
            });
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
            await axios.put(`http://localhost:8085/api/walletStatus/update/${walletStatus.id}`, {
                estcartera: walletStatus.estcartera,
                taccestcartera: walletStatus.taccestcartera,
                notiestcartera: walletStatus.notiestcartera,
                property: walletStatus.property,
                worker: walletStatus.worker
            });

            setShowForm(false);
            fetchWallets();
            setMessage('Estado de cartera actualizado correctamente');
        } catch (error) {
            console.error('Error updating wallet:', error);
            setMessage('Error al actualizar el estado de cartera');
        }
    };

    const deleteWalletStatus = async (id) => {
        try {
            await axios.delete(`http://localhost:8085/api/walletStatus/delete/${id}`);
            fetchWallets();
            setMessage('Estado de cartera eliminado correctamente');
        } catch (error) {
            console.error('Error deleting wallet:', error);
            setMessage('Error al eliminar el estado de cartera');
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setWalletStatus({
            id: '',
            estcartera: '',
            taccestcartera: '',
            notiestcartera: '',
            property: {
                id: '',
                numInmueble: '',
            },
            worker: {
                id: '',
                nomTrabajador: ''
            }
        });
    };

    const showEditForm = (selectedWalletStatus) => {
        if (selectedWalletStatus) {
            setShowForm(true);
            setFormType('edit');
            setWalletStatus({
                id: selectedWalletStatus.id,
                estcartera: selectedWalletStatus.estcartera,
                taccestcartera: selectedWalletStatus.taccestcartera,
                notiestcartera: selectedWalletStatus.notiestcartera,
                property: selectedWalletStatus.property,
                worker: selectedWalletStatus.worker
            });
        } else {
            console.error('Error: selectedWalletStatus is null');
        }
    };

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = wallets.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(wallets.length / itemsPerPage);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Menu />
            <div className='Wallet'>
                <h2>Lista Cartera <i className="bi bi-wallet"></i></h2>

                <button
                    className="btn btn-success mb-3 smaller-button" 
                    onClick={showCreateForm}
                    style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                >
                    <i className="bi bi-wallet-fill"></i>
                    <span className='ms-2'>Crear Cartera</span>
                </button>

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
                                    <label className='form-label'>Estado</label>
                                    <select
                                        className='form-select'
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
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Tipo Acceso</label>
                                    <select
                                        className='form-select'
                                        name='taccestcartera'
                                        value={walletStatus.taccestcartera}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar tipo de acceso</option>
                                        {tiposAcceso.map((tipo) => (
                                            <option key={tipo.id} value={tipo.nombre}>
                                                {tipo.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Notificar</label>
                                    <select
                                        className='form-select'
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
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Property</label>
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
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Worker</label>
                                    <select
                                        className='form-select'
                                        name='worker.id'
                                        value={walletStatus.worker.id}
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
                            <th>Estado</th>
                            <th>Tipo Acceso</th>
                            <th>Notificar</th>
                            <th>Property</th>
                            <th>Worker</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((walletStatus) => (
                            <tr key={walletStatus.id}>
                                <td>{walletStatus.id}</td>
                                <td>{walletStatus.estcartera}</td>
                                <td>{walletStatus.taccestcartera}</td>
                                <td>{walletStatus.notiestcartera}</td>
                                <td>{walletStatus.property ? walletStatus.property.numInmueble : 'N/A'}</td>
                                <td>{walletStatus.worker ? walletStatus.worker.nomTrabajador : 'N/A'}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => showEditForm(walletStatus)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        <i className="bi bi-wallet"></i>
                                        <span className="ms-2">Editar</span>
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm ms-2" 
                                        onClick={() => deleteWalletStatus(walletStatus.id)}
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
                    <ul className="pagination-list">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                key={index}
                                className={`pagination-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className="pagination-link"
                                    onClick={() => changePage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {message && <p>{message}</p>}
            </div>
            <Footer />
        </>
    )
}

export default Cartera;
