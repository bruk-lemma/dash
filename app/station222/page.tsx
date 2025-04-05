// import { Station } from "@/components/data";

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

// export default function Page() {
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

//   const licenseTypeData = stations?.map((station) => {
//     return {
//       name: station.name,
//       licenseTypes: station.schools.reduce((acc, school) => {
//         Object.entries(school.LicenceType).forEach(([key, value]) => {
//           acc[key] = (acc[key] || 0) + value;
//         });
//         return acc;
//       }, {} as Record<string, number>),
//     };
//   });
//   return (
//     <div className="text-black flex flex-wrap justify-center gap-10 p-10">
//       {[
//         { title: "School Count", data: schooldata, keys: ["schoolCount"] },
//         { title: "Student Count", data: studentsdata, keys: ["studentCount"] },
//         {
//           title: "Gender Count",
//           data: studenGenderData,
//           keys: ["maleCount", "femaleCount"],
//         },
//         {
//           title: "Gender Exam Result",
//           data: stundentGenderExamData,
//           keys: ["malePassed", "maleFailed", "femalePassed", "femaleFailed"],
//         },
//       ].map((section, index) => (
//         <div key={index} className="bg-white shadow-lg rounded-lg p-5 w-64">
//           <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
//           {section.data.map((station, i) => (
//             <div key={i} className="border-b py-2">
//               <p className="font-medium">{station.name}</p>
//               <div className="text-sm text-gray-600">
//                 {section.keys.map((key) => (
//                   <p key={key}>
//                     {key.replace(/([A-Z])/g, " $1")}: {station[key]}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }
// import { Station } from "@/components/data";

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
  // const schooldata = stations.map((station) => ({
  //   name: station.name,
  //   schoolCount: station.schools.length,
  // }));

  // const studentsdata = stations.map((station) => ({
  //   name: station.name,
  //   studentCount: station.students.total,
  // }));

  // const studenGenderData = stations.map((station) => ({
  //   name: station.name,
  //   maleCount: station.schools.reduce(
  //     (acc, school) => acc + school.maleStudents.total,
  //     0
  //   ),
  //   femaleCount: station.schools.reduce(
  //     (acc, school) => acc + school.femaleStudents.total,
  //     0
  //   ),
  // }));

  // const stundentGenderExamData = stations.map((station) => ({
  //   name: station.name,
  //   malePassed: station.schools.reduce(
  //     (acc, school) => acc + school.maleStudents.passed,
  //     0
  //   ),
  //   maleFailed: station.schools.reduce(
  //     (acc, school) => acc + school.maleStudents.failed,
  //     0
  //   ),
  //   femalePassed: station.schools.reduce(
  //     (acc, school) => acc + school.femaleStudents.passed,
  //     0
  //   ),
  //   femaleFailed: station.schools.reduce(
  //     (acc, school) => acc + school.femaleStudents.failed,
  //     0
  //   ),
  // }));

  // const licenseTypeData = stations.map((station) => ({
  //   name: station.name,
  //   licenseTypes: station.schools.reduce((acc, school) => {
  //     Object.entries(school.LicenceType).forEach(([key, value]) => {
  //       acc[key] = (acc[key] || 0) + value;
  //     });
  //     return acc;
  //   }, {} as Record<string, number>),
  // }));

  return (
    <div className="text-black flex flex-wrap justify-center gap-10 p-10">
      {/* {[
        { title: "School Count", data: schooldata, keys: ["schoolCount"] },
        { title: "Student Count", data: studentsdata, keys: ["studentCount"] },
        {
          title: "Gender Count",
          data: studenGenderData,
          keys: ["maleCount", "femaleCount"],
        },
        {
          title: "Gender Exam Result",
          data: stundentGenderExamData,
          keys: ["malePassed", "maleFailed", "femalePassed", "femaleFailed"],
        },
        {
          title: "License Types",
          data: licenseTypeData,
          keys: Object.keys(licenseTypeData[0]?.licenseTypes || {}),
        },
      ].map((section, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-5 w-64">
          <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
          {section.data.map((station, i) => (
            <div key={i} className="border-b py-2">
              <p className="font-medium">{station.name}</p>
              <div className="text-sm text-gray-600">
                {section.keys.map((key) => (
                  <p key={key}>
                    {key.replace(/([A-Z])/g, " $1")}:{" "}
                    {station.licenseTypes?.[key] ?? station[key]}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
}
