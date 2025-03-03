import { Page } from "@/types/Page";
import { queryOptions } from "@tanstack/react-query";

export const createGetPagesQuery = () => {
  return queryOptions({
    queryKey: ["pages"],
    initialData: [],
    queryFn: async () => {
      const pages: Promise<Page[]> = await electron.getPages();
      console.log(pages);
      return pages;
    },
  });
};
