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
