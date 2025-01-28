import { ComponentType, ReactNode } from "react";

export type TRoutes = {
  path: string;
  Component: ComponentType;
};

export type TUser = {
  name: string;
  path?: string;
  Component?: ComponentType;
  children?: TUser[];
};


export type TSidebar = {
    key: string;
    label: ReactNode;
    children?: TSidebar[];
  }