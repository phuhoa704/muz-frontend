import { useMutation } from "react-query";
import { createRelease, updateRelease } from "../api";
import { toast } from "../../../components/ui/toast/use-toast";
import { FailureResponse } from "../../../types";

export function useCreateReleaseMutation(){
    return useMutation((data: any) => createRelease(data), {
        mutationKey: ['release', 'manager'],
        onSuccess: () => {
            toast({
                description: 'Create release successfully'
            })
        },
        onError: (error: FailureResponse) => {
            toast({
                description: error.message,
                variant: 'destructive'
            })
        }
    })
}

export function useUpdateReleaseMutation() {
    return useMutation(({ id, data }: any) => updateRelease(id, data), {
        mutationKey: ['release', 'manager'],
        onSuccess: () => {
            toast({
                description: 'Update release successfully'
            })
        },
        onError:(error: FailureResponse) => {
            toast({
                description: error.message,
                variant: 'destructive'
            })
        }
    })
}

export const useSaveRelease = (id: number) => {
    const mutationCreate = useCreateReleaseMutation();
    const mutationUpdate = useUpdateReleaseMutation();

    return id ? mutationUpdate : mutationCreate;
}