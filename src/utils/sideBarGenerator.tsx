import { NavLink } from "react-router";
import { TSidebar, TUser } from "../pages/types";



export const sideBarGenerator = (item: TUser[], role: string) => {
    const sidebar = item.reduce((acc: TSidebar[], item) => {
        if (item.path && item.name) {
          acc.push({
            key: item.path,
            label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
          });
        }
        return acc;
      }, []);
      return sidebar;
}