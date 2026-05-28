
import iconLupa from "../../../assets/iconLupa.png";

export function InputBuscar({placeholder}){
    return(
        <article className='relative w-full mt-5 mb-5'>
            <img src={iconLupa} alt="Buscar" className='absolute left-3 top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]' />
            <input
                type="text"
                placeholder={placeholder}
                className="
                    pl-10 py-3
                    rounded-[10px]
                    w-full
                    bg-white/60
                    placeholder:text-[#655e57]
                    text-[#655e57]
                    shadow-[0_6px_20px_rgba(0,0,0,0.12)]
                "
                />   
        </article>
    )
} 