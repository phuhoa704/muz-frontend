import { createContext, PropsWithChildren, useContext } from "react";
import { useNavigationMenuControl } from "../hooks/useMenuState";
import { NavigationMenuContextState } from "../types";

const NavigationMenuContext = createContext<NavigationMenuContextState | undefined>(undefined);

const NavigationMenuProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const control = useNavigationMenuControl();
    return (
        <NavigationMenuContext.Provider value={control}>
            {children}
        </NavigationMenuContext.Provider>
    )
}

const withNavigationMenu = (Component: React.FC<PropsWithChildren>) => {
    const HocComponent: React.FC<PropsWithChildren> = (props) => (
        <NavigationMenuProvider>
            <Component {...props}/>
        </NavigationMenuProvider>
    )
    HocComponent.displayName = `withNavigationMenu(${Component.displayName})`
    return HocComponent;
}

const useNavigationMenu = () => {
    const context = useContext(NavigationMenuContext);

    if(!context) {
        throw new Error('useNavigationMenu must be used within a NavigationMenuProvider')
    }

    return context;
}

export { NavigationMenuContext, NavigationMenuProvider, useNavigationMenu, withNavigationMenu }