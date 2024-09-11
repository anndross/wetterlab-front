import { ChildrenI } from "@/types/children";

export function CardRoot({ children }: ChildrenI) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border duration-500 border-cyan-700 bg-white p-4 shadow-md w-full">
      {children}
    </div>
  );
}
