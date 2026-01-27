"use client";

import { useEffect, useState } from "react";
import { getMonth } from "@/lib/calendarApi";
import { ISLAMIC_EVENTS } from "@/lib/islamicEvents";

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabiul Awal",
  "Rabiul Akhir",
  "Jumadil Awal",
  "Jumadil Akhir",
  "Rajab",
  "Sya’ban",
  "Ramadhan",
  "Syawal",
  "Dzulqa’dah",
  "Dzulhijjah",
];

const DAYS = ["Ahad", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function Calendar() {
  const [hMonth, setHMonth] = useState(null);
  const [hYear, setHYear] = useState(null);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  const today = new Date();

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
      month: "numeric",
      year: "numeric",
    });

    const parts = fmt.formatToParts(today);
    setHMonth(Number(parts.find((p) => p.type === "month")?.value));
    setHYear(Number(parts.find((p) => p.type === "year")?.value));
  }, []);

  useEffect(() => {
    if (!hMonth || !hYear) return;

    getMonth(hMonth, hYear).then((data) => {
      setDays(data);
      setSelectedDay(null);
    });
  }, [hMonth, hYear]);

  const prevMonth = () => {
    setSelectedDay(null);
    if (hMonth === 1) {
      setHMonth(12);
      setHYear((y) => y - 1);
    } else {
      setHMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    setSelectedDay(null);
    if (hMonth === 12) {
      setHMonth(1);
      setHYear((y) => y + 1);
    } else {
      setHMonth((m) => m + 1);
    }
  };

  if (!hMonth || !hYear) return null;

  const event = selectedDay && ISLAMIC_EVENTS[`${selectedDay}-${hMonth}`];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-white rounded"
        >
          ←
        </button>

        <h2 className="text-xl font-semibold dark:text-white">
          {HIJRI_MONTHS[hMonth - 1]} {hYear} H
        </h2>

        <button
          onClick={nextMonth}
          className="px-3 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-white rounded "
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2 text-center text-zinc-600 dark:text-zinc-400">
        {DAYS.map((d) => (
          <div key={d} className="text-sm font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const hDay = Number(d.hijri.day);
          const gDay = Number(d.gregorian.day);

          const isToday =
            Number(d.gregorian.day) === today.getDate() &&
            Number(d.gregorian.month.number) === today.getMonth() + 1 &&
            Number(d.gregorian.year) === today.getFullYear();

          const hasEvent = ISLAMIC_EVENTS[`${hDay}-${hMonth}`];

          return (
            <button
              key={d.gregorian.date}
              onClick={() => setSelectedDay(hDay)}
              className={`
                relative min-h-18 p-2 rounded-lg border text-left 
                ${hasEvent ? "border-green-500" : "border-zinc-200"}
                ${isToday ? "bg-blue-300 border-blue-700" : ""}
                ${selectedDay === hDay ? "ring-2 ring-green-500" : ""}
                hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-white dark:bg-zinc-800
              `}
            >
              <div className="text-base font-semibold leading-none">{hDay}</div>
              <div className="text-xs text-orange-500 mt-1">
                {gDay} {d.gregorian.month.en.slice(0, 3)}
              </div>

              {hasEvent && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {selectedDay && (
        <div className="mt-6 rounded-lg border p-4 bg-zinc-50 dark:bg-zinc-800">
          <p className="font-semibold dark:text-white">
            {selectedDay} {HIJRI_MONTHS[hMonth - 1]} {hYear} H
          </p>

          {event ? (
            <>
              <p className="mt-1 font-medium text-green-700 dark:text-green-400">
                {event.title}
              </p>
              <p
                className="mt-1 text-sm text-zinc-600 dark:text-zinc-300"
                dangerouslySetInnerHTML={{
                  __html: event.description.replace(/\. /g, ".<br />"),
                }}
              />
            </>
          ) : (
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              Tidak ada peringatan khusus
            </p>
          )}
        </div>
      )}
    </div>
  );
}
