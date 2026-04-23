import { ReactNode } from "react";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const LayoutShared = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 ">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
};

export default LayoutShared;
