import logo from '../../assets/logo.svg'

import { useNavigationMenu } from '../../features/access-control/context'
import { MenuIcon, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import TopNavbar from './TopNavbar'

const Logo = () => (
  <Link to={'/'}>
    <img src={logo} alt="" className="w-10" />
  </Link>
)

function Topbar() {
  const { isDrawerOpen, toggleDrawer } = useNavigationMenu()
  return (
    <header className="fixed z-50 top-0 left-0 w-full h-[60px] bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button
          className="lg:hidden bg-transparent text-dark"
          onClick={toggleDrawer}
          size={'icon'}
          variant={'secondary'}
        >
          {isDrawerOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </Button>
        <Logo />
      </div>
      <TopNavbar />
    </header>
  )
}

export default Topbar
