import { getRegions, getTotal } from "@/api/data";
import { useQuery } from "@tanstack/react-query";

export const useData = () => {
  return useQuery({
    queryKey: ["total"],
    queryFn: () => getTotal(),
  });
};

export const useRegions = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegions(),
  });
};
