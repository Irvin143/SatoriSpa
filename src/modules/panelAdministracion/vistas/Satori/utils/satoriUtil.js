/**
 * Devuelve el lunes de la semana que contiene la fecha dada
 */
export function getLunesDeLaSemana(fecha = new Date()) {
    const d = new Date(fecha);
    const dia = d.getDay(); // 0 = domingo, 1 = lunes, ...
    const diff = dia === 0 ? -6 : 1 - dia;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Genera los 5 días laborales (lunes a viernes) a partir de un lunes dado
 */
export function generarDiasSemana(lunes) {
    const labels = ["Lun", "Mar", "Mié", "Jue", "Vie"];
    return labels.map((label, i) => {
        const fecha = new Date(lunes);
        fecha.setDate(fecha.getDate() + i);
        return {
        label,
        date: fecha.getDate(),
        isoDate: formatFechaISO(fecha),
        };
    });
}

/** Formatea una fecha como YYYY-MM-DD (lo que espera Postgres/Supabase) */
export function formatFechaISO(fecha) {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, '0');
    const d = String(fecha.getDate()).padStart(2, '0');
    
    return `${y}-${m}-${d}`;
}

/** Convierte "09:30" a un índice de fila según tu arreglo de horas base */
export function horaAFila(horaTexto, hours) {
    if (!horaTexto) return null;
    const horaBase = horaTexto.slice(0, 5); // "09:30:00" -> "09:30"
    const horaRedondeada = horaBase.slice(0, 2) + ':00'; // aproxima a la hora en punto
    const index = hours.indexOf(horaRedondeada);
    
    return index === -1 ? null : index + 1;
}

/**
 * Devuelve el índice (0-4, lunes a viernes) del día de hoy dentro de la semana.
 * Si hoy es sábado o domingo, devuelve null (no hay columna en la grilla laboral).
 */
export function getIndiceDiaHoy(fecha = new Date()) {
    const dia = fecha.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    if (dia === 0 || dia === 6) return null;
  return dia - 1; // lunes(1) -> 0, martes(2) -> 1, ..., viernes(5) -> 4
}