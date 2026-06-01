import { useState } from "react";
import { Link } from "react-router-dom";


/* ─── Imágenes ────────────────────────────────────────────────────────────── */
import logoSatori       from "../../assets/logoSatori.jpeg";
import fondoHeader      from "../../assets/fondoHeaderPiscina.png";
import imgFacial        from "../../assets/facial.jfif";
import imgMasaje2       from "../../assets/masaje2.jpeg";
import imgMasaje        from "../../assets/masaje.jpeg";
import imgCorporal      from "../../assets/corporal.jfif";
import imgMapa          from "../../assets/mapa.png";
import iconUbicacion    from "../../assets/iconUbicacion.webp";
import iconWhatsapp     from "../../assets/iconWhatssap.png";
import iconCalendario   from "../../assets/iconCalendario.png";
import iconFacebook     from "../../assets/iconFacebook.png";
import iconInsta        from "../../assets/iconInsta.webp";
import iconTiktok       from "../../assets/iconTiktok.png";
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

/* ─── Datos de contacto ───────────────────────────────────────────────────── */
const contactoItems = [
  { icono: iconUbicacion,  label: "Direccion", valor: "Calle Serena 123, Culiacan, Sinaloa" },
  { icono: iconWhatsapp,   label: "Whatsapp",  valor: "123 456 789" },
  { icono: iconCalendario, label: "Horarios",  valor: "Lun - Sab 9:00 - 20:00" },
];

/* ─── Datos de redes sociales ─────────────────────────────────────────────── */
const redes = [
  { href: "https://www.facebook.com/share/1DEBSV2mpa/?mibextid=wwXIfr",          icono: iconFacebook, alt: "Facebook" },
  { href: "https://www.instagram.com/satori_cosmetologia?igsh=eWJvc2lidXZ4cmp2", icono: iconInsta,    alt: "Instagram" },
  { href: "https://www.tiktok.com/@karenmendez719?_r=1&_t=ZS-95Un0OJBJp9",       icono: iconTiktok,   alt: "TikTok" },
];

/* ══════════════════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════════════════════════════════════════════ */
export default function SatoriSpa() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
      {/* Estilos globales que no cubre Tailwind */}
      <style>{globalStyles}</style>

      <div className="bg-[#f5f0e9] font-sans text-base m-0 p-0">

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <article
          className="h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between  text-white"
          style={{ backgroundImage: `url(${fondoHeader})` }} 
        >
          <header className={`grid [grid-template-columns:1fr_1fr_auto_auto] [grid-template-areas:"hamburguesa_logo_extra_login"_"nav_nav_nav_nav"] items-center px-6 lg:[grid-template-areas:"logo_nav_extra_login"] lg:[grid-template-columns:1fr_1fr_auto] lg:px-14  ${
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
              <LinkNav referencia="inicio" texto="Inicio" />
              <LinkNav referencia="servicios" texto="Servicios" />
              <LinkNav referencia="contacto"  texto="Contacto" />
              <LinkNav referencia="redes"  texto="Redes" />
          </nav>

          <img src={logoSatori} alt="Logo Satori" className="[grid-area:logo] -mx-5 w-20 lg:w-[120px]" />

          <article className="bg-[#696969] rounded-full flex items-center justify-center [grid-area:extra] my-[10px] w-10 h-10 lg:w-[50px] lg:h-[50px]">
            <img src={florBeneficios} alt="" className="w-[30px]" />
          </article>
          <article className="[grid-area:login] hidden lg:flex">
            <Link to="/login"  className="no-underline text-[#E5E0D8] font-bold  duration-300 p-2 hover:text-shadow-[0_0_5px_#FFFFFF,0_0_5px_#000] hover:cursor-pointer hover:underline hover:decoration-white hover:scale-110 lg:px-2">Iniciar Sesion</Link>
            <Link to="/registro" className="no-underline text-[#E5E0D8] font-bold  duration-300 p-2 hover:text-shadow-[0_0_5px_#FFFFFF,0_0_5px_#000] hover:cursor-pointer hover:underline hover:decoration-white hover:scale-110 lg:px-2">Registrarse</Link>
          </article>
        </header>

          <article className="flex-1 flex flex-col items-center justify-center  text-white">
            <span className="text-[2em] font-['Times_New_Roman'] font-bold text-center w-[170px] lg:text-[3em] lg:w-[400px]">
              Encuentra tu equilibrio
            </span>
            <p className="text-[1.1em] lg:text-[1.3em] pb-5 ">
              Relajacion, bienestar y cuidado personalizado
            </p>
            <input
              type="button"
              value="Agenda tu cita"
              className="bg-[#696969] rounded-[30px] text-white text-[1.2em] py-5 px-9 border-none cursor-pointer"
            />
          </article>
        </article>

        {/* ── SUBTÍTULO SOBRE NOSOTROS ───────────────────────────────────────── */}

        <SubTitulo titulo="Sobre Nosotros" id="sobre-nosotros" className="subtitulo subtitulo-centrado flex flex-col items-center justify-center lg:bg-[#f5f0e9]"/>

        {/* ── SOBRE NOSOTROS ─────────────────────────────────────────────────── */}
        <section className="sobre-nosotros  text-[#655e57] bg-[#ebe1d7] flex flex-col items-center justify-center mx-auto p-5 w-[90%] h-[80vh] rounded-[50px] lg:flex-row lg:justify-evenly lg:px-20 lg:text-xl">

          <img src={imgFacial}   alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1]" />
          <img src={imgMasaje2}  alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1]" />
          <img src={imgMasaje}   alt="" className="blob-mobile w-[220px] lg:w-[200px] lg:rounded-[10px]" />
          <img src={imgCorporal} alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1]" />
          <img src={imgFacial}   alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1]" />

          <article className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2 lg:px-5">
            <p className="text-[0.9em] italic mb-5 px-4 w-[300px]">
              "Un santuario diseñado para desconectar del ruido exterior y reconectar con tu esencia más profunda."
            </p>
            <span>
              En Satori, cada ritual es una coreografía de bienestar. Fusionamos técnicas ancestrales con la sofisticación moderna para ofrecerte un respiro etéreo.
            </span>
          </article>
        </section>

        {/* ── SUBTÍTULO SERVICIOS ────────────────────────────────────────────── */}
        {/* <article className="ml-5 mt-[50px] mb-[30px]" id="servicios">
          <p className="text-[#655e57] italic mb-0">Nuestra Seleccion</p>
          <h2 className="text-[#615c56] text-[1.8em] font-['Trebuchet_MS'] font-bold my-[10px]">Nuestros Servicios</h2>
          <hr className="border-none h-px bg-[rgba(128,128,128,1)] w-[60px] ml-[10px]" />
        </article> */}
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
        <section className="lg:flex lg:items-center lg:gap-20 lg:mx-15">

        {/* -- BENEFICIOS --*/}
          <section className=" mx-auto lg:w-[60%] ">
            <SubTitulo titulo="Beneficios de nuestros Rituales" id ="beneficios"/>
            <article className="lg:flex lg:gap-5">
              <CardBeneficios Titulo="Paz Mental" Descripcion="Relájate, desconéctate del estrés diario y recarga tu energía con nuestros tratamientos diseñados para brindarte una profunda sensación de paz mental y bienestar integral." Imagen={corazonBenficios}/>
              <CardBeneficios Titulo="Renovación Física" Descripcion="Revitaliza tu cuerpo y recupera tu energía con tratamientos que promueven la renovación física, ayudándote a sentirte más ligero, activo y completamente renovado." Imagen={florBeneficios}/>
              <CardBeneficios Titulo="Equilibrio Interior" Descripcion="Relájate y encuentra tu equilibrio interno con nuestros tratamientos especializados." Imagen={iconBeneficios}/>
            </article>
          </section>
          {/* ── SUSCRIPCIÓN ────────────────────────────────────────────────────── */}
          <section className="bg-[#636161] rounded-[35px] my-5 mx-auto p-8 w-[90%] lg:w-[35%]">
            <article className="flex flex-col items-center text-center">
              <span className="text-white text-[2em]">Unete al Circulo Satori</span>
              <p className="text-white text-[0.9em] my-4">
                Recibe riutales de bienestar y ofertas exclusivas directamente en tu correo electrónico.
              </p>
              <input
                type="text"
                placeholder="Tu email"
                className="rounded-[40px] py-4 px-5 my-[10px] mb-4 w-[90%] text-white bg-[#808080] text-base border-none outline-none"
              />
              <input
                type="button"
                value="SUSCRIBIRME"
                className="rounded-[40px] py-4 px-5 my-[10px] w-[90%] text-[#636161] bg-white text-[1.3em] cursor-pointer border-none"
              />
            </article>
          </section>
        </section>

        {/* ── SUBTÍTULO CONTACTO ─────────────────────────────────────────────── */}
        {/* <article className="ml-5 mt-[50px] mb-[30px]" id="contacto">
          <h2 className="text-[#615c56] text-[1.8em] font-['Trebuchet_MS'] font-bold my-[10px]">Contacto</h2>
          <hr className="border-none h-px bg-[rgba(128,128,128,1)] w-[60px] ml-[10px]" />
        </article> */}
        <SubTitulo titulo="Contacto" id="contacto"/>

        {/* ── CONTACTO ───────────────────────────────────────────────────────── */}
        <section className="mx-auto flex  flex-col gap-5 lg:flex-row lg:justify-between lg:h-[320px] lg:w-[90%]">
          <article className="flex flex-col gap-5  lg:mx-0">
            {contactoItems.map((item) => (
              <ContactoItem
                key={item.label}
                icono={item.icono}
                label={item.label}
                valor={item.valor}
              />
              // <article key={item.label} className="flex items-center">
              //   <article className="bg-[#E5E0D8] rounded-full flex justify-center items-center mr-5 w-[50px] h-[50px]">
              //     <img src={item.icono} alt={item.label} className="w-5 h-5" />
              //   </article>
              //   <article>
              //     <p className="text-[#655e57] text-[0.9em] m-0">{item.label}</p>
              //     <span className="text-[1.2em]">{item.valor}</span>
              //   </article>
              // </article>
            ))}
          </article>
          <article
            onClick={() => window.open("https://maps.google.com", "_blank")}
            className="group w-[80%] h-44 mx-auto my-5 bg-cover bg-center bg-no-repeat cursor-pointer transition duration-300 flex flex-col justify-end items-center hover:brightness-50 lg:w-[50%] lg:h-80 lg:my-0 lg:justify-center"
            style={{ backgroundImage: `url(${imgMapa})` }}
          >
            <p className="text-white text-center w-[60%] bg-black/50  rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
              Presiona para abrir el mapa en Google Maps
            </p>
          </article>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <footer id="redes" className="bg-[#E5E0D8] flex flex-col items-center justify-center p-10 w-full mt-5">
          <span className="text-[1.3em] font-['Times_New_Roman']">SATORI SPA</span>

          <article className="flex justify-center gap-10 my-[30px]">
            {redes.map((red) => (
              <article key={red.alt} className="w-[50px] h-[50px] bg-[#E5E0D8] rounded-full flex justify-center items-center">
                <a href={red.href}>
                  <img src={red.icono} alt={red.alt} className="w-full" />
                </a>
              </article>
            ))}
          </article>

          <p>© 2026 Todos los derechos reservados.</p>
        </footer>

      </div>
    </>
  );
}




function LinkNav({ referencia, texto }) {
  return (
    <a
      href={`#${referencia}`}
      className="no-underline text-[#E5E0D8] font-bold  duration-300 p-2 hover:text-shadow-[0_0_5px_#FFFFFF,0_0_5px_#000] hover:underline hover:decoration-white hover:scale-110 lg:px-8"
    >{texto}</a>
  );
}

function CardBeneficios({ Titulo, Descripcion, Imagen }) {
  return (
    <article className="w-[75%] bg-white rounded-[50px] text-[#655e57] px-4 py-6 mx-auto flex flex-col items-center text-center gap-3 my-5 ">
      <article className="bg-[#E5E0D8] rounded-full flex justify-center items-center w-[80px] h-[80px]">
        <img src={Imagen} alt="" className="w-[50px] "/>
      </article>
      <h2 className="font-bold text-[1.2em]">{Titulo}</h2>
      <p className="text-[0.8em]">{Descripcion}</p>
    </article>
  )
}

function CardServicio({ id, nombre, descripcion, imagen, nombreImagen }) {
  return (
    <article
      key={id}
      className="carrusel-item w-[90%] h-auto flex-shrink-0 rounded-[50px] p-6 bg-white lg:w-[30%] lg:h-full lg:flex-row"
    >
      <article className="border-none rounded-[10px]">
        <img src={imagen} alt={nombreImagen} className="rounded-[30px] w-full"/>
        <article className="flex flex-col mt-4 text-[#655e57]">
          <span className="text-[1.2em] font-bold">{nombre}</span>
          <p className="text-[0.9em]">{descripcion}</p>
          <Link to="/reservacion"
          className="bg-transparent text-[#655e57] text-[0.8em] border-0 border-b border-[#655e57] pb-[3px] self-end cursor-pointer rounded-none hover:text-[#655e57]/80 transition duration-300 hover:scale-105 mt-2">
          RESERVAR </Link>
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

function ContactoItem({ icono, label, valor }) {
  return(
    <article key={label} className="flex items-center pb-3 ml-3">
      <article className="bg-[#E5E0D8] rounded-full flex justify-center items-center mr-5 w-[50px] h-[50px] lg:w-18 lg:h-18">
        <img src={icono} alt={label} className="w-5 h-5 lg:w-7 lg:h-7" />
      </article>
      <article>
        <p className="text-[#655e57] text-[0.9em] m-0">{label}</p>
        <span className="text-[1.2em]">{valor}</span>
      </article>
    </article>
  )
}
