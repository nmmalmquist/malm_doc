import { Page } from "@/types/Page";
import { queryOptions } from "@tanstack/react-query";

export const createGetPagesQuery = () => {
  return queryOptions({
    queryKey: ["pages"],
    initialData: [],
    queryFn: () =>
      new Promise((resolve) => {
        resolve([
          { id: "1", title: "Home", text: "text" },
          { id: "2", title: "Aboute", text: "text" },
        ]);
      }) as Promise<Page[]>,
  });
};
