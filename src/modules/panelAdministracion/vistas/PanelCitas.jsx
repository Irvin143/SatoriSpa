import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BotonFiltro } from '../../componentesPanel/buttons.jsx';

import iconLupa from "../../../assets/iconLupa.png";

import { InputBuscar } from "../../componentesPanel/inputs.jsx";

import { obtenerCitas } from "./citas/services/useCita.js";

const ESTILOS_ESTATUS = {
    Pendiente: "bg-amber-100 text-amber-800",
    Completada: "bg-emerald-100 text-emerald-800",
    Cancelada: "bg-red-100 text-red-700",
};

function claseEstatus(estatus) {
    return ESTILOS_ESTATUS[estatus] ?? "bg-gray-100 text-gray-700";
}

const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function formatearFecha(fechaISO) {
    if (!fechaISO) return "";

    const [anio, mes, dia] = fechaISO.split("-").map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const diffDias = Math.round((fecha - hoy) / (1000 * 60 * 60 * 24));

    if (diffDias === 0) return "Hoy";
    if (diffDias === 1) return "Mañana";

    return `${dia} ${MESES_CORTOS[mes - 1]} ${anio}`;
}

function filtrarCitas(citas, { estatusFiltro, servicioFiltro, busquedaCliente }) {
    return (citas ?? []).filter((cita) => {
        const coincideEstatus = estatusFiltro === "TODAS" || cita.estado === estatusFiltro;

        const coincideServicio =
            !servicioFiltro || cita.servicios?.nombre?.toLowerCase() === servicioFiltro.toLowerCase();

        const coincideBusqueda = (cita.nombreCliente ?? "")
            .toLowerCase()
            .includes(busquedaCliente.toLowerCase());

        return coincideEstatus && coincideServicio && coincideBusqueda;
    });
}

export default function PanelCitas({ btnAsideSelect }) {
    const [btnFiltroSelect, setBtnFiltroSelect] = useState("TODAS");
    const [servicioFiltro, setServicioFiltro] = useState("");
    const [busquedaCliente, setBusquedaCliente] = useState("");
    const [citas, setCitas] = useState(null);

    useEffect(() => {
        const fetchCitas = async () => {
            const result = await obtenerCitas();
            if (result.success) {
                setCitas(result.data);
            } else {
                console.error("Error al obtener las citas:", result.error);
            }
        };
        fetchCitas();
    }, []);

    const citasFiltradas = filtrarCitas(citas, {
        estatusFiltro: btnFiltroSelect,
        servicioFiltro,
        busquedaCliente,
    });

    const nombresServicios = [...new Set((citas ?? []).map((c) => c.servicios?.nombre).filter(Boolean))];

    const totalCitas = citas?.length ?? 0;
    const totalPendientes = (citas ?? []).filter((c) => c.estado === "Pendiente").length;
    const totalHoy = (citas ?? []).filter((c) => formatearFecha(c.fechaCita) === "Hoy").length;

    return (
        <section className="transition-all duration-300 p-5 lg:p-0 lg:mb-5 w-full">
            <h2 className="font-bold text-3xl ">Gestion de Citas</h2>
            <span>Visualice y administre todas las citas programadas en el santuario</span>

            {/* Resumen rápido */}
            <article className="grid grid-cols-3 gap-3 mt-6 mb-1 lg:max-w-md">
                <ResumenMetrica valor={totalCitas} etiqueta="Total" />
                <ResumenMetrica valor={totalPendientes} etiqueta="Pendientes" acento="text-amber-700" />
                <ResumenMetrica valor={totalHoy} etiqueta="Hoy" acento="text-[#655e57]" />
            </article>

            {/* Filtros para Mobile */}
            <nav className="flex my-7 px-3 py-1 gap-3 overflow-hidden overflow-x-auto whitespace-nowrap scrollbar-hide lg:hidden">
                <BotonFiltro texto="TODAS" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("TODAS")} />
                <BotonFiltro texto="Pendiente" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("Pendiente")} />
                <BotonFiltro texto="Completada" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("Completada")} />
                <BotonFiltro texto="Cancelada" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("Cancelada")} />
            </nav>

            {/* Buscador para mobile */}
            <article className="lg:hidden">
                <InputBuscar
                    placeholder="Buscar Cliente..."
                    value={busquedaCliente}
                    onChange={(e) => setBusquedaCliente(e.target.value)}
                />
            </article>

            {/* Filtros para Desktop */}
            <article className="hidden lg:flex justify-start items-center gap-5  px-5 py-5 rounded-[30px] backdrop-blur-xl border border-white/30 bg-white/10">
                <select
                    value={servicioFiltro}
                    onChange={(e) => setServicioFiltro(e.target.value)}
                    className="px-3 py-3 rounded-[10px] border border-white/40 bg-white/70 text-[#655e57] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#655e57]/30"
                >
                    <option value="">Servicio/Ritual</option>
                    {nombresServicios.map((nombre) => (
                        <option key={nombre} value={nombre}>{nombre}</option>
                    ))}
                </select>

                <select
                    value={btnFiltroSelect}
                    onChange={(e) => setBtnFiltroSelect(e.target.value)}
                    className="px-3 py-3 rounded-[10px] border border-white/40 bg-white/70 text-[#655e57] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#655e57]/30"
                >
                    <option value="TODAS">Estatus</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completada">Completada</option>
                    <option value="Cancelada">Cancelada</option>
                </select>

                <article className="relative flex-1">
                    <img src={iconLupa} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] opacity-60" />
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
                        value={busquedaCliente}
                        onChange={(e) => setBusquedaCliente(e.target.value)}
                        className="pl-10 py-3 shadow-sm rounded-[10px] text-[#655e57] w-full bg-white/70 border border-white/40 placeholder:text-[#655e57]/60 focus:outline-none focus:ring-2 focus:ring-[#655e57]/30"
                    />
                </article>

                <Link
                    to="/reservacion"
                    className="bg-[#655e57]/85 text-white py-3 px-6 rounded-[10px]
                    whitespace-nowrap hover:bg-[#655e57] hover:scale-105 hover:cursor-pointer transition-all duration-300"
                >
                    + Añadir nueva cita
                </Link>
            </article>

            {citas === null && (
                <p className="text-center py-10">Cargando citas...</p>
            )}

            {citas !== null && citasFiltradas.length === 0 && (
                <p className="text-center py-10 text-[#655e57]/70">No se encontraron citas con estos filtros.</p>
            )}

            {/* Cards para móvil */}
            <article className="my-5 text-[#655e57] lg:hidden">
                {citasFiltradas.map((cita, index) => (
                    <CardCita
                        key={index}
                        nombreCte={cita.nombreCliente}
                        estatus={cita.estado}
                        ritual={cita.servicios?.nombre}
                        fecha={cita.fechaCita}
                        horario={cita.hora}
                    />
                ))}
            </article>

            {/* Tabla */}
            {citasFiltradas.length > 0 && (
                <article className=" hidden lg:block shadow-md rounded-[20px] w-full overflow-hidden">
                    <table className="w-full text-[#655e57] border-collapse">
                        <thead>
                            <tr className="bg-[#655e57]/80 text-white text-left">
                                <th className="p-3 font-semibold">Nombre</th>
                                <th className="p-3 font-semibold">Ritual/Servicio</th>
                                <th className="p-3 font-semibold">Fecha</th>
                                <th className="p-3 font-semibold">Horario</th>
                                <th className="p-3 font-semibold">Estatus</th>
                                <th className="p-3 font-semibold">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {citasFiltradas.map((cita, index) => (
                                <RegistroTable
                                    key={index}
                                    nombreCte={cita.nombreCliente}
                                    estatus={cita.estado}
                                    ritual={cita.servicios?.nombre}
                                    fecha={cita.fechaCita}
                                    horario={cita.hora}
                                />
                            ))}
                        </tbody>
                    </table>
                </article>
            )}
        </section>
    );
}

function ResumenMetrica({ valor, etiqueta, acento = "text-[#655e57]" }) {
    return (
        <article className="bg-white/70 backdrop-blur-md rounded-[16px] border border-white/40 px-4 py-3 text-center shadow-sm">
            <p className={`text-2xl font-bold ${acento}`}>{valor}</p>
            <p className="text-xs text-[#655e57]/60">{etiqueta}</p>
        </article>
    );
}

function CardCita({ nombreCte, estatus, ritual, fecha, horario }) {
    return (
        <article className="flex flex-col w-full gap-1 p-5 bg-white/95 rounded-[20px] mb-5 shadow-sm">
            <article className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{nombreCte}</h2>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${claseEstatus(estatus)}`}>
                    {estatus}
                </span>
            </article>
            <span>{ritual}</span>
            <article className="flex items-center gap-2 text-sm text-[#655e57]/70">
                <span>{formatearFecha(fecha)}</span>
                <span>·</span>
                <span>{horario}</span>
            </article>
        </article>
    );
}

function RegistroTable({ nombreCte, estatus, ritual, fecha, horario }) {
    return (
        <tr className="hover:bg-[#f4f0ea]/50 transition-colors duration-150">
            <td className="p-3 font-medium">{nombreCte}</td>
            <td className="p-3">{ritual}</td>
            <td className="p-3">{formatearFecha(fecha)}</td>
            <td className="p-3">{horario}</td>
            <td className="p-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${claseEstatus(estatus)}`}>
                    {estatus}
                </span>
            </td>
            <td className="p-3">
                <span className="text-gray-300 text-sm" title="Próximamente">···</span>
            </td>
        </tr>
    );
}