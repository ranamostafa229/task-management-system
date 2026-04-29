import { ReactNode } from "react";
import Navbar from "./_components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";

const LayoutShared = async ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-col flex-1 ">
        <Navbar />
        <main className="flex-1 bg-white">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default LayoutShared;
