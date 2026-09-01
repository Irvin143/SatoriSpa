import { useState, useEffect } from 'react';
import { useOutletContext, Link, useParams } from "react-router-dom";

import CitasDatos from './ReservacionDatos.jsx';

import fondoHeader from "../../../assets/fondoHeader.jpeg";
import iconCalendario from "../../../assets/iconCalendario.png";
import iconReloj from "../../../assets/iconReloj.webp";

import { obtenerHorariosDisponibles, obtenerUnServicio } from '../services/useCita.js';
import { ResumenSeleccion, CardError } from '../../../Components.jsx';


export default function CitasHorario({
        servicioSeleccionado, setServicioSeleccionado,
        servicios, setServicios,
        setOrdenSeleccionado,
        horarioSeleccionado, setHorarioSeleccionado,
        diaText, setDiaText,
        diaNumber, setDiaNumber,
        mes, setMes,
        fecha, setFecha
    }) {
    // const {
    //     servicioSeleccionado, setServicioSeleccionado,
    //     servicios, setServicios,
    //     setOrdenSeleccionado,
    //     horarioSeleccionado, setHorarioSeleccionado,
    //     diaText, setDiaText,
    //     diaNumber, setDiaNumber,
    //     mes, setMes,
    //     fecha, setFecha
    // } = useOutletContext();

    const { id } = useParams();
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [errorServicio, setErrorServicio] = useState(null);
    const [estadoError, setEstadoError] = useState(false);
    const [horariosOcupados, setHorariosOcupados] = useState([]);

    // Sincroniza el estado compartido (contexto) cada vez que cambia la fecha elegida.
    // Esto SÍ necesita useEffect: diaText/diaNumber/mes viven en un componente
    // padre/hermano (useOutletContext), no son estado local de este componente.
    useEffect(() => {
        setDiaText(
            fechaSeleccionada
                ? `${fechaSeleccionada.toLocaleDateString("es-MX", { weekday: "long" })}, `
                : "Sin fecha seleccionada"
        );
        setDiaNumber(fechaSeleccionada ? fechaSeleccionada.getDate() : 0);
        setMes(
            fechaSeleccionada
                ? fechaSeleccionada.toLocaleDateString("es-MX", { month: "long" })
                : ""
        );
    }, [fechaSeleccionada, setDiaText, setDiaNumber, setMes]);

    // Efecto separado: solo se ejecuta cuando cambia el id del servicio en la URL
    useEffect(() => {
        if (!id) return;

        const fetchServicio = async () => {
            setCargando(true);
            setErrorServicio(null);

            const result = await obtenerUnServicio(id);

            if (result.success) {
                setServicioSeleccionado(result.data.id);
                setServicios([result.data]);
            } else {
                setErrorServicio(result.error ?? "No se pudo cargar el servicio.");
            }

            setCargando(false);
            setOrdenSeleccionado(2); // Asegura que el paso de horario esté activo
        };

        fetchServicio();
    }, [id, setServicioSeleccionado, setServicios]);

    const horarios = [
        "6:00", "9:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00",
        "17:00", "18:00"
    ];

    const formatearFecha = (fechaAFormatear) => {
        const y = fechaAFormatear.getFullYear();
        const m = String(fechaAFormatear.getMonth() + 1).padStart(2, '0');
        const d = String(fechaAFormatear.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const mostrarHorarios = async (fechaElegida) => {
        if (!fechaElegida) {
            setEstadoError(true);
            return;
        }

        const fechaFormateada = formatearFecha(fechaElegida);
        const citasRaw = await obtenerHorariosDisponibles(fechaFormateada);

        if (!citasRaw.success) {
            setEstadoError(true);
            return;
        }

        const citas = Array.isArray(citasRaw) ? citasRaw : citasRaw?.data ?? citasRaw?.citas ?? [];

        setHorariosOcupados(
            citas
                .filter((cita) => cita.fechaCita === fechaFormateada)
                .map((cita) => cita.hora)
        );
        setEstadoError(false);
    };

    const year = fecha.getFullYear();
    const month = fecha.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const start = firstDay === 0 ? 6 : firstDay - 1;

    const meses = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];

    const cambiarMes = (dir) => {
        const nueva = new Date(fecha);
        nueva.setMonth(month + dir);
        setFecha(nueva);
    };

    const servicioActual = servicios.find((s) => s.id === servicioSeleccionado);
    const puedeConfirmar = Boolean(horarioSeleccionado && fechaSeleccionada);

    const handleConfirmar = (e) => {
        if (!puedeConfirmar) {
            e.preventDefault();
            setEstadoError(true);
        } else {
            setOrdenSeleccionado(3);
            setEstadoError(false);
        }
    };

    return (
        <section className="text-[#655e57] bg-[#f4f0ea] px-5 pt-30 lg:p-20">
            <Link
                to="/reservacion"
                className="my-5 ml-5 text-[1.2em]"
                onClick={() => setOrdenSeleccionado(1)}
            >
                ← Regresar
            </Link>

            <h2 className='text-[2em] font-bold'>Elije tu momento</h2>
            <p className='mb-6 lg:mb-0'>Sincroniza tu paz interior con los ritmos del santuario</p>

            {cargando && <p className="ml-5 text-sm">Cargando servicio...</p>}
            {!cargando && errorServicio && (
                <p className="ml-5 text-sm text-red-600">{errorServicio}</p>
            )}

            <article className='lg:flex lg:gap-10 lg:justify-center lg:px-15'>
                {/* CALENDARIO */}
                <article className="bg-[#FFF] p-6 rounded-[50px] w-[90%] m-auto shadow-md lg:w-[50%]">
                    <article className="flex justify-between items-center mb-4">
                        <button
                            type="button"
                            onClick={() => cambiarMes(-1)}
                            aria-label="Mes anterior"
                            className="text-xl hover:cursor-pointer"
                        >
                            ‹
                        </button>
                        <h2 className="text-sm lg:text-[1.2em] tracking-widest font-medium">
                            {meses[month]} {year}
                        </h2>
                        <button
                            type="button"
                            onClick={() => cambiarMes(1)}
                            aria-label="Mes siguiente"
                            className="text-xl hover:cursor-pointer"
                        >
                            ›
                        </button>
                    </article>

                    <article className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2 lg:text-[1em]">
                        <span>LU</span><span>MA</span><span>MI</span>
                        <span>JU</span><span>VI</span><span>SA</span><span>DO</span>
                    </article>

                    <article className="grid grid-cols-7 text-center">
                        {[...Array(start)].map((_, i) => (
                            <div key={i} className="p-2 m-[4px] rounded-full w-8 h-8 lg:w-10 lg:h-10" />
                        ))}

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
                                <button
                                    key={dia}
                                    type="button"
                                    disabled={esPasado}
                                    aria-pressed={esSeleccionado}
                                    onClick={() => {
                                        setFechaSeleccionada(fechaCompleta);
                                        mostrarHorarios(fechaCompleta);
                                    }}
                                    className={`p-2 m-[4px] rounded-full w-8 h-8 transition duration-300 flex items-center justify-center lg:w-10 lg:h-10 lg:text-[1.2em]
                                        ${esPasado
                                            ? "text-gray-600 cursor-not-allowed bg-gray-300"
                                            : esSeleccionado
                                                ? "bg-[#cfcac4] font-bold text-[1.2em] cursor-pointer"
                                                : "hover:bg-[#655e57]/10 cursor-pointer"
                                        }`}
                                >
                                    {dia}
                                </button>
                            );
                        })}
                    </article>
                </article>

                {/* Horarios */}
                <article className='lg:w-[50%] gap-5 flex flex-col items-center justify-start mt-10 lg:mt-0'>
                    <span className='lg:text-[1.2em]'>Selecciona tu horario</span>
                    {fechaSeleccionada ? (
                        <article className="grid grid-cols-3 mt-5 gap-2">
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

                {/* Resumen de selección para mobile */}
                <article className='sticky bottom-0 flex flex-col justify-center items-center lg:hidden'>
                    <ResumenSeleccion
                        nombreServicio={servicioActual?.nombre || ''}
                        servicioSeleccionado={servicioSeleccionado}
                        diaText={diaText}
                        diaNumber={diaNumber}
                        mes={mes}
                        horarioSeleccionado={horarioSeleccionado}
                    />
                    <Link
                        to="/reservacion/datos"
                        aria-disabled={!puedeConfirmar}
                        className={`w-[90%] text-white text-center py-4 px-8 flex items-center justify-center my-5 rounded-[25px] backdrop-blur-md text-sm font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300
                            ${puedeConfirmar ? 'bg-[#655e57]' : 'bg-[#9c9790]'}`}
                        onClick={handleConfirmar}
                    >
                        CONFIRMAR FECHA
                    </Link>
                </article>

                <CardError
                    titulo="Campos requeridos"
                    mensaje="Escoge un horario o fecha."
                    estado={estadoError}
                    onClose={() => setEstadoError(false)}
                />

                {/* Resumen de selección para desktop */}
                <article className='hidden lg:flex lg:flex-col w-[40%] text-[1em] bg-[#f4f0ea]/80 backdrop-blur-md rounded-[25px] border border-white shadow-[0_20px_50px_-15px_rgba(101,94,87,0.35)] overflow-hidden relative'>
                    {/* Acento superior sutil */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#655e57]/40 to-transparent z-10" />

                    <div className="relative">
                        <img src={fondoHeader} alt="" className='w-full h-[180px] object-cover' />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f0ea] via-transparent to-transparent" />
                    </div>

                    <article className='px-10 pt-2 pb-7 -mt-6 relative'>
                        {/* Pequeño sello circular, detalle ceremonial */}
                        <div className="w-10 h-10 rounded-full bg-[#655e57] flex items-center justify-center mb-4 shadow-md">
                            <span className="text-white text-[1.1em]">✦</span>
                        </div>

                        <span className="font-bold text-[1.4em] leading-tight">{servicioActual?.nombre || ''}</span>
                        <br />
                        <span className="text-[0.9em] text-[#655e57]/70 italic">
                            {servicioActual?.tiempo ? `Ritual de ${servicioActual.tiempo}` : ''}
                        </span>

                        <p className='pb-6 pt-4 text-[0.9em] leading-relaxed'>
                            Una experiencia inmersiva que combina técnicas orientales con aceites esenciales orgánicos para una desconexión total.
                        </p>

                        <div className="h-px bg-gradient-to-r from-transparent via-[#655e57]/25 to-transparent mb-2" />

                        <article className='flex justify-between items-center py-3'>
                            <span className="flex items-center gap-2 text-[#655e57]/70">
                                <img src={iconCalendario} alt="" className="w-4 h-4 opacity-70" />
                                Fecha
                            </span>
                            <p className='font-bold ml-2 text-right'>
                                {diaText} {diaNumber ? `${diaNumber} de` : ''} {mes}
                            </p>
                        </article>

                        <div className="h-px bg-[#655e57]/10" />

                        <article className='flex justify-between items-center py-3'>
                            <span className="flex items-center gap-2 text-[#655e57]/70">
                                <img src={iconReloj} alt="" className="w-4 h-4 opacity-70" />
                                Horario
                            </span>
                            <p className='font-bold ml-2'>{horarioSeleccionado || 'Sin horario seleccionado'}</p>
                        </article>

                        <div className="h-px bg-gradient-to-r from-transparent via-[#655e57]/25 to-transparent mb-2 mt-1" />

                        <article className='flex justify-between items-center py-4'>
                            <p className="text-[#655e57]/70">Total</p>
                            <p className='font-bold text-[1.3em]'>{servicioActual?.precio ? `$${servicioActual.precio}` : ''}</p>
                        </article>

                        <Link
                            to="/reservacion/datos"
                            aria-disabled={!puedeConfirmar}
                            className={`w-full text-white text-center py-4 px-8 flex items-center justify-center mt-3 rounded-[25px] backdrop-blur-md text-sm font-bold tracking-wide hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300
                                ${puedeConfirmar ? 'bg-[#655e57]' : 'bg-[#9c9790]'}`}
                            onClick={handleConfirmar}
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
            type="button"
            onClick={() => { if (ocupado) return; onSeleccionar(); }}
            disabled={ocupado}
            aria-pressed={activo}
            className={`text-[#655e57] rounded-[10px] backdrop-blur-md transition-all duration-100 lg:mb-5 lg:px-8 mx-3 w-[80px] h-[40px] flex items-center justify-center text-sm
                ${ocupado
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed py-3 px-6"
                    : activo
                        ? "bg-[#655e57] text-white/80 px-7 hover:bg-[#9c9790] hover:cursor-pointer"
                        : "bg-[#FFF] py-3 px-6 hover:bg-[#9c9790] hover:text-white/80 hover:cursor-pointer"
                }`}
        >
            {hora}
        </button>
    );
}