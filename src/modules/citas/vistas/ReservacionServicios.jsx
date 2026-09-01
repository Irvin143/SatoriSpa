import { useState, useEffect, useRef } from 'react';
import { useOutletContext,Link } from "react-router-dom";

import fondoCitas from "../../../assets/fondoCitas.png";

import { CardError, filtrarServicios }  from '../../../Components.jsx';
import { obtenerCategorias, obtenerRituales } from '../../../utils/use.js';
import { BotonFiltro } from '../../componentesPanel/buttons.jsx';
import { InputBuscar } from "../../componentesPanel/inputs.jsx";

import masaje from "../../../assets/masaje2.jpeg";



export default function ReservacionSevicios({
  servicioSeleccionado,
  setServicioSeleccionado,
  setOrdenSeleccionado,
  servicios, 
  setServicios} 
  ){

  const [cargando, setCargando] = useState(true);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
      const cargarServicios = async () => {
        setCargando(true);
        const result = await obtenerRituales()
        if (result.success) {
            setServicios(result.data);
            console.log("Servicios cargados:", result.data);
        } else {
            console.error("Error al cargar servicios:", result.error);
        }
          setCargando(false);
      }

      const fetchCategorias = async () => {
        const result = await obtenerCategorias();
        if (result.success) {
            setCategorias(result.data);
            console.log("Categorías cargadas:", result.data);
        }
        else {
            console.error("Error al obtener categorías:", result.error);
        }
      };

      fetchCategorias();
      cargarServicios();
  }, []);

    const [validacion, setValidacion] = useState(true);

    const [estadoError, setEstadoError] = useState(false);

    const [busqueda, setBusqueda] = useState("");
    const [btnFiltroSelect, setBtnFiltroSelect] = useState("Todos");

    const serviciosFiltrados = filtrarServicios(servicios, {
      categoriaSeleccionada: btnFiltroSelect,
      busqueda,
      valorSinFiltro: "Todos", // o "TODOS", según lo que uses en ese botón
  });

    return(
        <section className={`relative min-h-screen pt-20 lg:pt-10 `}>
            {/* FONDO */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${fondoCitas})` }}
            ></div>

            {/* CONTENIDO */}
            <main className="relative text-[#655e57] px-5">
              <SubTitulo titulo="Rituales" id="rituales" subtitulo="Elige el ritual que deseas reservar"  />
              <article className='lg:flex justify-center items-center gap-5 mb-5 lg:gap-10 lg:mx-10'>
                <InputBuscar
                  placeholder="Buscar ritual..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <article className='flex justify-center px-5 py-1 mt-5 border-1 rounded-[20px] lg:m-0
                '>
                  <BotonFiltro texto="Todos" btnSeleccionado={btnFiltroSelect} onClick={() => {
                    setBtnFiltroSelect("Todos");
                    }} />
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
              {cargando ? <SkeletonServicios /> :  
                <article className='lg:grid lg:grid-cols-3 lg:gap-6 lg:justify-items-center pb-30'>  
                  {serviciosFiltrados.map((servicio) => (
                    <CardServicio
                        key={servicio.id}
                        id={servicio.id}
                        nombre={servicio.nombre}
                        descripcion={servicio.descripcion}
                        tiempo={servicio.duracion}
                        categoria={servicio.tipos_servicio.nombre}
                        precio={servicio.precio}
                        activo={servicioSeleccionado === servicio.id}
                        img = {servicio.imagen}
                        onSeleccionar={() => setServicioSeleccionado(servicio.id)}
                        />
                  ))}
                </article>}

                <CardError titulo="Error" mensaje="Seleccione un ritual" estado = {estadoError} onClose = {() => setEstadoError(false)} />

                <article className="fixed bottom-0 left-0 text-[#655e57] bg-[#f3f3f3] w-full p-4 rounded-t-4xl border-t border-[rgba(200,200,200,0.5)] flex flex-col  items-center justify-around lg:lg:flex-row lg:p-8">
                    <article className={` w-full flex justify-between px-4  items-center lg:w-[70%] ${servicioSeleccionado ? 'block' : 'hidden'}`}>
                        <article>
                            <p className='text-[0.8em] lg:text-[1em]'>Ritual Seleccionado:</p>
                            <span className="font-bold">{servicios.find(s => s.id === servicioSeleccionado)?.nombre + ' - '}</span>
                            <span className='text-[0.8em] '>{servicios.find(s => s.id === servicioSeleccionado)?.precio + ' Min'|| ''}</span>
                        </article>
                        <article className='flex flex-col items-end'>
                            <p>Total a pagar</p>
                            <span className='font-bold'>${servicios.find(s => s.id === servicioSeleccionado)?.precio || 0}</span>
                        </article>
                    </article>
                    <span className={`text-[#F00]
                    ${!validacion && !servicioSeleccionado ? 'block text-4xl' : 'hidden'}`}
                    >
                        Seleccione un ritual
                    </span>
                    <Link 
                        to = "/reservacion/horario"
                        className={`w-[90%] mt-5  text-center text-white py-4 px-8 flex items-center justify-center   rounded-[25px] backdrop-blur-md  text-sm font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300 disabled:opacity-50 lg:mt-0 lg:w-[30%]
                        ${servicioSeleccionado  ? 'bg-[#655e57]' : ''}
                        ${!validacion && !servicioSeleccionado ? 'bg-[#FA2200]' : ' text-white bg-[#9c9790]'}`}
                        onClick={(e) => {
                            if(!servicioSeleccionado){
                                e.preventDefault();
                                setEstadoError(true);
                            }else{
                                setEstadoError(false);
                                setOrdenSeleccionado(2);
                            }
                        }}
                    >
                            SELECCIONAR RITUAL
                    </Link> 
                </article>
            </main>
        </section >
    );
}

function SubTitulo({ titulo, id, subtitulo = "", className = ""}) {
  return(
    <article className={`ml-5 pt-10 mb-5 ${className}`} id={id}>
      <p className="text-[#655e57] italic mb-0 lg:text-[1.2em]" >{subtitulo}</p>
      <h2 className="text-[#615c56] text-[.em] font-['Trebuchet_MS'] font-bold my-[10px] lg:text-[2.5em]" >{titulo}</h2>
      <hr className="border-none h-px bg-[rgba(128,128,128,1)] w-[60px] ml-[10px]" />
    </article>
  )
}


function CardServicio({
    id,
    nombre,
    descripcion,
    activo,
    onSeleccionar,
    tiempo = "60 min",
    categoria = "Masaje",
    precio = "80",
    img,
}) {
    const [expandido, setExpandido] = useState(false);
    const [necesitaExpandir, setNecesitaExpandir] = useState(false);
    const descripcionRef = useRef(null);

    useEffect(() => {
        const elemento = descripcionRef.current;
        if (!elemento) return;

        setNecesitaExpandir(elemento.scrollHeight > elemento.clientHeight);
    }, [descripcion]);

    return (
        <article
          key={id}
          className="flex-shrink-0 mx-auto my-5 rounded-[30px] transition-all duration-300 bg-white/50 lg:flex-row lg:w-[80%]"
        >
            <article
                className={`h-full rounded-[30px] flex flex-col backdrop-blur-md transition-all duration-300
                hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF]
                ${activo
                    ? 'bg-[#FFF]/20 text-[#655e57] border-2 border-[#655e57] shadow-xl'
                    : 'text-[#655e57] bg-[#ebe1d7]/50 border-white border-1'}`}
            >
                <div className="relative overflow-hidden rounded-t-[30px] group">
                    {img ? (
                        <img
                            src={img}
                            alt={nombre}
                            className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-[200px] bg-[#ebe1d7] flex items-center justify-center text-[#655e57]/50 text-sm">
                            Sin imagen
                        </div>
                    )}

                    {/* Ícono de seleccionado (decorativo, no un control real) */}
                    {activo && (
                        <svg
                            aria-hidden="true"
                            className="absolute top-3 right-3 w-6 h-6 text-[#655e57] bg-white rounded-full p-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}

                    <article className="absolute top-3 left-3 flex text-[0.8em] justify-center items-center gap-2">
                        <span className="bg-[#f5f0e9] py-1 px-2 rounded-[40px]">
                            {categoria}
                        </span>
                        <p className="bg-[#f5f0e9] py-1 px-2 rounded-[40px]">
                            {tiempo} min
                        </p>
                    </article>
                </div>

                <article className="flex justify-center items-center px-6 mt-3">
                    <span className="text-[1.2em] py-2 font-bold">{nombre}</span>
                    <span className="block ml-auto font-bold">${precio}</span>
                </article>

                <article className="flex flex-1 flex-col px-6 mb-5">
                    <p
                        ref={descripcionRef}
                        className={`text-[0.9em] py-2 ${expandido ? "" : "line-clamp-3"}`}
                    >
                        {descripcion}
                    </p>

                    {necesitaExpandir && (
                        <button
                            type="button"
                            onClick={() => setExpandido((valor) => !valor)}
                            aria-expanded={expandido}
                            className="self-start text-[0.8em] border-b text-[#655e57] hover:text-black transition duration-300 mb-5 cursor-pointer"
                        >
                            {expandido ? "Ver menos" : "Ver más"}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onSeleccionar}
                        aria-pressed={activo}
                        className={`text-center text-[0.8em] mt-auto px-4 py-2 rounded-[10px] cursor-pointer transition-colors duration-300 lg:py-3 lg:text-lg
                            ${activo
                                ? "bg-[#f5f0e9] text-[#655e57] font-bold"
                                : "bg-[#655e57] text-white hover:bg-[#4d473f]"}`}
                    >
                        {activo ? "SELECCIONADO" : "SELECCIONAR"}
                    </button>
                </article>
            </article>
        </article>
    );
}

function SkeletonServicios() {
    return (
        <article className="grid grid-cols-1 gap-8  lg:mx-10 mt-5 lg:grid-cols-3 ">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-[25px] p-6 shadow-md animate-pulse">
                    {/* imagen */}
                    <div className="w-full h-40 bg-gray-200 rounded-[15px] mb-4" />
                    {/* título */}
                    <div className="h-5 bg-gray-200 rounded-full w-[60%] mb-3" />
                    {/* descripción */}
                    <div className="h-3 bg-gray-200 rounded-full w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded-full w-[80%] mb-4" />
                    {/* precio */}
                    <div className="h-5 bg-gray-200 rounded-full w-[30%]" />
                </div>
            ))}
        </article>
    );
}