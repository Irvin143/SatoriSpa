import { useState } from "react";
import { BotonFiltro } from '../componentesPanel/buttons.jsx';

import iconLupa from "../../../assets/IconLupa.png";

import { InputBuscar } from "../componentesPanel/inputs.jsx";

export default function PanelCitas({btnAsideSelect}){
    
    const [btnFiltroSelect ,setBtnFiltroSelect] = useState("TODAS");

    return(
        <section className={`transition-all duration-300 p-5 lg:p-0 w-full`}>
            <h2 className = "font-bold text-3xl my-5">
                Gestion de Citas
            </h2>
            <span>Visualice y administre todas las citas programadas en el santuario</span>
            
            {/*Filtros para Mobile*/}
            <nav className='
                flex
                my-7
                p-1
                gap-3
                overflow-hidden
                overflow-x-auto
                whitespace-nowrap
                scrollbar-hide
                lg:hidden
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
            {/*Buscador para mobile*/}
            <InputBuscar placeholder="Buscar Cliente..." />

            {/*Filtros para Desktop*/}
            <article className='hidden 
                lg:flex 
                justify-start items-center gap-5 
                my-7 px-5
                rounded-[30px]
                backdrop-blur-xl
                border border-white/30 
                bg-white/10'>
                <InputFiltro
                    opciones={["John Doe", "Jane Smith", "Alice "]}
                    placeholder="Servicio/Ritual"
                    nombreLista="rituales"
                />
                <InputFiltro
                    opciones={["Completada", "Cancelada", "Pendiente"]}
                    placeholder="Estatus"
                    nombreLista="Estatus"
                />
                <InputFiltro
                    opciones={["JohnDoe", "", "Alice "]}
                    placeholder="Filtrar por cliente"
                    nombreLista="clientes"
                />
                <article className='relative w-full mt-5 mb-5 '>
                    <img src={iconLupa} alt="Buscar" className='absolute left-3 top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]' />
                    <input type="text" placeholder="Buscar Cliente..." className='pl-10 py-3 shadow-md rounded-[10px] text-[#655e57] w-full bg-white/35 placeholder:text-[#655e57]' />
                </article>
                <button className='bg-[#655e57]/85 w-full text-white py-2 px-4 rounded-[10px] hover:bg-[#655e57] hover:scale-105 hover:cursor-pointer transition-all duration-300'>
                    Añadir nueva cita
                </button>
            </article>

            {/*Card para móvil*/}
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
            <article className="my-5 hidden lg:block shadow-md rounded-[20px] w-full overflow-hidden">
                <table className="w-full text-[#655e57] border-collapse-fixed">
                    <thead >
                        <tr className="bg-[#f4f0ea]/80 backdrop-blur-md">
                            <th className=" p-2">Nombre</th>
                            <th className=" p-2">Ritual/Servicio</th>
                            <th className=" p-2">Fecha</th>
                            <th className=" p-2">Horario</th>
                            <th className=" p-2">Estatus</th>
                            <th className=" p-2">Acciones</th>
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
        <tr className="">
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

function InputFiltro({opciones, placeholder, nombreLista}){
    return(
        <article className="
            px-2 py-3
            rounded-[10px]
            backdrop-blur-xl
            border border-white/30 
            bg-[#eee]/80
            shadow-[0_6px_20px_rgba(0,0,0,0.12)]
            "
        >
            <input list={nombreLista} placeholder={placeholder}  />

            <datalist id={nombreLista}>
                {opciones.map((opcion, index) => (
                    <option key={index} value={opcion} />
                ))}
            </datalist>
        </article>
    )
}