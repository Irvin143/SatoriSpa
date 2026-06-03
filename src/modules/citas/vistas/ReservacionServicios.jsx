import { useState, UseState } from 'react';
import { useOutletContext,Link } from "react-router-dom";

import fondoCitas from "../../../assets/fondoCitas.png";

import { CardError }  from '../../../Components.jsx';

export default function ReservacionSevicios(){
    const {servicioSeleccionado, setServicioSeleccionado, setOrdenSeleccionado, servicios} = useOutletContext();

    const [validacion, setValidacion] = useState(true);

    const [estadoError, setEstadoError] = useState(false);

    return(
        <section className={`relative min-h-screen `}>
            {/* FONDO */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${fondoCitas})` }}
            ></div>

            {/* CONTENIDO */}
            <div className="relative">
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

                <CardError titulo="Campos requeridos" mensaje="Completa todos los campos requeridos." estado = {estadoError}/>

                <article className="sticky bottom-0 text-[#655e57] bg-[#f3f3f3] w-full p-4 rounded-t-4xl border-t border-[rgba(200,200,200,0.5)] flex flex-col  items-center justify-around lg:lg:flex-row lg:p-8">
                    <article className={` w-full flex justify-between px-4  items-center lg:w-[70%] ${servicioSeleccionado ? 'block' : 'hidden'}`}>
                        <article>
                            <p className='text-[0.8em] lg:text-[1em]'>Ritual Seleccionado:</p>
                            <span className="font-bold">{servicios.find(s => s.id === servicioSeleccionado)?.nombre + ' - '}</span>
                            <span className='text-[0.8em] '>{servicios.find(s => s.id === servicioSeleccionado)?.precio + ' Min'|| ''}</span>
                        </article>
                        <article className='flex flex-col items-end'>
                            <p>Total a pagar</p>
                            <span className='font-bold'>${servicios.find(s => s.id === servicioSeleccionado)?.precio || 0}</span>
                        </article>
                    </article>
                    <span className={`text-[#F00]
                    ${!validacion && !servicioSeleccionado ? 'block text-4xl' : 'hidden'}`}
                    >
                        Seleccione un ritual
                    </span>
                    <Link 
                        to = "/reservacion/horario"
                        className={`w-[90%] mt-5  text-center text-white py-4 px-8 flex items-center justify-center   rounded-[25px] backdrop-blur-md  text-sm font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300 disabled:opacity-50 lg:mt-0 lg:w-[30%]
                        ${servicioSeleccionado  ? 'bg-[#655e57]' : ''}
                        ${!validacion && !servicioSeleccionado ? 'bg-[#FA2200]' : ' text-white bg-[#9c9790]'}`}
                        onClick={(e) => {
                            if(!servicioSeleccionado){
                                e.preventDefault();
                                setEstadoError(true);
                            }else{
                                setEstadoError(false);
                                setOrdenSeleccionado(2);
                            }
                        }}
                    >
                            SELECCIONAR RITUAL
                    </Link> 
                </article>
            </div>
        </section >
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

function CardServicio({ id, nombre, descripcion, activo, onSeleccionar, tiempo = "60 min", categoria = "Masaje", precio = "80", img = masaje }) {
  return (
    <article
      key={id}
      className={`w-[80%] h-[90%] flex-shrink-0  mx-auto my-5 rounded-[30px] transition-all duration-300  bg-white/50  lg:flex-row `}>

      <article className={`rounded-[30px]  flex flex-col  backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF] ${activo ? 'bg-[#FFF]/20 text-[#655e57] border-2 border-[#655e57] shadow-xl' : 'text-[#655e57] bg-[#ebe1d7]/50 border-white border-1'}`}>
       
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