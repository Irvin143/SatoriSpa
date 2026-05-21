import { useState } from "react";
import { BotonFiltro } from '../componentesPanel/buttons.jsx';

import iconLupa from "../../assets/iconLupa.png";

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
                <article className='relative w-full mt-5 mb-5'>
                    <img src={iconLupa} alt="Buscar" className='absolute left-3 top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]' />
                    <input type="text" placeholder="Buscar ritual..." className='pl-10 py-3  rounded-[10px] text-white w-full bg-white/35' />
                </article>
                
                <article className="my-5 text-[#655e57] lg:hidden">
                    <CardCita 
                        nombreCte="John Doe"
                        estatus="Cancelada"
                        ritual="Ritual de Bienvenida"
                        fecha="2023-10-15"
                        horario="10:00 AM"
                    />
                </article> 
                
                {/*Tabla*/}
                <article className="my-5 ">
                    <table className="w-full text-[#655e57] border-collapse-fixed">
                        <thead >
                            <tr className="bg-[#f4f0ea]/80 backdrop-blur-md">
                                <th className="border p-2">Nombre</th>
                                <th className="border p-2">Ritual/Servicio</th>
                                <th className="border p-2">Fecha</th>
                                <th className="border p-2">Horario</th>
                                <th className="border p-2">Estatus</th>
                                <th className="border p-2">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            <RegistroTable
                                nombreCte="Jane Smith"
                                estatus="Pendiente"
                                ritual="Ritual de Relajación"
                                fecha="2023-10-16"
                                horario="2:00 PM"
                            />
                            <RegistroTable
                                nombreCte="Alice Johnson"
                                estatus="Completada"
                                ritual="Ritual de Energización"
                                fecha="2023-10-17"
                                horario="11:00 AM"
                            />
                            <RegistroTable
                                nombreCte="Alice Johnson"
                                estatus="Cancelada"
                                ritual="Ritual de Energización"
                                fecha="2023-10-17"
                                horario="11:00 AM"
                            />
                        </tbody>
                    </table>
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

function RegistroTable({nombreCte, estatus, ritual, fecha, horario}){
    return(
        <tr className="border-b">
            <td className="pl-2 ">{nombreCte}</td>
            <td className="pl-2">{ritual}</td>
            <td className="pl-2">{fecha}</td>
            <td className="pl-2">{horario}</td>
            <td className=" py-3">
                <article className={` ${estatus === "Pendiente" ? "bg-yellow-500" : estatus === "Completada" ? "bg-green-500" :estatus === "Cancelada" ? "bg-red-500" : "bg-gray-500"} 
                                    px-3 rounded-full inline-block text-black`} >
                    {estatus}
                </article>
            </td>
            <td></td>
        </tr>
    );
}