"use client";

import { cn } from "@/lib/utils";
import { SidebarItem } from "@/types/sidebar";
import { Home, Package, Pen, Settings, Ticket, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MiniSidebarItem: SidebarItem[] = [
  {
    title: "Details",
    href: "",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <Package className="h-4 w-4" />,
  },
  {
    title: "Packages",
    href: "/packages",
    icon: <Package className="h-4 w-4" />,
  },
  // {
  //   title: "Ticket",
  //   href: "/ticket",
  //   icon: <Ticket className="h-4 w-4" />,
  // },
  // {
  //   title: "Order",
  //   href: "/order",
  //   icon: <Ticket className="h-4 w-4" />,
  // },
  // {
  //   title: "Staff",
  //   href: "/staff",
  //   icon: <Users className="h-4 w-4" />,
  // },
  // { title: "Post", href: "/post", icon: <Pen className="h-4 w-4" /> },
  // {
  //   title: "Settings",
  //   href: "/settings",
  //   icon: <Settings className="h-4 w-4" />,
  // },
];

export default function MiniSidebar({ id }: { id: string }) {
  const pathname = usePathname();
  const baseUrl = `/dashboard/my-events/${id}`;
  return (
    <div className="">
      <div className="flex flex-col">
        {MiniSidebarItem.map((item, index) => (
          <Link
            key={index}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer",
              pathname === `${baseUrl}${item.href}` && "bg-muted text-primary"
            )}
            href={`${baseUrl}${item.href}`}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}