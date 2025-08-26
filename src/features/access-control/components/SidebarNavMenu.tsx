import { cn } from '../../../lib/utils'
import { ChevronDown } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import MaskIcon from '../../../components/ui/mask-icon'
import { useNavigationMenu } from '../context'
import { MenuItem } from '../types'
import { generateMenuPath } from '../utils/generateMenuPath'
import ProtectedComponent from '../../../components/ProtectedComponent'

type ItemProps = {
  children: React.ReactNode
  className?: string
  parentPath?: string
  path: string
  id?: string
}

function NavigationMenu({
  children,
  className,
  parentPath,
  id = 'sidebarMenu',
}: Readonly<Omit<ItemProps, 'path'>>) {
  const control = useNavigationMenu()
  const isVisible = !parentPath || control.isOpen(parentPath)

  if (!isVisible) {
    return null
  }

  return (
    <ul
      className={cn(
        'flex flex-col gap-2 transition-all duration-300 ease-in-out',
        `parent-${parentPath}`,
        className
      )}
      id={id}
    >
      {children}
    </ul>
  )
}

function NavigationMenuItem({
  children,
  className,
  path,
}: Readonly<ItemProps>) {
  const control = useNavigationMenu()

  const isOpen = control.isOpen(path)
  const isSelected = control.isSelected(path)
  const hasSelected = control.hasChildSelected(path)

  return (
    <li
      className={cn(
        className,
        isOpen && 'is-open',
        hasSelected && 'has-child-active' && isSelected && 'is-active'
      )}
    >
      {children}
    </li>
  )
}

interface NavigationMenuLinkProps {
  children: React.ReactNode
  className?: string
  to?: string
  path: string
  hasChild?: boolean
}

function NavigationMenuLink({
  children,
  to,
  className,
  hasChild = false,
  path,
}: Readonly<NavigationMenuLinkProps>) {
  const control = useNavigationMenu()

  const isOpen = control.isOpen(path)
  const isSelected = control.isSelected(path)
  const hasSelected = control.hasChildSelected(path)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasChild) {
      e.preventDefault()
    }

    control.toggleMenu(path)

    if (!hasChild) {
      control.selectItem(path)
    }
  }

  return (
    <Link
      className={cn(
        'w-full relative flex justify-between px-4 py-2 text-sm transition-all duration-300 ease-in-out hover:text-current hover:no-underline hover:bg-navbar-hover rounded',
        className,
        hasSelected || isSelected ? 'font-semibold' : 'font-normal',
        isSelected &&
          'font-semibold bg-navbar-active text-navbar-active-foreground'
      )}
      to={to || '#'}
      onClick={handleClick}
    >
      {children}

      {hasChild && (
        <div className="absolute top-3 right-1">
          <ChevronDown
            className={cn(
              'relative top-[1px] ml-1 h-3 w-3 transition-transform duration-300 ease-in-out',
              isOpen ? 'transform rotate-180' : 'rotate-0'
            )}
            aria-hidden="true"
          />
        </div>
      )}
    </Link>
  )
}

export function SidebarNavMenu({
  items,
  className,
  parentPath = '',
  id = 'sidebarMenu',
}: Readonly<{
  items: MenuItem[]
  className?: string
  parentPath?: string
  id?: string
}>) {
  const group = parentPath || 'menu'

  return (
    <NavigationMenu className={cn(className)} parentPath={parentPath} id={id}>
      {items.map((item) => {
        const path = generateMenuPath(item.label, parentPath)
        // convert label to lowercase and replace spaces with hyphens
        const itemClassName = item.label.toLowerCase().replace(/\s/g, '-')

        return (
          <ProtectedComponent
            action="read"
            subject={item?.subject}
            key={item.label}
          >
            <NavigationMenuItem
              key={item.label}
              className={`group/${group}`}
              path={path}
            >
              <NavigationMenuLink
                hasChild={item.children?.length ? true : false}
                to={item.path}
                path={path}
                className={`menu-item-${itemClassName}`}
              >
                <div className="inline-flex items-center">
                  {item.icon && (
                    <MaskIcon
                      name={item.icon}
                      className="mr-2"
                      color="bg-dark"
                      size={24}
                    />
                  )}
                  {item.label}
                </div>
              </NavigationMenuLink>

              {item.children && (
                <SidebarNavMenu
                  items={item.children}
                  className="pl-5"
                  parentPath={path}
                  id={`${id}Child`}
                />
              )}
            </NavigationMenuItem>
          </ProtectedComponent>
        )
      })}
    </NavigationMenu>
  )
}
