import { React } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import "@fontsource/playfair-display";

import iconLupa from "../../assets/iconLupa.png";
import iconLapiz from "../../assets/iconLapiz.webp";
import iconEliminar from "../../assets/iconBasura.png";

function PanelRituales() {
    return(
        <section>
            <h2 className='font-bold text-3xl my-5'>Catalogo de Rituales</h2>
            <span>Configure las experiencias sencsoriales del santuario, gestionando tiempos, esencias y la armonia en cada sesion</span>
            <button className='bg-[#655e57] text-[#f4f0ea] w-full py-3 rounded-[10px] text-sm font-bold mt-5 hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300'>
                + NUEVO RITUAL
            </button>
            <article className='relative w-full mt-5 mb-5'>
                <img src={iconLupa} alt="Buscar" className='absolute left-3 top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]' />
                <input type="text" placeholder="Buscar ritual..." className='pl-10 py-3 border-1 border-[#655e57]/15 rounded-[10px] w-full' />
            </article>

            <article className='flex gap-1 p-1 border-1 border-[#655e57]/15 rounded-[50px] 5 mb-10'>
                <BotonFiltro texto="TODOS" />
                <BotonFiltro texto="MASAJES" />
                <BotonFiltro texto="FACIALES" />
            </article>
            <article className='lg:flex lg:gap-15'>

                <CardServicio
                    id={1}
                    nombre="Ritual de Armonía"
                    descripcion="Un masaje completo que combina técnicas de relajación profunda con esencias naturales para equilibrar cuerpo y mente."
                    tiempo="90 min"
                    categoria="Masaje"
                    precio="120"
                />
                <CardServicio
                    id={1}
                    nombre="Ritual de Armonía"
                    descripcion="Un masaje completo que combina técnicas de relajación profunda con esencias naturales para equilibrar cuerpo y mente."
                    tiempo="90 min"
                    categoria="Masaje"
                    precio="120"
                />
                <CardServicio
                    id={1}
                    nombre="Ritual de Armonía"
                    descripcion="Un masaje completo que combina técnicas de relajación profunda con esencias naturales para equilibrar cuerpo y mente."
                    tiempo="90 min"
                    categoria="Masaje"
                    precio="120"
                />
            </article>
        </section>
    );
}


function BotonFiltro({ texto}){
    return(
        <button className='px-7 py-2 bg-[#655e57] rounded-[50px] text-[#f4f0ea] text-xs'>
            {texto}
        </button>
    );
}

function CardServicio({ id, nombre, descripcion, onSeleccionar, tiempo = "60 min", categoria = "Masaje", precio = "80", img = iconLupa }) {
    return (
        <article
        key={id}
        className=" lg:w-[20%] bg-white rounded-[30px]  flex flex-col mb-10 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF] ">

            <article className={`rounded-[30px] flex flex-col  backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF] `}>
            
                <div className="relative overflow-hidden rounded-t-[30px] group">
                    <img 
                    src={img} 
                    alt="" 
                    className="h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                {/* INFO (parte inferior) */}
                <article className="absolute top-3 left-3 flex text-[0.8em] justify-center items-center gap-2">
                    <span className="bg-[#f5f0e9] py-1 px-2 rounded-[40px]">
                    {categoria}
                    </span>
                </article>
                </div>
                <article className='flex items-center px-6 justify-between'>
                    <span className="text-[1.2em] py-2 mt-3 font-bold">{nombre}</span>
                    <article className='flex gap-8'>
                        <button className="flex  group-hover:opacity-100 transition-opacity duration-300">
                            <img src={iconLapiz} alt="Editar" className='w-[20px] h-[20px]' />
                        </button>
                        <button className="flex  group-hover:opacity-100 transition-opacity duration-300">
                            <img src={iconEliminar} alt="Eliminar" className='w-[20px] h-[20px]' />
                        </button>
                    </article>
                </article>
                <p className="text-[0.9em] px-6  py-2">{descripcion}</p>   
                <article className="flex gap-5 items-center mb-5 px-6 text-sm
            ">
                    <p className="py-1 px-2 rounded-[40px]">
                    {tiempo}
                    </p>
                    <span>${precio}</span>
                </article>
            </article>
        </article>
    )
}   
export default PanelRituales;