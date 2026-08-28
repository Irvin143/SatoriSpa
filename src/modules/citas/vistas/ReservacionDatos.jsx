import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useOutletContext,Link } from "react-router-dom";

import {ResumenSeleccion,CardError }  from '../../../Components.jsx';

import { useAuth } from '../../../Auth/AuthContext.jsx';

import { crearCita, obtenerInfoUsuario } from '../services/useCita.js';

import iconCandado from "../../../assets/citas/iconCandado.png";
import fondoDatos from "../../../assets/citas/fondoDatos.png";
import iconEscudo from "../../../assets/citas/iconEscudo.png";

function ReservacionDatos() {
    
    const [estadoError, setEstadoError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    const {servicios, servicioSeleccionado, setServicioSeleccionado, 
        diaText, diaNumber,mes,
        horarioSeleccionado,
        setOrdenSeleccionado,
        fecha, setFecha
        } = useOutletContext();

    const { user } = useAuth();

    useEffect(() => {
        const cargarDatosUsuario = async () => {
            if(user){
                const respuesta = await obtenerInfoUsuario(user.id);
                if (!respuesta.success) {
                    setMensajeError("Error al obtener información del usuario. Inténtalo de nuevo.");
                    setEstadoError(true);
                    console.error("Error al obtener información del usuario:", respuesta.error);
                } else {
                    setFormulario({
                        ...formulario,
                        nombre: respuesta.data.nombre,
                        correo: respuesta.data.correo,
                        telefono: respuesta.data.telefono
                    });
                    console.log("Información del usuario cargada:", respuesta.data);
                }
            }
        };

        cargarDatosUsuario();
    
    }, []);

    const [formulario, setFormulario] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        especificaciones: ""
    });

    const citaNueva = {
        idServicio: servicioSeleccionado,
        nombreCliente: formulario.nombre,
        fechaCita: fecha.toISOString().split('T')[0],
        hora: horarioSeleccionado || "",
        especificaciones: formulario.especificaciones
    }



    const handleChange = (e) => {
        if (e.target.name === "telefono" && !/^\d*$/.test(e.target.value)) return;
        if (e.target.name === "telefono" && e.target.value.length > 10) return;
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        if (!validarFormulario()) {
            setEstadoError(true);
            return;
        }

        console.log("Datos de la cita a crear:", citaNueva);
        
        const resultado = await crearCita(citaNueva, user, formulario);

        if (!resultado.success) {
            setMensajeError("Error al crear la cita. Inténtalo de nuevo.");
            setEstadoError(true);
            console.error("Error al crear la cita:", resultado.error);
        }

        setEstadoError(false);
    }

    const validarFormulario = () => {
        if(formulario.nombre.trim() === "" || formulario.correo.trim() === "" || formulario.telefono.trim() === ""){
            setMensajeError("Completa todos los campos requeridos");
            return false;
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo.trim())){
            setMensajeError("El correo no es válido");
            return false;
        }
        if(!/^\d{10}$/.test(formulario.telefono.trim())){
            setMensajeError("El teléfono debe tener 10 dígitos");
            return false;
        }
        if(!/^\d+$/.test(formulario.telefono.trim())){
            setMensajeError("El teléfono debe contener solo números");
            return false;
        }
        return true;
    }

    return(
        <section
            className="min-h-screen text-[#655e57] pt-30 p-5 lg:p-20 bg-cover bg-left bg-no-repeat"
            style={{
                backgroundImage: `url(${fondoDatos})`
            }}
        >
            
            <article className='grid 
                grid-cols-[1fr_auto]  grid-rows-[auto_auto]
                [grid-template-areas:"link_tarjeta"_"datos_datos"]
                lg:grid-cols-[1fr_auto_auto] lg:gap-15  
                lg:[grid-template-areas:"link_datos_tarjeta"]
            '>
                <Link
                    to = "/reservacion/horario"
                    className=' mt-3 text-[1.2em] [grid-area:link]' onClick={() => setOrdenSeleccionado(2)}>
                    ← Regresar
                </Link>
                <article className='flex [grid-area:tarjeta] h-fit self-start items-center gap-2 mt-3 py-3 px-5 text-[0.9em] text-[#026918] bg-[#DDD]/60 rounded-[20px] shadow-xl'>
                    <p className='text-[1.5em] font-bold rounded-full border-1 w-[30px] h-[30px] flex items-center justify-center '>✓</p>
                    <article>
                        <span className='text-[1.1em]  font-bold'>Reserva casi lista</span>
                        <p>Solo faltan tus datos</p>
                    </article>
                </article>
                
                <article className='flex items-center  lg:gap-20 [grid-area:datos]'>
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
                        
                        <CardError titulo="Campos requeridos" mensaje={mensajeError} estado = {estadoError} onClose = {() => setEstadoError(false)} />

                        <form action="submit" className='flex flex-col w-full bg-white p-5 rounded-[20px] shadow-xl'>
                            <Input titulo="Nombre Completo" textoFondo="ej. Juan Pablo" tipo={"text"} valor={formulario.nombre} onChange={handleChange} name="nombre">
                                <CardTip tip="Ingresa el nombre de la persona que recibirá el servicio" />        
                            </Input>
                            <Input titulo="Correo electrónico" textoFondo="ej. juan@gmail.com" tipo={"email"} valor={formulario.correo} onChange={handleChange} name="correo"/>
                            <Input titulo="Teléfono" textoFondo="ej. 55 1234 5678" tipo={"text"} valor={formulario.telefono} onChange={handleChange} name="telefono"/>
                            <Input titulo="Especificaciones extras (opcional)" textoFondo="ej. Alergias, tratamiento especial" tipo={"text"} valor={formulario.especificaciones} onChange={handleChange} name="especificaciones"/>
                            <button type = "button" className="w-[90%] bg-[#655e57] text-white text-center py-4 mt-5 rounded-[25px] backdrop-blur-md  text-sm font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300 "  onClick={handleSubmit}>
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
                
            </article>

        </section> 
    );
}

function Input({titulo, textoFondo, tipo, valor,onChange,name,children = null}) {
    return(
        <article className='flex flex-col'>
            <article className='flex items-center gap-2 mb-2 '>
                <label  className='font-bold'>{titulo}</label>
                {children}
            </article>
            <input type={tipo} placeholder={textoFondo} 
            className="px-1 py-3 mb-5 rounded-[10px] border-b border-gray-300  outline-none"
            value={valor}
            onChange={onChange} 
            name={name} />
        </article>
    );
}

function CardTip({tip}){
    const [visible, setVisible] = useState(false);
    const tooltipRef = useRef(null);

    // Cerrar al tocar fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
                setVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    return(
        <article className="relative  items-center group ">
            <span className="text-gray-400 font-bold cursor-default" onClick={() => setVisible(v => !v)}>ⓘ</span>
            <span className={`${visible ? 'visible opacity-100' : 'invisible opacity-0'} absolute w-[130px]  left-5 -translate-y-1/2 bg-gray-800 text-white text-xs rounded-lg px-3 py-2  z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 shadow-lg}`}>
                {tip}
            </span>
        </article>
    );
}

export default ReservacionDatos;