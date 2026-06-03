import { React } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/playfair-display";

import { useAuth } from '../../../Auth/AuthContext.jsx';

import { CardError }  from '../../../Components.jsx';
import { Input } from '../componentes/componentes.jsx';

import iconCorreo from "../../../assets/Login/iconCorreo.png";
import iconContraseña from "../../../assets/Login/iconPassword.svg";

function Login() {
    const { iniciarSesion } = useAuth();
    const navigate = useNavigate();

    const [estadoError, setEstadoError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    const [ loading, setLoading ] = useState(false);

    const [formulario, setFormulario] = useState({
        Correo: "",
        Contrasena: ""
    });

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const validarFormulario = () => {

        if(formulario.Correo.trim() === ""){
            setMensajeError("El correo es obligatorio");
            return false;
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.Correo.trim())){
            setMensajeError("El correo no es válido");
            return false;
        }
        if(formulario.Contrasena.trim() === ""){
            setMensajeError("La contraseña es obligatoria");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        if (!validarFormulario()){
            setEstadoError(true);
            return;
        } 
        setLoading(true);
        const result = await iniciarSesion(formulario.Correo, formulario.Contrasena);
        setLoading(false);
        if (!result.success) {
            setEstadoError(true);
            // setMensajeError("Correo o contraseña incorrectos");
            setMensajeError(result.error);
        }else{
            setEstadoError(false);
            navigate("/principal");
        }
    };

    return(
        <div className="flex justify-center items-start h-screen  bg-[url('./assets/fondoLogin.png')] bg-cover bg-center bg-no-repeat">
            <article className='w-[90%] py-10 mt-15 flex flex-col justify-center items-center text-white rounded-[20px] bg-black/60  lg:w-[35%]'>
                <CardError titulo="Credenciales incorrectas" mensaje={mensajeError} estado={estadoError}></CardError>
                <header className="w-[80%] grid grid-cols-3 items-center pb-5 mb-5 ">
                    <Link to="/principal" className="justify-self-start text-xl ">X</Link>
                    <h2 className="justify-self-center text-4xl font-bold">SATORI</h2>
                </header>
                <article className='flex flex-col justify-center items-center mb-10'>
                    <h2 className='text-xl font-bold mb-2'>Bienvenido de nuevo</h2>
                    <span className='text-sm'>Encuentra claridad en el momento</span>
                </article>
                <section className='w-[85%] lg:w-[400px]'>   
                    <form action="post" >
                        <Input textoFondo="Correo electronico" tipo="email" imagen={iconCorreo} nombre="Correo" valor={formulario.Correo} onChange={handleChange} />
                        <Input textoFondo="Constraseña" tipo="password" imagen={iconContraseña} nombre="Contrasena" valor={formulario.Contrasena} onChange={handleChange} />
                        <a href="/recuperar-contraseña" className="text-sm  hover:underline">¿Olvidaste tu contraseña?</a>
                        <button type="button" className="block w-[90%] bg-[#87520E] text-white text-center text py-3 mx-auto mt-7 rounded-[25px] backdrop-blur-md font-bold hover:cursor-pointer hover:bg-[#87520E]/50 transition-all duration-300" onClick={handleSubmit} disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 rounded-full animate-spin" />
                                    Iniciando Sesión...
                                </>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button> 
                        <Link to="/registro" className="block w-[90%] bg-white text-[#655e57] text-center py-3 mx-auto mt-6 rounded-[25px] backdrop-blur-md font-bold hover:cursor-pointer hover:bg-[#655e57]/50 hover:text-white transition-all duration-300">
                            Registrarse
                        </Link> 
                    </form>
                </section>
            </article>
        </div>
    );
}

export default Login;