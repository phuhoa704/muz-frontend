import React, { type PropsWithChildren } from 'react'
import Sidebar from '../components/Layout/Sidebar'
import {
  useNavigationMenu,
  withNavigationMenu,
} from '../features/access-control/context'
import { X } from 'lucide-react'
import Topbar from '../components/Layout/Topbar'
import { Drawer, DrawerClose, DrawerContent } from '../components/ui/drawer'

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { isDrawerOpen, toggleDrawer } = useNavigationMenu()
  return (
    <div className="overflow-hidden">
      <Topbar />

      <div className="hidden lg:block fixed top-[60px] left-0 w-72 bg-white shadow h-full">
        <Sidebar />
      </div>

      <main className="ml-0 mt-[60px] lg:ml-72 h-[calc(100vh-60px)] overflow-y-auto bg-[#e9f0f6]">
        {children}
      </main>

      <Drawer open={isDrawerOpen} direction="left" fixed onDrag={toggleDrawer}>
        <DrawerContent className="w-72 h-full bg-white shadow">
          <DrawerClose
            className="absolute right-1 top-1 shadow-sm rounded-full w-fit p-2 cursor-pointer"
            onClick={toggleDrawer}
          >
            <X className="h-5 w-5 text-dark" />
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default withNavigationMenu(MainLayout)
