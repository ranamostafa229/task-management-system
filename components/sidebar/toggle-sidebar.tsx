"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";

const ToggleSidebar = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <SidebarMenuButton
      className="cursor-pointer bg-inherit! w-fit"
      onClick={toggleSidebar}
    >
      {open ? (
        <ChevronLeft className="w-5! h-5!" />
      ) : (
        <ChevronRight className="w-5! h-5!" />
      )}
      <span className="font-medium">{open ? "Collapse" : "Expand"} </span>
    </SidebarMenuButton>
  );
};

export default ToggleSidebar;
