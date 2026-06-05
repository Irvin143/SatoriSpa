import { React } from 'react';
import { useState } from 'react';
import { useOutletContext, Link } from "react-router-dom";

import CitasDatos from './ReservacionDatos.jsx';

import fondoHeader from "../../../assets/fondoHeader.jpeg";
import iconCalendario from "../../../assets/iconCalendario.png";
import iconReloj from "../../../assets/iconReloj.webp";

import { obtenerHorariosDisponibles } from '../services/useCita.js';
import { ResumenSeleccion,CardError }  from '../../../Components.jsx';

export default function CitasHorario() {
    const { servicioSeleccionado,  servicios, setOrdenSeleccionado,
        horarioSeleccionado, setHorarioSeleccionado,
        diaText, setDiaText,
        diaNumber, setDiaNumber,
        mes, setMes,
        fecha, setFecha
    } = useOutletContext();


    // ✅ Estados primero, antes de cualquier uso
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [estadoError, setEstadoError] = useState(false);

    // ✅ Horarios fijos definidos aquí
    const horarios = [
        "6:00","9:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00",
        "17:00", "18:00"
    ];

    const [horariosOcupados, setHorariosOcupados] = useState([]);


    const mostrarHorarios = async (fecha) => {
        if (!fecha) {
            setEstadoError(true);
            return [];
        }
        const fechaFormateada = formatearFecha(fecha);
        const  citasRaw = await obtenerHorariosDisponibles(fechaFormateada);
        if (!citasRaw.success) {
            setEstadoError(true);
            return [];
        }
        const citas = Array.isArray(citasRaw) ? citasRaw : citasRaw?.data ?? citasRaw?.citas ?? [];
        setHorariosOcupados(fecha
            ? citas
            .filter(cita => cita.fechaCita === fechaFormateada)
            .map(cita => cita.hora)
            : []);
        setEstadoError(false);
    }

    const formatearFecha = (fecha) => {
        const y = fecha.getFullYear();
        const m = String(fecha.getMonth() + 1).padStart(2, '0');
        const d = String(fecha.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const [seleccionado, setSeleccionado] = useState(null);
    
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
                    <article className="grid grid-cols-7 text-center">
                        {[...Array(start)].map((_, i) => (
                            <div key={i} className="p-2 m-[4px] rounded-full w-8 h-8 lg:w-10 lg:h-10"></div>
                        ))}
                    {/* Fechas */}
                    {[...Array(lastDate)].map((_, i) => {
                        const dia = i + 1;
                        const hoy = new Date();
                        hoy.setHours(0, 0, 0, 0);
                        const fechaCompleta = new Date(year, month, dia);
                        const esPasado = fechaCompleta < hoy;

                        const esSeleccionado =
                            fechaSeleccionada &&
                            fechaSeleccionada.getDate() === dia &&
                            fechaSeleccionada.getMonth() === month &&
                            fechaSeleccionada.getFullYear() === year;

                        return (
                            <article
                            key={dia}
                            onClick={() => {
                                if (esPasado) return; // ← bloquea el click
                                setFechaSeleccionada(fechaCompleta);
                                mostrarHorarios(fechaCompleta); 
                            }}
                            className={`p-2 m-[4px] rounded-full w-8 h-8 transition duration-300 flex items-center justify-center lg:w-10 lg:h-10 lg:text-[1.2em]
                                ${esPasado
                                ? "text-gray-600 cursor-not-allowed bg-gray-300"                          // ← días pasados
                                : esSeleccionado
                                    ? "bg-[#cfcac4] font-bold text-[1.2em] cursor-pointer"     // ← seleccionado
                                    : "hover:bg-[#655e57]/10 cursor-pointer"                   // ← disponible
                                }
                            `}
                            >
                            {dia}
                            </article>
                        );
                        })}                    
                    </article>
                </article>


                {/* Horarios */}
                <article className = 'lg:w-[50%] gap-5 flex flex-col items-center justify-start mt-10 lg:mt-0'>
                    <span className='lg:text-[1.2em]  '>Selecciona tu horario</span>
                    {fechaSeleccionada ? (
                        <article className="grid grid-cols-3 mt-5 gap-2 ">
                            {horarios.map((hora) => (
                                <BtnHorario
                                    key={hora}
                                    hora={hora}
                                    onSeleccionar={() => setHorarioSeleccionado(hora)}
                                    activo={horarioSeleccionado === hora}
                                    ocupado={horariosOcupados.includes(hora)}
                                />
                            ))}  
                        </article>
                    ) : (
                        <p className='text-sm text-[#F00]'>Selecciona una fecha para ver los horarios disponibles</p>
                    )}
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

function BtnHorario({ hora, onSeleccionar, activo, ocupado }) {
  return (
        <button
        onClick={() => { if (ocupado) return; onSeleccionar(); }}
        disabled={ocupado}
        className={`text-[#655e57] rounded-[10px] backdrop-blur-md transition-all duration-100 lg:mb-5 lg:px-8 mx-3 w-[80px] h-[40px] flex items-center justify-center text-sm
            ${ocupado
            ? "bg-gray-100 text-gray-300 cursor-not-allowed py-3 px-6"
            : activo
                ? "bg-[#655e57] text-white/80 px-7 hover:bg-[#9c9790] hover:cursor-pointer"
                : "bg-[#FFF] py-3 px-6 hover:bg-[#9c9790] hover:text-white/80 hover:cursor-pointer"
            }
        `}
        >   
        {hora}
        </button>
    );
}