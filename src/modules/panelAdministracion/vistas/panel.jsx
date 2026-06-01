import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

import "@fontsource/playfair-display";

import PanelRituales from '../vistas/PanelRituales.jsx';
import PanelCitas from '../vistas/PanelCitas.jsx';

import iconLupa from "../../../assets/iconLupa.png";
import fondoRituales from "../../../assets/Panels/fondoRituales.jpg";
import logoSatori from "../../../assets/logoSatori.jpeg";

import iconCalendario from "../../../assets/iconCalendario.png";
import iconCalendarioBlanco from "../../../assets/Panels/iconCalendarioBlanco.png";
import iconRituales from "../../../assets/panels/iconRitualAside.png";

function Panel() {

    const [btnAsideSelect,setBtnAsideSelect] = useState("CITAS");
    const [seccionSeleccionada, setSeleccionSeleccionada] = useState(1);
    
    return(
        <div
            className="flex items-start  lg:pl-0 text-[#655e57] bg-[#f4f0e9]/80 min-h-screen">
            <aside
                className="
                    fixed bottom-0 flex 
                    text-sm 
                    bg-white
                    gap-5
                    items-center
                    justify-center
                    p-3
                    z-1
                    w-full
                    border border-white/30
                    lg:flex-col
                    lg:justify-between
                    lg:w-auto 
                    lg:px-4 lg:py-5 
                    lg:shadow-[6px_0_12px_-4px_rgba(0,0,0,0.15)]
                    lg:sticky lg:top-0 lg:left-0 lg:h-screen
                
                "
            >
                <article className='px-2 py-3 flex justify-between w-full items-center lg:flex-col  gap-5'>
                    <img src={logoSatori} alt="Logo Satori" className='hidden lg:flex w-[60px] ' />
                    <BotonAside texto="CITAS" imagen={iconCalendario} imagenSecundario = {iconCalendarioBlanco} btnSeleccionado={btnAsideSelect} onClick={() => setBtnAsideSelect("CITAS")} />
                    <BotonAside texto="RITUALES" imagen={iconRituales} imagenSecundario = {iconRituales} btnSeleccionado={btnAsideSelect} onClick={() => setBtnAsideSelect("RITUALES")} />
                    <BotonAside texto="SANTUARIO" imagen={iconCalendario} imagenSecundario = {iconCalendarioBlanco} btnSeleccionado={btnAsideSelect} onClick={() => setBtnAsideSelect("SANTUARIO")} />
                    <BotonAside texto="EMPLEADOS" imagen={iconCalendario} imagenSecundario = {iconCalendarioBlanco} btnSeleccionado={btnAsideSelect} onClick={() => setBtnAsideSelect("EMPLEADOS")} />
                    <BotonAside texto="CONFIGURACION" imagen={iconCalendario} imagenSecundario = {iconCalendarioBlanco} btnSeleccionado={btnAsideSelect} onClick={() => setBtnAsideSelect("CONFIGURACION")} />
                </article>
                <article className='hidden lg:flex lg:flex-col lg:items-center'>
                    <img src={logoSatori} alt="Logo Satori" className='w-[60px] ' />
                    <Link to="/principal">Cerrar Sesion</Link>
                </article>
            </aside>
            
                
            <article className='flex flex-col mt-5 lg:px-10  items-center justify-center w-full'>
                <header className='w-full bg-white'>
                    <h1 className='text-2xl text-center font-bold '>Panel de Administración</h1>
                </header>

                <Outlet/>

            </article>
        </div>
    );
}

function BotonAside({ texto, imagen, imagenSecundario, btnSeleccionado, onClick }){
    return (
        <Link
            to = {`/administracion/${texto}`}
            onClick={onClick}
            className={`
                flex flex-col py-3 items-center w-full lg:py-0 lg:pr-20 lg:pl-2 lg:flex-row text-left rounded-full
                text-xs
                hover:cursor-pointer 
                transition-all duration-300
                ${
                btnSeleccionado === texto
                    ? "font-bold shadow-black/20 scale-105 bg-[#655e57]/90 text-white"
                    : "hover:scale-105 hover:bg-[#655e57]/50 hover:text-white hover:font-bold"
                }
            `}
            >
                <img src={btnSeleccionado === texto ? imagenSecundario : imagen} alt=""  className={`w-[50px] h-[50px]  rounded-[15px] p-2 `}/>
                {texto}
        </Link>
    );
}


export default Panel;