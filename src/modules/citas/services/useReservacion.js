import { useState, useEffect } from 'react';

const STORAGE_KEY = 'reservacion';

const recuperarEstado = () => {
    try {
        const guardado = sessionStorage.getItem(STORAGE_KEY);
        if (!guardado) return null;
        const datos = JSON.parse(guardado);
        // ← convierte la fecha de string a Date
        if (datos.fechaSeleccionada) {
            datos.fechaSeleccionada = new Date(datos.fechaSeleccionada);
        }
        return datos;
    } catch {
        return null;
    }
};

export function useReservacion() {
    const inicial = recuperarEstado();

    const [servicioSeleccionado, setServicioSeleccionado] = useState(inicial?.servicioSeleccionado ?? null);
    const [horarioSeleccionado, setHorarioSeleccionado]   = useState(inicial?.horarioSeleccionado ?? null);
    const [fecha,setFecha]       = useState(inicial?.fechaSeleccionada ?? null);

    // ← guarda automático cada vez que algo cambia
    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
            servicioSeleccionado,
            horarioSeleccionado,
            fechaSeleccionada: fecha?.toISOString() ?? null,
        }));
    }, [servicioSeleccionado, horarioSeleccionado, fecha]);

    const limpiar = () => {
        sessionStorage.removeItem(STORAGE_KEY);
        setServicioSeleccionado(null);
        setHorarioSeleccionado(null);
        setFecha(null);
    };

    return {
        servicioSeleccionado, setServicioSeleccionado,
        horarioSeleccionado,  setHorarioSeleccionado,
        fecha,setFecha,
        limpiar // ← llámalo cuando se confirme la reservación
    };
}