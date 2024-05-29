import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../Generic/Menu'; 
import Footer from '../../Generic/Footer'; 
import './css/Novedades.css'; 

const Novedades = () => {
    const [data, setData] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [form, setForm] = useState({
        id: '',
        remNovedades: '',
        tipoNovedad: '',
        asuntoNovedades: '',
        descNovedades: '',
        fecNovedades: '',
        resNovedades: '',
        estNovedades: ''
    });

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
        setForm({ ...form, [name]: value });
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
            await axios.post('http://localhost:8085/api/news/create', form);
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
            await axios.put(`http://localhost:8085/api/news/update/${form.id}`, form);
            setShowForm(false);
            fetchNovedades();
            setMessage('Novedad actualizada correctamente');
        } catch (error) {
            console.error('Error updating novedad:', error);
            setMessage('Error al actualizar la novedad');
        }
    };

    const deleteNovedad = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta novedad?')) {
            try {
                await axios.delete(`http://localhost:8085/api/news/delete/${id}`);
                fetchNovedades();
                setMessage('Novedad eliminada correctamente');
            } catch (error) {
                console.error('Error deleting novedad:', error);
                setMessage('Error al eliminar la novedad');
            }
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setForm({
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
        setForm(novedad);
    };

    return (
        <>
            <Menu /> {/* Componente de menú */}
            <div className='Novedades'>
                <h2>Lista de novedades <i class="bi bi-newspaper"></i></h2>
                <button className="btn btn-success mb-3" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }} onClick={showCreateForm}>
                    <i className="bi bi-universal-access-circle"></i>
                    <span className='ms-2'>Crear Novedad</span>
                </button>
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
                                        value={form.remNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Tipo</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='tipoNovedad'
                                        value={form.tipoNovedad}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Asunto</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='asuntoNovedades'
                                        value={form.asuntoNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Descripción</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='descNovedades'
                                        value={form.descNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Fecha</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        name='fecNovedades'
                                        value={form.fecNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Respuesta</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='resNovedades'
                                        value={form.resNovedades}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Estado</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='estNovedades'
                                        value={form.estNovedades}
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
                        {data.map((novedad) => (
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
                                    <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteNovedad(novedad.id)}>
                                        <i className="bi bi-trash"></i>
                                        <span className="ms-2">Eliminar</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>    
                </table>
                {message && <p>{message}</p>}
            </div>
            <Footer /> {/* Componente de pie de página */}
        </>
    );
}

export default Novedades;
