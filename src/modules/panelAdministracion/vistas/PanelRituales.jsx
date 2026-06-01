import { React } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import "@fontsource/playfair-display";

import iconLupa from "../../../assets/iconLupa.png";
import iconLapiz from "../../../assets/iconLapiz.webp";
import iconEliminar from "../../../assets/iconBasura.png";

import { BotonFiltro } from '../componentesPanel/buttons.jsx';
import { InputBuscar } from "../componentesPanel/inputs.jsx";

function PanelRituales({btnAsideSelect}) {
    
    const [btnFiltroSelect ,setBtnFiltroSelect] = useState("TODOS");

    return(
        <section className={`text-[#655e57]  w-full flex flex-col items-center justify-start p-5`}>
            <article className='lg:flex lg:items-center lg:justify-between lg:w-full lg:mb-10'>
                <article>
                    <h2 className='font-bold text-3xl my-5'>Catalogo de Rituales</h2>
                    <span>Configure las experiencias sensoriales del santuario, gestionando tiempos, esencias y la armonia en cada sesion</span>
                </article>
                <button className='bg-[#655e57]/80 text-white  w-full py-3 rounded-[10px] text-sm font-bold mt-5 hover:cursor-pointer hover:bg-[#655e57] hover:scale-105 transition-all duration-300 lg:w-auto lg:mt-0 lg:px-10 lg:mr-10'>
                    + NUEVO RITUAL
                </button>
            </article>

            <article
                className='lg:bg-white/10
                rounded-[30px]
                lg:backdrop-blur-xl
                lg:border border-white/30
                lg:py-2' 

            >
                <article className='lg:flex lg:items-center lg:justify-center gap-10 mb-10'>
                    
                    <InputBuscar placeholder="Buscar ritual..." />
                    <article className='flex justify-center  gap-1 p-1 border-3 border-white rounded-[50px] '>
                        <BotonFiltro texto="TODOS" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("TODOS")} />
                        <BotonFiltro texto="MASAJES" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("MASAJES")} />
                        <BotonFiltro texto="FACIALES" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("FACIALES")} />
                    </article>
                </article>

                <article className="lg:grid lg:grid-cols-3 lg:gap-15 lg:px-2 lg:max-h-[900px] lg:overflow-y-auto overflow-hidden">
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


function CardServicio({ id, nombre, descripcion, onSeleccionar, tiempo = "60 min", categoria = "Masaje", precio = "80", img = iconLupa }) {
    return (
        <article
        key={id}
        className=" mx-auto bg-white/80 rounded-[30px]  flex flex-col 
                    mb-10 
                    lg:mb-0 
                    backdrop-blur-md transition-all duration-300 
                    shadow-md
                    hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF] lg:mt-10 ">

            <article className={`rounded-[30px] flex flex-col px-6 py-2 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF] `}>
            
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
                <article className='flex items-center  justify-between'>
                    <span className="text-[1.2em] py-2 mt-3 font-bold w-[60%]">{nombre}</span>
                    <article className='flex mr-3 gap-6 w-[30%] lg:px-5 lg:m-0 lg:w-[50%]  justify-end '>
                        <button className="flex  group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
                            <img src={iconLapiz} alt="Editar" className='w-[20px] h-[20px]' />
                        </button>
                        <button className="flex  group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
                            <img src={iconEliminar} alt="Eliminar" className='w-[20px] h-[20px]' />
                        </button>
                    </article>
                </article>
                <p className="text-[0.9em]   py-2">{descripcion}</p>   
                <article className="flex gap-5 items-center mb-5  text-sm
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