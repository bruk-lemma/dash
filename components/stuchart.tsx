// "use client";

// import { useState } from "react";
// import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
// import { data } from "./data";

// const COLORS = ["#2563EB", "#1D4ED8", "#0F766E", "#0EA5E9", "#0284C7"];

// type DonutChartProps = {
//   region?: string; // Optional prop to filter data
// };

// const renderActiveShape = (props: any) => {
//   const RADIAN = Math.PI / 180;
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? "start" : "end";

//   return (
//     <g>
//       <text
//         x={cx}
//         y={cy}
//         dy={8}
//         textAnchor="middle"
//         className="text-sm text-gray-800"
//       >
//         {payload.name}
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         fill={fill}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={fill}
//         fill="none"
//       />
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         textAnchor={textAnchor}
//         className="text-sm font-semibold text-gray-800"
//       >
//         {`Students: ${value}`}
//       </text>
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         dy={18}
//         textAnchor={textAnchor}
//         className="text-xs text-gray-500"
//       >
//         {`(${(percent * 100).toFixed(2)}%)`}
//       </text>
//     </g>
//   );
// };

// export default function SDonutChart({ region }: DonutChartProps) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Filter data by region if region is provided
//   const filteredData =
//     region === "All" ? data : data.filter((item) => item.region === region);

//   // Calculate total students for the selected region
//   const totalStudents = filteredData.reduce((sum, item) => sum + item.value, 0);

//   return (
//     <div className="w-full h-full bg-white p-4 rounded-lg flex flex-col items-center justify-center">
//       <h2 className="text-lg font-semibold mt-2 text-center">
//         {region
//           ? `Student Distribution in ${region}`
//           : "Student Distribution by Region"}{" "}
//         <span className="text-blue-600">({totalStudents})</span>
//       </h2>
//       {filteredData.length > 0 ? (
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart width={100} height={400}>
//             <Pie
//               activeIndex={activeIndex}
//               activeShape={renderActiveShape}
//               data={filteredData}
//               cx="50%"
//               cy="50%"
//               innerRadius={100}
//               outerRadius={130}
//               dataKey="value"
//               onMouseEnter={(_, index) => setActiveIndex(index)}
//             >
//               {filteredData.map((_, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       ) : (
//         <p className="text-gray-500 mt-4">No data available for {region}</p>
//       )}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

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
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
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
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        className="text-sm font-semibold text-gray-800"
      >
        {`Students: ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
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
}: {
  male: number;
  female: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
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
            innerRadius={90}
            outerRadius={110}
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
