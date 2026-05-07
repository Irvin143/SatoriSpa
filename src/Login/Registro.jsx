import { React } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import iconUsuario from "../assets/Login/iconUsuario.png";
import iconCorreo from "../assets/Login/iconCorreo.png";
import iconTelefono from "../assets/Login/iconTelefono.webp";
import iconContraseña from "../assets/Login/iconPassword.svg";

function Registro() {
    return(
        <div className="flex justify-center items-start h-screen  bg-[url('./assets/fondoLogin.png')] bg-cover bg-center bg-no-repeat">
            <article className='w-[90%] py-10 mt-10 flex flex-col justify-center items-center text-white rounded-[20px] bg-black/60 '>
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
                        <Input textoFondo="Nombre" tipo="text" imagen={iconUsuario}/>
                        <Input textoFondo="Correo electronico" tipo="email" imagen={iconCorreo} />
                        <Input textoFondo="Telefono" tipo="tel" imagen={iconTelefono} />
                        <Input textoFondo="Contraseña" tipo="password" imagen={iconContraseña} />
                        <Input textoFondo="Confirmar contraseña" tipo="password" imagen={iconContraseña} />
                        <Link to="/login" className="block w-[90%] bg-[#87520E] text-white text-center text py-3 mx-auto  rounded-[25px] backdrop-blur-md font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300">
                            Crear cuenta
                        </Link>
                        <p className='mt-5 flex justify-center items-center gap-2'>¿Ya tienes una cuenta? <Link to="/login" className="text-[#A86714] hover:underline">Inicia sesión</Link></p>
                    </form>
                </section>
            </article>
        </div>
    );
}

function Input({textoFondo, tipo, imagen}){
    return(
        <article className='relative'>
            <input type={tipo} placeholder={textoFondo} className="w-full px-11 py-3 mb-5 rounded-[50px] backdrop-blur-md border border-white/30 bg-white/15 bl outline-none"  />
            <img src={imagen} alt="" className='absolute left-4 top-3 w-6 h-6' />
        </article>
    );
}

export default Registro;