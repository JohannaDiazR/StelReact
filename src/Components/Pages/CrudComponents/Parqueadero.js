import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../Generic/Menu';
import './css/Parqueadero.css';
import Footer from '../../Generic/Footer';

const Parqueadero = () => {

    const [parkings, setParkings] = useState([]);
    const [message, setMessage] = useState('');
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
      tarParqueadero: ''
    });
  
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
  
    const handleSubmit = async () => {
      if (formType === 'create') {
        await createParking();
      } else {
        await updateParking();
      }
    };
  
    const createParking = async () => {
      try {
        await axios.post('http://localhost:8085/api/parking/create', parking);
        setShowForm(false);
        fetchParkings();
      } catch (error) {
        console.error('Error creating parking:', error);
        setMessage('Error al crear el parqueadero');
      }
    };
  
    const updateParking = async () => {
      try {
        await axios.put(`http://localhost:8085/api/parking/update/${parking.id}`, parking);
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
        tarParqueadero: ''
      });
    };
  
    const showEditForm = (parking) => {
      setShowForm(true);
      setFormType('edit');
      setParking(parking);
    };
    return (
        <>
           <Menu />
           <div className='Parqueaderos'>
                <h2>Lista Parqueadero <i className="bi bi-car-front"></i></h2>

                <button 
                    className="btn btn-success mb-3" 
                    onClick={showCreateForm}
                    style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                >
                    <i className="bi bi-ev-front"></i>
                    <span className="ms-2">Crear Parqueadero</span>
                </button>
                {showForm && (
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className="card-title">
                                {formType === 'create' ? (
                                    <>
                                        <i className="bi bi-ev-front"></i>
                                        <span className="ms-2">Crear Parqueadero</span>
                                        
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-pencil-square"></i>
                                        <span className="ms-2">Editar Usuario</span>
                                        
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
                                    <label className="form-label">Tipo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Carro/Moto Visitante/Propietario"
                                        name="tipoParqueadero"
                                        value={parking.tipoParqueadero}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Habilitado / Inhabilitado"
                                        name="estadoParqueadero"
                                        value={parking.estadoParqueadero}
                                        onChange={handleInputChange}
                                    />
                                </div>  
                                <div className="mb-3">
                                    <label className="form-label">Fecha</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        placeholder="Fecha"
                                        name="fecParqueadero"
                                        value={parking.fecParqueadero}
                                        onChange={handleInputChange}
                                    />
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
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Número Cupo</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Número de Cupo"
                                        name="cupParqueadero"
                                        value={parking.cupParqueadero}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Hora Salida</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        placeholder="Hora de Salida"
                                        name="horaSalida"
                                        value={parking.horaSalida}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tarifa de Pago</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Valor a pagar"
                                        name="tarParqueadero"
                                        value={parking.tarParqueadero}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                    <i className="bi bi-pen"></i>
                                    {formType === 'create' ? 'Crear' : 'Editar'}
                                    
                                </button>
                                <button type="button" className="btn btn-secondary me-2"style={{ backgroundColor: '#a11129'}} onClick={() => setShowForm(false)}>
                                    <i class="bi bi-x-circle-fill"></i>
                                    <span className="ms-2">Cancelar</span>
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
                            <th>Fecha</th>
                            <th>Datos Vehículo</th>
                            <th>Número Cupo</th>
                            <th>Hora Salida</th>
                            <th>Tarifa</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parkings.map((parking) => (
                            <tr key={parking.id}>
                                <td>{parking.id}</td>
                                <td>{parking.tipoParqueadero}</td>
                                <td>{parking.estadoParqueadero}</td>
                                <td>{parking.fecParqueadero}</td>
                                <td>{parking.dvteParqueadero}</td>
                                <td>{parking.cupParqueadero}</td>
                                <td>{parking.horaSalida}</td>
                                <td>{parking.tarParqueadero}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => showEditForm(parking)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        <i class="bi bi-pen"></i>
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
export default Parqueadero;