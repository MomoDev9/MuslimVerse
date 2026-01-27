"use client";
import { useState } from "react";

export default function LocationSelector({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchLocation = async () => {
    if (!query) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}` +
        `&format=json&countrycodes=id`,
    );
    const data = await res.json();
    setResults(data.slice(0, 5));
  };

  const handleSelect = (item) => {
    onSelect({
      name: item.display_name,
      lat: item.lat,
      lng: item.lon,
    });

    setResults([]);
    setQuery(item.display_name);
  };

  return (
    <div className="space-y-2">
      <input
        className="border rounded p-2 w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
        placeholder="Cari kecamatan / desa..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className="bg-green-600 text-white px-3 py-1 rounded"
        onClick={searchLocation}
      >
        Cari
      </button>

      <ul className="border rounded divide-y dark:divide-gray-700 max-h-60 overflow-y-auto dark:border-gray-700">
        {results.map((item) => (
          <li
            key={item.place_id}
            className="p-2 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-700 dark:text-white even:bg-gray-100 dark:even:bg-white/5 rounded md:p-3"
            onClick={() => handleSelect(item)}
          >
            {item.display_name.split(",").slice(0, 5).join(",")}
          </li>
        ))}
      </ul>
    </div>
  );
}
