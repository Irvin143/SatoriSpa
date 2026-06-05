import { supabase } from '../../../supabase/supabase.js'

export const crearCita = async (datosCita) => {
    const { data, error } = await supabase
        .from('citas')
        .insert([
            {
                idUsuario: datosCita.idUsuario,
                idservicio : datosCita.idServicio,
                nombreCliente: datosCita.nombreCliente,
                fechaCita: datosCita.fechaCita,
                hora: datosCita.hora,
                especificaciones: datosCita.especificaciones
            }
        ]);
        if (error) return { success: false, error: error.message };

    return { success: true, data };
};

export const obtenerServicios = async () => {
    const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .eq('activo', true);
    if (error) return { success: false, error: error.message };
    return { success: true, data };
}

export const obtenerHorariosDisponibles = async (fecha) => {
    const { data, error } = await supabase
        .from('citas')
        .select('hora, fechaCita')
        .eq('fechaCita', fecha);
    if (error) return { success: false, error: error.message };
    return { success: true, data: data };
}