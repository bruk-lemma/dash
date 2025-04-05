export interface School {
  id: number;
  name: string;
  total: number;
  passed: number;
  failed: number;
  maleStudents: {
    total: number;
    passed: number;
    failed: number;
  };
  femaleStudents: {
    total: number;
    passed: number;
    failed: number;
  };
  LicenceType: {
    አውቶሞቢል?: number;
    ደረቅ_1?: number;
    ደረቅ_2?: number;
    ህዝብ_1?: number;
    ህዝብ_2?: number;
  };
  students: Student[];
}

export interface Station {
  id: number;
  name: string;
  region: string;
  schools: School[];
  students: {
    total: number;
    passed: {
      total: number;
      male: number;
      female: number;
    };
    failed: {
      total: number;
      male: number;
      female: number;
    };
  };
}

export interface Student {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  regionid: number;
  licenseType: string;
  gender: string;
}

export const data = [
  {
    name: "Station 1",
    value: 50,
    region: "Addis Ababa",
    passed: 30,
    failed: 20,
    schools: 10,
    maleStudents: {
      total: 20,
      passed: 12,
      failed: 8,
    },
    femaleStudents: {
      total: 30,
      passed: 18,
      failed: 12,
    },
  },
  {
    name: "Station 2",
    value: 72,
    region: "Oromia",
    passed: 50,
    failed: 22,
    schools: 12,
    maleStudents: {
      total: 35,
      passed: 22,
      failed: 13,
    },
    femaleStudents: {
      total: 37,
      passed: 28,
      failed: 9,
    },
  },
  {
    name: "Station 3",
    value: 61,
    region: "Amhara",
    passed: 45,
    failed: 16,
    schools: 8,
    maleStudents: {
      total: 25,
      passed: 17,
      failed: 8,
    },
    femaleStudents: {
      total: 36,
      passed: 28,
      failed: 8,
    },
  },
  {
    name: "Station 4",
    value: 42,
    region: "Oromia",
    passed: 29,
    failed: 13,
    schools: 7,
    maleStudents: {
      total: 18,
      passed: 13,
      failed: 5,
    },
    femaleStudents: {
      total: 24,
      passed: 16,
      failed: 8,
    },
  },
  {
    name: "Station 5",
    value: 33,
    region: "Sidama",
    passed: 20,
    failed: 13,
    schools: 5,
    maleStudents: {
      total: 12,
      passed: 8,
      failed: 4,
    },
    femaleStudents: {
      total: 21,
      passed: 12,
      failed: 9,
    },
  },
  {
    name: "Station 6",
    value: 28,
    region: "Amhara",
    passed: 19,
    failed: 9,
    schools: 4,
    maleStudents: {
      total: 15,
      passed: 10,
      failed: 5,
    },
    femaleStudents: {
      total: 13,
      passed: 9,
      failed: 4,
    },
  },
  {
    name: "Station 7",
    value: 25,
    region: "Benishangul-Gumuz",
    passed: 14,
    failed: 11,
    schools: 4,
    maleStudents: {
      total: 13,
      passed: 9,
      failed: 4,
    },
    femaleStudents: {
      total: 12,
      passed: 5,
      failed: 7,
    },
  },
  {
    name: "Station 8",
    value: 21,
    region: "Gambela",
    passed: 12,
    failed: 9,
    schools: 3,
    maleStudents: {
      total: 11,
      passed: 7,
      failed: 4,
    },
    femaleStudents: {
      total: 10,
      passed: 5,
      failed: 5,
    },
  },
  {
    name: "Station 9",
    value: 18,
    region: "Harari",
    passed: 11,
    failed: 7,
    schools: 3,
    maleStudents: {
      total: 9,
      passed: 6,
      failed: 3,
    },
    femaleStudents: {
      total: 9,
      passed: 5,
      failed: 4,
    },
  },
  {
    name: "Station 10",
    value: 57,
    region: "Somali",
    passed: 40,
    failed: 17,
    schools: 9,
    maleStudents: {
      total: 25,
      passed: 17,
      failed: 8,
    },
    femaleStudents: {
      total: 32,
      passed: 23,
      failed: 9,
    },
  },
  {
    name: "Station 11",
    value: 49,
    region: "Southern Nations",
    passed: 32,
    failed: 17,
    schools: 8,
    maleStudents: {
      total: 22,
      passed: 15,
      failed: 7,
    },
    femaleStudents: {
      total: 27,
      passed: 17,
      failed: 10,
    },
  },
  {
    name: "Station 12",
    value: 31,
    region: "Oromia",
    passed: 20,
    failed: 11,
    schools: 6,
    maleStudents: {
      total: 15,
      passed: 10,
      failed: 5,
    },
    femaleStudents: {
      total: 16,
      passed: 10,
      failed: 6,
    },
  },
  {
    name: "Station 13",
    value: 27,
    region: "Dire Dawa",
    passed: 17,
    failed: 10,
    schools: 4,
    maleStudents: {
      total: 12,
      passed: 8,
      failed: 4,
    },
    femaleStudents: {
      total: 15,
      passed: 9,
      failed: 6,
    },
  },
  {
    name: "Station 14",
    value: 40,
    region: "Amhara",
    passed: 25,
    failed: 15,
    schools: 7,
    maleStudents: {
      total: 18,
      passed: 13,
      failed: 5,
    },
    femaleStudents: {
      total: 22,
      passed: 12,
      failed: 10,
    },
  },
  {
    name: "Station 15",
    value: 35,
    region: "Western Ethiopia",
    passed: 21,
    failed: 14,
    schools: 5,
    maleStudents: {
      total: 14,
      passed: 10,
      failed: 4,
    },
    femaleStudents: {
      total: 21,
      passed: 11,
      failed: 10,
    },
  },
];

export const sampleData: Station[] = [
  {
    id: 1,
    name: "Station 1",
    region: "Region 1",
    schools: [
      {
        id: 1,
        name: "School 1",
        total: 3,
        passed: 2,
        failed: 1,
        maleStudents: {
          total: 2,
          passed: 1,
          failed: 1,
        },
        femaleStudents: {
          total: 1,
          passed: 1,
          failed: 0,
        },
        LicenceType: {
          አውቶሞቢል: 1,
          ደረቅ_1: 1,
          ደረቅ_2: 1,
        },
        students: [
          {
            id: 1,
            name: "John Doe",
            status: "passed",
            createdAt: "2025-01-16T10:00:00Z",
            regionid: 1,
            licenseType: "አውቶሞቢል",
            gender: "male",
          },
          {
            id: 2,
            name: "Jane Doe",
            status: "passed",
            createdAt: "2025-01-20T10:05:00Z",
            regionid: 1,
            licenseType: "ደረቅ_1",
            gender: "female",
          },
          {
            id: 3,
            name: "Alex Smith",
            status: "failed",
            createdAt: "2025-01-25T10:10:00Z",
            regionid: 1,
            licenseType: "ደረቅ_2",
            gender: "male",
          },
        ],
      },
      {
        id: 2,
        name: "School 2",
        total: 3,
        passed: 1,
        failed: 2,
        maleStudents: {
          total: 1,
          passed: 0,
          failed: 1,
        },
        femaleStudents: {
          total: 2,
          passed: 1,
          failed: 1,
        },
        LicenceType: {
          አውቶሞቢል: 1,
          ደረቅ_1: 1,
          ደረቅ_2: 1,
        },
        students: [
          {
            id: 4,
            name: "Emily Brown",
            status: "failed",
            createdAt: "2025-02-16T10:15:00Z",
            regionid: 1,
            licenseType: "አውቶሞቢል",
            gender: "female",
          },
          {
            id: 5,
            name: "Michael Johnson",
            status: "passed",
            createdAt: "2025-02-20T10:20:00Z",
            regionid: 1,
            licenseType: "ደረቅ_1",
            gender: "male",
          },
          {
            id: 6,
            name: "Sarah Davis",
            status: "failed",
            createdAt: "2025-02-25T10:25:00Z",
            regionid: 1,
            licenseType: "ደረቅ_2",
            gender: "female",
          },
        ],
      },
      {
        id: 3,
        name: "School 3",
        total: 3,
        passed: 2,
        failed: 1,
        maleStudents: {
          total: 2,
          passed: 1,
          failed: 1,
        },
        femaleStudents: {
          total: 1,
          passed: 1,
          failed: 0,
        },
        LicenceType: {
          አውቶሞቢል: 1,
          ደረቅ_1: 1,
          ደረቅ_2: 1,
        },
        students: [
          {
            id: 7,
            name: "Chris Green",
            status: "passed",
            createdAt: "2025-03-01T10:30:00Z",
            regionid: 1,
            licenseType: "ደረቅ_1",
            gender: "male",
          },
          {
            id: 8,
            name: "Diana Blue",
            status: "passed",
            createdAt: "2025-03-10T10:35:00Z",
            regionid: 1,
            licenseType: "ደረቅ_2",
            gender: "female",
          },
          {
            id: 9,
            name: "Frank Black",
            status: "failed",
            createdAt: "2025-03-15T10:40:00Z",
            regionid: 1,
            licenseType: "አውቶሞቢል",
            gender: "male",
          },
        ],
      },
    ],
    students: {
      total: 9,
      passed: {
        total: 5,
        male: 3,
        female: 2,
      },
      failed: {
        total: 4,
        male: 2,
        female: 2,
      },
    },
  },
  {
    id: 2,
    name: "Station 2",
    region: "Region 2",
    schools: [
      {
        id: 4,
        name: "School 4",
        total: 5,
        passed: 3,
        failed: 2,
        maleStudents: {
          total: 3,
          passed: 2,
          failed: 1,
        },
        femaleStudents: {
          total: 2,
          passed: 1,
          failed: 1,
        },
        LicenceType: {
          አውቶሞቢል: 1,
          ደረቅ_1: 2,
          ደረቅ_2: 2,
        },
        students: [
          {
            id: 10,
            name: "Grace Yellow",
            status: "passed",
            createdAt: "2025-04-01T12:00:00Z",
            regionid: 2,
            licenseType: "አውቶሞቢል",
            gender: "female",
          },
          {
            id: 11,
            name: "Henry Pink",
            status: "passed",
            createdAt: "2025-04-05T12:05:00Z",
            regionid: 2,
            licenseType: "ደረቅ_1",
            gender: "male",
          },
          {
            id: 12,
            name: "Isaac Orange",
            status: "failed",
            createdAt: "2025-04-10T12:10:00Z",
            regionid: 2,
            licenseType: "ደረቅ_2",
            gender: "male",
          },
          {
            id: 13,
            name: "Julia Purple",
            status: "failed",
            createdAt: "2025-04-15T12:15:00Z",
            regionid: 2,
            licenseType: "ደረቅ_1",
            gender: "female",
          },
          {
            id: 14,
            name: "Sam Orange",
            status: "passed",
            createdAt: "2025-04-20T12:20:00Z",
            regionid: 2,
            licenseType: "አውቶሞቢል",
            gender: "male",
          },
        ],
      },
      {
        id: 5,
        name: "School 5",
        total: 7,
        passed: 5,
        failed: 2,
        maleStudents: {
          total: 4,
          passed: 3,
          failed: 1,
        },
        femaleStudents: {
          total: 3,
          passed: 2,
          failed: 1,
        },
        LicenceType: {
          አውቶሞቢል: 2,
          ደረቅ_1: 2,
          ደረቅ_2: 3,
        },
        students: [
          {
            id: 15,
            name: "Alice Green",
            status: "passed",
            createdAt: "2025-05-01T12:25:00Z",
            regionid: 2,
            licenseType: "ደረቅ_1",
            gender: "female",
          },
          {
            id: 16,
            name: "Mark Brown",
            status: "passed",
            createdAt: "2025-05-05T12:30:00Z",
            regionid: 2,
            licenseType: "ደረቅ_2",
            gender: "male",
          },
          {
            id: 17,
            name: "Lily White",
            status: "passed",
            createdAt: "2025-05-10T12:35:00Z",
            regionid: 2,
            licenseType: "አውቶሞቢል",
            gender: "female",
          },
          {
            id: 18,
            name: "Tom Black",
            status: "failed",
            createdAt: "2025-05-15T12:40:00Z",
            regionid: 2,
            licenseType: "ደረቅ_2",
            gender: "male",
          },
          {
            id: 19,
            name: "Nina Red",
            status: "failed",
            createdAt: "2025-05-20T12:45:00Z",
            regionid: 2,
            licenseType: "ደረቅ_1",
            gender: "female",
          },
          {
            id: 20,
            name: "James Grey",
            status: "passed",
            createdAt: "2025-05-25T12:50:00Z",
            regionid: 2,
            licenseType: "አውቶሞቢል",
            gender: "male",
          },

          {
            id: 21,
            name: "Sophie Blue",
            status: "passed",
            createdAt: "2025-05-30T12:55:00Z",
            regionid: 2,
            licenseType: "ደረቅ_2",
            gender: "female",
          },
        ],
      },
    ],
    students: {
      total: 12,
      passed: {
        total: 8,
        male: 5,
        female: 3,
      },
      failed: {
        total: 4,
        male: 2,
        female: 2,
      },
    },
  },
];

// export const sampleData: Station[] = [
//   {
//     id: 1,
//     name: "Station A",
//     region: "Region 1",
//     schools: [
//       {
//         id: 1,
//         name: "School 1",
//         total: 100,
//         passed: 80,
//         failed: 20,
//         maleStudents: {
//           total: 50,
//           passed: 40,
//           failed: 10,
//         },
//         femaleStudents: {
//           total: 50,
//           passed: 40,
//           failed: 10,
//         },
//         LicenceType: {
//           አውቶሞቢል: 10,
//           ደረቅ_1: 15,
//           ደረቅ_2: 20,
//           ህዝብ_1: 25,
//           ህዝብ_2: 30,
//         },
//         students: [
//           {
//             id: 1,
//             name: "John Doe",
//             status: "passed",
//             createdAt: "2025-03-16T10:00:00Z",
//             regionid: 1,
//             licenseType: "አውቶሞቢል",
//           },
//           {
//             id: 2,
//             name: "Jane Doe",
//             status: "failed",
//             createdAt: "2025-03-16T10:05:00Z",
//             regionid: 1,
//             licenseType: "ደረቅ_1",
//           },
//         ],
//       },
//       {
//         id: 2,
//         name: "School 2",
//         total: 120,
//         passed: 90,
//         failed: 30,
//         maleStudents: {
//           total: 60,
//           passed: 45,
//           failed: 15,
//         },
//         femaleStudents: {
//           total: 60,
//           passed: 45,
//           failed: 15,
//         },
//         LicenceType: {
//           አውቶሞቢል: 12,
//           ደረቅ_1: 18,
//           ደረቅ_2: 25,
//           ህዝብ_1: 30,
//           ህዝብ_2: 35,
//         },
//         students: [
//           {
//             id: 3,
//             name: "Alice Smith",
//             status: "passed",
//             createdAt: "2025-03-16T10:10:00Z",
//             regionid: 1,
//             licenseType: "ህዝብ_1",
//           },
//           {
//             id: 4,
//             name: "Bob Brown",
//             status: "failed",
//             createdAt: "2025-03-16T10:15:00Z",
//             regionid: 1,
//             licenseType: "ደረቅ_2",
//           },
//         ],
//       },
//     ],
//     students: {
//       total: 220,
//       passed: {
//         total: 170,
//         male: 85,
//         female: 85,
//       },
//       failed: {
//         total: 50,
//         male: 25,
//         female: 25,
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Station B",
//     region: "Region 2",
//     schools: [
//       {
//         id: 3,
//         name: "School 3",
//         total: 90,
//         passed: 70,
//         failed: 20,
//         maleStudents: {
//           total: 45,
//           passed: 35,
//           failed: 10,
//         },
//         femaleStudents: {
//           total: 45,
//           passed: 35,
//           failed: 10,
//         },
//         LicenceType: {
//           አውቶሞቢል: 5,
//           ደረቅ_1: 10,
//           ደረቅ_2: 15,
//           ህዝብ_1: 20,
//           ህዝብ_2: 25,
//         },
//         students: [
//           {
//             id: 5,
//             name: "Chris Green",
//             status: "passed",
//             createdAt: "2025-03-16T11:00:00Z",
//             regionid: 2,
//             licenseType: "ህዝብ_2",
//           },
//           {
//             id: 6,
//             name: "Diana Blue",
//             status: "failed",
//             createdAt: "2025-03-16T11:05:00Z",
//             regionid: 2,
//             licenseType: "ደረቅ_1",
//           },
//         ],
//       },
//     ],
//     students: {
//       total: 90,
//       passed: {
//         total: 70,
//         male: 35,
//         female: 35,
//       },
//       failed: {
//         total: 20,
//         male: 10,
//         female: 10,
//       },
//     },
//   },
// ];
