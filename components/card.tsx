// import { LucideIcon, Users } from "lucide-react";

// interface CardProps {
//   name: string;
//   value: number;
//   Icon: LucideIcon;
// }

// export default function Card({ name, value, Icon }: CardProps) {
//   return (
//     <div className="border px-4 py-2 rounded-md w-[350px]">
//       <div className="flex justify-between items-center">
//         <p className="text-sm font-light">{name}</p>
//         <Icon size={24} />
//       </div>
//       <p className="font-semibold">{value}</p>
//       <p className="text-xs font-light">
//         There are {value} {name}
//       </p>
//     </div>
//   );
// }
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface CardProps {
  name: string;
  value: number;
  Icon: LucideIcon;
  male?: number; // Optional property to represent male count
  female?: number; // Optional property to represent female count
  onClick?: () => void;
  goto?: boolean;
}

export default function Card({
  name,
  value,
  Icon,
  male,
  female,
  onClick,
  goto,
}: CardProps) {
  const router = useRouter();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className="border px-6 py-4 rounded-lg w-[300px] bg-white shadow-lg transition-all hover:shadow-2xl hover:scale-105 hover:bg-gray-50 flex flex-col justify-between h-[180px]"
      onClick={handleClick}
    >
      <div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-600">{name}</p>
          <Icon size={24} className="text-indigo-600" />
        </div>
        <p className="font-semibold text-2xl text-gray-800 mt-2">{value}</p>
        <p className="text-xs font-light text-gray-500 mt-1">
          {name} Breakdown:
        </p>
        {male !== undefined && female !== undefined && (
          <div className="mt-2 text-xs text-gray-600">
            <p>
              Male: <span className="font-medium text-blue-600">{male}</span>
            </p>
            <p>
              Female:{" "}
              <span className="font-medium text-pink-600">{female}</span>
            </p>
          </div>
        )}
      </div>
      {/* Positioned at the bottom */}
      {goto && (
        <p
          className="text-end text-indigo-500 font-bold mt-auto cursor-pointer"
          onClick={() => router.push("/school_detail")}
        >
          View More
        </p>
      )}
    </div>
  );
}
