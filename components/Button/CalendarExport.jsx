"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ISLAMIC_EVENTS } from "@/lib/islamicEvents";

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabiul Awal",
  "Rabiul Akhir",
  "Jumadil Awal",
  "Jumadil Akhir",
  "Rajab",
  "Sya'ban",
  "Ramadhan",
  "Syawal",
  "Dzulqa'dah",
  "Dzulhijjah",
];

export default function CalendarExportButton({
  days,
  hMonth,
  hYear,
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
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const marginX = 40;
      const hijriMonthName =
        monthLabel || HIJRI_MONTHS[Number(hMonth) - 1] || "";

      const title = `Kalender Hijriyah Bulan ${hijriMonthName} ${hYear} H`;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, pageWidth / 2, 40, { align: "center" });

      const weekdays = ["Ahad", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
      const weekdayEn = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const firstWeekdayEn = days[0]?.gregorian?.weekday?.en;
      let cursor = Math.max(0, weekdayEn.indexOf(firstWeekdayEn));
      let row = Array(7).fill(null);
      const rows = [];

      days.forEach((day) => {
        const hDay = Number(day.hijri?.day);
        const gDay = day.gregorian?.day;
        const gMonth = day.gregorian?.month?.en?.slice(0, 3) || "";
        const event = ISLAMIC_EVENTS[`${hDay}-${hMonth}`];
        const cell = {
          hDay,
          gDay,
          gMonth,
          hasEvent: Boolean(event),
        };

        row[cursor] = cell;
        cursor += 1;

        if (cursor === 7) {
          rows.push(row);
          row = Array(7).fill(null);
          cursor = 0;
        }
      });

      if (row.some((c) => c)) rows.push(row);

      autoTable(doc, {
        head: [weekdays],
        body: rows,
        startY: 60,
        margin: { left: marginX, right: marginX },
        styles: {
          fontSize: 9,
          cellPadding: 6,
          halign: "center",
          valign: "middle",
          minCellHeight: 52,
        },
        headStyles: { fillColor: [38, 70, 83], textColor: 255 },
        bodyStyles: { textColor: 40 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        didParseCell: (data) => {
          if (data.section === "body") {
            data.cell.text = [""];
          }
        },
        didDrawCell: (data) => {
          if (data.section !== "body") return;
          const cell = data.cell.raw;
          if (!cell || !cell.hDay) return;

          const x = data.cell.x;
          const y = data.cell.y;
          const w = data.cell.width;
          const h = data.cell.height;

          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.text(String(cell.hDay), x + 6, y + 16);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.text(`${cell.gDay} ${cell.gMonth}`, x + w - 6, y + h - 8, {
            align: "right",
          });

          if (cell.hasEvent) {
            doc.setFillColor(34, 197, 94);
            doc.circle(x + w - 10, y + 10, 3, "F");
          }
        },
      });

      const events = Object.entries(ISLAMIC_EVENTS)
        .filter(([key]) => Number(key.split("-")[1]) === Number(hMonth))
        .map(([key, event]) => {
          const day = key.split("-")[0];
          return `${day} ${hijriMonthName}: ${event.title}`;
        });

      if (events.length > 0) {
        const afterTableY = doc.lastAutoTable?.finalY || 60;
        let y = afterTableY + 24;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("Hari Besar Islam Bulan Ini:", marginX, y);
        y += 12;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        events.forEach((line) => {
          y += 14;
          doc.text(`- ${line}`, marginX, y);
        });
      }

      doc.save(
        filename?.endsWith(".pdf")
          ? filename
          : `${filename || "kalender-hijriyah"}.pdf`,
      );
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
        "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 items-end"
      }
    >
      {isExporting ? "Memproses..." : label || "Download PDF"}
    </button>
  );
}
