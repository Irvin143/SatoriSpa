import corazonBenficios from "../../../assets/corazonBeneficios.png";
import florBeneficios from "../../../assets/florBeneficios.png";
import iconBeneficios from "../../../assets/iconBeneficios.png";

export function Beneficios() {
    return(
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

function SubTitulo({ titulo, id, subtitulo = "", className = ""}) {
  return(
    <article className={`ml-5 mt-[50px] mb-[30px] ${className}`} id={id}>
      <p className="text-[#655e57] italic mb-0 lg:text-[1.2em]" >{subtitulo}</p>
      <h2 className="text-[#615c56] text-[1.8em] font-['Trebuchet_MS'] font-bold my-[10px] lg:text-[2em]" >{titulo}</h2>
      <hr className="border-none h-px bg-[rgba(128,128,128,1)] w-[60px] ml-[10px]" />
    </article>
  )
}