import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "@fontsource/playfair-display";

import iconLupa from "../../../assets/iconLupa.png";
import iconLapiz from "../../../assets/panels/iconLapiz.png";
import iconEliminar from "../../../assets/panels/iconBasura.png";

import { BotonFiltro } from '../../componentesPanel/buttons.jsx';
import { InputBuscar } from "../../componentesPanel/inputs.jsx";
import FormularioServicio from "./Rituales/ModificarRitual.jsx";
import Modal from "./Rituales/Modal.jsx";

import { obtenerCategorias, obtenerRituales  } from '../../../utils/use.js';
import { filtrarServicios } from '../../../Components.jsx';

function PanelRituales({ btnAsideSelect }) {
    const [btnFiltroSelect, setBtnFiltroSelect] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);
    const [ritalAEliminar, setRitualAEliminar] = useState(null);
    const [ritualAEditar, setRitualAEditar] = useState(null);
    const [servicios, setServicios] = useState(null);
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {
        const fetchServicios = async () => {
            const { success, data, error } = await obtenerRituales();
            if (success) {
                setServicios(data);
            } else {
                console.error("Error al obtener servicios:", error);
            }
        };

        const fetchCategorias = async () => {
            const { success, data, error } = await obtenerCategorias();
            if (success) {
                setCategorias(data);
            }
            else {
                console.error("Error al obtener categorías:", error);
            }
        };
        fetchCategorias();

        fetchServicios();
    }, []);

    const handleGuardarRitual = (nuevoRitual) => {
        setServicios((previos) => [nuevoRitual, ...(previos ?? [])]);
        setModalAbierto(false);
    };

    const handleEliminarExitoso = (idEliminado) => {
        setServicios((previos) => (previos ?? []).filter((servicio) => servicio.id !== idEliminado));
        setRitualAEliminar(null);
    };

    const handleEditarExitoso = (ritualActualizado) => {
        setServicios((previos) =>
            (previos ?? []).map((servicio) =>
                servicio.id === ritualActualizado.id ? ritualActualizado : servicio
            )
        );
        setRitualAEditar(null);
    };

    // Filtra por categoría seleccionada y por texto de búsqueda sobre el nombre del ritual
    const serviciosFiltrados = filtrarServicios(servicios, {
        categoriaSeleccionada: btnFiltroSelect,
        busqueda,
        valorSinFiltro: "Todos", // o "TODOS", según lo que uses en ese botón
    });

    return (
        <section className="text-[#655e57] w-full flex flex-col items-center justify-start px-5 lg:p-0">
            <article className='lg:flex lg:items-center lg:justify-between lg:w-full lg:mb-10'>
                <article>
                    <h2 className='font-bold text-3xl'>Catalogo de Rituales</h2>
                    <span>Configure las experiencias sensoriales del santuario, gestionando tiempos, esencias y la armonia en cada sesion</span>
                </article>
                <button
                    type="button"
                    className='bg-[#655e57]/80 text-white  
                    w-full py-3 rounded-[10px] text-sm font-bold mt-5 
                    hover:cursor-pointer hover:bg-[#655e57] hover:scale-105 
                    transition-all duration-300 lg:w-auto lg:mt-0 lg:px-10 lg:mr-10'
                    onClick={() => setModalAbierto(true)}
                >
                    + NUEVO RITUAL
                </button>
            </article>

            <article
                className='lg:bg-white/10
                rounded-[30px]
                lg:backdrop-blur-xl
                lg:border border-white/30
                lg:py-2
                lg:w-full'
            >
                <article className='lg:flex lg:items-center lg:justify-center gap-10 mb-10 pt-5 lg:p-0'>
                    <InputBuscar
                        placeholder="Buscar ritual..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <article className='flex justify-center mt-5 gap-1 p-1 border-3 border-white rounded-[50px] lg:m-0'>
                        <BotonFiltro texto="Todos" btnSeleccionado={btnFiltroSelect} onClick={() => setBtnFiltroSelect("Todos")} />
                        {categorias.map((categoria) => (
                            <BotonFiltro
                                key={categoria.id}
                                texto={categoria.nombre}
                                btnSeleccionado={btnFiltroSelect}
                                onClick={() => setBtnFiltroSelect(categoria.nombre)}
                            />
                            ))
                        }
                    </article>
                </article>

                {servicios === null && (
                    <p className="text-center py-10">Cargando rituales...</p>
                )}

                {servicios !== null && serviciosFiltrados.length === 0 && (
                    <p className="text-center py-10">No se encontraron rituales.</p>
                )}

                <article className="lg:grid lg:grid-cols-3 lg:gap-15 lg:px-2  lg:py-5  lg:overflow-y-auto overflow-hidden">
                    {serviciosFiltrados.map((servicio) => (
                        <CardServicio
                            key={servicio.id}
                            servicio={servicio}
                            onEliminar={() => setRitualAEliminar(servicio)}
                            onEditar={() => setRitualAEditar(servicio)}
                        />
                    ))}
                </article>
            </article>

            {modalAbierto && (
                <Modal titulo="Nuevo Ritual" onClose={() => setModalAbierto(false)}>
                    <FormularioServicio onSuccess={handleGuardarRitual} />
                </Modal>
            )}

            {ritalAEliminar && (
                <Modal titulo="Eliminar Ritual" onClose={() => setRitualAEliminar(null)}>
                    <FormularioServicio
                        modo="eliminar"
                        datosIniciales={ritalAEliminar}
                        onSuccess={handleEliminarExitoso}
                    />
                </Modal>
            )}

            {ritualAEditar && (
                <Modal titulo="Editar Ritual" onClose={() => setRitualAEditar(null)}>
                    <FormularioServicio
                        modo="editar"
                        datosIniciales={ritualAEditar}
                        onSuccess={handleEditarExitoso}
                    />
                </Modal>
            )}
        </section>
    );
}

function CardServicio({ servicio, onEliminar, onEditar }) {
    const { nombre, descripcion, duracion, precio } = servicio;

    return (
        <article
            className="mx-auto bg-white/90 rounded-[30px] flex flex-col 
                mb-10 
                lg:mb-0 
                backdrop-blur-md transition-all duration-300 
                shadow-md
                hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF]  lg:w-full"
        >
            <article className="rounded-[30px]  flex flex-col px-6 py-2 backdrop-blur-md transition-all duration-300">
                <article className='flex items-center justify-between'>
                    <span className="text-[1.2em] py-2 mt-3 font-bold w-[60%]">{nombre}</span>
                    <article className='flex mr-3 gap-6 w-[30%] lg:px-5 lg:m-0 lg:w-[50%] justify-end'>
                        <button
                            type="button"
                            onClick={onEditar}
                            className="flex transition-opacity duration-300 hover:cursor-pointer"
                            aria-label={`Editar ${nombre}`}
                        >
                            <img src={iconLapiz} alt="" className='w-[20px] h-[20px]' />
                        </button>
                        <button
                            type="button"
                            onClick={onEliminar}
                            className="flex transition-opacity duration-300 hover:cursor-pointer"
                            aria-label={`Eliminar ${nombre}`}
                        >
                            <img src={iconEliminar} alt="" className='w-[20px] h-[20px]' />
                        </button>
                    </article>
                </article>
                <p className="text-[0.9em] py-2">{descripcion}</p>
                <article className="flex gap-5 items-center mb-5 text-sm">
                    <p className="py-1 px-2 rounded-[40px]">
                        {duracion} min
                    </p>
                    <span>${precio}</span>
                </article>
            </article>
        </article>
    );
}

export default PanelRituales;