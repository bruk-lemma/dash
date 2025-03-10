"use client";
import { Station } from "@/components/data";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const stations: Station[] = [
//   {
//     name: "Station 1",
//     region: "Addis Ababa",
//     schools: [
//       {
//         name: "School A",
//         total: 50,
//         passed: 30,
//         failed: 20,
//         maleStudents: {
//           total: 20,
//           passed: 12,
//           failed: 8,
//         },
//         femaleStudents: {
//           total: 30,
//           passed: 18,
//           failed: 12,
//         },
//         LicenceType: {
//           Automobile: 10,
//           Motorcycle: 5,
//           Dry_1: 7,
//           Dry_2: 8,
//           People_1: 12,
//           People_2: 8,
//         },
//       },
//     ],
//     students: {
//       total: 50,
//       passed: {
//         total: 30,
//         male: 12,
//         female: 18,
//       },
//       failed: {
//         total: 20,
//         male: 8,
//         female: 12,
//       },
//     },
//   },
//   {
//     name: "Station 2",
//     region: "Oromia",
//     schools: [
//       {
//         name: "School B",
//         total: 72,
//         passed: 50,
//         failed: 22,
//         maleStudents: {
//           total: 35,
//           passed: 22,
//           failed: 13,
//         },
//         femaleStudents: {
//           total: 37,
//           passed: 28,
//           failed: 9,
//         },
//         LicenceType: {
//           Automobile: 15,
//           Motorcycle: 10,
//           Dry_1: 12,
//           Dry_2: 10,
//           People_1: 15,
//           People_2: 10,
//         },
//       },
//     ],
//     students: {
//       total: 72,
//       passed: {
//         total: 50,
//         male: 22,
//         female: 28,
//       },
//       failed: {
//         total: 22,
//         male: 13,
//         female: 9,
//       },
//     },
//   },
// ];

export default function Page() {
  //   const schooldata = stations.map((station) => ({
  //     name: station.name,
  //     schoolCount: station.schools.length,
  //   }));

  //   const studentsdata = stations.map((station) => ({
  //     name: station.name,
  //     studentCount: station.students.total,
  //   }));

  //   const studenGenderData = stations.map((station) => ({
  //     name: station.name,
  //     maleCount: station.schools.reduce(
  //       (acc, school) => acc + school.maleStudents.total,
  //       0
  //     ),
  //     femaleCount: station.schools.reduce(
  //       (acc, school) => acc + school.femaleStudents.total,
  //       0
  //     ),
  //   }));

  //   const stundentGenderExamData = stations.map((station) => ({
  //     name: station.name,
  //     malePassed: station.schools.reduce(
  //       (acc, school) => acc + school.maleStudents.passed,
  //       0
  //     ),
  //     maleFailed: station.schools.reduce(
  //       (acc, school) => acc + school.maleStudents.failed,
  //       0
  //     ),
  //     femalePassed: station.schools.reduce(
  //       (acc, school) => acc + school.femaleStudents.passed,
  //       0
  //     ),
  //     femaleFailed: station.schools.reduce(
  //       (acc, school) => acc + school.femaleStudents.failed,
  //       0
  //     ),
  //   }));

  //   const licenseTypeData = stations.map((station) => ({
  //     name: station.name,
  //     ...station.schools.reduce((acc, school) => {
  //       Object.entries(school.LicenceType).forEach(([key, value]) => {
  //         acc[key] = (acc[key] || 0) + value;
  //       });
  //       return acc;
  //     }, {} as Record<string, number>),
  //   }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="text-black flex flex-wrap justify-center gap-10 p-10">
      {/* School Count Chart
      <div className="bg-white shadow-lg rounded-lg p-5 w-96">
        <h2 className="text-lg font-semibold mb-3">School Count</h2>
        <BarChart width={350} height={300} data={schooldata}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="schoolCount" fill="#8884d8" />
        </BarChart>
      </div> */}

      {/* Student Count Chart */}
      {/* <div className="bg-white shadow-lg rounded-lg p-5 w-96">
        <h2 className="text-lg font-semibold mb-3">Student Count</h2>
        <BarChart width={350} height={300} data={studentsdata}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="studentCount" fill="#82ca9d" />
        </BarChart>
      </div> */}

      {/* Gender Count Chart */}
      {/* <div className="bg-white shadow-lg rounded-lg p-5 w-96">
        <h2 className="text-lg font-semibold mb-3">Gender Count</h2>
        <BarChart width={350} height={300} data={studenGenderData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="maleCount" fill="#0088FE" />
          <Bar dataKey="femaleCount" fill="#00C49F" />
        </BarChart>
      </div> */}

      {/* Gender Exam Result Chart */}
      {/* <div className="bg-white shadow-lg rounded-lg p-5 w-96">
        <h2 className="text-lg font-semibold mb-3">Gender Exam Result</h2>
        <BarChart width={350} height={300} data={stundentGenderExamData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="malePassed" fill="#0088FE" />
          <Bar dataKey="maleFailed" fill="#FF8042" />
          <Bar dataKey="femalePassed" fill="#00C49F" />
          <Bar dataKey="femaleFailed" fill="#FFBB28" />
        </BarChart>
      </div> */}

      {/* License Types Chart */}
      {/* <div className="bg-white shadow-lg rounded-lg p-5 w-96">
        <h2 className="text-lg font-semibold mb-3">License Types</h2>
        <PieChart width={350} height={300}>
          <Pie
            data={Object.entries(licenseTypeData[0])
              .filter(([key]) => key !== "name")
              .map(([key, value]) => ({ name: key, value }))}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {Object.entries(licenseTypeData[0])
              .filter(([key]) => key !== "name")
              .map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div> */}
    </div>
  );
}
