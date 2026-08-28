import { useId, useRef, useState, useEffect } from "react";
import { agregarNuevoRitual, actualizarRitual, eliminarRitual } from "./services/useRitual.js";
import { obtenerCategorias } from '../../../../utils/use.js';
import { CardError } from "../../../../Components.jsx";

const LIMITE_DESCRIPCION = 500;
const TAMANO_MAXIMO_MB = 5;
const TIPOS_ACEPTADOS = ["image/svg+xml", "image/png", "image/jpeg", "image/gif"];

const VALORES_INICIALES = {
    nombre: "",
    categoria: "",
    duracion: "",
    precio: "",
    descripcion: "",
};

const CAMPOS_INVALIDOS_INICIALES = {
    nombre: false,
    categoria: false,
    duracion: false,
    precio: false,
    descripcion: false,
};

const CLASE_CAMPO_BASE =
    "w-full rounded-lg border px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:opacity-70 disabled:cursor-not-allowed";

function claseCampo(esInvalido) {
    return esInvalido
        ? `${CLASE_CAMPO_BASE} border-red-400 bg-red-50 focus:ring-red-300`
        : `${CLASE_CAMPO_BASE} border-gray-200 bg-gray-50 focus:ring-gray-300`;
}

// modo: "crear" (default), "editar" o "eliminar"
// datosIniciales: objeto del ritual existente, requerido cuando modo es "editar" o "eliminar"
export default function FormularioServicio({ onSuccess, modo = "crear", datosIniciales = null }) {
    const esModoEliminar = modo === "eliminar";
    const esModoEditar = modo === "editar";
    const tieneDatosPrevios = (esModoEliminar || esModoEditar) && datosIniciales;

    const [formulario, setFormulario] = useState(
        tieneDatosPrevios
            ? {
                  nombre: datosIniciales.nombre ?? "",
                  categoria: datosIniciales.tipo_id ?? "",
                  duracion: datosIniciales.duracion ?? "",
                  precio: datosIniciales.precio ?? "",
                  descripcion: datosIniciales.descripcion ?? "",
              }
            : VALORES_INICIALES
    );
    
    const [imagen, setImagen] = useState(null);
    const [errorImagen, setErrorImagen] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [estadoEnvio, setEstadoEnvio] = useState(false);
    const [errorEnvio, setErrorEnvio] = useState(null);
    const [errorValidacion, setErrorValidacion] = useState(null);
    const [camposInvalidos, setCamposInvalidos] = useState(CAMPOS_INVALIDOS_INICIALES);
    const [confirmarEliminacion, setConfirmarEliminacion] = useState(false);

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const resultado = await obtenerCategorias();
            if (resultado.success) {
                setCategorias(resultado.data);
            } else {
                console.error("Error al obtener categorías:", resultado.error);
            }
        };
        fetchCategorias();
    }, []);

    const idNombre = useId();
    const idCategoria = useId();
    const idDuracion = useId();
    const idPrecio = useId();
    const idDescripcion = useId();

    // Solo "eliminar" bloquea los campos por completo; "editar" se comporta
    // como "crear" (editable) pero con los valores precargados.
    const camposDeshabilitados = esModoEliminar || enviando;

    const handleCambio = (campo) => (e) => {
        if (esModoEliminar) return;

        setFormulario((valoresPrevios) => ({
            ...valoresPrevios,
            [campo]: e.target.value,
        }));

        if (camposInvalidos[campo]) {
            setCamposInvalidos((previos) => ({ ...previos, [campo]: false }));
        }
        if (errorValidacion) setErrorValidacion(null);
    };

    const validarYGuardarImagen = (archivo) => {
        if (!archivo) return;

        if (!TIPOS_ACEPTADOS.includes(archivo.type)) {
            setErrorImagen("Formato no soportado. Usa SVG, PNG, JPG o GIF.");
            return;
        }

        const tamanoMB = archivo.size / (1024 * 1024);
        if (tamanoMB > TAMANO_MAXIMO_MB) {
            setErrorImagen(`La imagen supera el máximo de ${TAMANO_MAXIMO_MB}MB.`);
            return;
        }

        setErrorImagen(null);
        setImagen(archivo);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        validarYGuardarImagen(e.dataTransfer.files?.[0]);
    };

    const limpiarFormulario = () => {
        setFormulario(VALORES_INICIALES);
        setImagen(null);
        setErrorImagen(null);
        setCamposInvalidos(CAMPOS_INVALIDOS_INICIALES);
    };

    const validarFormulario = () => {
        const invalidos = {
            nombre: !formulario.nombre.trim(),
            categoria: !formulario.categoria,
            duracion: !formulario.duracion,
            precio: !formulario.precio,
            descripcion: !formulario.descripcion.trim(),
        };

        setCamposInvalidos(invalidos);

        return !Object.values(invalidos).some(Boolean);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (enviando) return;

        if (!validarFormulario()) {
            setErrorValidacion("Por favor, completa todos los campos obligatorios.");
            return;
        }

        setErrorValidacion(null);
        setEnviando(true);
        setErrorEnvio(null);

        const resultado = esModoEditar
            ? await actualizarRitual(datosIniciales.id, formulario, imagen)
            : await agregarNuevoRitual(formulario, imagen);

        if (resultado.success) {
            if (!esModoEditar) limpiarFormulario(); // en editar no tiene sentido vaciar el formulario
            setEstadoEnvio(true);
            onSuccess?.(resultado.data);
        } else {
            setErrorEnvio(resultado.error ?? "No se pudo guardar el ritual. Intenta de nuevo.");
        }

        setEnviando(false);
    };

    const handleEliminar = async () => {
        if (enviando) return;

        setEnviando(true);
        setErrorEnvio(null);

        const resultado = await eliminarRitual(datosIniciales.id);

        if (resultado.success) {
            setEstadoEnvio(true);
            onSuccess?.(datosIniciales.id);
        } else {
            setErrorEnvio(resultado.error ?? "No se pudo eliminar el ritual. Intenta de nuevo.");
        }

        setEnviando(false);
        setConfirmarEliminacion(false);
    };

    return (
        <form
            onSubmit={esModoEliminar ? (e) => e.preventDefault() : handleSubmit}
            noValidate
            className="max-w-2xl mx-auto px-4 py-6 sm:px-6"
        >
            <CardError
                titulo={esModoEliminar ? "Ritual eliminado" : "Guardado correctamente"}
                mensaje={
                    esModoEliminar
                        ? "El ritual se eliminó correctamente."
                        : esModoEditar
                            ? "El ritual se actualizó con éxito."
                            : "El ritual se creó con éxito."
                }
                estado={estadoEnvio}
                color="green"
                onClose={() => setEstadoEnvio(false)}
            />

            <CardError
                titulo="Error"
                mensaje={errorValidacion || errorEnvio}
                estado={Boolean(errorValidacion || errorEnvio)}
                color="red"
                onClose={() => {
                    setErrorValidacion(null);
                    setErrorEnvio(null);
                }}
            />

            {esModoEliminar && (
                <p className="mb-6 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                    Estás por eliminar este ritual. Revisa la información antes de confirmar — esta acción no se puede deshacer.
                </p>
            )}

            <section aria-labelledby="titulo-detalles-basicos">
                <h2
                    id="titulo-detalles-basicos"
                    className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200"
                >
                    Detalles Básicos
                </h2>

                <div className="mt-4">
                    <label htmlFor={idNombre} className="block text-sm text-gray-500 mb-1">
                        Nombre del Ritual
                    </label>
                    <input
                        id={idNombre}
                        type="text"
                        value={formulario.nombre}
                        onChange={handleCambio("nombre")}
                        placeholder="Nombre del ritual"
                        disabled={camposDeshabilitados}
                        aria-invalid={camposInvalidos.nombre}
                        className={claseCampo(camposInvalidos.nombre)}
                    />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor={idCategoria} className="block text-sm text-gray-500 mb-1">
                            Categoria
                        </label>
                        <select
                            id={idCategoria}
                            value={formulario.categoria}
                            onChange={handleCambio("categoria")}
                            disabled={camposDeshabilitados}
                            aria-invalid={camposInvalidos.categoria}
                            className={`${claseCampo(camposInvalidos.categoria)} text-gray-700`}
                        >
                            <option value="">Selecciona una categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor={idDuracion} className="block text-sm text-gray-500 mb-1">
                            Duracion (min)
                        </label>
                        <input
                            id={idDuracion}
                            type="number"
                            min="1"
                            step="1"
                            inputMode="numeric"
                            value={formulario.duracion}
                            onChange={handleCambio("duracion")}
                            placeholder="ej. 60"
                            disabled={camposDeshabilitados}
                            aria-invalid={camposInvalidos.duracion}
                            className={claseCampo(camposInvalidos.duracion)}
                        />
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor={idPrecio} className="block text-sm text-gray-500 mb-1">
                            Precio ($)
                        </label>
                        <input
                            id={idPrecio}
                            type="number"
                            min="0"
                            step="0.01"
                            inputMode="decimal"
                            value={formulario.precio}
                            onChange={handleCambio("precio")}
                            placeholder="0.00"
                            disabled={camposDeshabilitados}
                            aria-invalid={camposInvalidos.precio}
                            className={claseCampo(camposInvalidos.precio)}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label htmlFor={idDescripcion} className="block text-sm text-gray-500 mb-1">
                        Descripcion
                    </label>
                    <textarea
                        id={idDescripcion}
                        rows={4}
                        maxLength={LIMITE_DESCRIPCION}
                        value={formulario.descripcion}
                        onChange={handleCambio("descripcion")}
                        placeholder="Describe el ritual, sus beneficios y lo que el cliente puede esperar..."
                        aria-describedby={`${idDescripcion}-contador`}
                        aria-invalid={camposInvalidos.descripcion}
                        disabled={camposDeshabilitados}
                        className={`${claseCampo(camposInvalidos.descripcion)} resize-y`}
                    />
                    {!esModoEliminar && (
                        <p id={`${idDescripcion}-contador`} className="mt-1 text-right text-xs text-gray-400">
                            {formulario.descripcion.length} / {LIMITE_DESCRIPCION} characters
                        </p>
                    )}
                </div>
            </section>

            <section aria-labelledby="titulo-galeria" className="mt-8">
                <h2
                    id="titulo-galeria"
                    className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200"
                >
                    Galeria de Imagenes
                </h2>

                <div className="mt-4">
                    {esModoEliminar ? (
                        <VistaImagenActual url={datosIniciales?.imagen} nombre={datosIniciales?.nombre} />
                    ) : (
                        <>
                            {esModoEditar && datosIniciales?.imagen && !imagen && (
                                <div className="mb-3">
                                    <p className="text-xs text-gray-400 mb-1">
                                        Imagen actual (sube una nueva para reemplazarla):
                                    </p>
                                    <img
                                        src={datosIniciales.imagen}
                                        alt={datosIniciales.nombre}
                                        className="w-full h-[150px] object-cover rounded-xl border border-gray-200"
                                    />
                                </div>
                            )}
                            <span className="block text-sm text-gray-500 mb-1">
                                {esModoEditar ? "Reemplazar imagen (opcional)" : "Sube imágenes del ritual"}
                            </span>
                            <ZonaCargaImagen
                                imagen={imagen}
                                error={errorImagen}
                                deshabilitado={enviando}
                                onArchivoSeleccionado={validarYGuardarImagen}
                                onDrop={handleDrop}
                            />
                        </>
                    )}
                </div>
            </section>

            <div className="mt-8 flex justify-end gap-3">
                {esModoEliminar ? (
                    confirmarEliminacion ? (
                        <>
                            <button
                                type="button"
                                disabled={enviando}
                                onClick={() => setConfirmarEliminacion(false)}
                                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                disabled={enviando}
                                onClick={handleEliminar}
                                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {enviando ? "Eliminando..." : "Sí, eliminar definitivamente"}
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setConfirmarEliminacion(true)}
                            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 cursor-pointer"
                        >
                            Eliminar ritual
                        </button>
                    )
                ) : (
                    <button
                        type="submit"
                        disabled={enviando}
                        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm 
                        font-medium text-white transition hover:bg-gray-700 focus-visible:outline 
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900
                        cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {enviando
                            ? esModoEditar
                                ? "Actualizando..."
                                : "Guardando..."
                            : esModoEditar
                                ? "Actualizar servicio"
                                : "Guardar servicio"}
                    </button>
                )}
            </div>
        </form>
    );
}

function VistaImagenActual({ url, nombre }) {
    if (!url) {
        return (
            <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-6 py-10 text-sm text-gray-400">
                Este ritual no tiene imagen
            </div>
        );
    }

    return (
        <img
            src={url}
            alt={nombre || "Imagen del ritual"}
            className="w-full h-[200px] object-cover rounded-xl border border-gray-200"
        />
    );
}

function ZonaCargaImagen({ imagen, error, deshabilitado, onArchivoSeleccionado, onDrop }) {
    const [arrastrando, setArrastrando] = useState(false);
    const inputRef = useRef(null);
    const idInputArchivo = useId();

    return (
        <div>
            <label
                htmlFor={idInputArchivo}
                onDragOver={(e) => {
                    if (deshabilitado) return;
                    e.preventDefault();
                    setArrastrando(true);
                }}
                onDragLeave={() => setArrastrando(false)}
                onDrop={(e) => {
                    if (deshabilitado) return;
                    setArrastrando(false);
                    onDrop(e);
                }}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors
                    ${deshabilitado ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                    ${arrastrando ? "border-gray-400 bg-gray-100" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
            >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 3v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                </span>

                <p className="text-sm font-medium text-gray-800">
                    {imagen ? imagen.name : "Click para subir o arrastra tu imagen"}
                </p>
                <p className="text-xs text-gray-400">SVG, PNG, JPG o GIF (máx. {TAMANO_MAXIMO_MB}MB)</p>
                <p className="text-xs text-gray-400">Tamaño recomendado: 1200 x 800px</p>

                <input
                    ref={inputRef}
                    id={idInputArchivo}
                    type="file"
                    accept={TIPOS_ACEPTADOS.join(",")}
                    disabled={deshabilitado}
                    onChange={(e) => onArchivoSeleccionado(e.target.files?.[0])}
                    className="sr-only"
                />
            </label>

            {error && (
                <p role="alert" className="mt-2 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}