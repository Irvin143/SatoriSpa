import { React } from 'react';
import { useState } from 'react';
import { useOutletContext, Link } from "react-router-dom";
import CitasDatos from './ReservacionDatos.jsx';


import fondoHeader from "../../../assets/fondoHeader.jpeg";
import iconCalendario from "../../../assets/iconCalendario.png";
import iconReloj from "../../../assets/iconReloj.webp";

import { ResumenSeleccion,CardError }  from '../../../Components.jsx';

export default function CitasHorario() {
    const {servicioSeleccionado, servicios, setOrdenSeleccionado, 
        horarioSeleccionado, setHorarioSeleccionado,
        diaText ,setDiaText,
        diaNumber, setDiaNumber,
        mes,setMes
    } = useOutletContext();

    const [fecha, setFecha] = useState(new Date());
    const [seleccionado, setSeleccionado] = useState(null);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
        
    const [estadoError, setEstadoError] = useState(false);

    
    setDiaText(fechaSeleccionada ?  fechaSeleccionada?.toLocaleDateString("es-MX", {weekday: "long"}) +', ': 'Sin fecha seleccionada' );
    setDiaNumber(fechaSeleccionada ? fechaSeleccionada.getDate() : 0);
    setMes(fechaSeleccionada ?  fechaSeleccionada?.toLocaleDateString("es-MX", {month: "long"}) : '');

    const year = fecha.getFullYear();
    const month = fecha.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const start = firstDay === 0 ? 6 : firstDay - 1;

    const meses = [
      "ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO",
      "JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"
    ];
    

    const cambiarMes = (dir) => {
        const nueva = new Date(fecha);
        nueva.setMonth(month + dir);
        setFecha(nueva);
    };
    return (
        <section className={`text-[#655e57] bg-[#f4f0ea] px-5 pt-27 lg:p-20 `}>
            <Link 
                to = "/reservacion"
                className={`my-5 ml-5 text-[1.2em] `} onClick={() => setOrdenSeleccionado(1)}>
                ← Regresar
            </Link>

            <h2 className='text-[2em] font-bold'>Elije tu momento</h2>
            <p className='mb-6 lg:mb-0 '>Sincroniza tu paz interior con los ritmos del santuario</p>

            <article className='lg:flex lg:gap-10 lg:justify-center lg:px-15'> 
                {/* CALENDARIO */}
                <article className="bg-[#FFF] p-6 rounded-[50px] w-[90%]  m-auto shadow-md lg:w-[50%]">
                    <article className="flex justify-between items-center mb-4">
                        <button onClick={() => cambiarMes(-1)} className="text-xl hover:cursor-pointer">‹</button>
                        <h2 className="text-sm lg:text-[1.2em] tracking-widest font-medium">
                        {meses[month]} {year}
                        </h2>
                        <button onClick={() => cambiarMes(1)} className="text-xl hover:cursor-pointer">›</button>
                    </article>

                    {/* Días */}
                    <article className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2 lg:text-[1em]">
                        <span>LU</span><span>MA</span><span>MI</span>
                        <span>JU</span><span>VI</span><span>SA</span><span>DO</span>
                    </article>

                    {/* Fechas */}
                    <article className="grid grid-cols-7 text-center text-sm">
                        {/* espacios vacíos */}
                        {[...Array(start)].map((_, i) => (
                        <div key={i}></div>
                        ))}

                        {/* días */}
                        {[...Array(lastDate)].map((_, i) => {
                        const dia = i + 1;
                        const esSeleccionado =
                            fechaSeleccionada &&
                            fechaSeleccionada.getDate() === dia &&
                            fechaSeleccionada.getMonth() === month &&
                            fechaSeleccionada.getFullYear() === year;

                        return (
                            <article
                            key={dia}
                            onClick={() => {
                                const fechaCompleta = new Date(year, month, dia);
                                setFechaSeleccionada(fechaCompleta);
                            }}
                            className={`p-2 m-[4px] rounded-full cursor-pointer w-8 h-8  transition duration-300 flex items-center justify-center lg:w-10 lg:h-10 lg:text-[1.2em]
                            ${esSeleccionado ? "bg-[#cfcac4] font-bold text-[1.2em]" : "hover:bg-[#655e57]/10 "}
                            `}
                            >
                            {dia}
                            </article>
                        );
                        })}
                    </article>
                </article>


                    {/* Horarios */}
                <article >
                    <p className=' font-bold text-[0.8em] mt-5'>SESIONES MATUTINAS</p>
                    <article className='flex gap-4 m-5'>
                        <BtnHorario key="matutina-1" hora="8:00" onSeleccionar={() => setHorarioSeleccionado("8:00")} activo={horarioSeleccionado == "8:00"} />
                        <BtnHorario key="matutina-2" hora="9:00" onSeleccionar={() => setHorarioSeleccionado("9:00")} activo={horarioSeleccionado == "9:00"} />
                    </article>
                    <p className=' font-bold text-[0.8em] mt-10'>SESIONES VESPERTINAS</p>
                    <article className='flex gap-4 m-5'>
                        <BtnHorario key="vespertina-1" hora="5:00" onSeleccionar={() => setHorarioSeleccionado("5:00")} activo={horarioSeleccionado === "5:00"} />
                        <BtnHorario key="vespertina-2" hora="6:00" onSeleccionar={() => setHorarioSeleccionado("6:00")} activo={horarioSeleccionado === "6:00"} />
                    </article>
                </article>
                <article className='sticky bottom-0 flex flex-col justify-center items-center lg:hidden'>
                    <ResumenSeleccion
                        servicios={servicios}
                        servicioSeleccionado={servicioSeleccionado}
                        diaText={diaText}
                        diaNumber={diaNumber}
                        mes={mes}
                        horarioSeleccionado={horarioSeleccionado}
                    />
                    <Link 
                        to = "/reservacion/datos"
                        className={`w-[90%] bg-[#9c9790] text-white text-center py-4 px-8 flex items-center justify-center  my-5 rounded-[25px] backdrop-blur-md  text-sm font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300 disabled:opacity-50 
                        ${horarioSeleccionado  && fechaSeleccionada ? 'bg-[#655e57]' : ''}    `}
                        disabled={!horarioSeleccionado  || !fechaSeleccionada} 
                        onClick={(e) => {
                            if(!horarioSeleccionado  || !fechaSeleccionada){
                                e.preventDefault();
                                setEstadoError(true);
                            }else{
                                setOrdenSeleccionado(3);
                                setEstadoError(false);
                            }
                        }}
                    >
                            CONFIRMAR FECHA
                    </Link> 

                </article>

                <CardError titulo="Campos requeridos" mensaje="Escoge un horario o fecha." estado = {estadoError}/>

                {/* Resumen de selección para desktop */}
                <article className='hidden lg:flex lg:flex-col w-[40%] text-[1em] bg-[#f4f0ea]/80 backdrop-blur-md rounded-[25px] border-1 border-white'>
                    <img src={fondoHeader} alt="" className='p-0 m-0 w-full rounded-[25px]' />
                    <article className='px-10 py-7'>
                        <span className="font-bold text-[1.4em]">{servicios.find(s => s.id === servicioSeleccionado)?.nombre || ''}</span> <br/>
                        <span className="text-[0.9em]">{'Ritual de '+servicios.find(s => s.id === servicioSeleccionado)?.tiempo || ''}</span>
                        <p className='pb-7 pt-4'>Una experiencia inmersiva que combina técnicas orientales con aceites esenciales orgánicos para una desconexión total.</p>
                        <article className='flex justify-between pt-4 '>
                            <p>Fecha</p>
                            <p className='font-bold ml-2'>{
                            // Dia En texto
                            fechaSeleccionada ?  fechaSeleccionada?.toLocaleDateString("es-MX", {weekday: "long"}) +', ': 'Sin fecha seleccionada' }
                            {/* Dia en numero */}
                            {fechaSeleccionada ?  fechaSeleccionada?.getDate() + ' de': ''} {/* Mes en nombre */} {fechaSeleccionada ?  fechaSeleccionada?.toLocaleDateString("es-MX", {month: "long"}) : ''}
                            </p>
                        </article>
                        <article className='flex justify-between py-2'>
                            <p>Horario</p>
                            <p className='font-bold ml-2'>{horarioSeleccionado || 'Sin horario seleccionado'}</p>
                        </article>
                        <article className='flex justify-between py-4'>
                            <p>Total</p>
                            <p className='font-bold'>{'$'+servicios.find(s => s.id === servicioSeleccionado)?.precio  || ''}</p>
                        </article>
                        <Link 
                            to = "/reservacion/datos"
                            className={`w-[90%] bg-[#9c9790] text-white text-center py-4 px-8 flex items-center justify-center  mt-5 rounded-[25px] backdrop-blur-md  text-sm font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300 disabled:opacity-50
                            ${horarioSeleccionado  && fechaSeleccionada ? 'bg-[#655e57]' : ''}    `}
                            onClick={(e) => {
                                if(!horarioSeleccionado  || !fechaSeleccionada){
                                    e.preventDefault();
                                    setEstadoError(true);
                                }else{
                                    setOrdenSeleccionado(3);
                                    setEstadoError(false);
                                }
                            }}
                        >
                            CONFIRMAR FECHA
                        </Link> 
                    </article>
                </article>
            </article>
        </section>
    );
}

function BtnHorario({ hora, onSeleccionar,activo }) {
  return (
    <button onClick={onSeleccionar} className={` text-[#655e57] rounded-[10px] backdrop-blur-md hover:bg-[#9c9790] hover:text-white/80 hover:cursor-pointer transition-all duration-100 lg:px-14 ${activo ? 'bg-[#655e57] text-white/80 px-7' : 'bg-[#FFF] py-3 px-6 '}`}>
      {hora}
    </button>
  );
}