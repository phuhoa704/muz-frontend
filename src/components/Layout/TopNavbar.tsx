import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useLogout } from '../../features/auth/hooks'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUser } from '../../hooks/auth'

const UserMenu = () => {
  const user = useUser()
  const logout = useLogout()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group/user inline-flex h-10 w-max text-sm items-center justify-center">
        {user.displayName}
        <ChevronDown className="ml-5 h-3 w-3 transition duration-200 group/user-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link to={'/profile/me'}>
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function TopNavbar() {
  return (
    <ul className="flex items-center space-x-5">
      <li>
        <UserMenu />
      </li>
      <li>{/*  */}</li>
    </ul>
  )
}
