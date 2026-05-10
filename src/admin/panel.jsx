import { React } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import "@fontsource/playfair-display";

import PanelRituales from './Paneles/PanelRituales.jsx';


function Panel() {
    return(
        <div className='flex flex-col items-center p-8 text-[#655e57] bg-[#f4f0ea] '>
            <header>
                <h1 className='text-2xl font-bold mb-10'>Panel de Administración</h1>
            </header>

            <PanelRituales></PanelRituales>

            <article className={`fixed bottom-0  text-[#655e57] w-full pb-2 
            flex  items-center justify-center bg-[#f4f0ea]/80 backdrop-blur-md rounded-[25px] border-1 border-white lg:hidden`}>
                <BotonSticky texto={"Rituales"} imagen={"https://cdn-icons-png.flaticon.com/512/747/747376.png"}/>
                <BotonSticky texto={"Reservaciones"} imagen={"https://cdn-icons-png.flaticon.com/512/747/747376.png"}/>
                <BotonSticky texto={"Servicios"} imagen={"https://cdn-icons-png.flaticon.com/512/747/747376.png"}/>
            </article>
        </div>
    );
}

function BotonSticky({ texto, imagen}){
    return(
        <article>
            <button className="flex flex-col items-center gap-2 mb-2 p-4 w-full rounded-[25px] ">
                <img src={imagen} alt="" className='w-[35px]' />
                <span>{texto}</span>
            </button>
        </article>
    );
}
export default Panel;