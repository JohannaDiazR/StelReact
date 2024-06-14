import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../Generic/Footer';
import MenuResidente from '../../Generic/MenuResidente';
import '../CrudComponents/css/Cartera.css';

const Cartera = () => {
    const [wallets, setWallets] = useState([]);
    const [properties, setProperties] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [walletsPerPage] = useState(13);

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

    useEffect(() => {
        fetchWallets();
        fetchProperties();
        
    }, []);

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
            <MenuResidente />
            <div className='Wallet'>
                <h2>Lista Cartera <i className="bi bi-wallet"></i></h2>

                <div className="d-flex justify-content-end align-items-center"> 
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
                </div>
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Estado</th>
                            <th>Inmueble</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentWallets.map((walletStatus) => (
                            <tr key={walletStatus.id}>
                                <td style={{textAlign: 'center'}}>{walletStatus.id}</td>
                                <td style={{textAlign: 'center'}}>{walletStatus.estcartera}</td>
                                <td style={{textAlign: 'center'}}>{walletStatus.property ? walletStatus.property.numInmueble : 'N/A'}</td>
                                
                               
                            </tr>
                        ))}
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
            
            <Footer />
        </>
    );
};

export default Cartera;