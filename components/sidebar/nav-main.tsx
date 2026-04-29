"use client";
import { ReactNode } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavMainProps {
  title: string;
  url: string;
  icon?: ReactNode;
}
const NavMain = ({ items }: { items: NavMainProps[] }) => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-4">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  pathname === item.url
                    ? "bg-white! text-primary py-3"
                    : "text-sidebar-foreground!",
                  "ps-3",
                )}
              >
                <Link href={item.url}>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavMain;
