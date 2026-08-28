import iconUbicacion    from "../../../assets/iconUbicacion.webp";
import iconWhatsapp     from "../../../assets/iconWhatssap.png";
import iconCalendario   from "../../../assets/iconCalendario.png";
import imgMapa          from "../../../assets/mapa.png";

const contactoItems = [
    { icono: iconUbicacion,  label: "Direccion", valor: "Calle Serena 123, Culiacan, Sinaloa" },
    { icono: iconWhatsapp,   label: "Whatsapp",  valor: "123 456 789" },
    { icono: iconCalendario, label: "Horarios",  valor: "Lun - Sab 9:00 - 20:00" },
];
export function Contacto() {
    return(
        <section className="mx-auto flex  flex-col gap-5 lg:flex-row lg:justify-between lg:h-[320px] lg:w-[90%]">
            <article className="flex flex-col gap-5  lg:mx-0">
                {contactoItems.map((item) => (
                <ContactoItem
                    key={item.label}
                    icono={item.icono}
                    label={item.label}
                    valor={item.valor}
                />
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
    );
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