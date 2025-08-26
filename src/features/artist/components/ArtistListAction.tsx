import NewButton from "../../../components/ui/new-button";
import { useModal } from "../../../hooks/useModal";
import { ButtonProps } from "../../../components/ui/button";
import { useArtistManagementState } from "../hooks";
import { Artist } from "../types";
import DialogArtistForm from "./DialogArtistForm";

interface ArtistActionButtonProps extends ButtonProps {
    data?: Artist
}

const ArtistListAction = ({ data }: ArtistActionButtonProps) => {
    const { openModal, closeModal } = useModal();
    const { refreshData } = useArtistManagementState();
    const handleCloseModal = (rep?: Artist) => {
        if(rep) {
            refreshData();
        }
        closeModal();
    }
    const handleOpenModal = () => {
        openModal(
            <DialogArtistForm 
                onClose={handleCloseModal}
                data={data}
            />
        )
    }
    return (
        <NewButton
            permissionRole="manage"
            subject="Artist"
            btnId="newArtistButton"
            type="button"
            onClick={handleOpenModal}
        />
    )
}

export default ArtistListAction