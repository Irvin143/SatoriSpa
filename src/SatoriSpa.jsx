import { useState } from "react";

/* ─── Imágenes ────────────────────────────────────────────────────────────── */
import logoSatori       from "./assets/LogoSatori.jpeg";
import florBeneficios   from "./assets/florBeneficios.png";
import fondoHeader      from "./assets/FondoHeaderPiscina.png";
import imgFacial        from "./assets/Facial.jfif";
import imgMasaje2       from "./assets/Masaje2.jpeg";
import imgMasaje        from "./assets/Masaje.jpeg";
import imgCorporal      from "./assets/Corporal.jfif";
import iconUbicacion    from "./assets/IconUbicacion.webp";
import iconWhatsapp     from "./assets/IconWhatssap.png";
import iconCalendario   from "./assets/IconCalendario.png";
import iconFacebook     from "./assets/IconFacebook.png";
import iconInsta        from "./assets/iconInsta.webp";
import iconTiktok       from "./assets/iconTiktok.png";

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
    .sobre-nosotros > img:nth-child(1) { top: 970px;  right: 1180px; }
    .sobre-nosotros > img:nth-child(2) { top: 950px;  right: 1000px; }
    .sobre-nosotros > img:nth-child(4) { top: 1230px; right: 1160px; }
    .sobre-nosotros > img:nth-child(5) { top: 1250px; right: 1000px; }
    .subtitulo-centrado {
      border-radius: 100px 100px 0 0;
      margin: -60px 0px 0px 0px;
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
];

/* ─── Datos de contacto ───────────────────────────────────────────────────── */
const contactoItems = [
  { icono: iconUbicacion,  label: "Direccion", valor: "Calle Serena 123, Culiacan, Sinaloa" },
  { icono: iconWhatsapp,   label: "Whatsapp",  valor: "123 456 789" },
  { icono: iconCalendario, label: "Horarios",  valor: "Lun - Sab 9:00 - 20:00" },
];
/* ─── Datos de redes sociales ─────────────────────────────────────────────── */
const redes = [
  { href: "https://www.facebook.com/share/1DEBSV2mpa/?mibextid=wwXIfr",              icono: "assets/IconFacebook.png", alt: "Facebook" },
  { href: "https://www.instagram.com/satori_cosmetologia?igsh=eWJvc2lidXZ4cmp2",     icono: "assets/iconInsta.webp",   alt: "Instagram" },
  { href: "https://www.tiktok.com/@karenmendez719?_r=1&_t=ZS-95Un0OJBJp9",           icono: "assets/iconTiktok.png",   alt: "TikTok" },
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

        {/* ── HEADER ─────────────────────────────────────────────────────────── */}
        <header className="grid [grid-template-columns:1fr_1fr_auto] [grid-template-areas:'hamburguesa_logo_extra'_'nav_nav_nav'] items-center px-6 lg:[grid-template-areas:'logo_nav_extra'] lg:[grid-template-columns:1fr_1fr_auto] lg:px-14">

          <button
            className="hamburguesa bg-transparent border-0 cursor-pointer [grid-area:hamburguesa] -mt-[9px] w-[25px] lg:hidden"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav
            id="menuNav"
            className={`[grid-area:nav] flex-col items-center justify-center border-t border-[rgba(200,200,200,0.5)] lg:border-t-0 lg:text-xl lg:flex lg:flex-row lg:items-center lg:justify-center lg:m-0 ${
              menuAbierto ? "flex" : "hidden"
            }`}
          >
            <a href="#"          className="no-underline text-[#615c56] font-bold transition-all duration-300 p-2 lg:px-[10px]">Inicio</a>
            <a href="#servicios" className="no-underline text-[#615c56] font-bold transition-all duration-300 p-2 lg:px-[10px]">Servicios</a>
            <a href="#contacto"  className="no-underline text-[#615c56] font-bold transition-all duration-300 p-2 lg:px-[10px]">Contacto</a>
          </nav>

          <img src="img/LogoSatori.jpeg" alt="Logo Satori" className="[grid-area:logo] -mx-5 w-20 lg:w-[120px]" />

          <article className="bg-blue-600 rounded-full flex items-center justify-center [grid-area:extra] my-[10px] w-10 h-10 lg:w-[50px] lg:h-[50px]">
            <img src="img/florBeneficios.png" alt="" className="w-[30px]" />
          </article>
        </header>

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <article className="h-screen w-full bg-[url('img/FondoHeaderPiscina.png')] bg-cover bg-center bg-no-repeat flex justify-center items-center text-white">
          <article className="flex flex-col items-center justify-center text-white">
            <span className="text-[2em] font-['Times_New_Roman'] font-bold text-center w-[170px]">
              Encuentra tu equilibrio
            </span>
            <p>Relajacion, bienestar y cuidado personalizado</p>
            <input
              type="button"
              value="Agenda tu cita"
              className="bg-[#696969] rounded-[30px] text-white text-[1.2em] py-5 px-9 border-none cursor-pointer"
            />
          </article>
        </article>

        {/* ── SUBTÍTULO SOBRE NOSOTROS ───────────────────────────────────────── */}
        <article className="subtitulo subtitulo-centrado flex flex-col items-center justify-center ml-5 my-[50px] mb-[30px] lg:bg-[#f5f0e9]">
          <h2 className="text-[#615c56] text-[1.8em] font-['Trebuchet_MS'] font-bold my-[10px]">Sobre Nosotros</h2>
          <hr className="border-none h-px bg-[rgba(128,128,128,1)] w-[60px] ml-[10px]" />
        </article>

        {/* ── SOBRE NOSOTROS ─────────────────────────────────────────────────── */}
        <section className="sobre-nosotros text-[#655e57] bg-[#ebe1d7] flex flex-col items-center justify-center mx-auto p-5 w-[90%] h-[80vh] rounded-[50px] lg:flex-row lg:justify-evenly lg:px-20 lg:text-xl">

          <img src="img/Facial.jfif"   alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1]" />
          <img src="img/Masaje2.jpeg"  alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1]" />
          <img src="img/Masaje.jpeg"   alt="" className="blob-mobile w-[220px] lg:w-[200px] lg:rounded-[10px]" />
          <img src="img/Corporal.jfif" alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1]" />
          <img src="img/Facial.jfif"   alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1]" />

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
        <article className="ml-5 mt-[50px] mb-[30px]" id="servicios">
          <p className="text-[#655e57] italic mb-0">Nuestra Seleccion</p>
          <h2 className="text-[#615c56] text-[1.8em] font-['Trebuchet_MS'] font-bold my-[10px]">Nuestros Servicios</h2>
          <hr className="border-none h-px bg-[rgba(128,128,128,1)] w-[60px] ml-[10px]" />
        </article>

        {/* ── CARRUSEL ───────────────────────────────────────────────────────── */}
        <section className="carrusel flex overflow-x-auto gap-4 p-[10px] lg:gap-8 lg:p-5">
          {servicios.map((s) => (
            <article
              key={s.id}
              className="carrusel-item w-[250px] h-auto flex-shrink-0 rounded-[50px] p-6 bg-white lg:w-[500px] lg:h-full"
            >
              <article className="border-none rounded-[10px]">
                <img src={s.imagen} alt={s.nombre} className="rounded-[30px] w-full" />
                <article className="flex flex-col mt-4 text-[#655e57]">
                  <span className="text-[1.2em] font-bold">{s.nombre}</span>
                  <p className="text-[0.9em]">{s.descripcion}</p>
                  <input
                    type="button"
                    value="RESERVAR"
                    className="bg-transparent text-[#655e57] text-[0.8em] border-0 border-b border-[#655e57] pb-[3px] self-end cursor-pointer rounded-none"
                  />
                </article>
              </article>
            </article>
          ))}
        </section>

        {/* ── SUSCRIPCIÓN ────────────────────────────────────────────────────── */}
        <section className="bg-[#636161] rounded-[35px] my-5 mx-auto p-8 w-[90%]">
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

        {/* ── SUBTÍTULO CONTACTO ─────────────────────────────────────────────── */}
        <article className="ml-5 mt-[50px] mb-[30px]" id="contacto">
          <h2 className="text-[#615c56] text-[1.8em] font-['Trebuchet_MS'] font-bold my-[10px]">Contacto</h2>
          <hr className="border-none h-px bg-[rgba(128,128,128,1)] w-[60px] ml-[10px]" />
        </article>

        {/* ── CONTACTO ───────────────────────────────────────────────────────── */}
        <section className="mx-auto p-5">
          <article className="flex flex-col gap-5">
            {contactoItems.map((item) => (
              <article key={item.label} className="flex items-center">
                <article className="bg-[#E5E0D8] rounded-full flex justify-center items-center mr-5 w-[50px] h-[50px]">
                  <img src={item.icono} alt={item.label} className="w-5 h-5" />
                </article>
                <article>
                  <p className="text-[#655e57] text-[0.9em] m-0">{item.label}</p>
                  <span className="text-[1.2em]">{item.valor}</span>
                </article>
              </article>
            ))}
          </article>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <footer className="bg-[#E5E0D8] flex flex-col items-center justify-center p-5 w-full mt-5">
          <span className="text-[1.2em] font-['Times_New_Roman']">SATORI SPA</span>

          <article className="flex justify-center gap-5 my-[30px]">
            {redes.map((red) => (
              <article key={red.alt} className="w-[50px] h-[50px] bg-[#E5E0D8] rounded-full flex justify-center items-center">
                <a href={red.href}>
                  <img src={red.icono} alt={red.alt} className="w-full" />
                </a>
              </article>
            ))}
          </article>

          <p>© 2026 Todos los derechos reservados.</p>
          <hr />
        </footer>

      </div>
    </>
  );
}
