"use client";

import { Plus, X, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useActivePagesStore } from "@/stores/activePageStore";
import { createGetPagesQuery } from "@/queries/getPagesQuery";
import { useQuery } from "@tanstack/react-query";

export function NavMain({
  items,
}: {
  items: {
    id: string;
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const { data, refetch } = useQuery(createGetPagesQuery());
  const setActivePage = useActivePagesStore((state) => state.setActivePage);
  const addNewPage = async () => {
    await electron.addPage();
    refetch();
  };
  const deletePage = async (id: string) => {
    console.log("delete page", id);
    await electron.deletePage(id);
    refetch();
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Pages{" "}
        <SidebarGroupAction
          title="Add Project"
          className="cursor-pointer"
          onClick={addNewPage}
        >
          <Plus /> <span className="sr-only">Add Project</span>
        </SidebarGroupAction>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => {
                    const selected = data.find((page) => page.id === item.id);
                    if (selected) {
                      setActivePage(selected);
                    }
                  }}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <X
                    className="ml-auto transition-transform duration-200 hover:text-destructive cursor-pointer"
                    onClick={() => deletePage(item.id)}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton>
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
