import { MyBreadcrumb } from "@/components/Breadcrumb";
import Sidebar from "@/components/SideBar/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import PrivateProvider from "@/providers/PrivateProvider";
import { SidebarItem } from "@/types/sidebar";
import {
  Home,
  Package,
  SquarePlus,
  Users,
  MessageSquareQuote,
} from "lucide-react";
import React from "react";

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Feedbacks",
    href: "/feedback",
    icon: <MessageSquareQuote className="h-4 w-4" />,
  },
];

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateProvider>
      <div className="grid min-h-[calc(100vh_-_theme(spacing.20))] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar
          sidebarItems={sidebarItems}
          sidebarTitle="Manager dashboard"
          parentPath="/dashboard"
        />
        <div className="flex flex-col">
          <div className="h-14 gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 flex items-center">
            <MyBreadcrumb />
          </div>
          <ScrollArea className="h-[calc(100vh_-_theme(spacing.40))]">
            <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full">
              {children}
            </main>
          </ScrollArea>
        </div>
      </div>
    </PrivateProvider>
  );
}
