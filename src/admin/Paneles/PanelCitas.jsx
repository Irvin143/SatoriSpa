import { useState } from "react";
import { BotonFiltro } from '../componentesPanel/buttons.jsx';

import puntoVerde from "../../assets/panels/puntoVerde.png";

export default function PanelCitas({btnAsideSelect}){
    
    const [btnFiltroSelect ,setBtnFiltroSelect] = useState("TODAS");

    return(
        <section className={`${btnAsideSelect === 'CITAS' ? 'block' : 'hidden'} p-5 rounded-[30px] shadow-lg transition-all duration-300 overflow-hidden w-full`}>
                <span>Visualice y administre todas las citas programadas en el santuario</span>
                
                <nav className='
                    flex
                    lg:justify-center
                    my-7
                    p-1
                    lg:w-auto
                    gap-3
                    overflow-hidden
                    overflow-x-auto
                    whitespace-nowrap
                    scrollbar-hide
                '>
                    <BotonFiltro 
                        texto="TODAS"
                        btnSeleccionado={btnFiltroSelect}
                        onClick={() => setBtnFiltroSelect("TODAS")}
                    />

                    <BotonFiltro 
                        texto="PENDIENTES"
                        btnSeleccionado={btnFiltroSelect}
                        onClick={() => setBtnFiltroSelect("PENDIENTES")}
                    />

                    <BotonFiltro 
                        texto="COMPLETADAS"
                        btnSeleccionado={btnFiltroSelect}
                        onClick={() => setBtnFiltroSelect("COMPLETADAS")}
                    />
                    <BotonFiltro 
                        texto="CANCELADAS"
                        btnSeleccionado={btnFiltroSelect}
                        onClick={() => setBtnFiltroSelect("CANCELADAS")}
                    />
                </nav>
                <input type="text" placeholder="Buscar cliente o ritual" className='pl-10 py-3  rounded-[10px] text-white w-full bg-white/35' />
                <article className="my-5 text-[#655e57]">
                    <CardCita 
                        nombreCte="John Doe"
                        estatus="Cancelada"
                        ritual="Ritual de Bienvenida"
                        fecha="2023-10-15"
                        horario="10:00 AM"
                    />
                </article>

        </section>
    );
}

function CardCita({nombreCte, estatus, ritual, fecha, horario}){
    return(
        <article className='flex flex-col w-full gap-1 p-5 bg-white/95 rounded-[20px] mb-5 '>
            <article className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{nombreCte}</h2>
                <article className="flex items-center gap-2">
                    <article className={`w-4 h-4 rounded-full ${estatus === "Pendiente" ? "bg-yellow-500" : estatus === "Completada" ? "bg-green-500" :estatus === "Cancelada" ? "bg-red-500" : "bg-gray-500"}`} />
                    <span className="text-sm font-medium">{estatus}</span>
                </article>
            </article>
            <span>{ritual}</span>
            <span>{fecha}</span>
            <span>{horario}</span>
        </article>
    );
}