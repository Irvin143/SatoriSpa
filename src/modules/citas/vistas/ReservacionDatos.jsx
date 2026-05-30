import React from 'react';
import { useState } from 'react';
import { useOutletContext,Link } from "react-router-dom";
import ResumenSeleccion  from '../../../Components.jsx';

function ReservacionDatos() {
    
    const {servicios, servicioSeleccionado, setServicioSeleccionado, 
        diaText, diaNumber,mes,
        horarioSeleccionado,
        setOrdenSeleccionado
        } = useOutletContext();
    
    return(
        <section className={`text-[#655e57] bg-[#f4f0ea] p-8 pt-30 lg:p-20' `}>
            <Link
                to = "/reservacion/horario"
                className={`mb-5 mt-3 text-[1.2em] `} onClick={() => setOrdenSeleccionado(2)}>
                ← Regresar
            </Link>
            
            {/* Resumen de selección */}
            <ResumenSeleccion
                servicios={servicios}
                servicioSeleccionado={servicioSeleccionado}
                diaText={diaText}
                diaNumber={diaNumber}
                mes={mes}
                horarioSeleccionado={horarioSeleccionado}
            />

            <article className='flex flex-col items-center justify-center  lg:w-[30%] mx-auto'>
            <h2 className='text-[1.4em] font-bold mt-5'>Completa tu reserva</h2>
            <p className='mb-5 text-[0.9em]'>Para personalizar su experiencia en Satori, por favor facilitenos sus detallesde contacto.</p>

            <form action="submit" className='flex flex-col w-full'>
                <Input titulo="Nombre Completo" textoFondo="ej. Juan Pablo" tipo={"text"}/>
                <Input titulo="Correo electronico" textoFondo="Juan@gmail.com" tipo={"email"}/>
                <Input titulo="Teléfono" textoFondo="ej. 55 1234 5678" tipo={"text"}/>
                <Input titulo="Especificaciones extras" textoFondo="ej. Alergias, tratamiento especial" tipo={"text"}/>
                <button className="w-[90%] bg-[#655e57] text-white py-4 mt-5 rounded-[25px] backdrop-blur-md  text-sm font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300 " disabled={!servicioSeleccionado} onClick={() => setOrdenSeleccionado(3)}>
                    CONFIRMAR DATOS
                </button> 
            </form>
            </article>

        </section>    
    );
}

function Input({titulo, textoFondo, tipo}){
    return(
        <article className='flex flex-col'>
            <label htmlFor="" className='font-bold'>{titulo}</label>
            <input type={tipo} placeholder={textoFondo} className="px-1 py-3 mb-5 rounded-[10px] border-b border-gray-300  outline-none"  />
        </article>
    );
}

export default ReservacionDatos;