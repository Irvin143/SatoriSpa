import { useState } from "react";

const stats = [
  { id: "citas", label: "Citas de hoy", value: "12", delta: "+2 vs. ayer" },
  { id: "ingresos", label: "Ingresos", value: "$1,240", delta: "+8%" },
  { id: "clientes", label: "Clientes nuevos", value: "5", delta: "Esta semana" },
];

const weekDays = [
    { label: "Lun", date: 23 },
    { label: "Mar", date: 24 },
    { label: "Mié", date: 25 },
    { label: "Jue", date: 26 },
    { label: "Vie", date: 27 },
];

const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const blocks = [
  { day: 0, startRow: 1, span: 2, title: "Masaje Sueco", meta: "Lucía G. · 09:30–10:30" },
  { day: 1, startRow: 1, span: 2, title: "Facial Hidratante", meta: "Carlos V. · 09:00–10:30", active: true },
];

const agenda = [
  {
    time: "09:00 – 10:30",
    status: "confirmada",
    client: "Carlos Vargas",
    service: "Facial Hidratante Profundo",
    staff: "Ana S.",
  },
  {
    time: "11:00 – 12:00",
    status: "en curso",
    client: "Elena Robles",
    service: "Masaje de Piedras Calientes",
    staff: "Mario L.",
  },
  {
    time: "13:30 – 14:15",
    status: "cancelada",
    client: "Sofía Méndez",
    service: "Manicura Spa",
    staff: null,
  },
];

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

// function Toolbar({ selectedDate }) {
//   return (
//     <nav
//       aria-label="Acciones de la agenda"
//       className="flex flex-wrap items-center gap-3 rounded-lg border border-[#E4DCCB] bg-white px-4 py-3"
//     >
//       <button
//         type="button"
//         className="rounded-md bg-[#2F5233] px-4 py-2 text-sm font-medium text-white hover:bg-[#274429]"
//       >
//         + Nueva cita
//       </button>
//       <button
//         type="button"
//         className="rounded-md border border-[#D8CFBA] px-4 py-2 text-sm text-[#3A362C] hover:bg-[#F7F3EA]"
//       >
//         Editar
//       </button>
//       <button
//         type="button"
//         className="rounded-md px-4 py-2 text-sm text-[#8A241F] hover:bg-[#FBEEED]"
//       >
//         Cancelar cita
//       </button>

//       <span className="ml-auto flex flex-wrap items-center gap-2">
//         <select
//           aria-label="Filtrar por empleado"
//           className="rounded-md border border-[#D8CFBA] bg-[#FBF8F1] px-3 py-2 text-sm text-[#3A362C]"
//         >
//           <option>Todos los empleados</option>
//         </select>
//         <select
//           aria-label="Filtrar por servicio"
//           className="rounded-md border border-[#D8CFBA] bg-[#FBF8F1] px-3 py-2 text-sm text-[#3A362C]"
//         >
//           <option>Todos los servicios</option>
//         </select>
//         <time
//           dateTime={selectedDate}
//           className="rounded-md border border-[#D8CFBA] bg-[#FBF8F1] px-3 py-2 text-sm text-[#3A362C]"
//         >
//           24/10/2023
//         </time>
//       </span>
//     </nav>
//   );
// }

function WeekCalendar({ activeDay, onSelectDay }) {
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
        <caption className="sr-only">Horario semanal de citas, del 23 al 29 de octubre de 2023</caption>
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
                const block = blocks.find(
                  (b) => b.day === dayIndex && b.startRow === rowIndex + 1
                );
                return (
                  <td key={dayIndex} className="relative h-16 border-l border-[#EEE8DA] align-top p-1">
                    {block && (
                      <article
                        className={
                          "rounded-md border px-2 py-1 text-xs " +
                          (block.active
                            ? "border-[#C8B383] bg-[#F6EFDD]"
                            : "border-[#D9D2C1] bg-[#F3F0E7]")
                        }
                        style={{ minHeight: `${block.span * 3.5}rem` }}
                      >
                        <p className="font-medium text-[#26332B]">{block.title}</p>
                        <p className="text-[#8C8878]">{block.meta}</p>
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

function AgendaItem({ item }) {
  return (
    <li className="border-b border-[#EEE8DA] py-4 last:border-none">
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

export default function PanelSatori() {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="w-full min-h-screen bg-[#FAF6EC] text-[#655e57] font-sans text-[#3A362C]">
      <div className="mx-auto px-6 lg:px-0 py-8">
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

            {/* <Toolbar selectedDate="2023-10-24" /> */}
            <WeekCalendar activeDay={activeDay} onSelectDay={setActiveDay} />
          </div>

          <aside aria-labelledby="agenda-titulo" className="rounded-[16px] shadow-sm bg-white/70 backdrop-blur-md border border-[#E4DCCB] bg-white p-5">
            <h2 id="agenda-titulo" className=" text-xl font-bold">
              Agenda de hoy
            </h2>
            <p className="mb-2 text-sm text-[#8C8878]">Martes, 24 de octubre</p>
            <ul>
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