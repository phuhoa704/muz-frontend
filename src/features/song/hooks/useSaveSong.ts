import { useMutation } from 'react-query'
import { createSong, updateSong } from '../api'
import { toast } from '@/components/ui/toast/use-toast'
import { FailureResponse } from '@/types'

export function useCreateSongMutation() {
  return useMutation((data: any) => createSong(data), {
    mutationKey: ['song', 'manager'],
    onSuccess: () => {
      toast({
        description: 'Create song successfully',
      })
    },
    onError: (error: FailureResponse) => {
      toast({
        description: error.message,
        variant: 'destructive',
      })
    },
  })
}

export function useUpdateSongMutation() {
  return useMutation(({ id, data }: any) => updateSong(id, data), {
    mutationKey: ['song', 'manager'],
    onSuccess: () => {
      toast({
        description: 'Update song successfully',
      })
    },
    onError: (error: FailureResponse) => {
      toast({
        description: error.message,
        variant: 'destructive',
      })
    },
  })
}

export const useSaveSong = (id: number) => {
  const mutationCreate = useCreateSongMutation()
  const mutationUpdate = useUpdateSongMutation()

  return id ? mutationUpdate : mutationCreate
}
