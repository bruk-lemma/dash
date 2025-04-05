"use client";

import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import { Loader } from "lucide-react";

const COLORS = ["#4CAF50", "#FFC107"]; // Colors for Male and Female

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 5;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        className="text-sm text-gray-800"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 12}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 15}
        y={ey}
        textAnchor={textAnchor}
        className="text-sm font-semibold text-gray-800"
      >
        {`Students: ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 15}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        className="text-xs text-gray-500"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function StudentGenderChart({
  male,
  female,
  loading,
}: {
  male: number;
  female: number;
  loading?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  const chartData = [
    { name: "Male", value: male },
    { name: "Female", value: female },
  ];

  return (
    <div className="">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={60}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
