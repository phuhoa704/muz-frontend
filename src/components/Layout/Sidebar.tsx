import { cn } from '../../lib/utils'
import { ScrollArea } from '../ui/scroll'
import { SidebarNavigationMenu } from '../../features/access-control/components'

type Props = {
  className?: string
}

const Sidebar: React.FC<Props> = ({ className }) => {
  return (
    <ScrollArea
      type="hover"
      className={cn('h-full lg:h-[calc(100vh - 60px)]', className)}
    >
      <aside className="p-4">
        <SidebarNavigationMenu />
      </aside>
    </ScrollArea>
  )
}

export default Sidebar
