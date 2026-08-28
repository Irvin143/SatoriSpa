import { useEffect, useState } from "react";


import estrellas from "./assets/Citas/estrellas.png";
import iconCalendario from "./assets/iconCalendario.png";
import iconReloj from "./assets/iconReloj.webp";


export function ResumenSeleccion({nombreServicio, servicioSeleccionado, diaText, diaNumber, mes, horarioSeleccionado}){
    return(
        <article className={`sticky bottom-0  text-[#655e57] w-full pb-2 
            flex flex-col items-center `}>
            <article className={`flex flex-col p-4 w-full bg-[#f4f0ea]/80 bg-white/85 backdrop-blur-md rounded-[25px] border-1 border-white ${servicioSeleccionado ? 'block' : 'hidden'}`}>
                <p className='mb-5'>RESUMEN DE SELECCION</p>
                <article className='flex mb-2'>
                    <article className='flex justify-center items-center w-[40px] mr-2 rounded-[10px] bg-[#EBD2B0]'>
                        <img src={estrellas} alt="" className='w-[35px]' />
                    </article>
                    <article className=''>
                        <p className='text-[0.8em]'>Servicio</p>
                        <span className="font-bold">{nombreServicio || ''}</span>
                    </article>
                </article>
                <article className='flex justify-between text-[0.8em]'>
                    <article className='flex gap-2 mb-2 items-center w-[60%] '>
                        <img src={iconCalendario} alt="" className='w-[15px]' />
                        <article>
                            <span>Fecha</span>
                            <p>
                                {diaText},
                                {/* Dia en numero */}
                                {diaNumber}  de 
                                {/* Mes en nombre */} {mes}
                                </p>
                        </article>
                    </article>
                    <article className='flex gap-2 items-center w-[40%]'>
                        <img src={iconReloj} alt="" className='w-[15px]' />
                        <article>
                            <span>Hora</span>
                            <p>{horarioSeleccionado || 'Sin horario seleccionado'}</p>
                        </article>
                    </article>
                </article>
            </article>
        </article>
    );
}

const COLORES = {
    red: "bg-red-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-600",
    gray: "bg-gray-600",
};

const DURACION_VISIBLE_MS = 5000;
const DURACION_ANIMACION_SALIDA_MS = 200; // debe coincidir con la duración de fadeOutRight en tu CSS

export function CardError({ titulo, mensaje, estado = true, onClose, color = "red" }) {
    const [saliendo, setSaliendo] = useState(false);

    useEffect(() => {
        if (!estado) {
            setSaliendo(false);
            return;
        }

        const timerSalida = setTimeout(() => setSaliendo(true), DURACION_VISIBLE_MS);
        return () => clearTimeout(timerSalida);
    }, [estado]);

    useEffect(() => {
        if (!saliendo) return;

        const timerCierre = setTimeout(() => onClose?.(), DURACION_ANIMACION_SALIDA_MS);
        return () => clearTimeout(timerCierre);
    }, [saliendo, onClose]);

    if (!estado) return null;

    const claseColor = COLORES[color] ?? COLORES.red;

    return (
        <section
            className={`fixed top-5 right-5 text-black z-[99] animate__animated
                ${saliendo ? "animate__fadeOutRight" : "animate__fadeInRight"}`}
        >
            <article className={`pl-2 ${claseColor} rounded-[20px] shadow-xl`}>
                <article className="flex items-center gap-4 bg-white backdrop-blur-md rounded-[15px] border-1 border-white px-6 py-3">
                    <p className={`text-[1.5em] font-bold rounded-full w-[30px] h-[30px] flex items-center justify-center ${claseColor} text-white`}>
                        !
                    </p>
                    <article>
                        <span className="text-[1.2em] font-bold">{titulo || "Error"}</span>
                        <p className="text-[0.9em]">{mensaje}</p>
                    </article>
                </article>
            </article>
        </section>
    );
}

// Filtra una lista de servicios por categoría y por texto de búsqueda en el nombre.

// const serviciosFiltrados = filtrarServicios(servicios, {
//       categoriaSeleccionada: btnFiltroSelect,
//       busqueda,
//       valorSinFiltro: "Todos", // o "TODOS", según lo que uses en ese botón
//   });
export function filtrarServicios(servicios, { categoriaSeleccionada, busqueda, valorSinFiltro = "Todos" }) {
    return (servicios ?? []).filter((servicio) => {
        const coincideCategoria =
            categoriaSeleccionada === valorSinFiltro ||
            servicio.tipos_servicio?.nombre?.toLowerCase() === categoriaSeleccionada.toLowerCase();

        const coincideBusqueda = servicio.nombre
            .toLowerCase()
            .includes((busqueda ?? "").toLowerCase());

        return coincideCategoria && coincideBusqueda;
    });
}