import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuResidente from '../../Generic/MenuResidente'; 
import Footer from '../../Generic/Footer'; 
import '../CrudComponents/css/Novedades.css'; 

const NovedadesResidente = () => {
    const [news, setNews] = useState([]); 
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create');
    const [novedad, setNovedad] = useState({
        id: '',
        remNovedades: '',
        tipoNovedad: '',
        asuntoNovedades: '',
        descNovedades: '',
        estNovedades: '',
        fecNovedades: '',
        resNovedades: '',
        role: {
            id: '',
            nombreRol: ''
        }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(4);
    const [errors, setErrors] = useState({});

    // Función para obtener las novedades desde la API
    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/news/all');
            setNews(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching novedades:', error);
            setMessage('Error al listar las novedades');
        }
    };

    // Función para obtener los roles desde la API
    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/role/all');
            setRoles(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching roles:', error);
            setMessage('Error al listar los roles');
        }
    };

    // Cargar las novedades y roles al montar el componente
    useEffect(() => {
        fetchNews();
        fetchRoles();
    }, []);

    // Manejar los cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'role.id') {
            setNovedad(prevNovedad => ({
                ...prevNovedad,
                role: {
                    ...prevNovedad.role,
                    id: value
                }
            }));
        } else {
            setNovedad({ ...novedad, [name]: value });
        }
    };

    // Validar los datos del formulario
    const validateNovedad = () => {
        let  isValid = true;
        const newErrors = {};
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const selectedDate = new Date(novedad.fecNovedades);
        const nombrePattern = /^[a-zA-ZÀ-ÿ\s]{3,60}$/;
        if (!nombrePattern.test(novedad.remNovedades)) {
            newErrors.remNovedades = 'El nombre debe contener mínimo 3 caracteres';
            isValid = false;
        }
        if (!novedad.tipoNovedad) {
            newErrors.tipoNovedad = 'Tipo de novedad es requerido';
            isValid = false;
        }
        if (!novedad.asuntoNovedades) {
            newErrors.asuntoNovedades = 'Asunto es requerido';
            isValid = false;
        }
        if (!novedad.descNovedades) {
            newErrors.descNovedades = 'Descripción es requerida';
            isValid = false;
        }
        if (!novedad.fecNovedades) {
            newErrors.fecNovedades = 'Fecha es requerida';
            isValid = false;
        }
        
        if (!novedad.role.id) {
            errors.role = 'Rol es requerido';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateNovedad()) {
            if (formType === 'create') {
                await createNovedad();
            } else {
                await updateNovedad();
            }
        }
    };

    // Crear una nueva novedad
    const createNovedad = async () => {
        try {
            
            await axios.post('http://localhost:8085/api/news/create', novedad);
            setShowForm(false);
            fetchNews();
            setMessage('Novedad creada correctamente');
        } catch (error) {
            console.error('Error creating novedad:', error);
            setMessage('Error al crear la novedad');
        }
    };

    // Actualizar una novedad existente
    const updateNovedad = async () => {
        try {
            
            await axios.put(`http://localhost:8085/api/news/update/${novedad.id}`, novedad);
            setShowForm(false);
            fetchNews();
            setMessage('Novedad actualizada correctamente');
        } catch (error) {
            console.error('Error updating novedad:', error);
            setMessage('Error al actualizar la novedad');
        }
    };



    // Mostrar el formulario de creación
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
            estNovedades: '',
            role: {
                id: '',
                nombreRol: ''
            }
        });
    };

    // Mostrar el formulario de edición
    const showEditForm = (selectedNovedad) => {
        if (selectedNovedad) {
            setShowForm(true);
            setFormType('edit');
            setNovedad(selectedNovedad);
        } else {
            console.error('Error: selectedNovedad is null');
        }
    };

    // Manejar el cambio en el campo de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    // Filtrar las novedades según el término de búsqueda
    const filteredNews = news.filter((novedad) =>
        novedad.tipoNovedad.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Obtener las novedades de la página actual
    const indexOfLastNovedad = currentPage * newsPerPage;
    const indexOfFirstNovedad = indexOfLastNovedad - newsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstNovedad, indexOfLastNovedad);

    // Cambiar de página
    const paginate = pageNumber => setCurrentPage(pageNumber);
        return (
            <>
                <MenuResidente /> 
                <div className='Novedades'>
                    <h2>Novedades <i className="bi bi-newspaper"></i></h2>
                    <div className="d-flex justify-content-between align-items-center">
                            <button
                                className="btn btn-success mb-3 smaller-button"
                                onClick={showCreateForm}
                                style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft:'200px' }}
                            >
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
                                        placeholder="Buscar Tipo"
                                        onChange={handleSearchChange}
                                        style={{ paddingLeft: '0.5rem', width:'300px' }}
                                    />
                                </div>
                            </div>
                        
                        </div>
                    {showForm && (
                        <div className="card">
                            <div className="card-header">
                                
                                    {formType === 'create' ? (
                                        <>
                                            <i className="bi bi-plus-circle-fill text-white"style={{ fontSize: '1.8rem' }}></i>
                                            <span className='ms-2 text-white'style={{ fontSize: '1.8rem' }}> Crear Novedad</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-pencil-square text-white"style={{ fontSize: '1.8rem' }}></i>
                                            <span className='ms-2 text-white' style={{ fontSize: '1.8rem' }}> Editar Novedad</span>
                                        </>
                                    )}
                                
                            </div>    
                            <div className='card-body'>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-label">
                                        <label>Remitente</label>
                                        <input type="text" className="form-control" name="remNovedades" placeholder="Nombre"value={novedad.remNovedades} onChange={handleInputChange} />
                                        {errors.remNovedades && <div className="text-danger">{errors.remNovedades}</div>}
                                    </div>
                                    <div className="form-label ">
                                    <label>Tipo de novedad</label>
                                    <select className="form-select"  name="tipoNovedad" value={novedad.tipoNovedad} onChange={handleInputChange}>
                                        <option value="">Seleccionar tipo de novedad</option>
                                        <option value="residentes">Residentes</option>
                                        <option value="zonas comunes">Zonas comunes</option>
                                        <option value="parqueadero">Parqueadero</option>
                                        <option value="mascotas">Mascotas</option>
                                    </select>
                                    {errors.tipoNovedad && <div className="text-danger">{errors.tipoNovedad}</div>}
                                </div>
                                    <div className="form-label">
                                        <label>Asunto</label>
                                        <input type="text" className="form-control" name="asuntoNovedades"placeholder="Asunto" value={novedad.asuntoNovedades} onChange={handleInputChange} />
                                        {errors.asuntoNovedades && <div className="text-danger">{errors.asuntoNovedades}</div>}
                                    </div>
                                    <div className="form-label">
                                        <label>Descripción</label>
                                        <textarea className="form-control" name="descNovedades" placeholder="Descripción"value={novedad.descNovedades} onChange={handleInputChange}></textarea>
                                        {errors.descNovedades && <div className="text-danger">{errors.descNovedades}</div>}
                                    </div>
                                    <div className="form-label">
                                        <label>Fecha</label>
                                        <input type="date" className="form-control" name="fecNovedades" placeholder="Fecha" value={novedad.fecNovedades} onChange={handleInputChange} />
                                        {errors.fecNovedades && <div className="text-danger">{errors.fecNovedades}</div>}
                                    </div>
                                    <div className="form-label">
                                        <label>Rol</label>
                                        <select className="form-select" name="role.id" value={novedad.role.id} onChange={handleInputChange}>
                                            <option value="">Seleccionar Rol</option>
                                            {roles.map((rol) => (
                                                <option key={rol.id} value={rol.id}>
                                                    {rol.nombreRol}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.role && <div className="text-danger">{errors.role}</div>}
                                    </div>
                                    
                                    <button type="submit" className="btn btn-success smaller-button sm-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40',width: '160px', margin: 'auto' }}>
                                            <i className="bi bi-check-circle-fill"></i>
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
                    {message && <div className="alert alert-info">{message}</div>}
                    <table className='table mt-4'>
                        <thead>
                            <tr>
                                <th >Remitente</th>
                                <th >Tipo</th>
                                <th >Asunto</th>
                                <th >Descripción</th>
                                <th >Fecha</th>
                                <th >Rol</th>
                                <th >Estado</th>
                                <th>Respuesta</th>
                                <th >Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentNews.map((novedad) => {
                                const fechaformatted = new Date(novedad.fecNovedades).toLocaleDateString('es-ES');
                                return (
                                    <tr key={novedad.id}>
                                    <td style={{textAlign: 'center'}}>{novedad.remNovedades}</td>
                                    <td style={{textAlign: 'center'}}>{novedad.tipoNovedad}</td>
                                    <td style={{textAlign: 'center'}}>{novedad.asuntoNovedades}</td>
                                    <td style={{textAlign: 'center'}}>{novedad.descNovedades}</td>
                                    <td style={{textAlign: 'center'}}>{fechaformatted}</td>
                                    <td style={{textAlign: 'center'}}>{novedad.role.nombreRol}</td>
                                    <td style={{textAlign: 'center'}}>{novedad.estNovedades}</td>
                                    <td style={{textAlign: 'center'}}>{novedad.resNovedades}</td>
                                    <td className='text-center'>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    className="btn btn-primary btn-sm mx-1"
                                                    onClick={() => showEditForm(novedad)}
                                                    style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                
                                            </div>   
                                        </td>
                                </tr>
                                );
                            })}
                                
                           
                        </tbody>
                    </table>
                    <div className="pagination">
                            {filteredNews.length > newsPerPage && (
                            <ul className="pagination-list">
                                {Array(Math.ceil(filteredNews.length / newsPerPage)).fill().map((_, i) => (
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
    
export default NovedadesResidente;