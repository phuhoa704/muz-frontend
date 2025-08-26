import { useCreateArtistMutation, useUpdateArtistMutation } from "./useArtistQuery"

export const useSaveArtist = (id: number) => {
    const mutationCreate = useCreateArtistMutation();
    const mutationUpdate = useUpdateArtistMutation();

    return id ? mutationUpdate : mutationCreate;
}