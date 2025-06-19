import { ReactNode } from "react";

export type TRoutes = {
  path: string;
  element: ReactNode;
};

export type TUser = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUser[];
};

export type TSidebar = {
  key: string;
  label: ReactNode;
  children?: TSidebar[];
};

export type TBLockUser = {
  id: string;
  userStatus: string;
}
