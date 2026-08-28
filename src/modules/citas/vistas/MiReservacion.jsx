
export default function MiReservacion() {
    return( 
        <div>
            <header>
                <h2>Satori</h2>
            </header>
            <main>
                <aside>
                    <h3>Regresaste, </h3>
                    <article>
                        <article>
                            <p>Total sesiones</p>
                        </article>
                    </article>
                </aside>

                <section>
                    <h3> Mi Reservación </h3>
                    <CardReservacion estado="Pendiente" nombreServicio="Servicio 1" fecha="2023-10-10" hora="10:00" />
                </section>
            </main>
        </div>
    );
}

function CardReservacion({estado, nombreServicio, fecha, hora}){
    return(
        <article className='flex flex-col w-full gap-1 p-5 bg-white/95 rounded-[20px] mb-5 '>
            <span>{estado}</span>
            <span>{nombreServicio}</span>

            <article className="flex justify-between items-center">
                <article>
                    <p>Fecha:</p>
                    <p>{fecha}</p>
                </article>
                <article>
                    <p>Hora:</p>
                    <p>{hora}</p>
                </article>
            </article>
        </article>
    );
}