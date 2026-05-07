
import estrellas from "./assets/Citas/estrellas.png";
import iconCalendario from "./assets/iconCalendario.png";
import iconReloj from "./assets/iconReloj.webp";


export default function ResumenSeleccion({servicios, servicioSeleccionado, diaText, diaNumber, mes, horarioSeleccionado}){
    return(
        <article className={`sticky bottom-0  text-[#655e57] w-full pb-2 
            flex flex-col items-center lg:hidden`}>
            <article className={`flex flex-col p-4 w-full bg-[#f4f0ea]/80 bg-white/85 backdrop-blur-md rounded-[25px] border-1 border-white ${servicioSeleccionado ? 'block' : 'hidden'}`}>
                <p className='mb-5'>RESUMEN DE SELECCION</p>
                <article className='flex mb-2'>
                    <article className='flex justify-center items-center w-[40px] mr-2 rounded-[10px] bg-[#EBD2B0]'>
                        <img src={estrellas} alt="" className='w-[35px]' />
                    </article>
                    <article className=''>
                        <p className='text-[0.8em]'>Servicio</p>
                        <span className="font-bold">{servicios.find(s => s.id === servicioSeleccionado)?.nombre || ''}</span>
                    </article>
                </article>
                <article className='flex justify-between text-[0.8em]'>
                    <article className='flex gap-2 mb-2 items-center w-[60%] '>
                        <img src={iconCalendario} alt="" className='w-[15px]' />
                        <article>
                            <span>Fecha</span>
                            <p>
                                {diaText},
                                {/* Dia en numero */}
                                {diaNumber}  de 
                                {/* Mes en nombre */} {mes}
                                </p>
                        </article>
                    </article>
                    <article className='flex gap-2 items-center w-[40%]'>
                        <img src={iconReloj} alt="" className='w-[15px]' />
                        <article>
                            <span>Hora</span>
                            <p>{horarioSeleccionado || 'Sin horario seleccionado'}</p>
                        </article>
                    </article>
                </article>
            </article>
        </article>
    );
}