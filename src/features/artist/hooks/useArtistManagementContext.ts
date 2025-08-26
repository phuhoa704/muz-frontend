import { useContext } from "react";
import { ArtistManagementContext } from "../context";

export const useArtistManagementState = () => {
    const context= useContext(ArtistManagementContext);

    if(!context) {
        throw new Error('useArtistManagementState must be used within a ArtistManagementContext')
    }

    return context
}