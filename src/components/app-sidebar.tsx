"use client";

import * as React from "react";
import { ChevronDown, File, GalleryVerticalEnd } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { createGetPagesQuery } from "@/queries/getPagesQuery";
import { useActivePagesStore } from "@/stores/activePageStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useQuery(createGetPagesQuery());
  const activePage = useActivePagesStore((state) => state.page);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[
            {
              name: "Acme Inc",
              logo: GalleryVerticalEnd,
              plan: "Enterprise",
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data?.map((page) => ({
            title: page.title,
            url: "",
            isActive: activePage?.id === page.id,
          }))}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
