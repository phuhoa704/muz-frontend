import { useMutation, useQuery } from 'react-query'
import { ArtistQueryRequest } from '../types/ArtistQueryRequest'
import { createArtist, fetchAllArtists, updateArtist } from '../api/fetch'
import { toast } from '../../../components/ui/toast/use-toast'
import { FailureResponse } from '../../../types'

export function useArtistsQuery(query: ArtistQueryRequest = {}) {
  return useQuery(['artist', JSON.stringify(query)], () =>
    fetchAllArtists(query)
  )
}

export function useCreateArtistMutation() {
  return useMutation((data: any) => createArtist(data), {
    mutationKey: ['artist', 'manager'],
    onSuccess: () => {
      toast({
        description: 'Create new artist successfully',
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

export function useUpdateArtistMutation() {
  return useMutation(({ id, data }: any) => updateArtist(id, data), {
    mutationKey: ['artist', 'manager'],
    onSuccess: () => {
      toast({
        description: 'Update artist successfully',
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
