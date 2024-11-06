import clsx from "clsx";
import { useUser } from "@/hooks/store";

const Logo = ({ className }: { className?: string }) => {
  const user = useUser();

  return (
    <div className={clsx("flex items-center", className)}>
      <span className="font-bold text-xl text-teal-500 tracking-tighter">Attnd</span>
      {user?.role == "admin" && <span className="text-xs my-auto py-1 px-2 bg-slate-500 ml-2 text-white rounded">ADMIN</span>}
    </div>
  );
};

export default Logo;
