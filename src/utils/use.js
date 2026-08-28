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
export async function obtenerRituales() {
    const { data: rituales, error } = await supabase
        .from("servicios")
        .select("*, tipos_servicio(nombre)");

    if (error) {
        console.error("Error al obtener los rituales:", error);
        return { success: false, error: error.message };
    }

    return { success: true, data: rituales };
}