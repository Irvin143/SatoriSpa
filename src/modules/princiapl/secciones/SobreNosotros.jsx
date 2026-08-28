import imgFacial        from "../../../assets/facial.jfif";
import imgMasaje2       from "../../../assets/masaje2.jpeg";
import imgMasaje        from "../../../assets/masaje.jpeg";
import imgCorporal      from "../../../assets/corporal.jfif";

export function SobreNosotros() {
    return(
    <section className="sobre-nosotros  text-[#655e57] bg-[#ebe1d7] flex flex-col items-center justify-center mx-auto p-5 w-[90%] h-[80vh] rounded-[50px] lg:flex-row lg:justify-evenly lg:px-20 lg:text-xl">
        <article className="relative"> 
        <img src={imgFacial}   alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1] left-[-20px] top-[-10px]" />
        <img src={imgMasaje2}  alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1] left-[100px] bottom-[-30px]" />
        <img src={imgMasaje}   alt="" className="blob-mobile w-[220px] lg:w-[200px] lg:rounded-[10px]" />
        <img src={imgCorporal} alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1] left-[120px] top-[0px]" />
        <img src={imgFacial}   alt="" className="hidden lg:block lg:absolute lg:w-[120px] lg:rounded-[10px] lg:z-[1]" />
        </article>

        <article className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2 lg:px-5">
        <p className="text-[0.9em] italic mb-5 px-4 w-[300px]">
            "Un santuario diseñado para desconectar del ruido exterior y reconectar con tu esencia más profunda."
        </p>
        <span>
            En Satori, cada ritual es una coreografía de bienestar. Fusionamos técnicas ancestrales con la sofisticación moderna para ofrecerte un respiro etéreo.
        </span>
        </article>
    </section>
    );
}