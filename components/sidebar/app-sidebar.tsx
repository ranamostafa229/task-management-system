import { LogoIcon, NetworkIcon } from "@/components/icons/icon";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FolderOpen, Info, ListChecks, LogOut, Users } from "lucide-react";
import Link from "next/link";
import NavMain from "./nav-main";
import ToggleSidebar from "./toggle-sidebar";

const data = [
  {
    title: "Projects",
    url: "/project",
    icon: <FolderOpen />,
  },
  {
    title: "Project Epics",
    url: "/epics",
    icon: <NetworkIcon />,
  },
  {
    title: "Project Tasks",
    url: "/tasks",
    icon: <ListChecks />,
  },
  {
    title: "Project Members",
    url: "/members",
    icon: <Users />,
  },
  {
    title: "Project Details",
    url: "/details",
    icon: <Info />,
  },
];
const AppSidebar = () => {
  return (
    <Sidebar
      collapsible="icon"
      className={"border-none transition-all duration-300"}
    >
      <SidebarHeader className="bg-sidebar-accent">
        <SidebarMenu className="flex">
          <SidebarMenuItem className="flex">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! "
            >
              <Link href="/">
                <div className=" items-center gap-1.5  hidden dark:block pt-4 ps-1">
                  <LogoIcon />
                  <span className="text-xl font-bold">TASKLY</span>
                </div>
                <div className="flex items-center gap-2 dark:block pt-4 ps-0.5">
                  <LogoIcon />
                  <span className="text-xl font-bold"> TASKLY</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar-accent pt-9">
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter className="bg-sidebar-accent">
        <SidebarMenu>
          <SidebarMenuItem>
            <ToggleSidebar />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive! cursor-pointer">
              <LogOut className=" ml-1" />
              <span className="font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
