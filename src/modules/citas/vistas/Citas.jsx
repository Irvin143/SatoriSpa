import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

import logoSatori from "../../../assets/LogoSatori.jpeg";
import florBeneficios from "../../../assets/florBeneficios.png";
import iconinfo from "../../../assets/info.png";
import iconCalendario from "../../../assets/iconCalendario.png";
import iconReloj from "../../../assets/iconReloj.webp";
import fondoHeader      from "../../../assets/FondoHeaderPiscina.png";
import fondoCitas from "../../../assets/FondoCitas.png";
import masaje from "../../../assets/masaje2.jpeg";
import CitasHorario from "./CItasHorario.jsx";
import CitasDatos from './CitasDatos.jsx';


function Citas() {
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [ordenSeleccionado, setOrdenSeleccionado] = useState(1);


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
        <div>
            {/* SECCION HEADER */}
          <section className='fixed top-0 w-full z-50'>
            <header className=" top-0 w-full z-50 
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
                
                <article className="w-full z-40 flex items-center justify-center py-5 [grid-area:orden] gap-6 lg:gap-16  "> 
                  <Paso numero={1} texto="Ritual" activo={ordenSeleccionado === 1} />
                  <Paso numero={2} texto="Horario" activo={ordenSeleccionado === 2} />
                  <Paso numero={3} texto="Datos" activo={ordenSeleccionado === 3} /> 
                  </article>
            </header>

            </section>

          {/* SECCION RITUALES */} 
          <section className={`relative min-h-screen ${ordenSeleccionado === 1 ? 'block pt-25 lg:px-20 lg:pt-15 ' : 'hidden'}`}>

            {/* FONDO */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${fondoCitas})` }}
            ></div>

            {/* CONTENIDO */}
            <div className="relative z-10">
              <SubTitulo titulo="Rituales de Bienestar" id="rituales" subtitulo="Elige el ritual que deseas reservar"  />

              <article className='lg:grid lg:grid-cols-3 lg:gap-6 lg:justify-items-center'>  
              {servicios.map((servicio) => (
                <CardServicio
                  key={servicio.id}
                  id={servicio.id}
                  nombre={servicio.nombre}
                  descripcion={servicio.descripcion}
                  tiempo={servicio.tiempo}
                  categoria={servicio.categoria}
                  precio={servicio.precio}
                  activo={servicioSeleccionado === servicio.id}
                  img = {servicio.img}
                  onSeleccionar={() => setServicioSeleccionado(servicio.id)}
                  />
                ))}
                </article>

              <article className="sticky bottom-0 text-[#655e57] bg-[#f3f3f3] w-full p-4 rounded-t-4xl border-t border-[rgba(200,200,200,0.5)] flex flex-col  items-center justify-center lg:lg:flex-row lg:p-8">
                <article className={`flex justify-between px-4 w-full items-center ${servicioSeleccionado ? 'block' : 'hidden'}`}>
                  <article >
                    <p className='text-[0.8em] lg:text-[1em]'>Ritual Seleccionado:</p>
                    <span className="font-bold">{servicios.find(s => s.id === servicioSeleccionado)?.nombre + ' - '}</span>
                    <span className='text-[0.8em] '>{servicios.find(s => s.id === servicioSeleccionado)?.precio + ' Min'|| ''}</span>
                  </article>
                  <article className='flex flex-col items-end'>
                    <p>Total a pagar</p>
                    <span className='font-bold'>${servicios.find(s => s.id === servicioSeleccionado)?.precio || 0}</span>
                  </article>
                </article>
                <button className=" w-[90%] bg-[#9c9790] text-white py-3 mt-5 rounded-[50px] text-sm font-bold hover:cursor-pointer hover:w-[55%] transition-all duration-300 disabled:bg-[#d3d3d3] lg:m-0 lg:w-[50%] lg:mx-5" disabled={!servicioSeleccionado} onClick={() => setOrdenSeleccionado(2)}>
                    CONTINUAR AL HORARIO →
                </button>
              </article>
            </div>
          </section >

          {/* SECCION HORARIOS */}
          <CitasHorario
            ordenSeleccionado={ordenSeleccionado}
            setOrdenSeleccionado={setOrdenSeleccionado}
            servicios={servicios}
            servicioSeleccionado={servicioSeleccionado}
          />
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

function CardServicio({ id, nombre, descripcion, activo, onSeleccionar, tiempo = "60 min", categoria = "Masaje", precio = "80", img = masaje }) {
  return (
    <article
      key={id}
      className={`w-[80%] flex-shrink-0  mx-auto my-5 rounded-[30px] transition-all duration-300  bg-white/50  lg:flex-row `}>

      <article className={`rounded-[30px] flex flex-col  backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF] ${activo ? 'bg-[#FFF]/20 text-[#655e57] border-2 border-[#655e57] shadow-xl' : 'text-[#655e57] bg-[#ebe1d7]/50 border-white border-1'}`}>
       
        <div className="relative overflow-hidden rounded-t-[30px] group">
            <img 
              src={img} 
              alt="" 
              className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
          {/* CHECK (esquina superior derecha) */}
          <input
            type="checkbox"
            checked
            disabled
            className={`${activo ? 'block' : 'hidden'} absolute top-3 right-3 w-5 h-5`}
          />

          {/* INFO (parte inferior) */}
          <article className="absolute top-3 left-3 flex text-[0.8em] justify-center items-center gap-2">
            <span className="bg-[#f5f0e9] py-1 px-2 rounded-[40px]">
              {categoria}
            </span>
            <p className=" bg-[#f5f0e9] py-1 px-2 rounded-[40px]">
              {tiempo}
            </p>
          </article>
        </div>

        <article className='flex justify-center items-center px-6 mt-3'>
          <span className="text-[1.2em] py-2 font-bold">{nombre}</span>
          <span className='block ml-auto font-bold'>${precio}</span>
        </article>

        <article className="flex flex-col px-6 mb-5">
          <p className="text-[0.9em] py-2">{descripcion}</p>
          <input 
            type="button" 
            value={`${activo ? 'SELECCIONADO' : 'SELECCIONAR'}`}
            onClick={onSeleccionar}
            className={`text-center text-[0.8em] my-4 px-4 py-2 border-0 cursor-pointer rounded-[10px] lg:py-3 lg:text-lg ${activo ? 'bg-[#f5f0e9] text-[#655e57] font-bold' : 'bg-[#655e57] text-white'}`}
          />
        </article>
      </article>
    </article>
  )
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

function SubTitulo({ titulo, id, subtitulo = "", className = ""}) {
  return(
    <article className={`ml-5 pt-[50px] mb-[30px] ${className}`} id={id}>
      <p className="text-[#655e57] italic mb-0 lg:text-[1.2em]" >{subtitulo}</p>
      <h2 className="text-[#615c56] text-[.em] font-['Trebuchet_MS'] font-bold my-[10px] lg:text-[2.5em]" >{titulo}</h2>
      <hr className="border-none h-px bg-[rgba(128,128,128,1)] w-[60px] ml-[10px]" />
    </article>
  )
}



export default Citas;
