import { ReactNode } from "react";
import Navbar from "./_components/Navbar";

const LayoutShared = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default LayoutShared;
