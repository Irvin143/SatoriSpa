import { supabase } from '../../../supabase/supabase.js'
export const registrarUsuario = async (formulario) => {
    // 1. Crear cuenta en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formulario.Correo,
        password: formulario.Contraseña
    });
    console.log("Resultado de signUp:", { authData, authError });
    if (authError) return { success: false, error: authError.message };

    const nuevoAuthId = authData.user.id;

    // 2. ¿Ya existe como invitado con ese correo?
    const { data: invitado } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo', formulario.Correo)
        .eq('es_invitado', true)
        .single();

    if (invitado) {
        // 3a. Solo actualizar: vincular auth_id y promover a registrado
        const { error } = await supabase
        .from('usuarios')
        .update({
            auth_id: nuevoAuthId,
            nombre: formulario.Nombre || invitado.nombre,
            telefono: formulario.Telefono || invitado.telefono,
            es_invitado: false
        })
        .eq('idusuario', invitado.idusuario);

        if (error) return { success: false, error: error.message };

    } else {
        // 3b. Usuario completamente nuevo
        const { error } = await supabase
        .from('usuarios')
        .insert({
            auth_id: nuevoAuthId,
            nombre: formulario.Nombre,
            correo: formulario.Correo,
            telefono: formulario.Telefono,
            rol: 'cliente',
            es_invitado: false
        });

        if (error) return { success: false, error: error.message };
    }

    return { success: true };
};

export const iniciarSesion = async (correo, contraseña) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: correo,
        password: contraseña,
    });

    if (error) return { success: false, error: error.message };
    return { success: true, user: data.user };
};

