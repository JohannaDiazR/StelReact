import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../../Generic/Menu';
import './css/Usuario.css';
import Footer from '../../Generic/Footer';

const Usuario = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('create'); // 'create' o 'edit'
    const [user, setUser] = useState({
        id: '',
        usuario: '',
        contrasena: '',
        role: {
            id: '',
            nombreRol: ''
        }
    });

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8085/api/user/all');
            setUsers(response.data.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching users:', error);
            setMessage('No se recibió respuesta del servidor');
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role.id'){
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formType === 'create') {
            await createUser();
        } else {
            await updateUser();
        }
    };

    const createUser = async () => {
        try {
            await axios.post('http://localhost:8085/api/user/create', {
                usuario: user.usuario,
                contrasena: user.contrasena,
                role: {
                    id: user.role.id,
                    nombreRol: user.role.nombreRol
                }
            });
            setShowForm(false);
            fetchUsers();
            setMessage('Usuario creado correctamente');
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('Error al crear el usuario');
        }
    };

    const updateUser = async () => {
        try {
            await axios.put(`http://localhost:8085/api/user/update/${user.id}`, {
                usuario: user.usuario,
                contrasena: user.contrasena,
                role: {
                    id: user.role.id,
                    nombreRol: user.role.nombreRol
                }
            });
            setShowForm(false);
            fetchUsers();
            setMessage('Usuario actualizado correctamente');
        } catch (error) {
            console.error('Error updating user:', error);
            setMessage('Error al actualizar el usuario');
        }
    };

    const showCreateForm = () => {
        setShowForm(true);
        setFormType('create');
        setUser({
            id: '',
            usuario: '',
            contrasena: '',
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
            setUser({
                id: selectedUser.id,
                usuario: selectedUser.usuario,
                contrasena: selectedUser.contrasena,
                role: {
                    id: selectedUser.role ? selectedUser.role.id : '',
                    nombreRol: selectedUser.role ? selectedUser.role.nombreRol : ''
                }
            });
        } else {
            console.error('Error: selectedUser is null');
        }
    };

    return (
        <>
            <Menu />
            <div className='Usuarios'> 
                <h2>Lista Usuarios <i className="bi bi-people-fill"></i></h2>
                <button 
                    className="btn btn-success mb-3" 
                    onClick={showCreateForm}
                    style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                >
                    <i className="bi bi-person-plus"></i>
                    <span className="ms-2">Crear Usuario</span>
                </button>

                {showForm && (
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                {formType === 'create' ? (
                                    <>
                                        <i className="bi bi-person-plus"></i>
                                        <span className="ms-2">Crear Usuario</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-pen"></i>
                                        <span className="ms-2">Editar Usuario</span>
                                    </>
                                )}
                            </h3>
                            <button 
                                type="button" 
                                className="btn-close" 
                                aria-label="Close" 
                                onClick={() => setShowForm(false)}
                            ></button>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Usuario</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Usuario"
                                        name="usuario"
                                        value={user.usuario}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name="contrasena"
                                        value={user.contrasena}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Role</label>
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
                                </div>
                                <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}>
                                    <i className="bi bi-pen"></i>
                                    {formType === 'create' ? 'Crear' : 'Editar'}
                                </button>
                                <button type="button" className="btn btn-secondary me-2" style={{ backgroundColor: '#a11129'}} onClick={() => setShowForm(false)}>
                                    <i className="bi bi-x-circle-fill"></i>
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
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            <th>Role</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.usuario}</td>
                                <td>{user.contrasena}</td>
                                <td>{user.role ? user.role.nombreRol : 'N/A'}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => showEditForm(user)}
                                        style={{ backgroundColor: '#1E4C40', borderColor: '#1E4C40' }}
                                    >
                                        <i className="bi bi-pen"></i>
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
    );
}

export default Usuario;
