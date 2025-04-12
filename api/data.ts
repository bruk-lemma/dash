import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const school = {
  id: 68,
  name: "Bob training school",
  total: 120,
  passed: 90,
  failed: 30,
  maleStudents: {
    total: 70,
    passed: 50,
    failed: 20,
  },
  femaleStudents: {
    total: 50,
    passed: 40,
    failed: 10,
  },
  licenseType: { LMV: 70, HMV: 50 },
  students: [
    { name: "Alice", gender: "female", status: "passed" },
    { name: "Bob", gender: "male", status: "failed" },
    // ...more students
  ],
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export const getTotal = async () => {
//   const response = await axios.get(`${API_BASE_URL}/analytics/region/overall`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return response.data;
// };

// export const getRegions = async () => {
//   const response = await axios.get(`${API_BASE_URL}/analytics/all/region`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return response.data;
// };

export const useGetSchool = (id: any) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["schools", id],
    enabled: !!id,
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/aschool/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetRegionTotalData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["regionTotalData"],
    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/region/student-data/1`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetStation = (id: any) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stations", id],
    enabled: !!id,
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/astation/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
  console.log("data", data);

  return { data, isLoading, error };
};

export const useGetStationLicenseType = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stationLicenseType"],
    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/station/license-count/1`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetStationSchoolData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stationSchoolData"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/student-counts/1`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetStationStudentDataByMonth = (
  stationId: number,
  month: number | null, // Allow month to be null
  year: number
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["stationStudentDataByMonth", stationId, month, year],
    queryFn: async () => {
      const url =
        month === null
          ? `${API_BASE_URL}/students/${stationId}` // Fetch all data if month is null
          : `${API_BASE_URL}/students/${stationId}/${month}/${year}`; // Fetch specific month data

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetStationsInRegion = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stationsInRegion"],

    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/aregion/1`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetStudentsInRegion = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["studentsInRegion"],

    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/analytics/student/1`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetSchoolsInRegion = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["schoolsInRegion"],

    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/analytics/school/1`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetLicenseTypesInRegion = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["licenseTypesInRegion"],

    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/region/license-count/1`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  return { data, isLoading, error };
};
export const useGetRegionPerformance = (
  id: any,
  startDate: any,
  endDate: any
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["region", id, startDate, endDate],
    enabled: !!id,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await axios.get(
        `${API_BASE_URL}/aregion/${id}?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
  });

  return { data, isLoading, error };
};
export const useGetSationPerformance = (
  id: any,
  startDate: any,
  endDate: any
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rstation", id, startDate, endDate],
    enabled: !!id,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await axios.get(
        `${API_BASE_URL}/astation/${id}?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
  });

  return { data, isLoading, error };
};
export const useGetSchoolPerformance = (
  id: any,
  startDate: any,
  endDate: any
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rstation", id, startDate, endDate],
    enabled: !!id,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await axios.get(
        `${API_BASE_URL}/aschool/${id}?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
  });

  return { data, isLoading, error };
};
// export const useGetRegion = () => {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["regions"],
//     queryFn: async () => {
//       const response = await axios.get(
//         `${API_BASE_URL}/region/student-data/1`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data;
//     },
//   });

//   return { data, isLoading, error };
// };

export const usegetRegionStationData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["regionStationData"],
    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/student-counts/region/1`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });
  return { data, isLoading, error };
};
export const useGetRegionStudentData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["regionStudentData"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/analytics/student/1`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
  return { data, isLoading, error };
};
