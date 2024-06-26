import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menuguarda from '../../Generic/Menuguarda';
import '../CrudComponents/css/Visitante.css';
import Footer from '../../Generic/Footer';
import TicketVisitante from './TicketVisitante';

const ParqueaderoGuarda = () => { const [parkings, setParkings] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [parking, setParking] = useState({
        id: '',
        tipoParqueadero: '',
        estadoParqueadero: '',
        fecParqueadero: '',
        dvteParqueadero: '',
        cupParqueadero: '',
        horaSalida: '',
        costParqueadero: ''
    });
    const [showTicket, setShowTicket] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [parkingsPerPage] = useState(5);
    const [errors, setErrors] = useState({});

    const fetchParkings = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/parking/all');
            setParkings(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching parkings:', error);
            setMessage('No se recibió respuesta del servidor');
        }
    };

    useEffect(() => {
        fetchParkings();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParking({ ...parking, [name]: value });
    };

    const validateParking = () => {
        let isValid = true;
        const newErrors = {};

        // Validar tipo de parqueadero
        if (!parking.tipoParqueadero) {
            newErrors.tipoParqueadero = 'Tipo de parqueadero es requerido';
            isValid = false;
        }

        // Validar estado del parqueadero
        if (!parking.estadoParqueadero) {
            newErrors.estadoParqueadero = 'Estado es requerido';
            isValid = false;
        }

        // Validar fecha de entrada
        if (!parking.fecParqueadero) {
            newErrors.fecParqueadero = 'Fecha de entrada es requerida';
            isValid = false;
        }

        // Validar datos del vehículo
        if (!parking.dvteParqueadero) {
            newErrors.dvteParqueadero = 'Datos del vehículo son requeridos';
            isValid = false;
        }

        // Validar número de cupo (si está presente y no es inhabilitado)
        if (parking.cupParqueadero && parking.estadoParqueadero !== 'inhabilitado') {
            const cupo = parseInt(parking.cupParqueadero);

            // Validar rango del número de cupo según el tipo de parqueadero
            if (parking.tipoParqueadero.includes('carro') && (cupo < 1 || cupo > 55)) {
                newErrors.cupParqueadero = 'Número de cupo debe estar entre 1 y 55 para carros';
                isValid = false;
            } else if (parking.tipoParqueadero.includes('moto') && (cupo < 1 || cupo > 41)) {
                newErrors.cupParqueadero = 'Número de cupo debe estar entre 1 y 46 para motos';
                isValid = false;
            }

            // Verificar si el cupo está inhabilitado en otro registro solo si el estado es habilitado
            if (parking.estadoParqueadero === 'habilitado') {
                const isCupoInhabilitadoEnOtroRegistro = parkings.some(p => 
                    p.cupParqueadero === cupo && p.estadoParqueadero === 'inhabilitado' && p.id!== parking.id
                );

                if (isCupoInhabilitadoEnOtroRegistro) {
                    newErrors.cupParqueadero = 'El número de cupo está inhabilitado en otro registro';
                    isValid = false;
                }
            }
        }

        // Establecer errores y retornar la validez
        setErrors(newErrors);
        return isValid;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateParking()) {
            const totalCost = calculateCost(parking.fecParqueadero, parking.horaSalida, parking.tipoParqueadero);
            setParking({ ...parking, costParqueadero: totalCost }); // Actualizar costParqueadero con totalCost
            if (formType === 'create') {
                await createParking();
            } else {
                await updateParking();
            }
        }
    };
    
    const createParking = async () => {
        try {
            const dataToSend = {
                tipoParqueadero: parking.tipoParqueadero,
                estadoParqueadero: parking.estadoParqueadero,
                fecParqueadero: parking.fecParqueadero,
                dvteParqueadero: parking.dvteParqueadero,
                cupParqueadero: parking.cupParqueadero,
                horaSalida: parking.horaSalida || null,
                costParqueadero: parking.costParqueadero // Si el backend lo requiere
            };
    
            const response = await axios.post('http://localhost:8085/api/parking/create', dataToSend);
            console.log('Parking creado:', response.data);
    
            // Limpiar el formulario y actualizar la lista de parqueaderos
            setShowForm(false);
            setParking({
                id: '',
                tipoParqueadero: '',
                estadoParqueadero: '',
                fecParqueadero: '',
                dvteParqueadero: '',
                cupParqueadero: '',
                horaSalida: '',
                costParqueadero: ''
            });
    
            fetchParkings(); // Actualizar lista de parqueaderos después de crear uno nuevo
        } catch (error) {
            console.error('Error creating parking:', error);
            setMessage('Error al crear el parqueadero');
        }
    };
    
    
    const updateParking = async () => {
        try {
            const response = await axios.put(`http://localhost:8085/api/parking/update/${parking.id}`, parking);
            console.log('Response from updateParking:', response.data); // Verificar la respuesta del backend
            setShowForm(false);
            fetchParkings();
        } catch (error) {
            console.error('Error updating parking:', error);
            setMessage('Error al actualizar el Parqueadero');
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setParking({
            id: '',
            tipoParqueadero: '',
            estadoParqueadero: '',
            fecParqueadero: '',
            dvteParqueadero: '',
            cupParqueadero: '',
            horaSalida: '',
            costParqueadero: ''
        });
    };

    const showEditForm = (parking) => {
        setShowForm(true);
        setFormType('edit');
        setParking(parking);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return 'N/A';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTime).toLocaleString('es-ES', options);
    };

    const calculateCost = (entrada, salida, tipoParqueadero) => {
        const entradaDate = new Date(entrada);
        const salidaDate = new Date(salida);
        const oneDay = 24 * 60 * 60 * 1000;
        let totalCost = 0;

        if (tipoParqueadero.toLowerCase().includes('visitante')) {
            let currentTime = entradaDate;

            while (currentTime < salidaDate) {
                const nextBoundary = new Date(currentTime);
                if (currentTime.getHours() >= 6 && currentTime.getHours() < 18) {
                    // Período de día
                    nextBoundary.setHours(18, 0, 0, 0);
                    totalCost += 4000;
                } else {
                    // Período de noche
                    nextBoundary.setHours(6, 0, 0, 0);
                    if (nextBoundary < currentTime) {
                        nextBoundary.setDate(nextBoundary.getDate() + 1);
                    }
                    totalCost += 6000;
                }

                currentTime = nextBoundary;
                if (currentTime > salidaDate) {
                    break;
                }
            }
        } else if (tipoParqueadero.toLowerCase().includes('carro-propietario')) {
            totalCost = 50000;
        } else if (tipoParqueadero.toLowerCase().includes('moto-propietario')) {
            totalCost = 36000;
        }

        return totalCost;
    };

    const filteredParkings = parkings.filter(parking =>
        parking.cupParqueadero.toString().includes(searchTerm)
    );

    const indexOfLastParking = currentPage * parkingsPerPage;
    const indexOfFirstParking = indexOfLastParking - parkingsPerPage;
    const currentParkings = filteredParkings.slice(indexOfFirstParking, indexOfLastParking);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <Menuguarda />
            <div className='Parqueaderos'>
                <h2>Parqueadero <i className="bi bi-car-front"></i></h2>
                <div className="d-flex justify-content-between align-items-center">
                    <button 
                        className="btn btn-success smaller-button" 
                        onClick={showCreateForm}
                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft: '200px'  }}
                    >
                        <i className="bi bi-ev-front"></i>
                        <span className="ms-2">Crear Parqueadero</span>
                    </button>
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white' }}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar Cupo Parqueadero"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.5rem', width: '300px' }}
                            />
                        </div>
                    </div>
                </div>

                {showForm && (
                    <div className='card'>
                        <div className='card-header'>
                            
                                {formType === 'create' ? (
                                    <>
                                        <i className="bi bi-ev-front text-white"style={{ fontSize: '1.8rem' }}></i>
                                        <span className="ms-2 text-white"style={{ fontSize: '1.8rem' }}> Crear Parqueadero</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-pencil-square text-white"style={{ fontSize: '1.8rem' }}></i>
                                        <span className="ms-2 text-white"style={{ fontSize: '1.8rem' }}> Editar Parqueadero</span>
                                    </>
                                )}
                          
                            
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Tipo de Parqueadero</label>
                                    <select
                                        className="form-select"
                                        name="tipoParqueadero"
                                        value={parking.tipoParqueadero}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar tipo de parqueadero</option>
                                        <option value="carro-propietario">Carro Propietario</option>
                                        <option value="carro-visitante">Carro Visitante</option>
                                        <option value="moto-propietario">Moto Propietario</option>
                                        <option value="moto-visitante">Moto Visitante</option>
                                    </select>
                                    {errors.tipoParqueadero && <div className="text-danger">{errors.tipoParqueadero}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <select
                                        className="form-select"
                                        id="estadoParqueadero"
                                        name="estadoParqueadero"
                                        value={parking.estadoParqueadero}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar estado</option>
                                        <option value="habilitado">Habilitado</option>
                                        <option value="inhabilitado">Inhabilitado</option>
                                    </select>
                                    {errors.estadoParqueadero && <div className="text-danger">{errors.estadoParqueadero}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Fecha y Hora de Entrada</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        placeholder="Fecha"
                                        name="fecParqueadero"
                                        value={parking.fecParqueadero}
                                        onChange={handleInputChange}
                                    />
                                    {errors.fecParqueadero && <div className="text-danger">{errors.fecParqueadero}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Datos Vehículo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Datos Vehículo"
                                        name="dvteParqueadero"
                                        value={parking.dvteParqueadero}
                                        onChange={handleInputChange}
                                    />
                                    {errors.dvteParqueadero && <div className="text-danger">{errors.dvteParqueadero}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Número de Cupo</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min={1}
                                        max={parking.tipoParqueadero.includes('carro') ? 55 : 46} // Limitar según el tipo de vehículo
                                        placeholder="Número de Cupo"
                                        name="cupParqueadero"
                                        value={parking.cupParqueadero}
                                        onChange={handleInputChange}
                                        /*disabled={parking.estadoParqueadero === 'inhabilitado'}*/
                                    />
                                    {errors.cupParqueadero && <div className="text-danger">{errors.cupParqueadero}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Hora de Salida</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        placeholder="Hora de Salida"
                                        name="horaSalida"
                                        value={parking.horaSalida}
                                        onChange={handleInputChange}
                                    />
                                    {errors.horaSalida && <div className="text-danger">{errors.horaSalida}</div>}
                                </div>
                                <button type="submit" className="btn btn-success smaller-button sm-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40',width: '160px', margin: 'auto' }}>
                                    <i class="bi bi-car-front-fill"></i>
                                    {formType === 'create' ? ' Crear' : ' Editar'}
                                </button>
                                <button type="button" className="btn btn-secondary smaller-button sm-2"style={{ backgroundColor: '#a11129',width: '160px', margin: 'auto' }} onClick={() => setShowForm(false)}>
                                    <i className="bi bi-x-circle-fill"></i>
                                    <span className="ms-2"> Cancelar</span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th>Fecha y Hora de Entrada</th>
                            <th>Datos Vehículo</th>
                            <th>Número Cupo</th>
                            <th>Hora de Salida</th>
                            <th>Costo Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentParkings.map((parking) => (
                            <tr key={parking.id}>
                                <td style={{textAlign: 'center'}}>{parking.id}</td>
                                <td style={{textAlign: 'center'}}>{parking.tipoParqueadero}</td>
                                <td style={{textAlign: 'center'}}>{parking.estadoParqueadero}</td>
                                <td style={{textAlign: 'center'}}>{formatDateTime(parking.fecParqueadero)}</td>
                                <td style={{textAlign: 'center'}}>{parking.dvteParqueadero}</td>
                                <td style={{textAlign: 'center'}}>{parking.cupParqueadero}</td>
                                <td style={{textAlign: 'center'}}>{formatDateTime(parking.horaSalida)}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {['visitante', 'carro-propietario', 'moto-propietario'].some(type => parking.tipoParqueadero.toLowerCase().includes(type))
                                        ? calculateCost(parking.fecParqueadero, parking.horaSalida || new Date(), parking.tipoParqueadero).toFixed(2)
                                        : "N/A"}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <button 
                                            className="btn btn-primary btn-sm mx-2" 
                                            onClick={() => showEditForm(parking)}
                                            style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                        >
                                            <i className="bi bi-car-front"></i>
                                        </button>
                                        <TicketVisitante parking={parking} />
                                        
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    {filteredParkings.length > parkingsPerPage && (
                    <ul className="pagination-list">
                        {Array(Math.ceil(filteredParkings.length / parkingsPerPage)).fill().map((_, i) => (
                        <li key={i + 1} className={`pagination-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(i + 1)} className="pagination-link">{i + 1}</button>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>

                {message && <p>{message}</p>}
           </div>
            {showTicket && showTicket.id && (
                <TicketVisitante parking={showTicket} />
            )}
           <Footer />         
        </>
    );
}

export default ParqueaderoGuarda;