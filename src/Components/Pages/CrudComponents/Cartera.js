import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../Generic/Menu';
import Footer from '../../Generic/Footer';
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
            nomtrabajador: ''
        }
    });

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

    useEffect(() => {
        fetchWallets();
        fetchProperties();
        fetchWorkers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'property.id') {
            setWalletStatus({
                ...walletStatus,
                property: {
                    ...walletStatus.property,
                    id: value
                }
            });
        } else if (name === 'worker.id') {
            setWalletStatus({
                ...walletStatus,
                worker: {
                    ...walletStatus.worker,
                    id: value
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
                property: {
                    id: walletStatus.property.id,
                    numInmueble: walletStatus.property.numInmueble
                },
                worker: {
                    id: walletStatus.worker.id,
                    nomtrabajador: walletStatus.worker.nomtrabajador
                }
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
                property: {
                    id: walletStatus.property.id,
                    numInmueble: walletStatus.property.numInmueble
                },
                worker: {
                    id: walletStatus.worker.id,
                    nomtrabajador: walletStatus.worker.nomtrabajador
                }
            });

            setShowForm(false);
            fetchWallets();
            setMessage('Estado de cartera actualizado correctamente');
        } catch (error) {
            console.error('Error updating wallet:', error);
            setMessage('Error al actualizar el estado de cartera');
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
                nomtrabajador: ''
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
                property: {
                    id:selectedWalletStatus.property ? selectedWalletStatus.property.id : '',
                    numInmueble: selectedWalletStatus.property? selectedWalletStatus.property.numInmueble : ''
                },
                worker: {
                    id:selectedWalletStatus.worker ? selectedWalletStatus.worker.id : '',
                    nomtrabajador: selectedWalletStatus.worker ? selectedWalletStatus.worker.nomtrabajador : ''
                }
            });
        } else {
            console.error('Error: selectedWalletStatus is null');
        }
        
    };

    return (
        <>
            <Menu />
            <div className='Wallet'>
                <h2>Lista Cartera <i className="bi bi-wallet"></i></h2>

                <button
                    className="btn btn-success mb-3"
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
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Estado'
                                        name='estcartera'
                                        value={walletStatus.estcartera}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Tipo Acceso</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Tipo Acceso'
                                        name='taccestcartera'
                                        value={walletStatus.taccestcartera}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Notificar</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Notificar'
                                        name='notiestcartera'
                                        value={walletStatus.notiestcartera}
                                        onChange={handleInputChange}
                                    />
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
                                        <option value="">Seleccione un trabajador</option>  {/* Agregar opción por defecto */}
                                        {workers.map((worker) => (
                                            <option key={worker.id} value={worker.id}>
                                                {worker.nomtrabajador}
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
                        {wallets.map((walletStatus) => (
                            <tr key={walletStatus.id}>
                                <td>{walletStatus.id}</td>
                                <td>{walletStatus.estcartera}</td>
                                <td>{walletStatus.taccestcartera}</td>
                                <td>{walletStatus.notiestcartera}</td>
                                <td>{walletStatus.property ? walletStatus.property.numInmueble : 'N/A'}</td>
                                <td>{walletStatus.worker ? walletStatus.worker.nomtrabajador : 'N/A'}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => showEditForm(walletStatus)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        <i className="bi bi-wallet"></i>
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

export default Cartera;
