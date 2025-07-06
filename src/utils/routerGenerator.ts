import { TRoutes, TUser } from "../pages/types";

export const routerGenerator = (item: TUser[]) => {
  const routes = item.reduce((acc: TRoutes[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    return acc;
  }, []);
  return routes;
};

