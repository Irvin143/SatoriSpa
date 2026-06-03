export function Input({textoFondo,tipo, imagen, nombre, valor, onChange, error = null}) {
    return(
        <article>
            {error ?
                <p className='text-red-500 mb-1'>{error}</p>
                :
                <p className='mb-2 block'>{nombre}</p>
            }
            <article className='relative '>
                <input
                    type={tipo}
                    name={nombre}
                    value={valor}
                    onChange={onChange}
                    placeholder={textoFondo}
                    className={`
                        w-full px-11 py-3 mb-2 rounded-[50px]
                        backdrop-blur-md outline-none
                        ${error
                            ? 'border-2 border-red-500'
                            : 'border border-white/30 bg-white/15'}
                    `}
                />
                <img
                    src={imagen}
                    alt=""
                    className='absolute left-4 top-3 w-6 h-6'
                />
            </article>
        </article>
    );
}