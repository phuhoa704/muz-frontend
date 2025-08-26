import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { systemMenus } from "../config/menu";
import { MenuItem } from "../types";
import { generateMenuPath } from "../utils/generateMenuPath";

const useNavigationMenu = () => {
    return systemMenus;
}

const useNavigationMenuControl = () => {
    const location = useLocation();
    const menuItems = useNavigationMenu();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<string>('');

    const findActiveMenu = useCallback((path: string, items: MenuItem[], parentKey: string | null = null): {openKey: string | null; activeKey: string | null} => {
        for (const item of items) {
            if(item.children){
                const result = findActiveMenu(path, item.children, generateMenuPath(item.label, parentKey));
                if(result.activeKey) {
                    return result;
                }
            } else if(item.path) {
                const exactMatch = path === item.path;
                if(exactMatch) {
                    return {
                        openKey: parentKey,
                        activeKey: generateMenuPath(item.label, parentKey)
                    }
                }
            }
        }

        /*  */
        for (const item of items) {
            if(item.children) {
                const result = findActiveMenu(path, item.children, generateMenuPath(item.label, parentKey));
                if(result.activeKey) {
                    return result;
                }
            } else if(item.path && path.startsWith(item.path)) {
                const nestedPath = path.startsWith(item.path);
                if(nestedPath) {
                    return {
                        openKey: parentKey,
                        activeKey: generateMenuPath(item.label, parentKey)
                    }
                }
            }
        }
        return { openKey: null, activeKey: null }
    }, []);

    useEffect(() => {
        const { openKey, activeKey } = findActiveMenu(location.pathname, menuItems);
        setOpenMenus(openKey ? [openKey] : []);
        setSelectedItem(activeKey || '');
    }, [findActiveMenu, location.pathname, menuItems]);

    const toggleMenu = (menu: string) => {
        setOpenMenus((prev) => {
            if(prev.includes(menu)) {
                return prev.filter(key => key !== menu);
            }

            const isTopLevel = !prev.some(m => m.startsWith(menu.split('__')[0]));

            return isTopLevel ? [menu] : [...prev, menu]
        })
    };

    const selectItem = (path: string) => {
        setSelectedItem(path);
    };

    const isOpen = (menu: string) => {
        return openMenus.includes(menu);
    }

    const isSelected = (menu: string) => {
        return selectedItem === menu;
    }

    const hasChildSelected = (menu: string) => {
        if(!selectedItem) {
            return false;
        }
        const selected = selectedItem.split('__').slice(0, -1).join('__');
        return selected === menu;
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    }

    return { menuItems, isDrawerOpen, toggleDrawer, toggleMenu, selectItem, isOpen, isSelected, hasChildSelected }
}

export { useNavigationMenu, useNavigationMenuControl }