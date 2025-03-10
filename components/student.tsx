import { Users } from "lucide-react";

interface StudentCardProps {
  name: string;
  total: number;
  male: number;
  female: number;
  malePassed: number;
  maleFailed: number;
  femalePassed: number;
  femaleFailed: number;
}

export default function StudentCard({
  name,
  total,
  male,
  female,
  malePassed,
  maleFailed,
  femalePassed,
  femaleFailed,
}: StudentCardProps) {
  return (
    <div className="border px-6 py-4 rounded-lg w-[350px] bg-white shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <p className="text-lg font-semibold text-gray-800">{name}</p>
        <Users size={28} className="text-gray-600" />
      </div>

      {/* Student Statistics */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Total Students</span>
          <span className="font-semibold text-gray-800">{total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Male Students</span>
          <span className="font-semibold text-gray-800">{male}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Female Students</span>
          <span className="font-semibold text-gray-800">{female}</span>
        </div>

        {/* Gender-Specific Passed/Failed Data */}
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Male Passed</span>
          <span className="font-semibold text-green-600">{malePassed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Male Failed</span>
          <span className="font-semibold text-red-600">{maleFailed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Female Passed</span>
          <span className="font-semibold text-green-600">{femalePassed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Female Failed</span>
          <span className="font-semibold text-red-600">{femaleFailed}</span>
        </div>
      </div>
    </div>
  );
}
