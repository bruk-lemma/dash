import { useGetStationLicenseType } from "@/api/data";
import { KeyRound, Loader } from "lucide-react";

interface LicenseData {
  licenseType: string;
}

interface LicenseTypeCardProps {
  //data: LicenseData[];
  selectedStation: any;
  // loading: boolean;
}

export default function LicenseTypeCard({
  //data,
  selectedStation,
}: //loading,
LicenseTypeCardProps) {
  const {
    data: stationLicenseData,
    isLoading: licenseIsLoading,
    error: licenseError,
  } = useGetStationLicenseType(selectedStation);
  //console.log("station license data", data);

  // Convert object to array
  const dataArray = Object.entries(stationLicenseData || {}).map(
    ([licenseType, count]) => ({
      licenseType,
      count: typeof count === "number" ? count : 0, // Map to thousands, default to 0 if not a number
    })
  );
  //console.log("station id on license carsd is", selectedStation);

  return (
    <div className="bg-white shadow-md rounded-lg p-5 ">
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <p className="text-lg font-semibold text-gray-800">License Types</p>
        <KeyRound size={28} className="text-gray-600" />
      </div>

      {licenseIsLoading ? (
        <div className="animate-pulse flex justify-evenly items-center px-3 py-2 rounded-md ">
          <Loader
            size={32}
            className="animate-spin text-indigo-600"
            color="black"
          />
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {dataArray.map(({ licenseType, count }, index) => (
          <div
            key={licenseType}
            className={`flex justify-between items-center px-3 py-2 rounded-md transition-all duration-200 ease-in-out ${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
            } hover:bg-blue-50 hover:scale-105`}
          >
            <span className="text-gray-800 font-medium text-xs">
              {licenseType}
            </span>
            <span className="text-gray-900 font-semibold text-xs ml-2">
              {count} {/* Format as 21,000 */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
