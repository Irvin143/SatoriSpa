import { supabase } from '../../../../../supabase/supabase.js';

/**
 * Trae las citas de un rango de fechas (para la grilla semanal)
 * Incluye datos del servicio relacionado (nombre, duración, precio)
 */
export async function getCitasPorRango(fechaInicio, fechaFin) {
  const { data, error } = await supabase
    .from('citas')
    .select(`
      idcita,
      idUsuario,
      fechaCita,
      hora,
      estado,
      nombreCliente,
      especificaciones,
      servicios (
        id,
        nombre,
        duracion,
        precio
      )
    `)
    .gte('fechaCita', fechaInicio)
    .lte('fechaCita', fechaFin)
    .order('fechaCita', { ascending: true })
    .order('hora', { ascending: true });

  if (error) {
    console.error('Error al obtener citas por rango:', error);
    throw error;
  }

  return data;
}

/**
 * Trae las citas de un solo día (para la agenda lateral)
 */
export async function getCitasPorDia(fecha) {
  const { data, error } = await supabase
    .from('citas')
    .select(`
      idcita,
      hora,
      estado,
      nombreCliente,
      especificaciones,
      servicios (
        nombre,
        duracion,
        precio
      )
    `)
    .eq('fechaCita', fecha)
    .order('hora', { ascending: true });

  if (error) {
    console.error('Error al obtener citas del día:', error);
    throw error;
  }

  return data;
}

/**
 * Cuenta las citas de hoy (para el StatCard "Citas de hoy")
 */
export async function getCountCitasHoy(fechaHoy) {
  const { count, error } = await supabase
    .from('citas')
    .select('*', { count: 'exact', head: true })
    .eq('fechaCita', fechaHoy);

  if (error) {
    console.error('Error al contar citas de hoy:', error);
    throw error;
  }

  return count ?? 0;
}

/**
 * Suma los ingresos del día (precio de servicios de citas de hoy)
 * Nota: trae los precios y suma en el cliente porque Supabase (PostgREST)
 * no soporta SUM() directo sin una vista o función RPC.
 */
export async function getIngresosHoy(fechaHoy) {
    const { data, error } = await supabase
        .from('citas')
        .select('servicios(precio)')
        .eq('fechaCita', fechaHoy)
        .neq('estado', 'cancelada');

    if (error) {
        console.error('Error al calcular ingresos de hoy:', error);
        throw error;
    }

    const total = data.reduce((sum, row) => sum + (row.servicios?.precio ?? 0), 0);
    return total;
}

/**
 * Cuenta clientes nuevos (usuarios creados) en un rango de fechas
 */
export async function getCountClientesNuevos(fechaInicio, fechaFin) {
    const { count, error } = await supabase
        .from('usuarios')
        .select('*', { count: 'exact', head: true })
        .gte('fecha_creacion', fechaInicio)
        .lte('fecha_creacion', fechaFin);

    if (error) {
        console.error('Error al contar clientes nuevos:', error);
        throw error;
    }

    return count ?? 0;
}