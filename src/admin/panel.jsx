import { useState } from 'react';
import { Link } from "react-router-dom";

import "@fontsource/playfair-display";

import iconLupa from "../assets/iconLupa.png";
import PanelRituales from './Paneles/PanelRituales.jsx';
import fondoRituales from "../assets/Panels/fondoRituales.jpg";
import logoSatori from "../assets/logoSatori.jpeg";

function Panel() {

    const [btnAsideSelect,setBtnAsideSelect] = useState("");
    
    return(
        <div
            className="flex lg:pl-0 text-white  bg-cover bg-center min-h-screen"
            style={{ backgroundImage: `url(${fondoRituales})` }}
        >
            <aside
                className="
                    fixed bottom-0 flex 
                    text-sm text-[#655e57]
                    items-center 
                    bg-[#f4f0ea]/80 backdrop-blur-md
                    z-1
                    w-full
                    border border-white/30
                    lg:static lg:flex-col
                    lg:w-auto 
                    lg:px-4 lg:py-5 
                    lg:text-white
                    lg:backdrop-blur-xl
                    lg:border lg:border-white/30 
                    lg:bg-white/10
                "
            >
                <img src={logoSatori} alt="Logo Satori" className='hidden lg:flex w-[60px] ' />
                <BotonAside texto="CITAS" btnSeleccionado={btnAsideSelect} onClick={() => setBtnAsideSelect("CITAS")} />
                <BotonAside texto="RITUALES" btnSeleccionado={btnAsideSelect} onClick={() => setBtnAsideSelect("RITUALES")} />
                <BotonAside texto="SANTUARIO" btnSeleccionado={btnAsideSelect} onClick={() => setBtnAsideSelect("SANTUARIO")} />
            </aside>
            
                
            <article className='flex flex-col lg:px-15 items-center justify-center w-full'>
                <header>
                    <h1 className='text-2xl font-bold'>Panel de Administración</h1>
                </header>

                <PanelRituales/>

            </article>
        </div>
    );
}

function BotonAside({ texto, btnSeleccionado, onClick }){
    return (
        <button
            onClick={onClick}
            className={`
                flex flex-col justify-center items-center w-full py-3 text-left rounded-[10px]
                text-xs
                hover:cursor-pointer 
                transition-all duration-300
                ${
                btnSeleccionado === texto
                    ? "font-bold shadow-black/20 scale-105 "
                    : "hover:scale-105"
                }
            `}
            >
                <img src={iconLupa} alt=""  className={`w-[40px] mb-2 rounded-[15px] p-2 ${btnSeleccionado === texto ? "bg-[#ebe1d7]/60" : " "}`}/>
                {texto}
        </button>
    );
}


export default Panel;