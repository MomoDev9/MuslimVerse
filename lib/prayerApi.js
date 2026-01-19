export const fetchPrayerDay = async (lat, lng) => {
  const res = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=20`,
  );
  const data = await res.json();
  return data.data;
};
export const fetchPrayerMonth = async (lat, lng, month, year) => {
  const res = await fetch(
    `https://api.aladhan.com/v1/calendar?` +
      `latitude=${lat}&longitude=${lng}` +
      `&method=20&month=${month}&year=${year}`,
  );

  const data = await res.json();
  return data.data;
};
