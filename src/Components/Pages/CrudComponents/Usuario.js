import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import Menu from '../../Generic/Menu';
import './css/Usuario.css';

const Usuario = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create'); // 'create' o 'edit'
    const [user, setUser] = useState({
        id: '',
        usuario: '',
        nombre: '',
        tipoDoc: '',
        cedula: '',
        celular: '',
        role: {
            id: '',
            nombreRol: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordOnEdit, setShowPasswordOnEdit] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(8); // Cantidad de usuarios por página

    const generateRandomPassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';
        let password = '';
    
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }
    
        return password;
    };
      

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/user/all');
            setUsers(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching users:', error);
            setMessage('No se recibió respuesta del servidor');
            setAlertType('danger');
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/role/all');
            setRoles(response.data.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    useEffect(() => {
        if (message) {
            // Mostrar la alerta por 5 segundos y luego ocultarla
            const timer = setTimeout(() => {
                setMessage('');
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [message]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role.id') {
            setUser({
                ...user,
                role: {
                    ...user.role,
                    id: value
                }
            });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/i;
        if (!emailPattern.test(user.usuario)) {
            newErrors.usuario = 'El usuario debe ser un correo electrónico válido';
            isValid = false;
        }

        const nombrePattern = /^[a-zA-ZÀ-ÿ\s]{3,60}$/;
        if (!nombrePattern.test(user.nombre)) {
            newErrors.nombre = 'El nombre debe contener mínimo 3 caracteres';
            isValid = false;
        }
        if (!user.tipoDoc) {
            newErrors.tipoDoc = 'Seleccione un tipo de documento';
            isValid = false;
        }

        const cedulaPattern = /^\d{5,10}$/;
        if (!cedulaPattern.test(user.cedula)) {
            newErrors.cedula = 'La identificación solo debe contener números, debe ser entre 5 a 10 dígitos';
            isValid = false;
        }

        const celularPattern = /^(300|301|302|303|304|305|314|320|321|322|323|324|325|316|317|318|319|350|351|352|310|311|312|313|315)\d{7}$/;
        if (!celularPattern.test(user.celular)) {
            newErrors.celular = 'El celular debe ser válido';
            isValid = false;
        }

        if (!user.role.id) {
            newErrors.role = 'Seleccione un rol';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            if (formType === 'create') {
                user.contrasena = generateRandomPassword();
                await createUser();
            } else {
                user.contrasena = generateRandomPassword();
                await updateUser();
                
            }
        }
    };

    const createUser = async () => {
        try {
            await axios.post('http://localhost:8085/api/user/create', {
                usuario: user.usuario,
                contrasena: user.contrasena,
                nombre: user.nombre,
                tipoDoc: user.tipoDoc,
                cedula: user.cedula,
                celular: user.celular,
                role: {
                    id: user.role.id,
                    nombreRol: user.role.nombreRol
                }
            });
            setMessage('Usuario creado exitosamente');
            setAlertType('success');
            setShowForm(false);
            fetchUsers();
            setMessage('Usuario creado correctamente');
            setAlertType('success');
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('Error al crear el usuario');
            setAlertType('danger');
        }
    };

    const updateUser = async () => {
        try {
            await axios.put(`http://localhost:8085/api/user/update/${user.id}`, {
                usuario: user.usuario,
                contrasena: user.contrasena,
                nombre: user.nombre,
                tipoDoc: user.tipoDoc,
                cedula: user.cedula,
                celular: user.celular,
                role: {
                    id: user.role.id,
                    nombreRol: user.role.nombreRol
                },
                contrasena: user.contrasena
            });
            setShowForm(false);
            fetchUsers();
            setMessage('Usuario actualizado correctamente');
            setAlertType('success');
        } catch (error) {
            console.error('Error updating user:', error);
            setMessage('Error al actualizar el usuario');
            setAlertType('danger');
        }
    };

    
    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setUser({
            id: '',
            usuario: '',
            nombre: '',
            tipoDoc: '',
            cedula: '',
            celular: '',
            role: {
                id: '',
                nombreRol: ''
            }
        });
    };

    const showEditForm = (selectedUser) => {
        if (selectedUser) {
            setShowForm(true);
            setFormType('edit');
            const newPassword = generateRandomPassword();
            setUser({
                id: selectedUser.id,
                usuario: selectedUser.usuario,
                nombre: selectedUser.nombre,
                tipoDoc: selectedUser.tipoDoc,
                cedula: selectedUser.cedula,
                celular: selectedUser.celular,
                contrasena: user.contrasena,
                role: {
                    id: selectedUser.role ? selectedUser.role.id : '',
                    nombreRol: selectedUser.role ? selectedUser.role.nombreRol : ''
                }
            });
            setShowPasswordOnEdit(true);
        } else {
            console.error('Error: selectedUser is null');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredUsers = users.filter(user =>
        user.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPasswordOnEdit = () => {
        setShowPasswordOnEdit(!showPasswordOnEdit);
    };

    return (
        <>
            <Menu />
            {message && (
                <div className={`alert alert-${alertType}`}>
                    {message}
                    <button
                        type="button"
                        className="close"
                        onClick={() => setMessage('')}
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}
            <div className='Usuarios'> 
                <h2>Usuarios <i className="bi bi-people-fill"></i></h2>
                
                
                <div className="d-flex justify-content-between align-items-center">
                    
                    <button 
                        className="btn btn-success mb-3 smaller-button" 
                        onClick={showCreateForm}
                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40', marginLeft:'200px' }}
                    >
                        <i className="bi bi-person-plus"></i>
                        <span className="ms-2">Crear Usuario</span>
                    </button>
                    <div className="input-group" style={{ width: '33%' }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40'}}>
                                <i className="bi bi-search" style={{ fontSize: '0.8rem', color: 'white'}}></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar Usuario"
                                onChange={handleSearchChange}
                                style={{ paddingLeft: '0.5rem', width:'258px' }}
                            />
                        </div>
                    </div>
                </div>
                
                {showForm && (
                    <div className="card">
                        <div className="card-header ">
                            
                                {formType === 'create' ? (
                                    <>
                                        <i className="bi bi-person-plus text-white"style={{ fontSize: '1.8rem' }} ></i>
                                        <span className=" ms-1 text-white"style={{ fontSize: '1.8rem' }} > Crear Usuario</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-pen text-white"style={{ fontSize: '1.8rem' }}></i>
                                        <span className="ms-1 text-white"style={{ fontSize: '1.8rem' }}> Editar Usuario</span>
                                    </>
                                )}
                            
                        </div>
                        
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre y Apellido"
                                        name="nombre"
                                        value={user.nombre}
                                        onChange={handleInputChange}
                                    />
                                    {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tipo de Documento</label>
                                    <select
                                        className="form-select"
                                        name="tipoDoc"
                                        value={user.tipoDoc}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona el tipo de documento</option>
                                        <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                        <option value="Cédula de Extranjeria">Cédula de Extranjería</option>
                                        <option value="Permiso de Permanencia">Permiso de Permanencia</option>
                                    </select>
                                    {errors.tipoDoc && <div className="text-danger">{errors.tipoDoc}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Identificación</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Número de Identificación"
                                        name="cedula"
                                        value={user.cedula}
                                        onChange={handleInputChange}
                                    />
                                    {errors.cedula && <div className="text-danger">{errors.cedula}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Celular</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="celular"
                                        name="celular"
                                        value={user.celular}
                                        onChange={handleInputChange}
                                    />
                                    {errors.celular && <div className="text-danger">{errors.celular}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Usuario</label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        placeholder="Usuario"
                                        name="usuario"
                                        value={user.usuario}
                                        onChange={handleInputChange}
                                    />
                                    
                                    {errors.usuario && <div className="text-danger">{errors.usuario}</div>}
                                </div>
                                
                                
                                <div className='mb-3'>
                                    <label className='form-label'>Rol</label>
                                    <select
                                        className='form-select'
                                        name='role.id'
                                        value={user.role.id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccione un rol</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.nombreRol}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.role && <div className="text-danger">{errors.role}</div>}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success smaller-button sm-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40',width: '160px', margin: 'auto'}}>
                                        <i className="bi bi-pen"></i>
                                        {formType === 'create' ? 'Crear' : 'Editar'}
                                    </button>
                                    <button type="button" className="btn btn-secondary smaller-button sm-2" style={{ backgroundColor: '#a11129', borderColor: '#a11129',width: '160px', margin: 'auto'}} onClick={() => setShowForm(false)}>
                                        <i className="bi bi-x-circle-fill"></i>
                                        <span className="sm-2">Cancelar</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <table className="table mt-4">
                    
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Tipo Documento</th>
                            <th>Cedula</th>
                            <th>Celular</th>
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td style={{textAlign: 'center'}}>{user.id}</td>
                                <td style={{textAlign: 'center'}}>{user.nombre}</td>
                                <td style={{textAlign: 'center'}}>{user.tipoDoc}</td>
                                <td style={{textAlign: 'center'}}>{user.cedula}</td>
                                <td style={{textAlign: 'center'}}>{user.celular}</td>
                                <td style={{textAlign: 'center'}}>{user.usuario}</td>
                                <td style={{textAlign: 'center'}}>
                                    {formType === 'edit' ? user.contrasena : user.contrasena}
                                </td>
                                
                                <td style={{textAlign: 'center'}}>{user.role ? user.role.nombreRol : 'N/A'}</td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center">
                                        <button 
                                            className="btn btn-primary btn-sm mx-1" 
                                            onClick={() => showEditForm(user)}
                                            style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                        >
                                            <i className="bi bi-pen"></i>
                                        </button>
                                        
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    {filteredUsers.length > usersPerPage && (
                        <ul className="pagination-list">
                            {Array(Math.ceil(filteredUsers.length / usersPerPage)).fill().map((_, i) => (
                                <li key={i + 1} className={`pagination-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button onClick={() => paginate(i + 1)} className="pagination-link">{i + 1}</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                
            </div>
            <Footer />
        </>
    );
}

export default Usuario;
