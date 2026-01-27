export default function PrayerMonthCard({ days, city }) {
  if (!Array.isArray(days)) return null;

  const today = new Date().toISOString().split("T")[0];
  const month = new Date().toLocaleString("id-ID", { month: "long" });

  return (
    <div className="overflow-x-auto">
      <div className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4 text-center">
        Jadwal Sholat Bulan {month} di {city ? ` ${city}` : ""}
      </div>
      <table className="w-full text-sm border">
        <thead className="bg-gray-300 dark:bg-gray-700">
          <tr>
            <th className="p-2 dark:text-white">Tanggal</th>
            <th className="p-2 dark:text-white">Imsak</th>
            <th className="p-2 dark:text-white">Subuh</th>
            <th className="p-2 dark:text-white">Dzuhur</th>
            <th className="p-2 dark:text-white">Ashar</th>
            <th className="p-2 dark:text-white">Maghrib</th>
            <th className="p-2 dark:text-white">Isya</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => {
            const isToday =
              day.date.gregorian.date.split("-").reverse().join("-") === today;

            return (
              <tr
                key={day.date.readable}
                className={`text-center border-t ${
                  isToday ? "bg-green-300 dark:bg-green-700 font-semibold" : ""
                } dark:text-white dark:border-gray-700 dark:bg-gray-800 even:bg-gray-100/50 even:dark:bg-gray-700/50`}
              >
                <td className="p-2">{day.date.gregorian.day}</td>
                <td className="p-2">{day.timings.Imsak}</td>
                <td className="p-2">{day.timings.Fajr}</td>
                <td className="p-2">{day.timings.Dhuhr}</td>
                <td className="p-2">{day.timings.Asr}</td>
                <td className="p-2">{day.timings.Maghrib}</td>
                <td className="p-2">{day.timings.Isha}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
