export default function PrayerDayCard({ timings, date, city }) {
  if (!timings) return null;

  const list = [
    ["Imsak", timings.Imsak],
    ["Subuh", timings.Fajr],
    ["Dzuhur", timings.Dhuhr],
    ["Ashar", timings.Asr],
    ["Maghrib", timings.Maghrib],
    ["Isya", timings.Isha],
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2">
      <h2 className="font-semibold text-lg">
        Jadwal Sholat Hari Ini {city && `di ${city}`}
      </h2>
      <p className="text-sm text-gray-500">{date.readable}</p>

      {list.map(([name, time]) => (
        <div key={name} className="flex justify-between border-b py-1">
          <span>{name}</span>
          <span className="font-mono">{time}</span>
        </div>
      ))}
    </div>
  );
}
