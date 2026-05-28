import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "../modules/princiapl/SatoriSpa1.jsx";
import Citas from "../modules/citas/vistas/Citas.jsx";
import CitasDatos from "../modules/citas/vistas/CitasDatos.jsx";
import Login from "../modules/login/vistas/Login.jsx";
import Registro from "../modules/login/vistas/Registro.jsx";
import Panel from "../modules/panelAdministracion/vistas/panel.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Panel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/citas" element={<Citas/>} />
        <Route path="/citasdatos" element={<CitasDatos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
