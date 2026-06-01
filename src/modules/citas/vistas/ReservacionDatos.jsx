import React from 'react';
import { useState } from 'react';
import { useOutletContext,Link } from "react-router-dom";

import {ResumenSeleccion,CardError }  from '../../../Components.jsx';


import iconCandado from "../../../assets/panels/iconCandado.png";
import fondoDatos from "../../../assets/panels/fondoDatos.png";
import iconEscudo from "../../../assets/panels/iconEscudo.png";

function ReservacionDatos() {
    
    const {servicios, servicioSeleccionado, setServicioSeleccionado, 
        diaText, diaNumber,mes,
        horarioSeleccionado,
        setOrdenSeleccionado
        } = useOutletContext();

    const [estadoError, setEstadoError] = useState(false);
    
    return(
        <section
            className="min-h-screen text-[#655e57] p-8 pt-30 lg:p-20 bg-cover bg-left bg-no-repeat"
            style={{
                backgroundImage: `url(${fondoDatos})`
            }}
        >
            
            <article className='flex justify-between gap-2 '>
                <Link
                    to = "/reservacion/horario"
                    className=' mt-3 text-[1.2em]' onClick={() => setOrdenSeleccionado(2)}>
                    ← Regresar
                </Link>
                <article className='flex items-center gap-2 mt-3 py-3 px-5 text-[0.9em] text-[#026918] bg-[#DDD]/60 rounded-[20px] shadow-xl'>
                    <p className='text-[1.5em] font-bold rounded-full border-1 w-[30px] h-[30px] flex items-center justify-center '>✓</p>
                    <article>
                        <span className='text-[1.1em]  font-bold'>Reserva casi lista</span>
                        <p>Solo faltan tus datos</p>
                    </article>
                </article>
            </article>
            <article className='flex items-center justify-evenly '>
                <article className='hidden lg:block text-[1.5em]'>
                    <p>Tu momento</p>
                    <span className='text-[#655e57]/50'> de calma </span>
                    <p> esta a un paso </p>
                    <hr className='w-[30px] my-5' />
                    <p className='text-[0.7em] '>Estamos emocionados de</p>
                    <p className='text-[0.7em] '>preparar una experiencia </p>
                    <p className='text-[0.7em] '>unica para ti </p>
                </article>
                <article>
                    <h2 className='text-[1.4em] font-bold mt-5 lg:mt-0'>Completa tu reserva</h2>
                    <article className='flex items-center gap-2 mt-3 my-5 text-[0.9em]'>
                        <img src={iconCandado} alt="" className='w-[20px]' />
                        <p>Tus datos son utilizados unicamente para gestionar tu reserva.</p>
                    </article>
                    {/* Resumen de selección */}
                    <ResumenSeleccion
                        servicios={servicios}
                        servicioSeleccionado={servicioSeleccionado}
                        diaText={diaText}
                        diaNumber={diaNumber}
                        mes={mes}
                        horarioSeleccionado={horarioSeleccionado}
                    />
                    
                    <CardError titulo="Campos requeridos" mensaje="Completa todos los campos requeridos." estado = {estadoError}/>

                    <form action="submit" className='flex flex-col w-full bg-white p-5 rounded-[20px] shadow-xl'>
                        <Input titulo="Nombre Completo" textoFondo="ej. Juan Pablo" tipo={"text"}/>
                        <Input titulo="Correo electronico" textoFondo="Juan@gmail.com" tipo={"email"}/>
                        <Input titulo="Teléfono" textoFondo="ej. 55 1234 5678" tipo={"text"}/>
                        <Input titulo="Especificaciones extras" textoFondo="ej. Alergias, tratamiento especial" tipo={"text"}/>
                        <button className="w-[90%] bg-[#655e57] text-white py-4 mt-5 rounded-[25px] backdrop-blur-md  text-sm font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300 " disabled={!servicioSeleccionado} onClick={() => setOrdenSeleccionado(3)}>
                            CONFIRMAR DATOS
                        </button> 
                    </form>
                    <article className='flex items-center justify-center gap-2 mt-5 text-[0.9em]'>
                        <img src={iconEscudo} alt="" className='w-[20px] ' />
                        <article className='text-[0.8em] text-black'>
                            <p>Tu privacidad es importante para nosotros.</p>
                            <p>No compartas tu información con terceros.</p>
                        </article>
                    </article>
                </article>
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