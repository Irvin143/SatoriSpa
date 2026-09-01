import { supabase } from '../../../supabase/supabase.js';

export const crearCita = async (datosCita, usuario, formulario = null) => {
    let idUsuario;

    if (!usuario) {
        // Validar que el formulario no esté vacío
        if (!formulario) return { success: false, error: "Formulario vacío" };

        // Crear usuario invitado
        const { data:usuarioInvitado, error: errorInvitado } = await supabase
        .from('usuarios')
        .insert([{
            nombre: formulario.nombre,
            correo: formulario.correo,
            telefono: formulario.telefono,
            rol: 'cliente',
            es_invitado: true
        }])    
        .select('idusuario')  // ← falta esto
        .single();

        if (errorInvitado) return { success: false, error: errorInvitado.message };

        idUsuario = usuarioInvitado.idusuario;

    } else {
        // Usuario autenticado: buscar su idusuario interno por auth_id
        const { data: usuarioDB, error: errorUsuario } = await supabase
        .from('usuarios')
        .select('idusuario')
        .eq('idusuario', usuario.id)
        .single();

        if (errorUsuario) return { success: false, error: errorUsuario.message };

        idUsuario = usuarioDB.idusuario;
    }

    console.log("ID de usuario para la cita:", idUsuario);
    console.log("Datos de la cita a crear:", datosCita);
    // Insertar la cita con el id correcto
    const { data, error } = await supabase
        .from('citas')
        .insert([{
            idUsuario: idUsuario,
            idservicio: datosCita.idServicio,
            nombreCliente: datosCita.nombreCliente,
            fechaCita: datosCita.fechaCita,
            hora: datosCita.hora,
            especificaciones: datosCita.especificaciones
        }]);

    if (error) return { success: false, error: error.message };

  return { success: true, data };
};

export const obtenerUnServicio = async (idServicio) => {
    const { data, error } = await supabase
        .from('servicios')
        .select('*, tipos_servicio(nombre)')
        .eq('id', idServicio)
        .single();
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

export const obtenerInfoUsuario = async (idUsuario) => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('nombre, correo, telefono')
        .eq('idusuario', idUsuario)
        .single();
    if (error) return { success: false, error: error.message };
    return { success: true, data };
}