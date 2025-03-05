"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { data } from "./data";
const regionTotals: Record<string, number> = {};

data.forEach((station) => {
  const totalStudents =
    station.maleStudents.total + station.femaleStudents.total;

  if (regionTotals[station.region]) {
    regionTotals[station.region] += totalStudents;
  } else {
    regionTotals[station.region] = totalStudents;
  }
});

// Convert the object to the required array format
const formattedData = Object.entries(regionTotals).map(([name, students]) => ({
  name,
  students,
}));

console.log("formattedData", formattedData);

export default function BarChartComponent() {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-lg ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            className="text-xs"
          />
          <YAxis tickLine={false} axisLine={false} className="text-xs" />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.8)",
              border: "none",
              borderRadius: "2px",
              padding: "5px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="students" fill="#ae3ec9" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
