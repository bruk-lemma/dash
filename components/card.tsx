import { LucideIcon, Users } from "lucide-react";

interface CardProps {
  name: string;
  value: number;
  Icon: LucideIcon;
}

export default function Card({ name, value, Icon }: CardProps) {
  return (
    <div className="border px-4 py-2 rounded-md w-[350px]">
      <div className="flex justify-between items-center">
        <p className="text-sm font-light">{name}</p>
        <Icon size={24} />
      </div>
      <p className="font-semibold">{value}</p>
      <p className="text-xs font-light">
        There are {value} {name}
      </p>
    </div>
  );
}
