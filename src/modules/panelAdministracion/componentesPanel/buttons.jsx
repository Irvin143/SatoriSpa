export function BotonFiltro({ texto, btnSeleccionado, onClick }) {
    return(
        <button 
            onClick={onClick}
            className={`
                px-5 py-2 rounded-[50px] text-xs font-bold shrink-0
                hover:cursor-pointer  transition-all duration-300
                ${
                    btnSeleccionado === texto
                        ? "bg-white/80 text-[#655e57] shadow-xl shadow-black/40"
                        : "hover:scale-110"
                }
            `}
        >
            {texto}
        </button>
    );
}