import NewButton from '@/components/ui/new-button'
import { useModal } from '@/hooks/useModal'
import { ButtonProps } from '@/components/ui/button'
import { useReleaseManagementState } from '../hooks/useReleaseManagementContext'
import { Release } from '../types'
import DialogReleaseForm from './DialogReleaseForm'

interface ReleaseActionButtonProps extends ButtonProps {
  data?: Release
}

const ReleaseListAction = ({ data }: ReleaseActionButtonProps) => {
  const { openModal, closeModal } = useModal()
  const { refreshData } = useReleaseManagementState()
  const handleCloseModal = (rep?: Release) => {
    if (rep) {
      refreshData()
    }
    closeModal()
  }

  const handleOpenModal = () => {
    openModal(<DialogReleaseForm onClose={handleCloseModal} data={data} />)
  }
  return (
    <NewButton
      permissionRole="manage"
      subject="Album"
      btnId="newReleaseButton"
      type="button"
      onClick={handleOpenModal}
    />
  )
}
export default ReleaseListAction
