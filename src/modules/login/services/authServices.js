import { supabase } from '../../../supabase/supabase.js'


export const registrarUsuario = async (formulario) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: formulario.Correo,
            password: formulario.Contraseña,
            options: {
                data: {
                    Nombre: formulario.Nombre,
                    Telefono: formulario.Telefono
                }
            }
        });

        if (error) {
            return { success: false, error: error.message };
        }

        const userId = data.user?.id;

        const { error: insertError } = await supabase
            .from('usuarios')
            .insert([
                {
                    idusuario: userId,
                    nombre: formulario.Nombre,
                    correo: formulario.Correo,
                    telefono: formulario.Telefono,
                    rol: "cliente"
                }
            ]);

        if (insertError) {
            return { success: false, error: insertError.message };
        }

        return { success: true };

    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const iniciarSesion = async (correo, contraseña) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: correo,
        password: contraseña,
    });

    if (error) return { success: false, error: error.message };
    return { success: true, user: data.user };
};

