import { MaskIconName } from "../../../components/ui/mask-icon";
import { Subjects } from "./Ability";

export interface MenuItem {
    label: string;
    key: string;
    icon?: MaskIconName;
    path?: string;
    children?: MenuItem[];
    subject?: Subjects;
}

export interface MenuProps {
    items: MenuItem[]
}

export interface NavigationMenuContextState {
    menuItems: MenuItem[];
    isDrawerOpen: boolean;
    toggleDrawer: () => void; // Toggle the drawer
    toggleMenu: (path: string) => void; // Toggle a submenu
    selectItem: (path: string) => void; // Select a menu item
    isOpen: (path: string) => boolean; // Check if a submenu is open
    isSelected: (path: string) => boolean; // Check if a menu item is selected
    hasChildSelected: (path: string) => boolean; // Check if a menu item has a selected child
}

export interface MenuItemProps {
    key: string;
    label: string;
    path: string;
    icon?: string;
    children?: MenuItemProps[];
  }