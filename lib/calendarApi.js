const BASE_URL = "https://api.aladhan.com/v1";

export async function getMonth(hMonth, hYear) {
  const res = await fetch(`${BASE_URL}/hToGCalendar/${hMonth}/${hYear}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil kalender Hijriyah");
  }

  const json = await res.json();
  return json.data;
}
