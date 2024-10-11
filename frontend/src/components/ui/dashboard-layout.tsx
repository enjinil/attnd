import { ReactNode } from "react";
import Header from "./header/header";

const DashboardLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex flex-col items-center min-h-screen w-screen bg-gradient-to-b from-slate-200 to-teal-50">
      <Header />
      <main className="flex-grow container pt-10 pb-12">{children}</main>
    </div>
  );
};

export default DashboardLayout;
