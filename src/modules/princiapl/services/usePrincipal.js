import { supabase } from '../../../supabase/supabase.js';

export const obtenerRolUsuario = async (idUsuario) => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('rol')
        .eq('idusuario', idUsuario)
        .single();
    console.log("Resultado de obtener rol:", { data, error });
    if (error) return { success: false, error: error.message };
    return { success: true, rol: data.rol };
}