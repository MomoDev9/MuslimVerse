"use client";

import { useEffect, useState } from "react";
import { getUserLocation } from "@/lib/location";
import { fetchPrayerDay, fetchPrayerMonth } from "@/lib/prayerApi";

import Layout from "@/components/Layout/Layout";
import PrayerDayCard from "@/components/Pray/DayCard";
import PrayerMonthCard from "@/components/Pray/MonthCard";
import LocationSelector from "@/components/Pray/LocationSelector";

export default function PrayerTimesPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("daily");
  const [location, setLocation] = useState(null);

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
    getUserLocation()
      .then((loc) => {
        const initialLoc = {
          latitude: loc.latitude,
          longitude: loc.longitude,
          city: loc.city || "Lokasi Anda",
        };

        setLocation(initialLoc);
        loadData(initialLoc.latitude, initialLoc.longitude, mode);
      })
      .catch(() => {
        const fallback = {
          latitude: -6.2,
          longitude: 106.8,
          city: "Jakarta",
        };

        setLocation(fallback);
        loadData(fallback.latitude, fallback.longitude, mode);
      });
  }, []);

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
    <Layout>
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        <h1 className="text-xl font-bold text-center dark:text-white ">
          Jadwal Sholat & Imsakiyah
        </h1>

        <LocationSelector
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
          <PrayerMonthCard
            days={data}
            city={shortenLocationString(location?.city)}
          />
        )}
      </div>
    </Layout>
  );
}
