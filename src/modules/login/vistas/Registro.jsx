import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import iconUsuario from "../../../assets/Login/iconUsuario.png";
import iconCorreo from "../../../assets/Login/iconCorreo.png";
import iconTelefono from "../../../assets/Login/iconTelefono.webp";
import iconContraseña from "../../../assets/Login/iconPassword.svg";

import { CardError }  from '../../../Components.jsx';

import { useLogin } from '../services/useLogin.js';

function Registro() {

    const navigate = useNavigate();

    const [estadoError, setEstadoError] = useState(false);

    const { registrarUsuario } = useLogin();

    const [errores, setErrores] = useState({});
    const [mensajeError, setMensajeError] = useState("");


    const [formulario, setFormulario] = useState({
        Nombre: "",
        Correo: "",
        Telefono: "",
        Contraseña: "",
        ConfirmarContraseña: ""
    });

    const handleChange = (e) => {
        if (e.target.name === "Telefono" && e.target.value.length > 10) {
            return;
        }

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const validarFormulario = () => {

        const nuevosErrores = {};

        if(formulario.Nombre.trim() === ""){
            nuevosErrores.Nombre = "El nombre es obligatorio";
        }

        if(formulario.Correo.trim() === ""){
            nuevosErrores.Correo = "El correo es obligatorio";
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.Correo.trim())){
            nuevosErrores.Correo = "El correo no es válido";
        }


        if(formulario.Telefono.trim().length !== 10){
            nuevosErrores.Telefono = "El teléfono debe tener 10 dígitos";
        }

        if(!/^\d+$/.test(formulario.Telefono.trim())){
            nuevosErrores.Telefono = "El teléfono debe contener solo números";
            if(formulario.Telefono.trim() === ""){
                nuevosErrores.Telefono = "El teléfono es obligatorio";
            }
        }

        if(formulario.Contraseña.length < 8){
            nuevosErrores.Contraseña = "Mínimo 8 caracteres";
        }

        if(formulario.Contraseña !== formulario.ConfirmarContraseña || formulario.ConfirmarContraseña.trim() === ""){
            nuevosErrores.ConfirmarContraseña = "Las contraseñas no coinciden";
        }

        setErrores(nuevosErrores);
        if(Object.keys(nuevosErrores).length > 0){
            setMensajeError(
                Object.values(nuevosErrores)[0]
            );

            setEstadoError(true);

            return false;
        }

    return Object.keys(nuevosErrores).length === 0;
};
    return(
        <div className="flex justify-center items-start h-screen  bg-[url('./assets/fondoLogin.png')] bg-cover bg-center bg-no-repeat lg:items-center"> 
            <article className='w-[90%] py-10 mt-10 flex flex-col justify-center items-center text-white rounded-[20px] bg-black/60 lg:w-[35%] lg:m-0'>
            <CardError titulo="Error en los datos" mensaje={mensajeError} estado={estadoError}></CardError>
                <header className="w-[80%] grid grid-cols-3 items-center pb-5 mb-5 ">
                    <Link to="/login" className="justify-self-start text-xl ">X</Link>
                    <h2 className="justify-self-center text-4xl font-bold">SATORI</h2>
                </header>
                <article className='flex flex-col justify-center items-center mb-10'>
                    <h2 className='text-4xl font-bold mb-2'>Registro</h2>
                    <span className='text-sm'>Encuentra claridad en el momento</span>
                </article>
                <section className='w-[85%] lg:w-[400px]'>   
                    <form action="">
                        <Input
                            textoFondo="Juan"
                            tipo="text"
                            imagen={iconUsuario}
                            nombre="Nombre"
                            valor={formulario.Nombre}
                            onChange={handleChange}
                            error={errores.Nombre}
                        />
                        <Input
                            textoFondo="juan@ejemplo.com"
                            tipo="email"
                            imagen={iconCorreo}
                            nombre="Correo"
                            valor={formulario.Correo}
                            onChange={handleChange}
                            error={errores.Correo}
                        />
                        <Input
                            textoFondo="6671234567"
                            tipo="tel"
                            imagen={iconTelefono}
                            nombre="Telefono"
                            valor={formulario.Telefono}
                            onChange={handleChange}
                            error={errores.Telefono}
                        />
                        <Input
                            textoFondo="Contraseña"
                            tipo="password"
                            imagen={iconContraseña}
                            nombre="Contraseña"
                            valor={formulario.Contraseña}
                            onChange={handleChange}
                            error={errores.Contraseña}
                        />
                        <Input
                            textoFondo="Confirmar contraseña"
                            tipo="password"
                            imagen={iconContraseña}
                            nombre="ConfirmarContraseña"
                            valor={formulario.ConfirmarContraseña}
                            onChange={handleChange}
                            error={errores.ConfirmarContraseña}
                        />
                        <button type="button"  className="block w-[90%] bg-[#87520E] text-white text-center text py-3 mt-3 mx-auto  rounded-[25px] backdrop-blur-md font-bold hover:cursor-pointer hover:bg-[#87520E]/50 transition-all duration-300"
                        onClick={async () => {
                                if (!validarFormulario()) return;

                                const result = await registrarUsuario(formulario);

                                if (result.success) {
                                    navigate("/login");
                                } else {
                                    setMensajeError("Error al crear la cuenta. Inténtalo de nuevo.");
                                    setEstadoError(true);
                                }

                                console.log(result);
                            }}
                        >
                            Crear cuenta
                        </button>
                        <p className='mt-5 flex justify-center items-center gap-2'>¿Ya tienes una cuenta? <Link to="/login" className="text-[#A86714] hover:underline">Inicia sesión</Link></p>
                    </form>
                </section>
            </article>
        </div>
    );
}

function Input({textoFondo,tipo, imagen, nombre, valor, onChange, error}) {
    return(
        <article>
            {error ?
                <p className='text-red-500 text-sm mb-1'>{error}</p>
                :
                <p className='text-sm mb-2 block'>{nombre}</p>
            }
            <article className='relative'>
                <input
                    type={tipo}
                    name={nombre}
                    value={valor}
                    onChange={onChange}
                    placeholder={textoFondo}
                    className={`
                        w-full px-11 py-3 mb-2 rounded-[50px]
                        backdrop-blur-md outline-none
                        ${error
                            ? 'border-2 border-red-500'
                            : 'border border-white/30 bg-white/15'}
                    `}
                />
                <img
                    src={imagen}
                    alt=""
                    className='absolute left-4 top-3 w-6 h-6'
                />
            </article>
        </article>
    );
}
export default Registro;