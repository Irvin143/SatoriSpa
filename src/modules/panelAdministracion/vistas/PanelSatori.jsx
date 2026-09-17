import { useState, useEffect, useCallback } from "react";
import { getCitasPorRango, getCitasPorDia, getCountCitasHoy, getIngresosHoy, getCountClientesNuevos } from "./Satori/Services/useSatori.js";
import { getLunesDeLaSemana, generarDiasSemana, formatFechaISO, horaAFila,getIndiceDiaHoy } from "./Satori/utils/satoriUtil.js";

const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const statusStyles = {
  confirmada: "bg-[#E7EFE6] text-[#33553A] border-[#B9D2B6]",
  "en curso": "bg-[#F4E9D3] text-[#7A5A17] border-[#E3C98C]",
  cancelada: "bg-[#F5E1E0] text-[#8A3B37] border-[#E4B6B2]",
};

function StatCard({ label, value, delta }) {
  return (
    <article className="flex flex-1 items-start justify-between rounded-[16px] border border-[#E4DCCB] bg-white/70 backdrop-blur-md px-5 py-4 shadow-sm ">
      <div>
        <p className="text-sm ">{label}</p>
        <p className="mt-1 font-bold text-2xl ">{value}</p>
        <p className="mt-1 text-xs ">{delta}</p>
      </div>
    </article>
  );
}

function AgendaItem({ item }) {
  return (
    <li className="border-b border-[#EEE8DA] py-4 last:border-none ">
      <div className="flex items-center justify-between gap-2">
        <time className="text-xs text-[#8C8878]">{item.time}</time>
        <span
          className={
            "rounded-full border px-2 py-0.5 text-[11px] font-medium " + statusStyles[item.status]
          }
        >
          {item.status}
        </span>
      </div>
      <p className="mt-1  text-base text-[#26332B]">{item.client}</p>
      <p className="text-sm text-[#5B5748]">{item.service}</p>
      {item.staff && (
        <p className="mt-1 text-xs text-[#8C8878]">Terapista: {item.staff}</p>
      )}
    </li>
  );
}

function WeekCalendar({ activeDay, onSelectDay, weekDays, citas }) {
    console.log("Citas para la semana:", citas);
  return (
    <section aria-labelledby="calendario-titulo" className="rounded-[16px] border border-[#E4DCCB] bg-white p-4">
      <header className="mb-4 flex items-center justify-between">
        <h2 id="calendario-titulo" className=" text-xl">
          Octubre 23 – 29, 2023
        </h2>
        <div className="flex items-center gap-2 text-sm ">
          <button type="button" aria-label="Semana anterior" className="rounded p-1 hover:bg-[#F1ECDF]">
            ‹
          </button>
          <button type="button" className="rounded-md border border-[#D8CFBA] px-3 py-1 hover:bg-[#F1ECDF]">
            Hoy
          </button>
          <button type="button" aria-label="Semana siguiente" className="rounded p-1 hover:bg-[#F1ECDF]">
            ›
          </button>
        </div>
      </header>

      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">Horario semanal de citas</caption>
        <thead>
          <tr>
            <th scope="col" className="w-16"></th>
            {weekDays.map((d, i) => (
              <th key={d.label} scope="col" className="pb-3 text-center font-normal">
                <button
                  type="button"
                  onClick={() => onSelectDay(i)}
                  aria-pressed={activeDay === i}
                  className="flex flex-col items-center gap-1"
                >
                  <span>{d.label}</span>
                  <span
                    className={
                      "flex h-7 w-7 items-center justify-center rounded-full text-base " +
                      (activeDay === i
                        ? "bg-[#2F5233] font-medium text-white"
                        : "text-[#3A362C]")
                    }
                  >
                    {d.date}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, rowIndex) => (
            <tr key={hour} className="border-t border-[#EEE8DA]">
              <th scope="row" className="py-4 pr-2 text-right align-top font-normal">
                {hour}
              </th>
              {weekDays.map((_, dayIndex) => {
                const cita = citas.find(
                  (b) => b.day === dayIndex && b.startRow === rowIndex + 1
                );
                return (
                  <td key={dayIndex} className="relative  border-l border-[#EEE8DA] align-top p-1">
                    {cita && (
                      <article
                        className={
                          "rounded-md border px-2 py-1 min-h-30 lg:min-h-20 text-xs " +
                          (cita.active
                            ? "border-[#C8B383] bg-[#F6EFDD]"
                            : "border-[#D9D2C1] bg-[#F3F0E7]")
                        }
                      >
                        <p className="font-medium text-[#26332B]">{cita.title}</p>
                        <p className="text-[#8C8878]">{cita.meta}</p>
                      </article>
                    )}
                    {activeDay === dayIndex && rowIndex === 1 && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-2 border-t-2 border-[#B0332C]"
                      >
                        <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[#B0332C]" />
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

// StatCard, WeekCalendar, AgendaItem se quedan IGUAL que ya los tienes.

export default function PanelSatori() {
  const [lunes, setLunes] = useState(getLunesDeLaSemana());
  const [activeDay, setActiveDay] = useState(() => getIndiceDiaHoy() ?? 0); // <- antes era useState(1)
  const [weekDays, setWeekDays] = useState(() => generarDiasSemana(getLunesDeLaSemana()));

  const [citasSemana, setCitasSemana] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [stats, setStats] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Recalcular weekDays cuando cambie "lunes"
  useEffect(() => {
    setWeekDays(generarDiasSemana(lunes));
  }, [lunes]);

  // Cargar citas de la semana (para la grilla)
  const cargarCitasSemana = useCallback(async () => {
    const dias = generarDiasSemana(lunes);
    const inicio = dias[0].isoDate;
    const fin = dias[dias.length - 1].isoDate;

    const data = await getCitasPorRango(inicio, fin);
    console.log("Citas de la semana:", data);

    const citasFormateadas = data
      .map((c) => {
        const dayIndex = dias.findIndex((d) => d.isoDate === c.fechaCita);
        const startRow = horaAFila(c.hora, hours);
        if (dayIndex === -1 || startRow === null) return null;

        return {
          day: dayIndex,
          startRow,
          span: c.servicios ? Math.max(1, Math.round(c.servicios.duracion / 60)) : 1,
          title: c.servicios?.nombre ?? "Servicio",
          meta: `${c.nombreCliente} · ${c.hora?.slice(0, 5)}`,
          estado: c.estado,
        };
      })
      .filter(Boolean);
      console.log("Citas formateadas para la semana:", citasFormateadas);

    setCitasSemana(citasFormateadas);
  }, [lunes]);

  // Cargar agenda del día seleccionado
  const cargarAgendaDelDia = useCallback(async () => {
    const dias = generarDiasSemana(lunes);
    const fechaSeleccionada = dias[activeDay]?.isoDate;
    if (!fechaSeleccionada) return;

    const data = await getCitasPorDia(fechaSeleccionada);

    const agendaFormateada = data.map((c) => ({
      time: c.hora?.slice(0, 5) ?? "",
      status: c.estado,
      client: c.nombreCliente,
      service: c.servicios?.nombre ?? "Servicio",
      staff: null, // pendiente: aún no hay relación de staff en "citas"
    }));

    setAgenda(agendaFormateada);
  }, [lunes, activeDay]);

  // Cargar stats (tarjetas resumen)
  const cargarStats = useCallback(async () => {
    const hoy = formatFechaISO(new Date());
    const dias = generarDiasSemana(lunes);
    const inicioSemana = dias[0].isoDate;
    const finSemana = dias[dias.length - 1].isoDate;

    const [citasHoy, ingresosHoy, clientesNuevos] = await Promise.all([
      getCountCitasHoy(hoy),
      getIngresosHoy(hoy),
      getCountClientesNuevos(inicioSemana, finSemana),
    ]);

    setStats([
      { id: "citas", label: "Citas de hoy", value: String(citasHoy), delta: "" },
      { id: "ingresos", label: "Ingresos", value: `$${ingresosHoy.toLocaleString()}`, delta: "Hoy" },
      { id: "clientes", label: "Clientes nuevos", value: String(clientesNuevos), delta: "Esta semana" },
    ]);
  }, [lunes]);

  // Disparar todas las cargas
  useEffect(() => {
    let activo = true;
    setLoading(true);
    setError(null);

    Promise.all([cargarCitasSemana(), cargarAgendaDelDia(), cargarStats()])
      .catch((err) => {
        if (activo) setError(err);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [cargarCitasSemana, cargarAgendaDelDia, cargarStats]);

  if (loading) {
    return <div className="p-10 text-center text-[#8C8878]">Cargando panel...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-[#8A3B37]">Ocurrió un error al cargar los datos.</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#FAF6EC] text-[#655e57] font-sans text-[#3A362C] lg:mb-5">
      <div className="mx-auto px-6 lg:px-0">
        <header className="mb-6">
          <h1 className="font-bold text-3xl">Dashboard</h1>
          <p className="text-sm text-[#8C8878]">Vista general de tu spa, en tiempo real.</p>
        </header>

        <main className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            <section aria-label="Resumen del día" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <StatCard key={s.id} {...s} />
              ))}
            </section>

            <WeekCalendar
              activeDay={activeDay}
              onSelectDay={setActiveDay}
              weekDays={weekDays}
              citas={citasSemana}
            />
          </div>

          <aside aria-labelledby="agenda-titulo" className="rounded-[16px] shadow-sm mb-10 lg:mb-0 bg-white/70 backdrop-blur-md border border-[#E4DCCB] bg-white p-5">
            <h2 id="agenda-titulo" className=" text-xl font-bold">
              Agenda de {weekDays[activeDay]?.label ?? ""}
            </h2>
            <p className="mb-2 text-sm text-[#8C8878]">
              {weekDays[activeDay] ? `Día ${weekDays[activeDay].date}` : ""}
            </p>
            <ul>
              {agenda.length === 0 && (
                <li className="py-4 text-sm text-[#8C8878]">No hay citas para este día.</li>
              )}
              {agenda.map((item, i) => (
                <AgendaItem key={i} item={item} />
              ))}
            </ul>
          </aside>
        </main>
      </div>
    </div>
  );
}