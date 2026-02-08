"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function PrayerTimesExportButton({
  days,
  city,
  monthLabel,
  filename,
  className,
  label,
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!Array.isArray(days) || days.length === 0 || isExporting) return;
    setIsExporting(true);

    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const marginX = 40;

      const title = `Jadwal Sholat Bulan ${monthLabel} di ${city || "Lokasi Anda"}`;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, pageWidth / 2, 40, { align: "center" });

      const head = [["Tanggal", "Imsak", "Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"]];
      const body = days.map((day) => [
        day.date.gregorian.day,
        day.timings.Imsak,
        day.timings.Fajr,
        day.timings.Dhuhr,
        day.timings.Asr,
        day.timings.Maghrib,
        day.timings.Isha,
      ]);

      autoTable(doc, {
        head,
        body,
        startY: 60,
        margin: { left: marginX, right: marginX },
        styles: {
          fontSize: 9,
          cellPadding: 4,
          halign: "center",
          valign: "middle",
        },
        headStyles: {
          fillColor: [38, 70, 83],
          textColor: 255,
          halign: "center",
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      doc.save(filename?.endsWith(".pdf") ? filename : `${filename || "jadwal-sholat"}.pdf`);
    } catch (err) {
      console.error("Gagal export PDF", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={isExporting}
      className={
        className ||
        "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
      }
    >
      {isExporting ? "Memproses..." : label || "Download PDF"}
    </button>
  );
}
