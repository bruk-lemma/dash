"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  malePassed: "#2563EB", // Blue
  maleFailed: "#0F766E", // Red
  femalePassed: "#0EA5E9", // Green
  femaleFailed: "#0284C7", // Orange
};
//const COLORS = ["#2563EB", "#1D4ED8", "#0F766E", "#0EA5E9", "#0284C7"];

type StationData = {
  name: string;
  malePassed: number;
  maleFailed: number;
  femalePassed: number;
  femaleFailed: number;
};

type Props = {
  data: StationData[];
};

export default function StudentExamChart({ data }: Props) {
  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg ">
      <h2 className="text-lg font-semibold text-center mb-4">
        Student Exam Results
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
        >
          <XAxis
            dataKey="name"
            // tick={{ fontSize: 12 }}
            //tick={{ angle: -45, textAnchor: "end" }} // Horizontal text
          />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            dataKey="malePassed"
            stackId="a"
            fill={COLORS.malePassed}
            name="Male Passed"
            barSize={40}
          />
          <Bar
            dataKey="maleFailed"
            stackId="a"
            fill={COLORS.maleFailed}
            name="Male Failed"
            barSize={40}
          />
          <Bar
            dataKey="femalePassed"
            stackId="b"
            fill={COLORS.femalePassed}
            name="Female Passed"
            barSize={40}
          />
          <Bar
            dataKey="femaleFailed"
            stackId="b"
            fill={COLORS.femaleFailed}
            name="Female Failed"
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
