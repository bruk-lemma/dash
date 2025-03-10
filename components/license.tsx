// "use client";

// import { useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Sector,
//   Tooltip,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = ["#2563EB", "#1D4ED8", "#0F766E", "#0EA5E9", "#0284C7"];

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

// export default function LicenseTypeChart({
//   data,
// }: {
//   data: { name: string; value: number }[];
// }) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-5 w-full">
//       <h2 className="text-lg font-semibold mb-3 text-center">License Types</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             activeIndex={activeIndex}
//             activeShape={renderActiveShape}
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={100}
//             fill="#8884d8"
//             dataKey="value"
//             onMouseEnter={(_, index) => setActiveIndex(index)}
//           >
//             {data.map((_, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
import { KeyRound } from "lucide-react";

interface LicenseTypeCardProps {
  data: Record<string, number>;
  passedData?: Record<string, number>; // Optional passed data per license type
  failedData?: Record<string, number>; // Optional failed data per license type
}

export default function LicenseTypeCard({
  data,
  passedData = {},
  failedData = {},
}: LicenseTypeCardProps) {
  return (
    <div className="border px-6 py-4 rounded-lg w-[350px] bg-white shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <p className="text-lg font-semibold text-gray-800">License Types</p>
        <KeyRound size={28} className="text-gray-600" />
      </div>

      {/* License List with Grid Layout */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        {Object.entries(data).map(([license, count], index) => (
          <div
            key={license}
            className={`flex justify-between items-center px-3 py-2 rounded-md transition-all duration-200 ease-in-out ${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
            } hover:bg-blue-50 hover:scale-105`}
          >
            <span className="text-gray-800 font-medium text-sm">{license}</span>
            <div className="flex flex-col items-end">
              <span className="text-gray-900 font-semibold text-sm">
                {count}
              </span>
              <span className="text-green-600 text-xs">
                Passed: {passedData[license] || 0}
              </span>
              <span className="text-red-600 text-xs">
                Failed: {failedData[license] || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
