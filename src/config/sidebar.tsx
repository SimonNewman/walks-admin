import { Footprints, Home, type LucideIcon } from "lucide-react";

type SidebarItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Walks",
    href: "/walks",
    icon: Footprints,
  },
];

export default sidebarItems;
