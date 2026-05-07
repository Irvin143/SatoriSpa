import { React } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import "@fontsource/playfair-display";

function Login() {
    return(
        <div className="flex justify-center items-center h-screen  bg-[url('./assets/fondoLogin.png')] bg-cover bg-center bg-no-repeat">
            <article className='w-[90%] py-10 flex flex-col justify-center items-center text-white rounded-[20px] bg-black/60 '>
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
                        <Input textoFondo="Correo electronico" tipo="email" />
                        <Input textoFondo="Constraseña" tipo="password" />
                        <a href="/recuperar-contraseña" className="text-sm  hover:underline">¿Olvidaste tu contraseña?</a>
                        <Link to="/principal" className="block w-[90%] bg-[#655e57] text-white text-center text py-3 mx-auto mt-15 rounded-[25px] backdrop-blur-md font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300">
                            Iniciar Sesión
                        </Link> 
                        <Link to="/registro" className="block w-[90%] bg-white text-[#655e57] text-center py-3 mx-auto mt-6 rounded-[25px] backdrop-blur-md font-bold hover:cursor-pointer hover:bg-[#655e57]/70 transition-all duration-300">
                            Registrarse
                        </Link> 
                    </form>
                </section>
            </article>
        </div>
    );
}

function Input({textoFondo, tipo}){
    return(
        <article>
            <input type={tipo} placeholder={textoFondo} className="w-full px-4 py-3 mb-5 rounded-[50px] backdrop-blur-md border border-white/30 bg-white/15 bl outline-none"  />
        </article>
    );
}

export default Login;