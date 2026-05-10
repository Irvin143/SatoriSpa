import { React } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import "@fontsource/playfair-display";
import iconCorreo from "../assets/Login/iconCorreo.png";
import iconContraseña from "../assets/Login/iconPassword.svg";

function Login() {
    return(
        <div className="flex justify-center items-start h-screen  bg-[url('./assets/fondoLogin.png')] bg-cover bg-center bg-no-repeat">
            <article className='w-[90%] py-10 mt-15 flex flex-col justify-center items-center text-white rounded-[20px] bg-black/60  lg:w-[35%]'>
                <header className="w-[80%] grid grid-cols-3 items-center pb-5 mb-5 ">
                    <Link to="/principal" className="justify-self-start text-xl ">X</Link>
                    <h2 className="justify-self-center text-4xl font-bold">SATORI</h2>
                </header>
                <article className='flex flex-col justify-center items-center mb-10'>
                    <h2 className='text-xl font-bold mb-2'>Bienvenido de nuevo</h2>
                    <span className='text-sm'>Encuentra claridad en el momento</span>
                </article>
                <section className='w-[85%] lg:w-[400px]'>   
                    <form action="">
                        <Input textoFondo="Correo electronico" tipo="email" imagen={iconCorreo} />
                        <Input textoFondo="Constraseña" tipo="password" imagen={iconContraseña} />
                        <a href="/recuperar-contraseña" className="text-sm  hover:underline">¿Olvidaste tu contraseña?</a>
                        <Link to="/principal" className="block w-[90%] bg-[#87520E] text-white text-center text py-3 mx-auto mt-7 rounded-[25px] backdrop-blur-md font-bold hover:cursor-pointer hover:bg-[#87520E]/50 transition-all duration-300">
                            Iniciar Sesión
                        </Link> 
                        <Link to="/registro" className="block w-[90%] bg-white text-[#655e57] text-center py-3 mx-auto mt-6 rounded-[25px] backdrop-blur-md font-bold hover:cursor-pointer hover:bg-[#655e57]/50 hover:text-white transition-all duration-300">
                            Registrarse
                        </Link> 
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
export default Login;