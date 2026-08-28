import iconFacebook     from "../../../assets/iconFacebook.png";
import iconInsta        from "../../../assets/iconInsta.webp";
import iconTiktok       from "../../../assets/iconTiktok.png";

const redes = [
    { href: "https://www.facebook.com/share/1DEBSV2mpa/?mibextid=wwXIfr",          icono: iconFacebook, alt: "Facebook" },
    { href: "https://www.instagram.com/satori_cosmetologia?igsh=eWJvc2lidXZ4cmp2", icono: iconInsta,    alt: "Instagram" },
    { href: "https://www.tiktok.com/@karenmendez719?_r=1&_t=ZS-95Un0OJBJp9",       icono: iconTiktok,   alt: "TikTok" },
];

export function Footer() {
    return(
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
    );
}