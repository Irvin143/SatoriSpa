import { React } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import "@fontsource/playfair-display";

import iconLupa from "../../assets/iconLupa.png";
import iconLapiz from "../../assets/iconLapiz.webp";
import iconEliminar from "../../assets/iconBasura.png";

function PanelRituales() {
    
    const [btnFiltroSelect ,setBtnFiltroSelect] = useState("TODOS");

    return(
        <section className='text-white w-full flex flex-col items-center justify-start p-5'> 
            <article className='lg:flex lg:items-center lg:justify-between lg:w-full lg:mb-10'>
                <article>
                    <h2 className='font-bold text-3xl my-5'>Catalogo de Rituales</h2>
                    <span>Configure las experiencias sensoriales del santuario, gestionando tiempos, esencias y la armonia en cada sesion</span>
                </article>
                <button className='bg-white text-[#655e57] w-full py-3 rounded-[10px] text-sm font-bold mt-5 hover:cursor-pointer hover:bg-[#f4f0ea]/70 hover:scale-105 transition-all duration-300 lg:w-auto lg:mt-0 lg:px-10 lg:mr-10'>
                    + NUEVO RITUAL
                </button>
            </article>

            <article
                className='lg:bg-white/10
                lg:backdrop-blur-xl
                lg:border border-white/30 
                rounded-[30px]
                p-5
                text-[#655e57]'
            >
                <article className='lg:flex lg:items-center lg:justify-center gap-10 mb-10'>
                    <article className='relative w-full mt-5 mb-5'>
                        <img src={iconLupa} alt="Buscar" className='absolute left-3 top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]' />
                        <input type="text" placeholder="Buscar ritual..." className='pl-10 py-3  rounded-[10px] text-white w-full bg-white/35' />
                    </article>
                    <article className='flex lg:justify-center  gap-1 p-1 border-1 border-white rounded-[50px] '>
                        <BotonFiltro texto="TODOS" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("TODOS")} />
                        <BotonFiltro texto="MASAJES" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("MASAJES")} />
                        <BotonFiltro texto="FACIALES" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("FACIALES")} />
                    </article>
                </article>

                
                <article className="lg:grid lg:grid-cols-3 lg:gap-15 lg:max-h-[900px] lg:overflow-y-auto">
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
            </article>
        </section>
    );
}   


function BotonFiltro({ texto, btnSeleccionado, onClick }) {
    return(
        <button 
            onClick={onClick}
            className={`
                px-7 py-2 rounded-[50px] text-xs font-bold
                hover:cursor-pointer  transition-all duration-300
                ${
                    btnSeleccionado === texto
                        ? "bg-white/80 text-[#655e57] shadow-xl shadow-black/40"
                        : "hover:scale-110"
                }
            `}
        >
            {texto}
        </button>
    );
}

function CardServicio({ id, nombre, descripcion, onSeleccionar, tiempo = "60 min", categoria = "Masaje", precio = "80", img = iconLupa }) {
    return (
        <article
        key={id}
        className="w-[90%] mx-auto bg-white/80 rounded-[30px]  flex flex-col mb-10 lg:mb-0 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF] lg:mt-10 ">

            <article className={`rounded-[30px] flex flex-col  backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF] `}>
            
                {/* <div className="relative overflow-hidden rounded-t-[30px] group">
                    <img 
                    src={img} 
                    alt="" 
                    className="h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                <article className="absolute top-3 left-3 flex text-[0.8em] justify-center items-center gap-2">
                    <span className="bg-[#f5f0e9] py-1 px-2 rounded-[40px]">
                    {categoria}
                    </span>
                </article>
                </div> */}
                <article className='flex items-center px-6 justify-between'>
                    <span className="text-[1.2em] py-2 mt-3 font-bold w-[60%]">{nombre}</span>
                    <article className='flex gap-6 w-[30%] lg:px-5 lg:w-[50%]  lg:justify-end '>
                        <button className="flex  group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
                            <img src={iconLapiz} alt="Editar" className='w-[20px] h-[20px]' />
                        </button>
                        <button className="flex  group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
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