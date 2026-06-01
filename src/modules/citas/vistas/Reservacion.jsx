import React from 'react';
import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

import logoSatori from "../../../assets/LogoSatori.jpeg";
import florBeneficios from "../../../assets/florBeneficios.png";
import iconinfo from "../../../assets/info.png";
import iconCalendario from "../../../assets/IconCalendario.png";
import iconReloj from "../../../assets/iconReloj.webp";
import fondoHeader      from "../../../assets/FondoHeaderPiscina.png";

import masaje from "../../../assets/Masaje2.jpeg";
import CitasHorario from "./ReservacionHorario.jsx";
import CitasDatos from './ReservacionDatos.jsx';

import fondoCitas from "../../../assets/FondoCitas.png";

function Citas() {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [ordenSeleccionado, setOrdenSeleccionado] = useState(1);
  
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [diaText, setDiaText] = useState("");
  const [diaNumber, setDiaNumber] = useState(0);
  const [mes, setMes] = useState(0);


  const servicios = [
    {
      id: 1,
      nombre: "Masaje Reductivo",
      descripcion:
        "Disfruta de un masaje relajante que aliviará tu estrés y tensión acumulada, dejándote renovado y revitalizado.",
      tiempo: "60 min",
      categoria: "Masaje",
      precio: "70",
      img: logoSatori
    },
    {
      id: 2,
      nombre: "Reductivo Corporal",
      descripcion:
        "Disfruta de un masaje relajante que aliviará tu estrés y tensión acumulada, dejándote renovado y revitalizado.",
      tiempo: "70 min",
      categoria: "Masaje",
      precio: "80",
      img: masaje
    }, 
    {
      id: 3,
      nombre: "Ritual de relajación",
      descripcion:
        "Disfruta de un masaje relajante que aliviará tu estrés y tensión acumulada, dejándote renovado y revitalizado.",
      tiempo: "70 min",
      categoria: "Masaje",
      precio: "80",
      img: masaje
    }, 
    {
      id: 4,
      nombre: "Maderoterapia",
      descripcion:
        "Disfruta de un masaje relajante que aliviará tu estrés y tensión acumulada, dejándote renovado y revitalizado.",
      tiempo: "70 min",
      categoria: "Masaje",
      precio: "80",
      img: masaje
    },  ];
  return (
      <div className='relative'>
          {/* SECCION HEADER */}
        <section className='fixed top-0 w-full z-15'>
          <header className=" top-0 w-full 
            grid [grid-template-columns:auto_1fr_auto] 
            [grid-template-areas:'hamburguesa_logo_extra'_'nav_nav_nav'_'orden_orden_orden'] 
            items-center px-6

            bg-[#f4f0ea]/70 backdrop-blur-md
            border-b border-[#655e57]/10
            lg:[grid-template-columns:auto_auto_1fr_auto] 
            lg:[grid-template-areas:'logo_nav_orden_extra'] 
            
          ">
            <article className="flex items-center justify-start [grid-area:hamburguesa] lg:hidden">
              <button onClick={() => setMenuAbierto(!menuAbierto)} className="flex flex-col gap-1">
                <span className="block w-5 h-[1.5px] bg-[#655e57]"></span>
                <span className="block w-5 h-[1.5px] bg-[#655e57]"></span>
                <span className="block w-5 h-[1.5px] bg-[#655e57]"></span>  
              </button>
            </article>

            <nav id="menuNav"
            className={`[grid-area:nav] flex-col items-center justify-center border-t border-[rgba(200,200,200,0.5)] lg:border-t-0 lg:text-xl lg:flex lg:flex-row lg:items-center lg:justify-center lg:m-0 ${
                menuAbierto ? "flex" : "hidden"}`}>
                  <Link to="/principal"
                className="no-underline text-[#655e57] font-bold transition-all duration-300 p-2 lg:px-8">
                  ← Volver al inicio </Link>
            </nav>

            <img src={logoSatori} alt="Logo Satori" className="[grid-area:logo] w-[100px] justify-self-center lg:w-[120px]" />

            <article className="
              [grid-area:extra] 
              w-10 h-10 lg:w-[50px] lg:h-[50px]
              border border-[#655e57]/40
              rounded-full 
              flex items-center justify-center
              hover:bg-[#655e57] transition
            ">
              <img src={florBeneficios} alt="" className="w-[22px] opacity-70" />
            </article>
            
            <article className="w-full  flex items-center justify-center py-5 [grid-area:orden] gap-6 lg:gap-16  "> 
              <Paso numero={1} texto="Ritual" activo={ordenSeleccionado === 1} />
              <Paso numero={2} texto="Horario" activo={ordenSeleccionado === 2} />
              <Paso numero={3} texto="Datos" activo={ordenSeleccionado === 3} /> 
              </article>
          </header>
        </section>
          
        <Outlet context = {{
          servicioSeleccionado,
          setServicioSeleccionado,
          setOrdenSeleccionado, 
          servicios,
          horarioSeleccionado,
          setHorarioSeleccionado,
          diaText,
          setDiaText,
          diaNumber,
          setDiaNumber,
          mes,
          setMes
        }}/>
          
      </div>
  );
}

function LinkNav({ referencia, texto }) {
  return (
    <a
      href={`#${referencia}`}
      className="no-underline text-[#655e57] font-bold transition-all duration-300 p-2 lg:px-8"
    >{texto}</a>
  );
}

function CirculoNumero({ numero, activo }) {
  return (
    <article
      className={`
        w-[32px] h-[32px] rounded-full 
        flex items-center justify-center
        text-sm lg:text-[0.8em] transition-all duration-300

        ${activo 
          ? 'bg-[#655e57] text-[#f4f0ea] w-[35px] h-[35px] shadow-md' 
          : 'bg-[#655e57]/10 text-[#655e57]/60'}
      `}
    >
      <span>{numero}</span>
    </article>
  );
}

function Paso({ numero, texto, activo }) {
  return (
    <article className="flex items-center gap-2 lg:gap-4 lg:text-[1.4em] ">
      <CirculoNumero numero={numero} activo={activo} />
      <span
        className={`
          transition-all duration-300  
          ${activo 
            ? 'text-[#655e57] opacity-100 font-medium underline underline-offset-4' 
            : 'text-[#655e57]/40 opacity-60'}
        `}
      >
        {texto}
      </span>
    </article>
  );
}

export default Citas;
