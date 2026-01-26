export default function PrayerMonthCard({ days }) {
  if (!Array.isArray(days)) return null;

  const today = new Date().toISOString().split("T")[0];
  console.log(today);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th>Tanggal</th>
            <th>Imsak</th>
            <th>Subuh</th>
            <th>Dzuhur</th>
            <th>Ashar</th>
            <th>Maghrib</th>
            <th>Isya</th>
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
                  isToday ? "bg-green-300 font-semibold" : ""
                }`}
              >
                <td>{day.date.gregorian.day}</td>
                <td>{day.timings.Imsak}</td>
                <td>{day.timings.Fajr}</td>
                <td>{day.timings.Dhuhr}</td>
                <td>{day.timings.Asr}</td>
                <td>{day.timings.Maghrib}</td>
                <td>{day.timings.Isha}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
