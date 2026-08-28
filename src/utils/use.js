import { supabase } from './../supabase/supabase.js';


export async function obtenerCategorias() {
    const { data: categorias, error } = await supabase
        .from("tipos_servicio")
        .select("id, nombre");
        
        if (error) {
            console.error("Error al obtener categorías:", error);
            return { success: false, error: error.message };
        }
    return { success: true, data: categorias };
}