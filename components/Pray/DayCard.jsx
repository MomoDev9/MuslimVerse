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
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
      <div className="p-6">
        <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100">
          Jadwal Sholat {city ? `di ${city}` : "Hari Ini"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {date.readable}
        </p>
      </div>

      <div className="flow-root">
        <hr className="border-gray-700 dark:border-gray-200 mx-5" />
        <ul
          role="list"
          className="my-4 divide-y divide-gray-100 dark:divide-gray-800 rounded-lg"
        >
          {list.map(([name, time], index) => (
            <li
              key={name}
              className="flex items-center justify-between p-4 even:bg-gray-50/50 dark:even:bg-white/5 rounded-2xl"
            >
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {name}
              </span>
              <span className="font-mono text-lg text-gray-900 dark:text-white">
                {time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
