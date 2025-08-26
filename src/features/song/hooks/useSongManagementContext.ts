import { useContext } from "react";
import { SongManagementContext } from "../context";

export const useSongManagementState = () => {
    const context = useContext(SongManagementContext);

    if(!context) {
        throw new Error('useSongManagementState must be used within a SongManagementProvider')
    }
    return context
}