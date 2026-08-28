import { useState, useEffect } from "react";

import fondoCitas from "../../../assets/fondoCitas.png";

import { BotonFiltro } from '../../componentesPanel/buttons.jsx';
import { InputBuscar } from "../../componentesPanel/inputs.jsx";

import { obtenerRituales, obtenerCategorias } from '../../../utils/use.js';

import { filtrarServicios } from '../../../Components.jsx';

import { Link } from "react-router-dom";

export default function VerServicios() {
    const [btnFiltroSelect, setBtnFiltroSelect] = useState("Todos");
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [servicios, setServicios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const cargarServicios = async () => {
            setCargando(true);
            setError(null);

            const result = await obtenerRituales();

            if (result.success) {
                setServicios(result.data);
                console.log("Servicios obtenidos:", result.data);
            } else {
                setError(result.error ?? "No se pudieron cargar los servicios.");
            }

            setCargando(false);
        };

        const fetchCategorias = async () => {
            const result = await obtenerCategorias();
            if (result.success) {
                setCategorias(result.data);
            } else {
                console.error("Error al obtener categorías:", result.error);
            }
        };

        fetchCategorias();
        cargarServicios();
    }, []);

    const serviciosFiltrados = filtrarServicios(servicios, {
        categoriaSeleccionada: btnFiltroSelect,
        busqueda,
        valorSinFiltro: "Todos", // o "TODOS", según lo que uses en ese botón
    });

    return (
        <section className="relative min-h-screen pt-20 lg:pt-10">
            {/* FONDO */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${fondoCitas})` }}
            ></div>

            {/* CONTENIDO */}
            <main className="relative text-[#655e57] px-5">
                <div className="flex  xl:mx-10  items-center justify-between">
                    <SubTitulo titulo="Rituales" id="rituales" />
                    <Link
                        to="/reservacion"
                        type="button"
                        className="self-start shrink-0 rounded-full 
                        bg-[#655e57] 
                        text-white transition 
                        px-6 py-2
                        hover:bg-[#4d473f] focus-visible:outline focus-visible:outline-2 
                        focus-visible:outline-offset-2 focus-visible:outline-[#655e57] sm:self-center
                        cursor-pointer"
                    >
                        Reservar cita
                    </Link>
                </div>

                <article className="lg:flex justify-center items-center gap-5 mb-5 lg:gap-10 lg:mx-10">
                    <InputBuscar
                        placeholder="Buscar servicio..."
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <article className="flex justify-center px-5 py-1 mt-5 border-1 rounded-[20px] lg:m-0">
                        <BotonFiltro
                            texto="Todos"
                            btnSeleccionado={btnFiltroSelect}
                            onClick={() => {
                                setBtnFiltroSelect("Todos");
                            }}
                        />
                        {categorias.map((categoria) => (
                            <BotonFiltro
                                key={categoria.id}
                                texto={categoria.nombre}
                                btnSeleccionado={btnFiltroSelect}
                                onClick={() => setBtnFiltroSelect(categoria.nombre)}
                            />
                        ))}
                    </article>
                </article>

                {cargando && <SkeletonServicios />}

                {!cargando && error && (
                    <p className="text-center text-red-600 py-10">{error}</p>
                )}

                {!cargando && !error && serviciosFiltrados.length === 0 && (
                    <p className="text-center py-10">
                        No se encontraron servicios.
                    </p>
                )}

                {!cargando && !error && serviciosFiltrados.length > 0 && (
                    <article className="lg:grid lg:grid-cols-3 lg:gap-6 lg:justify-items-center lg:items-start pb-30">
                        {serviciosFiltrados.map((servicio) => (
                            <CardServicio
                                key={servicio.id}
                                id={servicio.id}
                                nombre={servicio.nombre}
                                descripcionCorta={servicio.descripcion}
                                tiempo={servicio.duracion}
                                categoria={servicio.tipos_servicio.nombre}
                                precio={servicio.precio}
                                img={servicio.imagen}
                                activo={servicioSeleccionado === servicio.id}
                                onSeleccionar={() => setServicioSeleccionado(servicio.id)}
                            />
                        ))}
                    </article>
                )}
            </main>
        </section>
    );
}

function SubTitulo({ titulo, id, subtitulo = "", className = "" }) {
    return (
        <article className={`mb-5 ${className}`} id={id}>
            <p className="text-[#655e57] italic mb-0 lg:text-[1.2em]">{subtitulo}</p>
            <h2 className="text-[#615c56] font-['Trebuchet_MS'] font-bold my-[10px] lg:text-[2.5em]">
                {titulo}
            </h2>
            <hr className="border-none h-px bg-[rgba(128,128,128,1)] w-[60px] ml-[10px]" />
        </article>
    );
}

function CardServicio({
    id,
    nombre,
    descripcionCorta,
    activo,
    onSeleccionar,
    tiempo,
    categoria,
    precio,
    img,
}) {
    const [expandido, setExpandido] = useState(false);

    return (
        <article
            key={id}
            className="flex-shrink-0 mx-auto my-5 rounded-[30px] transition-all duration-300 bg-white/50 lg:flex-row lg:w-[80%]"
        >
            <article
                className={`h-full rounded-[30px] flex flex-col backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF]
                ${activo
                    ? 'bg-[#FFF]/20 text-[#655e57] border-2 border-[#655e57] shadow-xl'
                    : 'text-[#655e57] bg-[#ebe1d7]/50 border-white border-1'}`}
            >
                <div className="relative overflow-hidden rounded-t-[30px] group">
                    <img
                        src={img}
                        alt={nombre}
                        className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <article className="absolute top-3 left-3 flex text-[0.8em] justify-center items-center gap-2">
                        <span className="bg-[#f5f0e9] py-1 px-2 rounded-[40px]">
                            {categoria}
                        </span>
                        <p className="bg-[#f5f0e9] py-1 px-2 rounded-[40px]">
                            {tiempo} min
                        </p>
                    </article>
                </div>

                <article className="flex justify-center items-center mt-3">
                    <span className="text-[1.2em] font-bold">{nombre}</span>
                </article>

                <div
                    className={`flex-1 overflow-hidden transition-all duration-200 px-5 py-2
                        ${expandido ? "max-h-96" : "max-h-14"}`}
                >
                    <p className="text-[0.9em]">{descripcionCorta}</p>
                </div>

                <article className="px-5 pb-5 mt-auto">
                    <button
                        type="button"
                        className="border-b text-[#655e57] hover:cursor-pointer hover:text-black transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        onClick={() => setExpandido(!expandido)}
                    >
                        {expandido ? "Ver menos" : "Ver más"}
                    </button>
                    <Link
                        to={`/reservacion/horario/${id}`}
                        type="button"
                        onClick={onSeleccionar}
                        className="block mt-3 w-full text-center rounded-full bg-[#655e57] px-6 py-2 text-white transition hover:bg-[#4d473f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#655e57]"
                    >
                        Reservar cita
                    </Link>
                </article>
            </article>
        </article>
    );
}

function SkeletonServicios() {
    return (
        <article className="grid grid-cols-1 gap-8 lg:mx-10 mt-5 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-[25px] p-6 shadow-md animate-pulse">
                    <div className="w-full h-40 bg-gray-200 rounded-[15px] mb-4" />
                    <div className="h-5 bg-gray-200 rounded-full w-[60%] mb-3" />
                    <div className="h-3 bg-gray-200 rounded-full w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded-full w-[80%] mb-4" />
                    <div className="h-5 bg-gray-200 rounded-full w-[30%]" />
                </div>
            ))}
        </article>
    );
}