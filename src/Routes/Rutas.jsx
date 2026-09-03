import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Principal from "../modules/princiapl/SatoriSpa1.jsx";

import VerServicios from "../modules/servicios/vistas/VerServicios.jsx";

import Reservacion from "../modules/citas/vistas/Reservacion.jsx";
import MiReservacion from "../modules/citas/vistas/MiReservacion.jsx";
import ReservacionHorario from "../modules/citas/vistas/ReservacionHorario.jsx";
import ReservacionServicios from "../modules/citas/vistas/ReservacionServicios.jsx";
import ReservacionDatos from "../modules/citas/vistas/ReservacionDatos.jsx";

import Login from "../modules/login/vistas/Login.jsx";
import Registro from "../modules/login/vistas/Registro.jsx";

import Panel from "../modules/panelAdministracion/vistas/panel.jsx";
import PanelRituales from "../modules/panelAdministracion/vistas/PanelRituales.jsx";
import PanelCitas from "../modules/panelAdministracion/vistas/PanelCitas.jsx";
import PanelSatori from "../modules/panelAdministracion/vistas/PanelSatori.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />

        <Route path="/administracion" element={<Panel />}>
          <Route index element={<PanelCitas/>}/>
          <Route path="rituales" element={<PanelRituales />} />
          <Route path="citas" element={<PanelCitas />} />
          <Route path="satori" element={<PanelSatori />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/reservacion" element={<Reservacion/>}>
          <Route index element={<ReservacionServicios/>}/>
          <Route path="horario" element={<ReservacionHorario />} />
          <Route path="horario/:id" element={<ReservacionHorario />} />
          <Route path="datos" element={<ReservacionDatos />} />
        </Route>

        <Route path="/mi-reservacion" element={<MiReservacion />} />

        <Route path="/servicios" element={<VerServicios />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
