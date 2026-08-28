import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../Auth/AuthContext";
import { obtenerRolUsuario } from './services/usePrincipal.js';

{/* ─── SECCIONES ────────────────────────────────────────────────────────────── */}
import { SobreNosotros } from "./secciones/SobreNosotros.jsx";
import { Beneficios } from "./secciones/Beneficios.jsx";
import { Contacto } from "./secciones/Contacto.jsx";
import { Footer } from "./secciones/Footer.jsx";


/* ─── Imágenes ────────────────────────────────────────────────────────────── */
import logoSatori       from "../../assets/logoSatori.jpeg";
import fondoHeader      from "../../assets/fondoHeaderPiscina.png";
import imgFacial        from "../../assets/facial.jfif";
import imgMasaje2       from "../../assets/masaje2.jpeg";
import imgMasaje        from "../../assets/masaje.jpeg";
import imgCorporal      from "../../assets/corporal.jfif";
import corazonBenficios from "../../assets/corazonBeneficios.png";
import florBeneficios from "../../assets/florBeneficios.png";
import iconBeneficios from "../../assets/iconBeneficios.png";

/* ─── Estilos globales que no tienen equivalente en Tailwind ──────────────── */
const globalStyles = `
  .carrusel {
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
  }
  .carrusel-item {
    scroll-snap-align: center;
  }
  .blob-mobile {
    border-radius: 70% 30% 65% 35% / 65% 70% 30% 35%;
  }
  header button span {
    display: block;
    height: 2px;
    background: black;
    margin: 3px 0;
    border-radius: 2px;
    transition: 0.3s;
  }
  @media (min-width: 1024px) {
    .sobre-nosotros {
      border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
    }
    .sobre-nosotros > img:nth-child(1) { top: 970px;  right: 1180px; width: 120px; }
    .sobre-nosotros > img:nth-child(2) { top: 950px;  right: 1000px; }
    .sobre-nosotros > img:nth-child(4) { top: 1230px; right: 1160px; }
    .sobre-nosotros > img:nth-child(5) { top: 1250px; right: 1000px; }
    .sobre-nosotros > img:nth-child(3) { border-radius:10px; }

    .subtitulo-centrado {
      border-radius: 100px 100px 0 0;
      margin:0px;
      margin-top: 53px;
    }
    .subtitulo-centrado h2 {
      position: relative;
      top: 230px;
    }
  }
`;

/* ─── Datos de servicios (fácil de ampliar) ───────────────────────────────── */
const servicios = [
  {
    id: 1,
    nombre: "Masajes",
    descripcion: "Equilibrio total a travez de presiones ritmicas y aceites botanicos.",
    imagen: imgMasaje2,
  },
  {
    id: 2,
    nombre: "Faciales",
    descripcion: "Equilibrio total a travez de presiones ritmicas y aceites botanicos.",
    imagen: imgFacial,
  },
  {
    id: 3,
    nombre: "Faciales",
    descripcion: "Equilibrio total a travez de presiones ritmicas y aceites botanicos.",
    imagen: imgFacial,
  },
];

export default function SatoriSpa() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const { user, loading, signOut } = useAuth();
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const obtenerRol = async () => {
      if (!user) return;
      console.log("Usuario actual:", user.id);

      const resultado = await obtenerRolUsuario(user.id);

      if (resultado.success) {
        setRol(resultado.rol);
        console.log("Rol del usuario:", resultado.rol);
      } else {
        console.error(resultado.error);
      }
    
    };

    obtenerRol();
  }, [user]);

  return (
    <>
      {/* Estilos globales que no cubre Tailwind */}
      <style>{globalStyles}</style>

      <div className="bg-[#f5f0e9] font-sans text-base m-0 p-0">

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <article
          className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col z-1 justify-between  text-white"
          style={{ backgroundImage: `url(${fondoHeader})` }} 
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent  pointer-events-none" />
    
          <header className={`grid [grid-template-columns:1fr_1fr_auto_auto] [grid-template-areas:"hamburguesa_logo_extra_login"_"nav_nav_nav_nav"] items-center px-6 lg:[grid-template-areas:"logo_nav_extra_login"] lg:[grid-template-columns:1fr_1fr_auto] lg:px-14 lg:absolute ${
              menuAbierto ? "bg-black/30" : "bg-transparent"}`}>

          <article className="flex items-center justify-start [grid-area:hamburguesa] lg:hidden">
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="flex flex-col ">
                <span className="block w-6 h-0.5 bg-[#655e57]"></span>
                <span className="block w-6 h-0.5 bg-[#655e57]"></span>
                <span className="block w-6 h-0.5 bg-[#655e57]"></span>
            </button>
          </article>

          <nav id="menuNav"
            className={`[grid-area:nav] flex-col items-center justify-center border-t border-[rgba(200,200,200,0.5)] lg:border-t-0 lg:text-xl lg:flex lg:flex-row lg:items-center lg:justify-center lg:m-0   ${
              menuAbierto ? "flex" : "hidden"}` }>
              {rol === "administrador" && (<Link to="/administracion" className="no-underline text-white font-bold  duration-300 p-2 hover:text-shadow-[0_0_5px_#FFFFFF,0_0_5px_#000] hover:underline hover:decoration-white hover:scale-110 lg:px-8">Satori </Link>)}
              {user ? (<Link to="/servicios" className="no-underline text-center text-white font-bold  duration-300 p-2 hover:text-shadow-[0_0_5px_#FFFFFF,0_0_5px_#000] hover:underline hover:decoration-white hover:scale-110 lg:px-8">Mis citas</Link>) : (<></>)}
              <LinkNav referencia="inicio" texto="Inicio" />
              <LinkNav referencia="servicios" texto="Servicios" />
              <LinkNav referencia="contacto"  texto="Contacto" />
              <LinkNav referencia="redes"  texto="Redes" />
          </nav>

          <img src={logoSatori} alt="Logo Satori" className="[grid-area:logo] -mx-5 w-20 lg:w-[120px]" />

          <Link to="/login" className="bg-white rounded-full flex items-center justify-center [grid-area:extra] my-[10px] w-10 h-10 lg:w-[50px] lg:h-[50px]">
            <img src={florBeneficios} alt="" className="w-[30px]" />
          </Link>
          <article className="[grid-area:login] hidden lg:flex lg:items-center lg:mx-2">
            {user ? (
              <>
                <span className="text-[#E5E0D8] font-bold mr-4">{user.email}</span>
                <button onClick={signOut} className="bg-[#E5E0D8] text-[#655e57] text-sm font-bold py-2 px-3 rounded-full hover:bg-[#E5E0D8]/80 hover:cursor-pointer transition duration-300">
                  Cerrar Sesión
                </button>
              </> ) : (
                <>
                  <Link to="/login"  className="no-underline text-[#E5E0D8] font-bold  duration-300 p-2 hover:text-shadow-[0_0_5px_#FFFFFF,0_0_5px_#000] hover:cursor-pointer hover:underline hover:decoration-white hover:scale-110 lg:px-2">Iniciar Sesion</Link>
                  <Link to="/registro" className="no-underline text-[#E5E0D8] font-bold  duration-300 p-2 hover:text-shadow-[0_0_5px_#FFFFFF,0_0_5px_#000] hover:cursor-pointer hover:underline hover:decoration-white hover:scale-110 lg:px-2">Registrarse</Link>
                </>)
              }
          </article>
          </header>

          <article className="flex-1 flex flex-col items-center justify-center  text-white">
            <span className="text-[2em] font-['Times_New_Roman'] font-bold text-center w-[170px] lg:text-[3em] lg:w-[400px]">
              Encuentra tu equilibrio
            </span>
            <p className="text-[1.1em] lg:text-[1.3em] pb-5 ">
              Relajacion, bienestar y cuidado personalizado
            </p>
            <Link to="/reservacion"
              className="bg-[#696969] rounded-[30px] text-white text-[1.2em] py-5 px-9 border-none cursor-pointer"
            >
              Agenda tu cita
            </Link>
          </article>

        </article>

        {/* ── SUBTÍTULO SOBRE NOSOTROS ───────────────────────────────────────── */}

        <SubTitulo titulo="Sobre Nosotros" id="sobre-nosotros" className="subtitulo subtitulo-centrado flex flex-col items-center justify-center lg:bg-[#f5f0e9]"/>

        {/* ── SOBRE NOSOTROS ─────────────────────────────────────────────────── */}
        <SobreNosotros />

        {/* ── SUBTÍTULO SERVICIOS ────────────────────────────────────────────── */}
        <SubTitulo titulo="Nuestros Servicios" id="servicios" subtitulo="Nuestra Seleccion" />

        {/* ── CARRUSEL DE SERVICIOS ───────────────────────────────────────────────────────── */}
        <section className="carrusel flex overflow-x-auto gap-4 p-[10px] lg:gap-8 lg:text-[1.2em] lg:p-5  lg:justify-center mx-auto">
          {servicios.map((s) => (
            <CardServicio
              key={s.id}
              id={s.id}
              nombre={s.nombre}
              descripcion={s.descripcion}
              imagen={s.imagen}
              nombreImagen={s.nombre}
            />
          ))}
        </section>

        {/* BENEFICIOS Y SUSCRIPCION */}
        <Beneficios/>

        {/* ── SUBTÍTULO CONTACTO ─────────────────────────────────────────────── */}
        <SubTitulo titulo="Contacto" id="contacto"/>

        {/* ── CONTACTO ───────────────────────────────────────────────────────── */}
        <Contacto/>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <Footer />

      </div>
    </>
  );
}




function LinkNav({ referencia, texto }) {
  return (
    <a
      href={`#${referencia}`}
      className="no-underline text-white font-bold  duration-300 p-2 hover:text-shadow-[0_0_5px_#FFFFFF,0_0_5px_#000] hover:underline hover:decoration-white hover:scale-110 lg:px-8"
    >{texto}</a>
  );
}



function CardServicio({ id, nombre, descripcion, imagen, nombreImagen }) {
  return (
    <article
      key={id}
      className="carrusel-item w-[90%] h-auto flex-shrink-0 rounded-[50px] p-6 bg-white lg:w-[30%] lg:h-full lg:flex-row hover:shadow-xl hover:-translate-y-1 hover:bg-[#FFF] transition-all duration-300 mx-auto"
    >
      <article className="border-none rounded-[10px]">
        <img src={imagen} alt={nombreImagen} className="rounded-[30px] w-full"/>
        <article className="flex flex-col mt-4 text-[#655e57]">
          <span className="text-[1.2em] font-bold">{nombre}</span>
          <p className="text-[0.9em]">{descripcion}</p>
          <Link to="/servicios"
          className="bg-transparent text-[#655e57] text-[0.8em] border-0 border-b border-[#655e57] pb-[3px] self-end cursor-pointer rounded-none hover:text-[#655e57]/80 transition duration-300 hover:scale-105 mt-2">
          VER MAS </Link>
        </article>
      </article>
    </article>
  )
}  

function SubTitulo({ titulo, id, subtitulo = "", className = ""}) {
  return(
    <article className={`ml-5 mt-[50px] mb-[30px] ${className}`} id={id}>
      <p className="text-[#655e57] italic mb-0 lg:text-[1.2em]" >{subtitulo}</p>
      <h2 className="text-[#615c56] text-[1.8em] font-['Trebuchet_MS'] font-bold my-[10px] lg:text-[2em]" >{titulo}</h2>
      <hr className="border-none h-px bg-[rgba(128,128,128,1)] w-[60px] ml-[10px]" />
    </article>
  )
}

