import { supabase } from '../../../supabase/supabase.js';

export const obtenerServicios = async () => {
    const { data, error } = await supabase
        .from('servicios')
        .select('*, tipos_servicio(nombre)')
        .eq('activo', true);
    if (error) return { success: false, error: error.message };
    console.log(data);
    return { success: true, data };
}
