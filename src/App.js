
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
import Logout from './Components/Pages/Logout';
import Menuguarda from './Components/Generic/Menuguarda';
import DashboardGuarda from './Components/Generic/DashboardGuarda';
import InmuebleGuarda from './Components/Pages/RolGuarda/InmuebleGuarda';
import VisitanteGuarda from './Components/Pages/RolGuarda/VisitanteGuarda';
import ParqueaderoGuarda from './Components/Pages/RolGuarda/ParqueaderoGuarda';
import CorrespondenciaGuarda from './Components/Pages/RolGuarda/CorrespondenciaGuarda';
import NovedadesGuarda from './Components/Pages/RolGuarda/NovedadesGuarda';
import TicketVisitante from './Components/Pages/RolGuarda/TicketVisitante';
import MenuResidente from './Components/Generic/MenuResidente';
import InmuebleResidente from './Components/Pages/RolResidente/InmuebleResidente';
import CarteraResidente from './Components/Pages/RolResidente/CarteraResidente';
import DashboardResidente from './Components/Generic/DashboardResidente';
import ResidenteResidente from './Components/Pages/RolResidente/ResidenteResidente';
import CorrespondenciaResidente from './Components/Pages/RolResidente/CorrespondenciaResidente';
import NovedadesResidente from './Components/Pages/RolResidente/NovedadesResidente';
import MultasResidente from './Components/Pages/RolResidente/MultasResidente';
import ParqueaderoResidente from './Components/Pages/RolResidente/ParqueaderoResidente';

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
          <Route path='/Dashboard' element={<Dashboard /> } />
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
          <Route path='/Logout' element={<Logout />} />
          <Route path='/Menuguarda' element={<Menuguarda />} />
          <Route path='/DashboardGuarda' element={<DashboardGuarda />} />
          <Route path='/InmuebleGuarda' element={<InmuebleGuarda />} />
          <Route path='/VisitanteGuarda' element={<VisitanteGuarda />} />
          <Route path='/ParqueaderoGuarda' element={<ParqueaderoGuarda />} />
          <Route path='/CorrespondenciaGuarda' element={<CorrespondenciaGuarda />} />
          <Route path='/NovedadesGuarda' element={<NovedadesGuarda />} />
          <Route path='/TicketVisitante' element={<TicketVisitante />} />
          <Route path='/MenuResidente' element={<MenuResidente />} />
          <Route path='/DashboardResidente' element={<DashboardResidente />} />
          <Route path='/InmuebleResidente' element={<InmuebleResidente />} />
          <Route path='/CarteraResidente' element={<CarteraResidente />} />
          <Route path='/ResidenteResidente' element={<ResidenteResidente />} />
          <Route path='/CorrespondenciaResidente' element={<CorrespondenciaResidente />} />
          <Route path='/NovedadesResidente' element={<NovedadesResidente />} />
          <Route path='/MultasResidente' element={<MultasResidente />} />
          <Route path='/ParqueaderoResidente' element={<ParqueaderoResidente />} />
          
        </Routes>
        
      </BrowserRouter>
      
    </div>
  );
}

export default App;