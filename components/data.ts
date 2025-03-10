export interface School {
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
    አውቶሞቢል: number;
    ደረቅ_1: number;
    ደረቅ_2: number;
    ህዝብ_1: number;
    ህዝብ_2: number;
  };
}

export interface Station {
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
