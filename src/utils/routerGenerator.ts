import { TRoutes, TUser } from "../pages/types";

export const routerGenerator = (item: TUser[]) => {
  const routes = item.reduce((acc: TRoutes[], item) => {
    if (item.path && item.Component) {
      acc.push({
        path: item.path,
        Component: item.Component,
      });
    }
    //   if (item.children) {
    //     item.children.forEach((children) => {
    //       acc.push({
    //         path: children.path,
    //         Component: children.Component,
    //       });
    //     });
    //   }
    return acc;
  }, []);
  return routes;
};
