import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./SatoriSpa1.jsx";
import Citas from "./Citas.jsx";
import CitasDatos from "./CitasDatos.jsx";
import Login from "./Login/Login.jsx";
import Registro from "./Login/Registro.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
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
