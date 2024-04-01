
import './App.css';
import Inicio from './Components/Generic/Inicio';
import Servicios from './Components/Pages/Servicios';
import SobreNosotros from './Components/Pages/SobreNosotros';
import Contactanos from './Components/Pages/Contactanos';
import Ingresar from './Components/Pages/Ingresar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapaSitio from './Components/Generic/MapaSitio';
import Menu from './Components/Generic/Menu';
import Dashboard from './Components/Generic/Dashboard';
import Usuario from './Components/Pages/CrudComponents/Usuario';
import Inmueble from './Components/Pages/CrudComponents/Inmueble';
import Cartera from './Components/Pages/CrudComponents/Cartera';
import Visitante from './Components/Pages/CrudComponents/Visitante';
import Parqueadero from './Components/Pages/CrudComponents/Parqueadero';
import Residente from './Components/Pages/CrudComponents/Residente';
import Trabajador from './Components/Pages/CrudComponents/Trabajador';
import Multas from './Components/Pages/CrudComponents/Multas';
import Correspondencia from './Components/Pages/CrudComponents/Correspondencia';
import Novedades from './Components/Pages/CrudComponents/Novedades';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/Sobre-Nosotros' element={<SobreNosotros />} />
          <Route path='/Servicios' element= {<Servicios />} />
          <Route path='/Contactenos' element={<Contactanos />} />
          <Route path='/Ingresar' element={<Ingresar />} />
          <Route path='/Mapa-Sitio' element={<MapaSitio />} />
          <Route path='/Menu' element={<Menu />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Usuario' element={<Usuario />} />
          <Route path='/Inmueble' element={<Inmueble />} />
          <Route path='/Cartera' element={<Cartera />} />
          <Route path='/Visitante' element={<Visitante />} />
          <Route path='/Parqueadero' element={<Parqueadero />} />
          <Route path='/Residente' element={<Residente />} />
          <Route path='/Trabajador' element={<Trabajador />} />
          <Route path='/Multas' element={<Multas />} />
          <Route path='/Correspondencia' element={<Correspondencia />} />
          <Route path='/Novedades' element={<Novedades />} />

          
          
        </Routes>
        
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
