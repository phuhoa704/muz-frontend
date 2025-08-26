import NewButton from '../../../components/ui/new-button'
import { useModal } from '../../../hooks/useModal'
import { ButtonProps } from '../../../components/ui/button'
import { useSongManagementState } from '../hooks'
import { Song } from '../types'
import DialogSongForm from './DialogSongForm'

interface SongActionButtonProps extends ButtonProps {
  data?: Song
}

const SongListAction = ({ data }: SongActionButtonProps) => {
  const { openModal, closeModal } = useModal()
  const { refreshData } = useSongManagementState()
  const handleCloseModal = (rep?: Song) => {
    if (rep) {
      refreshData()
    }
    closeModal()
  }
  const handleOpenModal = () => {
    openModal(<DialogSongForm onClose={handleCloseModal} data={data} />)
  }
  return (
    <NewButton
      permissionRole="manage"
      subject="Song"
      btnId="newSongButton"
      type="button"
      onClick={handleOpenModal}
    />
  )
}

export default SongListAction
