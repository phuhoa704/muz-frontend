import { useNavigationMenu } from "../context"
import { SidebarNavMenu } from "./SidebarNavMenu"

export function SidebarNavigationMenu() {
    const { menuItems } = useNavigationMenu();
    return (
        <SidebarNavMenu items={menuItems} />
    )
}