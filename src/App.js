
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
          
          
        </Routes>
        
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
