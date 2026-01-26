import { exportToCSV } from "@/lib/islamicEvents";

export default function ExportButton({ year, months }) {
  return (
    <button
      onClick={() => exportToCSV(year, months)}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
      Export CSV
    </button>
  );
}
