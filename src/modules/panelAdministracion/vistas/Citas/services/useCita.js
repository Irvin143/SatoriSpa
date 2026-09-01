import { supabase } from '../../../../../supabase/supabase.js';

export async function obtenerCitas() {
    const { data: citas, error } = await supabase
        .from("citas")
        .select("*, usuarios(nombre), servicios(nombre)")
        .order("fechaCita", { ascending: true });

    if (error) {
        console.error("Error al obtener las citas:", error);
        return { success: false, error: error.message };
    }
    return { success: true, data: citas };
}