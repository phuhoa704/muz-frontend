import ProtectedComponent from '../../ProtectedComponent'
import { Button } from '../button'
import { PlusCircle } from 'lucide-react'
import { Subjects } from '../../../features/access-control/types'
import { Link } from 'react-router-dom'

interface NewButtonProps {
  permissionRole: string
  path?: string
  type?: 'button' | 'link'
  subject: Subjects
  entity?: string
  btnId?: string
  onClick?: () => void
}

const NewButton = ({
  permissionRole,
  entity,
  path,
  subject,
  type = 'link',
  onClick,
  btnId = 'new-button',
}: NewButtonProps) => (
  <ProtectedComponent action={permissionRole} subject={subject}>
    {type === 'button' ? (
      <Button className="flex items-center gap-2" id={btnId} onClick={onClick}>
        <PlusCircle size={20} color="#777777" />
        {entity ? <span>New {entity}</span> : <span>New</span>}
      </Button>
    ) : (
      <Link to={path || '#'} className="no-underline">
        <Button className="flex items-center gap-2" id={btnId}>
          <PlusCircle size={20} color="#777777" />
          {entity ? <span>New {entity}</span> : <span>New</span>}
        </Button>
      </Link>
    )}
  </ProtectedComponent>
)
NewButton.displayName = 'NewButton'
export default NewButton
