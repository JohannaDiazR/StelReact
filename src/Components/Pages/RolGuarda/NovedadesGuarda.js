import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menuguarda from '../../Generic/Menuguarda'; 
import Footer from '../../Generic/Footer'; 
import '../CrudComponents/css/Novedades.css'; 

const NovedadesGuarda = () => {
    const [novedades, setData] = useState([]); //novedades
    const [workers, setWorkers] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [novedad, setNovedad] = useState({ //novedad
        id: '',
        remNovedades: '',
        tipoNovedad: '',
        asuntoNovedades: '',
        descNovedades: '',
        fecNovedades: '',
        resNovedades: '',
        estNovedades: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [novedadesPerPage] = useState(3);

    const fetchNovedades = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/news/all');
            setData(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching novedades:', error);
            setMessage('Error al listar las novedades');
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
        fetchNovedades();
        fetchWorkers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovedad({ ...novedad, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formType === 'create') {
            await createNovedad();
        } else {
            await updateNovedad();
        }
    };

    const createNovedad = async () => {
        try {
            await axios.post('http://localhost:8085/api/news/create', novedad);
            setShowForm(false);
            fetchNovedades();
            setMessage('Novedad creada correctamente');
        } catch (error) {
            console.error('Error creating novedad:', error);
            setMessage('Error al crear la novedad');
        }
    };

    const updateNovedad = async () => {
        try {
            await axios.put(`http://localhost:8085/api/news/update/${novedad.id}`, novedad);
            setShowForm(false);
            fetchNovedades();
            setMessage('Novedad actualizada correctamente');
        } catch (error) {
            console.error('Error updating novedad:', error);
            setMessage('Error al actualizar la novedad');
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setNovedad({
            id: '',
            remNovedades: '',
            tipoNovedad: '',
            asuntoNovedades: '',
            descNovedades: '',
            fecNovedades: '',
            resNovedades: '',
            estNovedades: ''
        });
    };

    const showEditForm = (novedad) => {
        setShowForm(true);
        setFormType('edit');
        setNovedad(novedad);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredNovedades = novedades.filter(novedad =>
        novedad.asuntoNovedades.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastNovedad = currentPage * novedadesPerPage;
    const indexOfFirstNovedad = indexOfLastNovedad - novedadesPerPage;
    const currentNovedades = filteredNovedades.slice(indexOfFirstNovedad, indexOfLastNovedad);
    
    const paginate = pageNumber => setCurrentPage(pageNumber);
    

    return (
        <>
            <Menuguarda />
            <div className='Novedades'>
                <h2>Lista de novedades <i className="bi bi-newspaper"></i></h2>
                <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-success mb-3 smaller-button" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft:'200px'  }} onClick={showCreateForm}>
                        <i className="bi bi-newspaper"></i>
                        <span className='ms-2'>Crear Novedad</span>
                    </button>
                    <div className="input-group" style={{ width: '36%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar Asunto Novedad"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.5rem', width:'305px' }}
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
                                        <i className="bi bi-person-lines-fill"></i>
                                        <span className='ms-2'>Crear Novedad</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-wrench-adjustable"></i>
                                        <span className='ms-2'>Editar Novedad</span>
                                    </>
                                )}
                            </h3> 
                        </div> 
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label className='form-label'>Remitente</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='remNovedades'
                                        value={novedad.remNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Tipo</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='tipoNovedad'
                                        value={novedad.tipoNovedad}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Asunto</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='asuntoNovedades'
                                        value={novedad.asuntoNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Descripción</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='descNovedades'
                                        value={novedad.descNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Fecha</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        name='fecNovedades'
                                        value={novedad.fecNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Respuesta</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='resNovedades'
                                        value={novedad.resNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Estado</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='estNovedades'
                                        value={novedad.estNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                    <i class="bi bi-newspaper"></i>
                                    {formType === 'create' ? 'Crear' : 'Editar'}
                                </button>
                                <button type="button" className="btn btn-secondary me-2"style={{ backgroundColor: '#a11129'}} onClick={() => setShowForm(false)}>
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
                            <th>Remitente</th>
                            <th>Tipo</th>
                            <th>Asunto</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Respuesta</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentNovedades.map((novedad) => (
                            <tr key={novedad.id}>
                                <td>{novedad.id}</td>
                                <td>{novedad.remNovedades}</td>
                                <td>{novedad.tipoNovedad}</td>
                                <td>{novedad.asuntoNovedades}</td>
                                <td>{novedad.descNovedades}</td>
                                <td>{novedad.fecNovedades}</td>
                                <td>{novedad.resNovedades}</td>
                                <td>{novedad.estNovedades}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm" onClick={() => showEditForm(novedad)}
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
                <div className="pagination">
                    {filteredNovedades.length > novedadesPerPage && (
                    <ul className="pagination-list">
                        {Array(Math.ceil(filteredNovedades.length / novedadesPerPage)).fill().map((_, i) => (
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

export default NovedadesGuarda;