"use client";

import { useEffect, useState } from "react";
import { getUserLocation } from "@/lib/location";
import { fetchPrayerDay, fetchPrayerMonth } from "@/lib/prayerApi";

import PrayerDayCard from "@/components/Pray/DayCard";
import PrayerMonthCard from "@/components/Pray/MonthCard";
import LocationSelector from "@/components/Pray/LocationSelector";
import PrayerTimesExportButton from "@/components/Button/PrayerTimesExport";

export default function PrayerTimesPage({ initialLocationName }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("daily");
  const [location, setLocation] = useState(null);

  const month = new Date().toLocaleString("id-ID", { month: "long" });

  const loadData = async (lat, lng, targetMode) => {
    setLoading(true);
    setData(null);

    try {
      if (targetMode === "daily") {
        const res = await fetchPrayerDay(lat, lng);
        setData(res);
      }

      if (targetMode === "monthly") {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const res = await fetchPrayerMonth(lat, lng, month, year);
        setData(Array.isArray(res) ? res : []);
      }
    } catch (err) {
      console.error(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const applyLocation = (loc) => {
      if (!isMounted) return;
      setLocation(loc);
      loadData(loc.latitude, loc.longitude, mode);
    };

    const fallbackToJakarta = () => {
      const fallback = {
        latitude: -6.2,
        longitude: 106.8,
        city: initialLocationName ? initialLocationName : "Jakarta",
      };

      applyLocation(fallback);
    };

    const fallbackToGeolocation = () => {
      getUserLocation()
        .then((loc) => {
          const initialLoc = {
            latitude: loc.latitude,
            longitude: loc.longitude,
            city: loc.city || "Lokasi Anda",
          };

          applyLocation(initialLoc);
        })
        .catch(() => fallbackToJakarta());
    };

    const fetchLocationByName = async (name) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(name)}` +
          `&format=json&countrycodes=id&limit=1`,
      );
      const data = await res.json();
      return Array.isArray(data) ? data[0] : null;
    };

    if (initialLocationName) {
      fetchLocationByName(initialLocationName)
        .then((item) => {
          if (!item) {
            fallbackToJakarta();
            return;
          }

          const initialLoc = {
            latitude: Number(item.lat),
            longitude: Number(item.lon),
            city: item.display_name || initialLocationName,
          };

          applyLocation(initialLoc);
        })
        .catch(() => fallbackToJakarta());
    } else {
      fallbackToGeolocation();
    }

    return () => {
      isMounted = false;
    };
  }, [initialLocationName]);

  useEffect(() => {
    if (!location) return;
    loadData(location.latitude, location.longitude, mode);
  }, [mode]);

  function shortenLocationString(text) {
    if (!text) return "";
    return text
      .split(",")
      .slice(0, 3)
      .map((s) => s.trim())
      .join(", ");
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold text-center dark:text-white ">
        Jadwal Sholat & Imsakiyah
      </h1>
      <LocationSelector
        initialQuery={initialLocationName}
        onSelect={(loc) => {
          const newLoc = {
            latitude: loc.lat,
            longitude: loc.lng,
            city: loc.name,
          };

          setLocation(newLoc);
          loadData(newLoc.latitude, newLoc.longitude, mode);
        }}
      />
      <div className="flex gap-2 ">
        <button
          onClick={() => setMode("daily")}
          className={`px-3 py-1 rounded-full ${
            mode === "daily" ? "bg-green-600 text-white" : "border"
          } dark:text-white `}
        >
          Hari Ini
        </button>

        <button
          onClick={() => setMode("monthly")}
          className={`px-3 py-1 rounded-full ${
            mode === "monthly" ? "bg-green-600 text-white" : "border"
          } dark:text-white `}
        >
          30 Hari
        </button>
      </div>
      {loading && <p>Memuat jadwal...</p>}
      {!loading && mode === "daily" && data && (
        <PrayerDayCard
          timings={data.timings}
          date={data.date}
          city={shortenLocationString(location?.city)}
        />
      )}
      {!loading && mode === "monthly" && Array.isArray(data) && (
        <div className="space-y-3">
          <PrayerMonthCard
            days={data}
            city={shortenLocationString(location?.city)}
          />
          <div className="flex w-full justify-end">
            <PrayerTimesExportButton
              days={data}
              city={shortenLocationString(location?.city)}
              monthLabel={month}
              label="Download PDF"
              filename={`jadwal-sholat-${month}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
