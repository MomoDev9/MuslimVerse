export default function PrayerMonthCard({ days, city }) {
  if (!Array.isArray(days)) return null;

  const today = new Date().toISOString().split("T")[0];
  const month = new Date().toLocaleString("id-ID", { month: "long" });

  return (
    <div className="overflow-x-auto prayer-month-export">
      <div className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4 text-center">
        Jadwal Sholat Bulan {month} di {city ? ` ${city}` : ""}
      </div>
      <table className="w-full text-sm border">
        <thead className="bg-gray-300 dark:bg-gray-700">
          <tr>
            <th className="md:p-2 dark:text-white border border-gray-400 dark:border-gray-600">
              Tanggal
            </th>
            <th className="md:p-2 dark:text-white border border-gray-400 dark:border-gray-600">
              Imsak
            </th>
            <th className="md:p-2 dark:text-white border border-gray-400 dark:border-gray-600">
              Subuh
            </th>
            <th className="md:p-2 dark:text-white border border-gray-400 dark:border-gray-600">
              Dzuhur
            </th>
            <th className="md:p-2 dark:text-white border border-gray-400 dark:border-gray-600">
              Ashar
            </th>
            <th className="md:p-2 dark:text-white border border-gray-400 dark:border-gray-600">
              Maghrib
            </th>
            <th className="md:p-2 dark:text-white">Isya</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => {
            const isToday =
              day.date.gregorian.date.split("-").reverse().join("-") === today;

            return (
              <tr
                key={day.date.readable}
                data-today={isToday ? "true" : undefined}
                className={`text-center border-t ${
                  isToday ? "bg-green-300 dark:bg-green-700 font-semibold" : ""
                } dark:text-white odd:bg-white even:bg-gray-100/50 dark:odd:bg-gray-900 dark:even:bg-gray-800/70`}
              >
                <td className="py-1 md:p-2 border border-gray-400 dark:border-gray-600">
                  {day.date.gregorian.day}
                </td>
                <td className="py-1 md:p-2 border border-gray-400 dark:border-gray-600">
                  {day.timings.Imsak}
                </td>
                <td className="py-1 md:p-2 border border-gray-400 dark:border-gray-600">
                  {day.timings.Fajr}
                </td>
                <td className="py-1 md:p-2 border border-gray-400 dark:border-gray-600">
                  {day.timings.Dhuhr}
                </td>
                <td className="py-1 md:p-2 border border-gray-400 dark:border-gray-600">
                  {day.timings.Asr}
                </td>
                <td className="py-1 md:p-2 border border-gray-400 dark:border-gray-600">
                  {day.timings.Maghrib}
                </td>
                <td className="py-1 md:p-2 border border-gray-400 dark:border-gray-600">
                  {day.timings.Isha}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
