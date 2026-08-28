import { supabase } from '../../../../../supabase/supabase.js';

export async function agregarNuevoRitual(formulario, file) {
    let urlImagen = null;

    if (file) {
        const extension = file.name.split(".").pop();
        const filePath = `${crypto.randomUUID()}.${extension}`;

        const { error: errorSubida } = await supabase.storage
            .from("Services")
            .upload(filePath, file);

        if (errorSubida) {
            console.error("Error al subir la imagen:", errorSubida);
            return { success: false, error: errorSubida.message };
        }

        const { data: urlData } = supabase.storage
            .from("Services")
            .getPublicUrl(filePath);

        urlImagen = urlData.publicUrl;
    }

    const { data: ritual, error: errorRitual } = await supabase
        .from("servicios")
        .insert([{
            nombre: formulario.nombre,
            descripcion: formulario.descripcion,
            precio: Number(formulario.precio),
            duracion: Number(formulario.duracion),
            tipo_id: formulario.categoria,
            imagen: urlImagen,
        }])
        .select()
        .single();

    if (errorRitual) {
        console.error("Error al crear el ritual:", errorRitual);
        return { success: false, error: errorRitual.message };
    }

    return { success: true, data: ritual };
}

export async function obtenerRitual(idRitual) {
    const { data: ritual, error } = await supabase
        .from("servicios")
        .select("*")
        .eq("id", idRitual)
        .single();

    if (error) {
        console.error("Error al obtener el ritual:", error);
        return { success: false, error: error.message };
    }

    return { success: true, data: ritual };
}



export async function eliminarRitual(idRitual) {
    const { error } = await supabase
        .from("servicios")
        .delete()
        .eq("id", idRitual);
        
    if (error) {
        console.error("Error al eliminar el ritual:", error);
        return { success: false, error: error.message };
    }
    return { success: true };
}

export async function actualizarRitual(idRitual, formulario, file) {
    let urlImagen = null;

    if (file) {
        const extension = file.name.split(".").pop();
        const filePath = `${crypto.randomUUID()}.${extension}`;

        const { error: errorSubida } = await supabase.storage
            .from("Services")
            .upload(filePath, file);

        if (errorSubida) {
            console.error("Error al subir la imagen:", errorSubida);
            return { success: false, error: errorSubida.message };
        }

        const { data: urlData } = supabase.storage
            .from("Services")
            .getPublicUrl(filePath);

        urlImagen = urlData.publicUrl;
    }

    const { data: ritual, error: errorActualizacion } = await supabase
        .from("servicios")
        .update({
            nombre: formulario.nombre,
            descripcion: formulario.descripcion,
            precio: Number(formulario.precio),
            duracion: Number(formulario.duracion),
            tipo_id: formulario.categoria,
            ...(urlImagen && { imagen: urlImagen }),
        })
        .eq("id", idRitual)
        .select()
        .single();

    if (errorActualizacion) {
        console.error("Error al actualizar el ritual:", errorActualizacion);
        return { success: false, error: errorActualizacion.message };
    }

    return { success: true, data: ritual };
}